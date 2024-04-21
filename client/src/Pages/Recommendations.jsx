import React from "react";
import './Recommendations.css'
import { useNavigate } from "react-router-dom";

export default function Recommendations() {
    const nav = useNavigate();

    // Sample recommendations
    const recommendations = [
        "Try out the new Italian restaurant downtown.",
        "Check out the hiking trail in the nearby park.",
        "Watch the latest movie at the cinema.",
        "Visit the art exhibition at the museum."
    ];

    const gohome = () => {
        nav("/user-home");
    }

    return (
        <div className="recommendations-container">
            <h2 className="rec-title">Recommendations</h2>
            <div className="recommendations-list">
                {recommendations.map((recommendation, index) => (
                    <div key={index} className="recommendation-item">
                        {recommendation}
                    </div>
                ))}
            </div>
            <br />
            <button onClick={gohome}>Home</button> 
        </div>
    );
}
