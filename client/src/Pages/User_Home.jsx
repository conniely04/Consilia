
import { useState } from "react";
import { Link } from "react-router-dom";
import "./User_Home.css";

export default function User_Home() {
    const [nameBubbles, setNameBubbles] = useState([]);

    // bubble data format: bubble name: participants (names)

    useEffect(() => {
        // Fetch user's data from the backend
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5002/api/user", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${userToken}` // Assuming userToken is available after login
                    },
                });
                if (response.ok) {
                    const userData = await response.json();
                    const friendGroups = userData.friendGroups.map(group => group.name);
                    setNameBubbles(friendGroups);
                } else {
                    throw new Error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                // Handle error
            }
        };

        fetchUserData();
    }, []);
    const propogateBubbles = nameBubbles.map((bubbleName, index) => (
        <div key={index}>
            <Link to={`/bubbles/${bubbleName}`} className="bubble-link">
                <button className="bubble-button"  >
                    {bubbleName}
                    <span className="bubble-name" >#ppl</span>
                    <hr />
                </button>
            </Link>
        </div>

    ));



    return (

        <>
            <div className="user_home_title">
                <h1>Friend Bubbles</h1>
            </div>
            <div className="buttons">
                <button className="join_button" style={{ marginRight: '30px' }}>Join Bubble</button >
                <button className="create_button">Create Bubble</button>
            </div>
            <br />
            <div className="bubbles">
                {propogateBubbles}
            </div>
        </>


    )
}
