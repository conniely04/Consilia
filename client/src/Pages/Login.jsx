import React, { useState } from 'react';
// import './Login.css';  // Assume you have styles defined in Login.css

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Handle account login logic here
        const url = "http://localhost:5001/api/login";
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
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <div className="start-button">
                <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
