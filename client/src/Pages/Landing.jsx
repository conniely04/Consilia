import { useState } from "react";
import { Link } from "react-router-dom";

import "./Landing.css";

export default function Landing() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="title-name">
        <h1>🍃Consilia🍃</h1>
      </div>
      <div className="description-card">
        {/* <div> */}
        <h3>
        Unsure about the event's vibe? <u>Ignite the fun and make it jive!</u>
        </h3>
        {/* </div> */}
        <p>
        Connect with friends and dive into lively gatherings. Exchange event concepts and stay in tune with members' interests. With Gemini Pro's insightful analysis of everyone's preferences, planning your next event is a breeze.



        </p>
      </div>
      {/* <h2 className="ready-to-start">
        ready to start?
      </h2> */}
      <div className="buttons">
        <div className="start-button">
          <Link to="/create-account"><button><b>CREATE ACCOUNT</b></button></Link>

        </div>
        <div className="start-button">
          <Link to="/login"><button><b>LOGIN</b></button></Link>

        </div>
      </div>
    </>
  );
}
