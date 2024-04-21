import { useState, useEffect } from "react";
import "./Preference.css";
import { useLocation } from "react-router-dom";

export default function Results(options) {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

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
        setOptions(data.options); // Make sure to match the response structure from your backend
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
      setIsLoading(false);
    };

    // Call the function
    console.log("WHAT:", getOptions());
    if (location.state && location.state.options) {
      setOptions(location.state.options);
    }
  }, [location]);
  console.log("OPTIONS:", options);
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Generated Options</h2>
          <p>{JSON.stringify(options, null, 2)}</p>
        </div>
      )}
    </div>
  );
}
