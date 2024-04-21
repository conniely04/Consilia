import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Results(options) {
  const [results, setResults] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedOptions = localStorage.getItem("optionsData");

    // Define the function inside the effect
    if (storedOptions) {
      const descriptionRegex =
        /"[^"]*description"\s*:\s*"[^"]*"(,)?|"[^"]*"\s*:\s*"user's input"(,)?/g;

      let cleanedString = storedOptions.replace(descriptionRegex, "");

      const trailingCommaRegex = /,(\s*"?[^"]*"?\s*[:}])/g;
      cleanedString = cleanedString.replace(trailingCommaRegex, "$1");

      const leadingCommaRegex = /([{,]\s*),/g;
      cleanedString = cleanedString.replace(leadingCommaRegex, "$1");

      setResults(JSON.parse(cleanedString));
    }

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
        setResults(data.options); // Make sure to match the response structure from your backend
      } catch (error) {
        console.error("Failed to fetch options:", error);
      }
      setIsLoading(false);
    };

    // Call the function
    console.log("WHAT:", getOptions());
  }, []);
  console.log("OPTIONS:", options);
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Generated Options</h2>
          <p>{results}</p>
        </div>
      )}
    </div>
  );
}
