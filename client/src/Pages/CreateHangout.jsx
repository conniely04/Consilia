import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CreateHangout.css";

export default function CreateHangout() {
  const [hangoutName, setHangoutName] = useState("");
  const [preferences, setPreferences] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmission = () => {
    // Save hangoutName and preferences
    localStorage.setItem("hangoutName", hangoutName);
    localStorage.setItem("preferences", preferences);

    // Navigate to recommendations page
    navigate("/recommendations");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="title-name">
        <h1>🍃Create Hangout🍃</h1>
      </div>
      <div className="hangout-description-card">
        <h3>What do you want to do?</h3>
        <h5>Ex: play sports, eat food, go shopping...</h5>
      </div>
      <br />
      <div className="input-bar">
        <input
          type="text"
          value={hangoutName}
          onChange={(e) => setHangoutName(e.target.value)}
          placeholder="Enter activity name here..."
        />
      </div>
      <br />

      <div className="hangout-description-card">
        <h3>What do you prefer?</h3>
        <h5>Ex: food allergies, cravings, low cost, nearby...</h5>
      </div>
      <br />
      <div className="input-bar">
        <input
          type="text"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="Enter your preferences here..."
        />
      </div>
      <br />
      <div className="buttons">
        <div className="start-button">
          <button onClick={handleBack}>Return Home</button>
        </div>
        <div className="start-button" >
          <button onClick={handleSubmission}>Submit</button>
        </div>
      </div>
    </>
  );
}
