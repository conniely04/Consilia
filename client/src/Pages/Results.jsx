import { useState, useEffect } from "react";
import "./Preference.css";

export default function Results() {
  const [options, setOptions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    // Define the function inside the effect
    const getOptions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Send any required data with the request
          body: JSON.stringify({
            optionsText: options,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setOptions(data.optionsText); // Make sure to match the response structure from your backend
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
      setIsLoading(false);
    };

    // Call the function
    getOptions();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Generated Options</h2>
          <p className="options">{options}</p>
        </div>
      )}
    </div>
  );
}
