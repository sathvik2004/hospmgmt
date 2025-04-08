import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import dataset from './dataset.json';
import "./pat.css";

const Patient = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [messages, setMessages] = useState([
    { text: "Hello Doctor!", type: "sent" },
    { text: "I have a fever since last night.", type: "sent" },
  ]);
  const [message, setMessage] = useState("");
  const [showSOS, setShowSOS] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([
    "Dr. Smith - General Checkup on April 10, 10:00 AM",
    "Dr. Johnson - Dermatology on April 12, 2:30 PM",
  ]);
  const [registeredDoctors, setRegisteredDoctors] = useState([]);
  const assignedDoctor = "Dr. Sarah Johnson";

  // Load registered doctors from localStorage (same as Admin.js)
  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem("registeredDoctors")) || [];
    setRegisteredDoctors(storedDoctors);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessages = [...messages, { text: message, type: "sent" }];
      setMessages(newMessages);
      setMessage("");

      setTimeout(() => {
        const input = message.toLowerCase();
        let reply = "I'm here to help. Could you please describe your symptoms in more detail?";

        const responseMap = {
          "fever": "How high is your temperature? Do you also feel chills or body aches?",
          "high fever": "Please take paracetamol and stay hydrated. Visit the nearest clinic if it persists.",
          "cough": "Do you have a dry or productive cough?",
          "sore throat": "Gargle with warm salt water and rest your voice.",
          "headache": "Try to rest in a dark, quiet room. Stay hydrated.",
          "cold": "Stay warm and drink plenty of fluids. Vitamin C can help.",
          "stomach ache": "Avoid solid food for a while and try to drink clear fluids.",
          "back pain": "Do some light stretching and apply a hot compress.",
          "rash": "Apply a soothing lotion. If it spreads, consult a dermatologist.",
          "vomiting": "Sip water frequently. Avoid solid food until it subsides.",
          "diarrhea": "Drink oral rehydration solutions to avoid dehydration.",
          "tired": "Make sure you're sleeping well and eating a balanced diet.",
          "anxiety": "Take deep breaths. Meditation and short walks can help.",
          "depression": "You're not alone. Talking to someone can make a difference.",
          "dizzy": "Lie down and close your eyes. Stay hydrated.",
          "pain": "Can you specify where you're feeling the pain?",
          "thanks": "Happy to help! Stay safe and healthy.",
          "hello": "Hi there! Tell me how you're feeling today."
        };

        for (const key in responseMap) {
          if (input.includes(key)) {
            reply = responseMap[key];
            break;
          }
        }

        setMessages((prevMessages) => [
          ...newMessages,
          { text: reply, type: "received" },
        ]);
      }, 1500);
    }
  };

  const predictDisease = () => {
    setLoading(true);
    setPredictionResult(null);

    setTimeout(() => {
      const inputSymptoms = symptoms
        .toLowerCase()
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      let maxMatches = 0;
      let matchedDisease = "Unknown";
      let matchedSymptoms = [];

      for (const row of dataset) {
        const rowSymptoms = [];

        for (let i = 1; i <= 17; i++) {
          const sym = row[`Symptom_${i}`];
          if (sym) rowSymptoms.push(sym.toLowerCase().trim());
        }

        const matches = rowSymptoms.filter((sym) =>
          inputSymptoms.includes(sym)
        );

        if (matches.length > maxMatches) {
          maxMatches = matches.length;
          matchedDisease = row["Disease"];
          matchedSymptoms = rowSymptoms;
        }
      }

      const confidence = maxMatches > 0
        ? Math.floor((maxMatches / matchedSymptoms.length) * 100)
        : 0;

      setPredictionResult({
        prediction: matchedDisease,
        percentage: confidence,
        medicine: "Consult a doctor for prescription"
      });

      setLoading(false);
    }, 2000);
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const doctor = e.target[1].value;
    const date = e.target[2].value;
    const time = e.target[3].value;
    const newAppointment = `${doctor} - ${name} on ${date}, ${time}`;
    setAppointments([...appointments, newAppointment]);
    e.target.reset();
    setActiveTab("dashboard");
  };

  return (
    <div className="patient-container">
      <nav className="navbar">
        <h2>Patient Panel</h2>
        <ul>
          <li><button onClick={() => setActiveTab("dashboard")}>Dashboard</button></li>
          <li><button onClick={() => setActiveTab("chat")}>Chat</button></li>
          <li><button onClick={() => setActiveTab("disease")}>Disease Prediction</button></li>
          <li><button onClick={() => setActiveTab("appointment")}>Book Appointment</button></li>
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <div className="patient-content">
        {activeTab === "dashboard" && (
          <div className="dashboard-container">
            <h1>Welcome, Patient</h1>
            <p>Manage your health and appointments.</p>
            <div className="dashboard-grid">
              <div className="dashboard-card">
                <h2>Upcoming Appointments</h2>
                <ul>
                  {appointments.map((appt, idx) => (
                    <li key={idx}>{appt}</li>
                  ))}
                </ul>
              </div>
              <div className="dashboard-card">
                <h2>Fees Paid</h2>
                <ul>
                  <li>Consultation Fee: $50 - Paid</li>
                  <li>Blood Test Fee: $30 - Paid</li>
                </ul>
              </div>
              <div className="dashboard-card">
                <h2>Health Tips</h2>
                <ul>
                  <li>Drink at least 8 glasses of water daily.</li>
                  <li>Eat a balanced diet with fruits and vegetables.</li>
                </ul>
              </div>
              <div className="dashboard-card">
                <h2>Prescriptions</h2>
                <ul>
                  <li>Paracetamol - 500mg (Twice a day)</li>
                  <li>Cetirizine - 10mg (Before sleep)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="chat-container">
            <h2>Chat with Your Assigned Doctor</h2>
            <p><strong>Assigned Doctor:</strong> {assignedDoctor}</p>
            <div className="chat-box">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.type}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}

        {activeTab === "disease" && (
          <div className="disease-container">
            <h2>Disease Prediction</h2>
            <textarea
              placeholder="Enter your symptoms here..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={4}
              className="symptoms-input"
            />
            <button className="predict-btn" onClick={predictDisease}>
              Predict
            </button>

            {loading && (
              <div className="loading">
                <div className="spinner"></div>
                <p>Analyzing your symptoms...</p>
              </div>
            )}

            {predictionResult && !loading && (
              <div className="prediction-result">
                <h3>Predicted Disease: {predictionResult.prediction}</h3>
                <p>Confidence: {predictionResult.percentage}%</p>
                <p>Recommended Medicine: {predictionResult.medicine}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "appointment" && (
          <div className="appointment-container">
            <h2>Book an Appointment</h2>
            <form className="appointment-form" onSubmit={handleAppointmentSubmit}>
              <input type="text" placeholder="Your Name" required />
              <select required>
                <option value="">Select Doctor</option>
                {registeredDoctors.map((doc, idx) => (
                  <option key={idx} value={doc.name}>{doc.name}</option>
                ))}
              </select>
              <input type="date" required />
              <input type="time" required />
              <button type="submit">Book</button>
            </form>
          </div>
        )}
      </div>

      <button className="sos-btn" onClick={() => setShowSOS(true)}>
        <AlertTriangle /> SOS
      </button>

      {showSOS && (
        <div className="sos-modal">
          <div className="sos-content">
            <h2>Emergency Alert</h2>
            <button onClick={() => alert("Emergency Contacted!")}>Yes, Call for Help</button>
            <button onClick={() => setShowSOS(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patient;
