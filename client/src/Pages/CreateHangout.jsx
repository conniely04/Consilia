import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CreateHangout.css";

export default function CreateHangout() {
    const [hangoutName, setHangoutName] = useState("");

    const handleSubmit = () => {
        // Handle the submission, for example, send the hangoutName to your backend
        console.log("Hangout name submitted:", hangoutName);
    };

    const handleBack = () => {
        // Handle the submission, for example, send the hangoutName to your backend
        console.log("Hangout name submitted:", hangoutName);
    };

    return (
        <>
            <div className="title-name">
                <h1>🍃Create Hangout🍃</h1>
            </div>
            <div className="hangout-description-card">
            <h3>What do you want to do?</h3>
            </div>
                <div className="input-bar">
                    <input
                        type="text"
                        value={hangoutName}
                        onChange={(e) => setHangoutName(e.target.value)}
                        placeholder="Enter acitvity name here..."
                    />
                </div>

            <div className="buttons">

                <div className="start-button">
                    <button onClick={handleBack}>RETURN</button>
                </div>
                <div className="start-button">
                    <button onClick={handleSubmit}>SUBMIT</button>
                </div>
            </div>

        </>
    );
}
