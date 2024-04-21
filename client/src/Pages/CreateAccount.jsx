import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./CreateAccount.css"; // Assume you have styles defined in CreateAccount.css
import { toast } from "react-toastify"; // Import toast

function CreateAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle account creation logic here
    const url = "http://localhost:5002/api/register";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          fullName: formData.fullName,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Account created successfully:", result);
        toast.success("Account created successfully");
        navigate("/");
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Failed to create account");
    }

    console.log("Create account with", formData);
  };

  return (
    <div className="create-account-container">
      <div className="title-name">
        <h1>🍃Consilia🍃</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="description-card">
          <div className="extra-margin">
            <h3>Create an account to start your journey with Consilia.</h3>
          </div>
          <div className="column">
            <label>
              Full Name:&nbsp;
              <input
                name="fullName"
                type="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </label>
            <label>
              Username:&nbsp;
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
            <label>
              Password:&nbsp;&nbsp;
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
        <div className="buttons">
          <div className="start-button">
            <Link to="/">
              <button>
                <b>HOME</b>
              </button>
            </Link>
          </div>
          <div className="start-button">
            <button type="submit">CREATE ACCOUNT</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
