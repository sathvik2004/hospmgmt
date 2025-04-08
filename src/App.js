import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Admin from "./Pages/Admin";
import Doctor from "./Pages/Doctor";
import Patient from "./Pages/Patient";
import Home from "./Home";
import Register from "./Register";
import DoctorLogin from "./Pages/DoctorLogin";
import PatientLogin from "./Pages/PatientLogin";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
  );
};

export default App;
