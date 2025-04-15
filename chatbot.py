import openai
import os

# Load the OpenAI key from environment
openai.api_key = os.environ.get("OPENAI_API_KEY")

def ask_chatbot(message, mood="neutral"):
    prompt = f"""
    You are a calm, supportive mental health assistant. The user is feeling {mood}.
    Respond empathetically and briefly to the following message:
    
    "{message}"
    """
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return "I'm sorry, I'm having trouble responding right now."
