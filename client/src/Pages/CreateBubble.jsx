import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBubble.css";

let groupId = "";

export default function CreateBubble() {
  const [bubbleName, setBubbleName] = useState("");
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);
  const nav = useNavigate();
  const[bubbleCode,setBubbleCode]= useState(null);

  const handleChange = (event) => {
    setBubbleName(event.target.value);
  };

  const generateCode = async (event) => {
    event.preventDefault();

    const randInt = Math.floor(100000 + Math.random() * 900000);
    setBubbleCode(randInt);

    const url = "http://localhost:5002/api/friend-groups/create";
    const userId = localStorage.getItem("userId");
    

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: bubbleName,
          userId: userId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        groupId = result._id;
        console.log("Bubble created successfully:", result);
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert(`Error: ${error.message}`);
    }

    const url2 = `http://localhost:5002/api/friend-groups/${groupId}/bubble-code`;
    try {
      const response = await fetch(url2, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: groupId,
          bubbleCode: randInt,
        }),
      });

      if (response.ok) {
        console.log("Bubble code updated successfully");
      } else {
        throw new Error("Failed to update bubble code");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsCodeGenerated(true); // Set isCodeGenerated to true
  };

  const handleReturn = async () => {
    // Handle returning to user home
    console.log("Returning to user home");

    //set bubble code back to null
    const url = `http://localhost:5002/api/friend-groups/${groupId}/bubble-code`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: groupId,
          bubbleCode: null,
        }),
      });

      if (response.ok) {
        console.log("Bubble code updated successfully");
      } else {
        throw new Error("Failed to update bubble code");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // reset isCodeGenerated state
    setIsCodeGenerated(false);
    nav("/user-home");
  };

  return (
    <div>
      <div>
        <h1>🫧Create Bubble🫧</h1>
      </div>
      {!isCodeGenerated ? (
        <div>
          <div className="enter-bubble-section">
          <h2>Enter bubble's name</h2>
          <input
            className="bubble-code-input"
            type="text"
            value={bubbleName}
            onChange={handleChange}
            placeholder="Enter bubble's name"
          />
          <br />
          <br />
          </div>
          <button className="joinbutton" onClick={generateCode}>
            Create
          </button>
        </div>
      ) : (
        <div>
          <h2>Bubble Code: {bubbleCode}</h2>
          <br />
          <button className="buttontext" onClick={handleReturn}>
            Return to User Home
          </button>
          <p>Add more friends to join your bubble.</p>
        </div>
      )}
    </div>
  );
}
