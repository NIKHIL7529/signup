import React, { useState } from "react";
import p1 from "./media/p1.png";
import p2 from "./media/p2.png";
import p3 from "./media/p3.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function PurposeSelection({ formData, setFormData }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePurposeChange = (event) => {
    setFormData((prevData) => ({ ...prevData, purpose: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.purpose) {
      setErrorMessage("Please select a purpose to continue.");
      return;
    } else {
      setErrorMessage(null);
    }

    Swal.fire({
      width: "100",
      didOpen: () => Swal.showLoading(),
    });

    try {
      const response = await axios.post("https://signup-48r6.onrender.com/signup", {
        userData: formData,
      });
      Swal.close();

      if (response.data.success) {
        navigate("/emailverification");
      } else {
        setErrorMessage(
          response.data.error || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      Swal.close();
      console.error("Error updating user data:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen md:p-0 pt-20 pb-4 w-screen flex flex-col items-center justify-center">
      <div
        className="absolute top-5 left-5 w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/welcomescreen")}
      >
        <i class="fa-solid fa-chevron-left text-gray-500"></i>
      </div>
      <div className="min-h-screen flex flex-col justify-evenly m-auto text-center">
        <div className="mb-4">
          <div className="text-3xl font-bold mb-6">
            What brings you to Dribbble?
          </div>
          <p className="text-gray-400 md:p-0 px-2">
            Select the options that best describe you. Don't worry, you can
            explore other options later.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 xl:p-0 px-4 mb-4">
          <div className="border-2 border-gray-300 rounded-3xl">
            <label className="flex flex-col items-center gap-4 py-4 box-border cursor-pointer">
              <img src={p1} alt="p1" className="w-52 h-32" />
              <p className="text-xl font-bold w-2/3 text-center text-wrap">
                I'm a designer looking to share my work
              </p>
              <input
                type="radio"
                id="p1"
                name="purpose"
                value="designer"
                checked={formData.purpose === "designer"}
                onChange={handlePurposeChange}
                hidden
              />
              {formData.purpose === "designer" ? (
                <i class="fa-solid fa-circle-check text-pink-500"></i>
              ) : (
                <i class="fa-regular fa-circle text-gray-400"></i>
              )}
            </label>
          </div>
          <div className="border-2 border-gray-300 rounded-3xl">
            <label className="flex flex-col items-center gap-4 py-4 box-border cursor-pointer">
              <img src={p2} alt="p2" className="w-52 h-32" />
              <p className="text-xl font-bold w-2/3 text-center text-wrap">
                I'm looking to hire a designer
              </p>
              <input
                type="radio"
                id="p2"
                name="purpose"
                value="costumer"
                checked={formData.purpose === "costumer"}
                onChange={handlePurposeChange}
                hidden
              />
              {formData.purpose === "costumer" ? (
                <i class="fa-solid fa-circle-check text-pink-500"></i>
              ) : (
                <i class="fa-regular fa-circle text-gray-400"></i>
              )}
            </label>
          </div>
          <div className="border-2 border-gray-300 rounded-3xl">
            <label className="flex flex-col items-center gap-4 py-4 box-border cursor-pointer">
              <img src={p3} alt="p3" className="w-52 h-32" />
              <p className="text-xl font-bold w-2/3 text-center text-wrap">
                I'm looking for design inspiration
              </p>
              <input
                type="radio"
                id="p3"
                name="purpose"
                value="watcher"
                checked={formData.purpose === "watcher"}
                onChange={handlePurposeChange}
                hidden
              />
              {formData.purpose === "watcher" ? (
                <i class="fa-solid fa-circle-check text-pink-500"></i>
              ) : (
                <i class="fa-regular fa-circle text-gray-400"></i>
              )}
            </label>
          </div>
        </div>
        <div>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <button
            className="bg-pink-500 text-white w-1/4 py-2 rounded-md hover:bg-pink-600"
            onClick={handleSubmit}
          >
            Finish
          </button>
          {formData.purpose && (
            <div className="text-gray-400 mt-2">
              or Press{" "}
              <span
                className="cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                RETURN
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
