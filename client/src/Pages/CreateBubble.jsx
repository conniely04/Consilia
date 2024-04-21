import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CreateBubble() {
    const [bubbleName, setBubbleName] = useState(""); 
    const [bubbleCode, setBubbleCode] = useState(""); 
    const [isCodeGenerated, setIsCodeGenerated] = useState(false); 
    const nav=useNavigate();

    const handleChange = (event) => {
        setBubbleName(event.target.value);
    };

    const generateCode = () => {
        // Generate 6-digit random code
        // const code = Math.floor(100000 + Math.random() * 900000);
        //save bubble name to database
        const code= 666666;
        setBubbleCode(code.toString()); // Update bubbleCode state with generated code
        setIsCodeGenerated(true); // Set isCodeGenerated to true
    };

    const handleReturn = () => {
        // Handle returning to user home
        console.log("Returning to user home");
        // Clear bubbleCode and reset isCodeGenerated state
        setBubbleCode("");
        setIsCodeGenerated(false);
        nav('/user-home');
        
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
                        type="text"
                        value={bubbleName}
                        onChange={handleChange}
                        placeholder="Enter bubble's name"
                    />
                    <br />
                    <br />
                    <button onClick={generateCode}>Generate</button>
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
