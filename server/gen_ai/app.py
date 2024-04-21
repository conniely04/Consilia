from flask import Flask, request, jsonify
app = Flask(__name__)
import json
from flask_cors import CORS
CORS(app)
import google.generativeai as genai
from dotenv import load_dotenv
import sys
import os
load_dotenv()
API_KEY = os.getenv("API_KEY")

genai.configure(api_key=API_KEY)

def generate_options(location, activities, preferences):
    # Set up the model
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 0,
        "max_output_tokens": 7000,
        "response_mime_type": "application/json",

    }

    safety_settings = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE"
        },
    ]

    model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest",
                                  generation_config=generation_config,
                                  safety_settings=safety_settings)

    prompt_parts = [f"Current users are at: {location}"]
    
    for activity, preference in activities.items():
        prompt_parts.append(f"Activity is: {activity}")
        prompt_parts.append(f"The preferences for this activity are: {preference}")
        prompt_parts.append("The date and time Today is")
        
    prompt_parts += [
        f"Write the format like so:\n\n\nLocation: {location}\nActivity: {activity}\nday and time: today's date and time\n\n\nOption 1 + address + distance from user location: description\n\nOption 2+ address + distance from user location: description\n\n...",
        "Current user is at: The user's input",
        "Activity is: user's input",
        "The preferences everyone chose: user's input",
        "Hangout options that mesh together all the parameters.  provide a comprehensive list of the options that are close to the location are closely related to the activity and accounts for the user preferences",
    ]


    response = model.generate_content(prompt_parts)
    return (response.text)
from flask import Flask, request, jsonify, Response

@app.route('/generate-options', methods=['POST'])
def receive_activity_and_generate_options():
    # Force JSON parsing even if the Content-Type header is not set to application/json
    data = request.get_json(force=True)
    activity_name = data.get('activityName')
    preference = data.get('preference')
    location = data.get('location')

    options_text = generate_options(location, {activity_name: preference}, preference)

    return Response(options_text, mimetype='application/json')




@app.route('/')
def index():
    return jsonify({'message': 'Hello, World!'})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)