import { Link, useParams } from "react-router-dom";
import "./HangoutSpace.css";
import React, { useState, useEffect } from "react";

export default function HangoutSpace() {
  const { userId } = useParams();
  const [hangoutGroups, setHangoutGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bubbleId } = useParams();
  
  /*
  useEffect(() => {
    // Fetch the friend groups when the component mounts
    const fetchFriendGroups = async () => {
      try {
        const response = await fetch(`/api/user/${userId}/friend-groups`);
        if (!response.ok) {
          throw new Error("Failed to fetch friend groups");
        }
        const data = await response.json();
        setFriendGroups(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendGroups();
  }, [userId]);*/

  useEffect(() => {
    const fetchHangoutSpace = async () => {
      const url = `http://localhost:5002/api/friend-groups/${bubbleId}/hangouts`;
      console.log(bubbleId)

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setHangoutGroups(result);
          console.log("Successfully got hangout space", result);
        } else {
          throw new Error("Failed to get hangout space");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchHangoutSpace();
  }, []);

  const propogateHangouts = hangoutGroups.map((group, index) => (
    <div key={index}>
      <button className="hangout-name">
        {group.name}
        <Link to={`/hangouts/${group._id}`} className="hangout-link">
          <button className="join-button">Join</button>
        </Link>
      </button>
      <hr />
    </div>
  ));

  return (
    <div>
      <h1 className="hangout_space_title">
        
      </h1>
      <hr />

      <div className="hangouts">{propogateHangouts}</div>
    </div>
  );
}

//{group.name} <span className="username"></span>
