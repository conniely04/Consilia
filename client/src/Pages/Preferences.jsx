import { useState } from "react";
import "./Preference.css";

export default function Preferences() {
  const [preferences, setPreferences] = useState(Array(1).fill(""));

  const handleInputChange = (index, value) => {
    const newPreferences = [...preferences];
    newPreferences[index] = value;
    setPreferences(newPreferences);
  };

  const handleSubmit = async () => {
    console.log("Submitting preferences:", preferences);
    fetch("http://127.0.0.1:5003/receive-activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ preferences }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => console.log("Preferences submitted:", data))
      .catch((error) => console.error("Error submitting preferences:", error));
  };

  return (
    <div>
      <h1>Preferences</h1>
      {preferences.map((preference, index) => (
        <input
          key={index}
          className="input"
          type="text"
          value={preference}
          onChange={(e) => handleInputChange(index, e.target.value)}
          placeholder={`Activity ${index + 1} Preference`}
        />
      ))}
      <button className="button" onClick={handleSubmit}>
        SUBMIT
      </button>
    </div>
  );
}
