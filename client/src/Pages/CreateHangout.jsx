import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";


import "./CreateHangout.css";

export default function CreateHangout() {
    
    const [hangoutName, setHangoutName] = useState("");
    //get from data
    const [createdActivity, setCreatedActivity] = useState(false);
    const [activityText, setActivityText] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = () => {
        // Handle the submission, for example, send the hangoutName to your backend
        setCreatedActivity(true);
        setActivityText('Add Another Activity?')
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
