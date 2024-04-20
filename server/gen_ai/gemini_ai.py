import google.generativeai as genai

genai.configure(api_key="YOUR_API_KEY")

def generate_options(hangout):
    # Set up the model
    #hangout --> particpants -->

    #activities, preferences
    
    generation_config = {
      "temperature": 1,
      "top_p": 0.95,
      "top_k": 0,
      "max_output_tokens": 7000,
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
    
    for activity in hangout.activities.items():
        prompt_parts.append(f"Activity is: {activity}")
        prompt_parts.append(f"The preferences for this activity are: {hangout.activity.preferences}")
        
    prompt_parts.append("Hangout options that mesh together all the parameters.")

    response = model.generate_content(prompt_parts)
    return response.text

# Example usage with hangout data
hangout_data = {
    "food": "asian, american brunch, cheap",
    "sports": "outdoor, soccer, nearby",
    "movies": "recent releases, comedy, theater"
}

location = "UCLA Pauley"

# Generate options based on hangout data
options = generate_options(location, hangout_data)

print(options)
