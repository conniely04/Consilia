import React, { useState } from "react";
import "./JoinBubble.css";

export default function JoinBubble() {
  const [bubbleCode, setBubbleCode] = useState(""); // State to store the input value

  const handleChange = (event) => {
    setBubbleCode(event.target.value); // Update bubbleCode state with input value
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., send bubbleCode to backend
    console.log("Bubble code submitted:", bubbleCode);
    // Clear the input field after submission
    setBubbleCode("");
  };

  return (
    <div>
      <div>
        <h1>Join Bubble</h1>
      </div>
      <div>
        <h2>Enter Bubble Code</h2>
        <input
          className="bubble-code-input"
          type="text"
          value={bubbleCode}
          onChange={handleChange}
          placeholder="Enter bubble code"
        />
        <br></br>
        <br></br>
        <button className="joinbutton" onClick={handleSubmit}>
          Join
        </button>
      </div>
    </div>
  );
}
