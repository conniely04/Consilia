import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./CreateHangout.css";

export default function CreateHangout() {
  const [hangoutName, setHangoutName] = useState("");
  //get from data
  const [createdActivity, setCreatedActivity] = useState(false);
  const [preferences, setPreferences] = useState(Array(1).fill(""));
  const [activityName, setActivityName] = useState("");
  const [activityText, setActivityText] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const handleInputChange = (index, value) => {
    const newPreferences = [...preferences];
    newPreferences[index] = value;
    setPreferences(newPreferences);
  };

  const handleSubmit = () => {
    const userId = getUserIdFromLocalStorage();
    if (!userId) {
      console.error("No user ID found in local storage.");
      return;
    }
    console.log("Submitting preferences:", preferences);
    fetch("http://127.0.0.1:5003/receive-activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ preferences }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => console.log("Preferences submitted:", data))
      .catch((error) => console.error("Error submitting preferences:", error));

    // Handle the submission, for example, send the hangoutName to your backend
    setCreatedActivity(true);
    setActivityName(hangoutName);
    console.log("Hangout name submitted:", hangoutName);
    setActivityText("Add Another Activity?");
    console.log("Hangout name submitted:", hangoutName);
    fetch("http://localhost:5002/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: hangoutName,
        hangout: hangoutId, // Ensure you have the hangoutId
        created_by: userId, // Ensure you have the userId
        preferences: [], // Initially might be empty or preset
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => console.log("Activity created:", data))
      .catch((error) => console.error("Error creating activity:", error));
  };

  const handleBack = () => {
    navigate(-1);
  };

  const isAddActivity = () => {
    console.log(createdActivity);
    if (createdActivity) {
      return (
        <div className="start-button">
          <button onClick={handleFinish}>FINISH</button>
        </div>
      );
    } else {
      return (
        <div className="start-button">
          <button onClick={handleBack}>RETURN</button>
        </div>
      );
    }
  };

  return (
    <>
      <div className="title-name">
        <h1>🍃Create Hangout🍃</h1>
      </div>
      <div className="hangout-description-card">
        <h3>What do you want to do?</h3>
      </div>
      <div className="add-extra-activity">
        <h3>{activityText}</h3>
      </div>
      <div className="input-bar">
        <input
          type="text"
          value={hangoutName}
          onChange={(e) => setHangoutName(e.target.value)}
          placeholder="Enter activity name here..."
        />
      </div>

      <div className="buttons">
        {/* <div className="start-button">
                    <button onClick={handleBack}>RETURN</button>
                </div> */}
        <div>{isAddActivity()}</div>
        <div className="start-button">
          <h1>Preferences</h1>
          {preferences.map((preference, index) => (
            <input
              key={index}
              className="input"
              type="text"
              value={preference}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder={`Activity ${index + 1} Preference`}
            />
          ))}
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>
      </div>
    </>
  );
}
