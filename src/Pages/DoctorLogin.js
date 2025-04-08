// src/Pages/DoctorLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Doctor.css";

const DoctorLogin = () => {
  const [doctorId, setDoctorId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login validation
    if (doctorId === "doctor123" && password === "password") {
      localStorage.setItem("role", "doctor");
      navigate("/doctor");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="doctor-container dark-theme flex justify-center items-center min-h-screen">
      <div className="bg-white text-black rounded-lg p-6 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Doctor Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Doctor ID"
            className="p-3 rounded border"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
