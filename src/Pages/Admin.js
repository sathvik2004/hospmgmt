import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const defaultDoctors = [
  { id: 1, name: "Dr. John Doe", specialization: "Cardiologist" },
  { id: 2, name: "Dr. Jane Smith", specialization: "Dermatologist" },
  { id: 3, name: "Dr. Emily White", specialization: "Neurologist" },
];

const defaultPatients = [
  { id: 1, name: "Alice Johnson", priority: "Emergency" },
  { id: 2, name: "Bob Williams", priority: "High" },
  { id: 3, name: "Charlie Brown", priority: "Medium" },
];

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Alice Johnson",
      doctorName: "Dr. John Doe",
      problem: "Heart Disease",
      priority: "Emergency",
      dateTime: "2025-03-24T10:00:00",
    },
    {
      id: 2,
      patientName: "Bob Williams",
      doctorName: "Dr. Jane Smith",
      problem: "Skin Allergy",
      priority: "High",
      dateTime: "2025-03-24T14:30:00",
    },
    {
      id: 3,
      patientName: "Charlie Brown",
      doctorName: "Dr. Emily White",
      problem: "Migraine",
      priority: "Medium",
      dateTime: "2025-03-25T09:15:00",
    },
  ]);

  const calculateTimeRemaining = (appointmentTime) => {
    const now = new Date();
    const appointmentDateTime = new Date(appointmentTime);
    const difference = appointmentDateTime - now;
    if (difference <= 0) return "Appointment Passed";

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem("registeredDoctors")) || [];
    const storedPatients = JSON.parse(localStorage.getItem("registeredPatients")) || [];

    const existingDoctorNames = new Set(defaultDoctors.map((doc) => doc.name));
    const uniqueStoredDoctors = storedDoctors
      .filter((doc) => !existingDoctorNames.has(doc.name))
      .map((doc, index) => ({
        id: defaultDoctors.length + index + 1,
        name: doc.name,
        specialization: doc.specialization || "General",
      }));
    setDoctors([...defaultDoctors, ...uniqueStoredDoctors]);

    const existingPatientNames = new Set(defaultPatients.map((pat) => pat.name));
    const uniqueStoredPatients = storedPatients
      .filter((pat) => !existingPatientNames.has(pat.name))
      .map((pat, index) => ({
        id: defaultPatients.length + index + 1,
        name: pat.name,
        priority: pat.priority || "Low",
      }));
    setPatients([...defaultPatients, ...uniqueStoredPatients]);

    const interval = setInterval(() => {
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) => ({
          ...appointment,
          timeRemaining: calculateTimeRemaining(appointment.dateTime),
        }))
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="admin-container">
      <nav className="navbar">
        <h2 className="logo">Admin Panel</h2>
        <ul className="nav-links">
          <li><button onClick={() => setActiveTab("dashboard")}>Dashboard</button></li>
          <li><button onClick={() => setActiveTab("doctors")}>Manage Doctors</button></li>
          <li><button onClick={() => setActiveTab("patients")}>Manage Patients</button></li>
          <li><button onClick={() => setActiveTab("appointments")}>Appointments</button></li>
          <li><button onClick={() => setActiveTab("settings")}>Settings</button></li>
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <div className="admin-content">
        {activeTab === "dashboard" && (
          <div>
            <h1>Welcome, Admin</h1>
            <p>Manage doctors, patients, and hospital settings efficiently.</p>
            <div className="stats-container">
              <div className="stat-card">
                <h3>Doctors</h3>
                <p>{doctors.length} Registered</p>
              </div>
              <div className="stat-card">
                <h3>Patients</h3>
                <p>{patients.length} Registered</p>
              </div>
              <div className="stat-card">
                <h3>Appointments</h3>
                <p>{appointments.length} Scheduled</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "doctors" && (
          <div>
            <h2>Manage Doctors</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Specialization</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "patients" && (
          <div>
            <h2>Manage Patients</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "appointments" && (
          <div>
            <h2>Appointments</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Problem</th>
                  <th>Priority</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Time Remaining</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => {
                  const appointmentDate = new Date(appointment.dateTime);
                  const formattedDate = appointmentDate.toLocaleDateString();
                  const formattedTime = appointmentDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr key={appointment.id}>
                      <td>{appointment.id}</td>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.doctorName}</td>
                      <td>{appointment.problem}</td>
                      <td>{appointment.priority}</td>
                      <td>{formattedDate}</td>
                      <td>{formattedTime}</td>
                      <td>{calculateTimeRemaining(appointment.dateTime)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2>System Settings</h2>
            <p>Additional settings and configurations can go here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
