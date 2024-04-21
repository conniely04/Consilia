import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

export default function RecommendationForm() {
    const [activityName, setActivityName] = useState('');
    const [preference, setPreference] = useState('');
    const [options, setOptions] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make POST request to backend
            const response = await axios.post('http://localhost:5003/generate-options', {
                activityName,
                preference
            });

            // Update state with options
            setOptions(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Generate Options</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Activity Name:
                    <input type="text" value={activityName} onChange={(e) => setActivityName(e.target.value)} />
                </label>
                <br />
                <label>
                    Preference:
                    <input type="text" value={preference} onChange={(e) => setPreference(e.target.value)} />
                </label>
                <br />
                <button type="submit">Generate Options</button>
            </form>
            {options && (
                <div>
                    <h3>Generated Options</h3>
                    <ul>
                        {options.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
