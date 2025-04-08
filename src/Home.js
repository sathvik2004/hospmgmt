import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Hospital Management System</h1>
        <p>Efficiently manage hospital operations with our platform.</p>
      </div>

      <div className="login-card-container">
        <div className="login-card" onClick={() => navigate("/admin")}>
          <img src="/images/admin-icon.png" alt="Admin" />
          <h3>Admin Login</h3>
          <p>Manage doctors, patients, and appointments.</p>
        </div>

        <div className="login-card" onClick={() => navigate("/doctor-login")}>
          <img src="/images/doctor-icon.png" alt="Doctor" />
          <h3>Doctor Login</h3>
          <p>View appointments, patient history, and schedules.</p>
        </div>

        <div className="login-card" onClick={() => navigate("/patient-login")}>
          <img src="/images/patient-icon.png" alt="Patient" />
          <h3>Patient Login</h3>
          <p>Book appointments and check medical records.</p>
        </div>

        <div className="login-card" onClick={() => navigate("/register")}>
          <img src="/images/register-icon.png" alt="Register" />
          <h3>Register</h3>
          <p>Create a new account as a patient or doctor.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
