import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateBubble.css";

export default function CreateBubble() {
  const [bubbleName, setBubbleName] = useState("");
  const [bubbleCode, setBubbleCode] = useState("");
  const [isCodeGenerated, setIsCodeGenerated] = useState(false);
  const nav = useNavigate();

  const handleChange = (event) => {
    setBubbleName(event.target.value);
  };

  const generateCode = async (event) => {
    event.preventDefault();
    // Generate 6-digit random code
    // const code = Math.floor(100000 + Math.random() * 900000);

    const url = "http://localhost:5002/api/friend-groups/create";
    const userId = localStorage.getItem("userId");
    let groupId = "";

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
    console.log(groupId);

    const code = 666666;
    setBubbleCode(code.toString()); // Update bubbleCode state with generated code
    setIsCodeGenerated(true); // Set isCodeGenerated to true

    const url2 = `http://localhost:5002/api/friend-groups/${groupId}/bubble-code`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupId: groupId,
          bubbleCode: bubbleCode,
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
  };

  const handleReturn = () => {
    // Handle returning to user home
    console.log("Returning to user home");

    // Clear bubbleCode and reset isCodeGenerated state
    setBubbleCode("");
    setIsCodeGenerated(false);
    nav("/user-home");
  };

  return (
    <div>
      <div>
        <h1>Create Bubble</h1>
      </div>
      {!isCodeGenerated ? (
        <div>
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
          <button className="joinbutton" onClick={generateCode}>
            Create
          </button>
        </div>
      ) : (
        <div>
          <h2>Bubble Code: {bubbleCode}</h2>
          <br />
          <button onClick={handleReturn}>Return to User Home</button>
          <p>Make sure all team members have joined the bubble.</p>
        </div>
      )}
    </div>
  );
}
