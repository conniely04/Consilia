import { useState } from "react";

import "./Landing.css";

export default function Landing() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="title-name">
        <h1>🍃Questify🍃</h1>
      </div>
      <div className="description-card">
        {/* <div> */}
          <h3>
            Looking to explore the outdoors? <u>Make it happen!</u>
          </h3>
        {/* </div> */}
        <p>
          Set your scene by choosing preferences, and snap your pre-trip selfie.
          Spotify and Gemini will work together to generate your playlist and
          walk quests. Then, finish by snapping a post-trip selfie, and get a
          summary of your adventure.
        </p>
      </div>
      {/* <h2 className="ready-to-start">
        ready to start?
      </h2> */}
      <div className="start-button">
        <button>
          <b>START</b>
        </button>
      </div>
    </>
  );
}
