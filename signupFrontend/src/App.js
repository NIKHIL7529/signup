import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EmailVerification from "./EmailVerification";
import PurposeSelection from "./PurposeSelection";
import SignUpForm from "./Signup";
import WelcomeScreen from "./WelcomeScreen";
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",       
    terms: false,
    usernameExists: false,
    formErrors: {},
    photo: "",
    location: "",
    purpose: "",
  });
  
  return (
    <div className="min-h-screen w-screen">
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <SignUpForm formData={formData} setFormData={setFormData} />
            }
          />
          <Route
            path="/purposeselection"
            element={
              <PurposeSelection formData={formData} setFormData={setFormData} />
            }
          />
          <Route
            path="/welcomescreen"
            element={
              <WelcomeScreen formData={formData} setFormData={setFormData} />
            }
          />
          <Route path="/emailverification" element={<EmailVerification formData={formData} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
