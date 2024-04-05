import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function WelcomeScreen({ formData, setFormData }) {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState();

  useEffect(() => {
    if (formData.photo && formData.location) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, []);

  const handleImageInputChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      Swal.fire({
        width: "100",
        didOpen: () => Swal.showLoading(),
      });
      const reader = new FileReader();
      reader.onload = async () => {
        console.log(reader.result);
        const photo = reader.result;
        console.log(photo);
        try {
          const response = await axios.post("https://signup-48r6.onrender.com/photo", {
            photo: photo,
          });
          Swal.close();
          if (response.data) {
            console.log(response.data);
            setFormData({ ...formData, photo: response.data.image });
          } else {
            console.error("Error uploading image:", response.data.error);
          }
        } catch (error) {
          console.error("Error sending request:", error);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
    console.log(selectedFile);

    if (formData.location && selectedFile) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleLocationChange = (event) => {
    setFormData({ ...formData, location: event.target.value.trim() });
    if (formData.photo && event.target.value.trim()) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/purposeselection");
  };

  return (
    <div className="md:w-1/2 md:p-0 py-12 w-4/5 min-h-screen flex flex-col justify-center m-auto">
      <div className="text-3xl font-bold mb-4">
        Welcome! Let's create your profile
      </div>
      <div className="mb-10 text-gray-600">
        Let others get to know you better! You can do these later
      </div>
      <div className="font-bold text-xl">Add an avatar</div>
      <div className="my-10 sm:flex w-full gap-10">
        <div className="rounded-full border-2 border-dashed h-44 w-44 flex items-center justify-center">
          {formData.photo ? (
            <img
              src={formData.photo}
              alt="Selected avatar"
              className="rounded-full h-44 w-44 object-cover"
            />
          ) : (
            <i className="fa-solid fa-camera text-gray-300 text-3xl"></i>
          )}
        </div>
        <div className="py-10 px-4">
          <input
            type="file"
            accept="image/*"
            id="image"
            name="image"
            onChange={handleImageInputChange}
            required
            hidden
          />
          <label
            htmlFor="image"
            className="border-2 border-gray-300 rounded-md px-4 py-2 cursor-pointer"
          >
            Choose image
          </label>
          <div className="text-gray-500 mt-4">
            <i className="fa-solid fa-chevron-right cursor-pointer"></i> Or
            choose one of our defaults
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-xl font-bold mb-2">
          Add your location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          className="w-full border-b-2 border-gray-200 py-2 outline-none"
          placeholder="Enter a location"
          onChange={handleLocationChange}
          trim
          required
        />
      </div>
      <button
        className={`bg-pink-500 text-white w-1/3 py-2 rounded-md hover:bg-pink-600 ${
          isButtonDisabled
            ? "opacity-40 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:"
            : ""
        }`}
        onClick={handleSubmit}
      >
        Next
      </button>
      {!isButtonDisabled && (
        <div className="text-gray-400 mt-2 sm:w-1/3 w-1/2 sm:text-center">
          or Press{" "}
          <span className="cursor-pointer" onClick={() => navigate("/signup")}>
            RETURN
          </span>
        </div>
      )}
    </div>
  );
}
