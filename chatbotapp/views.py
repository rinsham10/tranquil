import openai
from django.conf import settings
from django.http import JsonResponse
import json

def ask(request):
    if request.method == 'POST':
        # Set OpenAI API key from Django settings
        openai.api_key = settings.OPENAI_API_KEY
        
        # Get the message from the request body
        data = json.loads(request.body)
        message = data.get('message')

        try:
            # Request a response from the OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",  # You can change to your preferred model
                messages=[{"role": "user", "content": message}]
            )

            # Extract the response from OpenAI
            bot_response = response['choices'][0]['message']['content'].strip()

            # Return the response as a JSON
            return JsonResponse({'response': bot_response})

        except openai.error.OpenAIError as e:
            print("OpenAI API Error:", e)
            return JsonResponse({'response': 'Sorry, there was an error with the OpenAI API.'})
        
        except json.JSONDecodeError as e:
            print("JSON Decode Error:", e)
            return JsonResponse({'response': 'Sorry, there was an error with the request data.'})
        
        except Exception as e:
            print("Unexpected Error:", e)
            return JsonResponse({'response': 'Sorry, something went wrong.'})
