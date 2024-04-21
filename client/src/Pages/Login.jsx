import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// import './Login.css';  // Assume you have styles defined in Login.css

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Handle account login logic here
    const url = "http://localhost:5002/api/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Logged in successfully:", result);
        alert("Logged in successfully");

        // Redirect to user_home after successful login
        navigate("/user-home");

        localStorage.setItem('userId', result.userId);
        //const userId = localStorage.getItem('userId');

      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert(`Error: ${error.message}`);
    }

    console.log("Login with", username, password);
  };

  return (
    <div className="login-container">
      <div className="title-name">
        <h1>🍃Consilia🍃</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="description-card">

          <div className="extra-margin">
            <h3>Login to continue your journey with Consilia.</h3>
          </div>
          <div className="column">

            <label>
              Username:&nbsp;
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Password:&nbsp;&nbsp;
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="start-button">
          <button type="submit">LOGIN</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
