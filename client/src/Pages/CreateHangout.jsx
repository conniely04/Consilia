import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";


import "./CreateHangout.css";

export default function CreateHangout() {
    
    const [hangoutName, setHangoutName] = useState("");
    //get from data
    const [createdActivity, setCreatedActivity] = useState(false);
    const [activityText, setActivityText] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate
    const userId = localStorage.getItem('userId');

    const handleSubmit = async() => {
        const url = "http://localhost:5002/hangouts/create";
        try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Created successfully:", result);
 
            navigate("/");
        } else {
            throw new Error("Failed");
        }
        } catch (error) {
        console.error("Error", error);

        }
        
        console.log("Hangout name submitted:", hangoutName);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleFinish = () => {
        // route to another page asking for preference for n activities inserted
        // example activity 1= food, activity 2 = movies
        //route to food pref than movies pref
    }
    
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
                <h3>What do you have in mind?</h3>
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
                <div>
                    {isAddActivity()}
                </div >
                <div className="start-button">
                    <button onClick={handleSubmit}>SUBMIT</button>
                </div>
            </div>

        </>
    );
}
