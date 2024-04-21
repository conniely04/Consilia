import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./User_Home.css";

export default function User_Home() {
  const [nameBubbles, setNameBubbles] = useState([]);

  const propogateBubbles = nameBubbles.map((bubbleName, index) => (
    <div key={index}>
      <Link to={`/bubbles/${bubbleName}`} className="bubble-link">
        <button className="bubble-button">
          {bubbleName}
          <span className="bubble-name">#ppl</span>
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
        <button className="join_button" style={{ marginRight: "30px" }}>
          Join Bubble
        </button>
        <button className="create_button">Create Bubble</button>
      </div>
      <br />
      <div className="bubbles">{propogateBubbles}</div>
    </>
  );
}
