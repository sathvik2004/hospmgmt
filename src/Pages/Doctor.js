import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, AlertTriangle } from "lucide-react";
import "./Doctor.css";

const Doctor = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [messages, setMessages] = useState([
    { text: "Hello Doctor!", type: "received" },
    { text: "I have a fever since last night.", type: "received" }
  ]);
  const [message, setMessage] = useState("");
  const [showSOS, setShowSOS] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  const appointments = [
    { id: 1, patientName: "Alice Johnson", problem: "Heart Disease", priority: "Emergency", dateTime: "2025-03-24T10:00:00" },
    { id: 2, patientName: "Bob Williams", problem: "Skin Allergy", priority: "High", dateTime: "2025-03-24T14:30:00" },
  ];

  const patientHistory = [
    { id: 1, name: "Alice Johnson", condition: "Hypertension", lastVisit: "2025-02-10" },
    { id: 2, name: "Bob Williams", condition: "Eczema", lastVisit: "2025-01-20" },
  ];

  const prescriptions = [
    { id: 1, patient: "Alice Johnson", medicine: "Aspirin", dosage: "75mg daily", date: "2025-03-01" },
    { id: 2, patient: "Bob Williams", medicine: "Cetirizine", dosage: "10mg daily", date: "2025-03-05" },
  ];

  const sendMessage = () => {
    if (message.trim()) {
      const newMessages = [...messages, { text: message, type: "sent" }];
      setMessages(newMessages);
      setMessage("");

      setTimeout(() => {
        const replies = [
          "Okay, doctor!",
          "Can you suggest some medicine?",
          "Thank you!",
          "How long will it take to recover?"
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        setMessages([...newMessages, { text: randomReply, type: "received" }]);
      }, 1500);
    }
  };

  return (
    <div className="doctor-container bg-gray-100 min-h-screen p-5 relative">
      <nav className="navbar bg-blue-600 text-white p-4 flex justify-between items-center rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Doctor Panel</h2>
        <ul className="flex gap-4">
          <li><button className="btn-tab" onClick={() => setActiveTab("dashboard")}>Dashboard</button></li>
          <li><button className="btn-tab" onClick={() => setActiveTab("appointments")}>Appointments</button></li>
          <li><button className="btn-tab" onClick={() => setActiveTab("history")}>Patient History</button></li>
          <li><button className="btn-tab" onClick={() => setActiveTab("prescriptions")}>My Prescriptions</button></li>
          <li><button className="btn-tab" onClick={() => setActiveTab("chat")}>Chat</button></li>
          <li><button className="bg-red-500 px-4 py-2 rounded-lg text-white" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <div className="doctor-content bg-white p-6 mt-4 rounded-lg shadow-lg">
        {activeTab === "dashboard" && (
          <div className="text-center">
            <h1 className="text-3xl font-semibold">Welcome, Doctor</h1>
            <p className="text-gray-500 mt-2">Manage your appointments efficiently.</p>
          </div>
        )}

        {activeTab === "appointments" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient Name</th>
                  <th>Problem</th>
                  <th>Priority</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.problem}</td>
                    <td className={appointment.priority === "Emergency" ? "text-red-600 font-bold" : "text-yellow-500 font-bold"}>
                      {appointment.priority}
                    </td>
                    <td>{new Date(appointment.dateTime).toLocaleDateString()}</td>
                    <td>{new Date(appointment.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "history" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Patient History</h2>
            <ul className="list-disc ml-6">
              {patientHistory.map((record) => (
                <li key={record.id}>
                  {record.name} - {record.condition} (Last Visit: {record.lastVisit})
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "prescriptions" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">My Prescriptions</h2>
            <ul className="list-disc ml-6">
              {prescriptions.map((prescription) => (
                <li key={prescription.id}>
                  {prescription.patient}: {prescription.medicine} - {prescription.dosage} (Date: {prescription.date})
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="chat-container">
            <h2 className="text-2xl font-semibold mb-4">Chat with Patient</h2>
            <div className="chat-box p-4 bg-gray-200 h-80 overflow-y-auto rounded-lg shadow-md">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input flex mt-4">
              <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type a message..." 
                className="flex-1 p-2 border rounded-lg"
              />
              <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg">Send</button>
            </div>
          </div>
        )}
      </div>

      <button 
        className="fixed bottom-5 right-5 bg-red-500 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
        onClick={() => setShowSOS(true)}
      >
        <AlertTriangle className="w-6 h-6" /> SOS
      </button>

      {showSOS && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-red-600">Emergency Alert</h2>
            <button className="bg-red-500 px-4 py-2 rounded-lg text-white mt-4" onClick={() => alert("Emergency Contacted!")}>
              Yes, Call for Help
            </button>
            <button className="bg-gray-300 px-4 py-2 rounded-lg mt-4 ml-4" onClick={() => setShowSOS(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctor;
