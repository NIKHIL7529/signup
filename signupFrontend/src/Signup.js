import React, { useEffect } from "react";
import image from "./media/image.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function SignUpForm({ formData, setFormData }) {
  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, terms: false }));
  }, []);

  const handleTermsChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: !e.target.checked ? false : true,
      formErrors: {
        ...formData.formErrors,
        [e.target.name]: undefined,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, formErrors: {} });

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormData({ ...formData, formErrors: errors });
      return;
    }

    if (formData.terms === false) {
      setFormData({
        ...formData,
        formErrors: { terms: "Please accept the terms and conditions" },
      });
      return;
    }

    Swal.fire({
      width: "100",
      didOpen: () => Swal.showLoading(),
    });
    try {
      const response = await axios.post(
        "http://localhost:8000/check-username",
        {
          username: formData.username,
        }
      );
      Swal.close();
      if (response.data.exists) {
        console.log(response.data);
        setFormData({
          ...formData,
          usernameExists: response.data.exists,
          formErrors: { username: "Username already exists" },
        });
        return;
      }
      console.log(formData);

      navigate("/welcomescreen");
    } catch (error) {
      Swal.close();
      console.error(error);
      setFormData({
        ...formData,
        formErrors: { general: "Something went wrong, please try again" },
      });
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name || !data.username || !data.email || !data.password)
      errors.common = "All fields is required";
    if (data.password && data.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
      usernameExists: e.target.name === "username" && false,
      formErrors: {
        ...formData.formErrors,
        [e.target.name]: undefined,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col xl:flex-row">
      <div className="hidden xl:block">
        <img src={image} alt="" className="h-screen max-w-max" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white h-screen w-full"
      >
        <div className="absolute top-5 right-5">
          Already a user?{" "}
          <span className="cursor-pointer text-blue-600">Sign in</span>
        </div>
        <div className="md:w-1/2 w-3/4 sm:p-0 py-12 min-h-screen flex flex-col justify-center m-auto">
          <h2 className="text-2xl font-bold mb-6">Sign up to Dribble</h2>
          {Object.keys(formData.formErrors).length > 0 && (
            <ul className="text-red-400 mb-4">
              {Object.values(formData.formErrors).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
          <div className="grid md:grid-cols-2 md:gap-5 box-border">
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-100 bg-gray-100 rounded-md px-4 py-2 box-border"
                placeholder="Enter your name"
                trim
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2">
                {formData.usernameExists && (
                  <i className="fa-solid fa-triangle-exclamation text-red-500"></i>
                )}
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full border border-gray-100 bg-gray-100 rounded-md px-4 py-2 box-border ${
                  formData.usernameExists ? "border-red-500" : ""
                }`}
                placeholder="Enter your username"
                trim
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-100 bg-gray-100 rounded-md px-4 py-2 box-border"
              placeholder="Enter your email"
              trim
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              minLength="6"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-100 bg-gray-100 rounded-md px-4 py-2 box-border"
              placeholder="6+ characters"
              trim
              required
            />
          </div>
          <div className="mb-4 flex">
            <input
              id="terms"
              type="checkbox"
              className="mr-2"
              name="terms"
              onChange={handleTermsChange}
              required
            />
            <label htmlFor="terms" className="font-medium mb-2 block">
              Creating an account means you're okay with our{" "}
              <span className="cursor-pointer text-blue-600">
                Terms of Service, Privacy Policy,{" "}
              </span>
              and our default{" "}
              <span className="cursor-pointer text-blue-600">
                Notification Settings
              </span>
              .
            </label>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-pink-500 text-white px-8 py-2 rounded-lg hover:bg-pink-600"
              onClick={handleSubmit}
            >
              Create Account
            </button>
          </div>
          <div className="text-gray-400 text-sm w-2/3">
            This is protected by reCAPTCHA and the Google{" "}
            <span className="cursor-pointer text-blue-600">Privacy Policy</span>{" "}
            and{" "}
            <span className="cursor-pointer text-blue-600">
              Terms of Service
            </span>{" "}
            apply.
          </div>
        </div>
      </form>
    </div>
  );
}
