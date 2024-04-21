import { Link, useParams } from "react-router-dom";
import "./HangoutSpace.css";
import React, { useState, useEffect } from "react";

export default function HangoutSpace() {
  const { userId } = useParams();
  const [friendGroups, setFriendGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
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
  }, [userId]);

  const propogateHangouts = friendGroups.map((group, index) => (
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
        {group.name} <span className="username"></span>
      </h1>
      <hr />
      <div className="hangouts">{propogateHangouts}</div>
    </div>
  );
}
