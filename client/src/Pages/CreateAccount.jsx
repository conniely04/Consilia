import React, { useState } from 'react';
// import './CreateAccount.css';  // Assume you have styles defined in CreateAccount.css

function CreateAccount() {
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        password: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle account creation logic here
        console.log("Create account with", formData);
    };

    return (
        <div className="create-account-container">
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input name="username" type="text" value={formData.username} onChange={handleChange} />
                </label>
                <label>
                    fullName:
                    <input name="fullName" type="fullName" value={formData.fullName} onChange={handleChange} />
                </label>
                <label>
                    Password:
                    <input name="password" type="password" value={formData.password} onChange={handleChange} />
                </label>
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}

export default CreateAccount;
