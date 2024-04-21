import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CreateHangout.css";

export default function CreateHangout(setOptions) {
  const [hangoutName, setHangoutName] = useState("");
  //get from data
  const [createdActivity, setCreatedActivity] = useState(false);
  const [preferences, setPreferences] = useState(["", "", ""]);
  const [activityName, setActivityName] = useState("");
  const [activityText, setActivityText] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = () => {
    console.log("Submitting preferences:", preferences);
    fetch("http://127.0.0.1:5003/receive-activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activityName: hangoutName,
        preferences: preferences
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Preferences submitted:", data.options);
        setOptions(data.options); // Set options in the parent state
      })
      .catch((error) => console.error("Error submitting preferences:", error));

    // Handle the submission, for example, send the hangoutName to your backend
    setCreatedActivity(true);
    setActivityName(hangoutName);
    console.log("RESULTS SENT TO GEMMY: ", hangoutName);
    console.log("RESULTS SENT TO GEMMY: ", preferences);

    console.log("Hangout name submitted:", hangoutName);
    setActivityText("Add Another Activity?");
    console.log("Hangout name submitted:", hangoutName);
    navigate("/results");
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
          value={preferences[0]}
          onChange={(e) => {
            const newPreferences = [...preferences];
            newPreferences[0] = e.target.value;
            setPreferences(newPreferences);
          }}
          placeholder="Enter your preferences here..."
        />
      </div>
      <br />
      <div className="input-bar">
        <input
          type="text"
          value={preferences[1]}
          onChange={(e) => {
            const newPreferences = [...preferences];
            newPreferences[1] = e.target.value;
            setPreferences(newPreferences);
          }}
          placeholder="Enter your preferences here..."
        />
      </div>
      <br />
      <div className="input-bar">
        <input
          type="text"
          value={preferences[2]}
          onChange={(e) => {
            const newPreferences = [...preferences];
            newPreferences[2] = e.target.value;
            setPreferences(newPreferences);
          }}
          placeholder="Enter your preferences here..."
        />
      </div>
      <div className="buttons">
        <div className="start-button">
          <button onClick={handleBack}>Return Home</button>
        </div>
        <div className="start-button">
          <button onClick={handleSubmit}>&nbsp;&nbsp;&nbsp;&nbsp;Submit&nbsp;&nbsp;&nbsp;&nbsp; </button>
        </div>
      </div>
    </>
  );
}
