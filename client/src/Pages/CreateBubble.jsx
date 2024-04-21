import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function CreateBubble() {
    const [bubbleName, setBubbleName] = useState(""); 
    const [isCodeGenerated, setIsCodeGenerated] = useState(false); 
    const nav=useNavigate();
    let groupId = '';
    const userId = localStorage.getItem('userId');
    let bubbleCode = Math.floor(100000 + Math.random() * 900000); //random generated 6 digit code

    const handleChange = (event) => {
        setBubbleName(event.target.value);
    };

    const generateCode = async (event) => {
        event.preventDefault();
        
        //create a friend group
        const url = "http://localhost:5002/api/friend-groups/create";
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name:bubbleName,
                userId:userId,
                bubbleCode: bubbleCode
            }),
          });
    
          if (response.ok) {
            const result = await response.json();
            groupId = result._id;
            console.log("Bubble created successfully:", result);
          } else {
            throw new
             Error("Failed to create account");
          }
        } catch (error) {
          console.error("Error creating account:", error);
          alert(`Error: ${error.message}`);
        }    
        console.log(groupId)

        //update bubble code
        const url2 = `http://localhost:5002/api/friend-groups/${groupId}/bubble-code`;
            try {
                const response = await fetch(url2, {
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
            setIsCodeGenerated(true);
    };

    const handleReturn = async (event) => {
        // Handle returning to user home
        console.log("Returning to user home");

        //Reset isCodeGenerated state
        setIsCodeGenerated(false);
        nav('/user-home');

        //Clear bubblecode (doesn't work rn)

        /*
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
                    console.log("Bubble code deleted successfully");
                } else {
                    throw new Error("Failed to update bubble code");
                }
            } catch (error) {
                console.error("Error:", error);
            }
            setIsCodeGenerated(true);*/
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
