const dotenv = require("dotenv");
const express = require("express");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
const { Resend } = require("resend");

const app = express();

dotenv.config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

const resend = new Resend(process.env.RESEND_API_KEY);

const data = async (email) => {
  console.log("sending email...");
  console.log(email);
  try {
    const response = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Dribble Signup",
      html: "Thank You",
    });

    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

app.post("/photo", async (req, res) => {
  const { photo } = req.body;
  try {
    const result = await cloudinary.uploader.upload(photo, {
      folder: "avatar",
    });
    image = result?.secure_url;
    if (image) {
      res.json({ image });
    } else {
      res.status(500).json({ message: "Error uploading photo" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/check-username", async (req, res) => {
  const { username } = req.body;
  console.log("Check Username");
  console.log(username);
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)",
      [username]
    );

    if (result.rows[0].exists) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
    client.release();
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({ message: "An error occurred." });
  }
});

app.post("/signup", async (req, res) => {
  const { userData } = req.body;
  console.log("Signup");
  console.log(userData);
  try {
    const newUser = await createUser(userData);
    console.log(newUser);
    console.log("Sending Email...");
    await data(userData.email);
    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
});

async function createUser(userData) {
  const client = await pool.connect();
  try {
    console.log("Create user");
    console.log(userData);
    const {
      name,
      username,
      email,
      password,
      terms,
      usernameExists,
      formErrors,
      photo,
      location,
      purpose,
    } = userData;

    console.log(name);
    console.log(password);
    const hashedPassword = bcrypt.hashSync(password);
    console.log(hashedPassword);

    const result = await client.query(
      "INSERT INTO users (name, username, email, password, photo, location, purpose) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [name, username, email, hashedPassword, photo, location, purpose]
    );
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  } finally {
    client.release();
  }
}

async function getPgVersion() {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT version()");
    console.log(result.rows[0]);
  } finally {
    client.release();
  }
}

getPgVersion();

const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening on port ${port}`));
