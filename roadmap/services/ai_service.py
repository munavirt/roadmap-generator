from google import genai

import os

from dotenv import load_dotenv


load_dotenv()


client = genai.Client(

    api_key=os.getenv(
        "GEMINI_API_KEY"
    )
)


import time

def generate_ai_roadmap(prompt, max_retries=2):

    for attempt in range(max_retries):

        try:

            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt
            )

            return response.text

        except Exception as error:
            
            error_str = str(error)

            # If it's a rate limit error and we have retries left
            if "429" in error_str and attempt < max_retries - 1:
                print(f"API Rate limit hit (429). Waiting 12 seconds before retry {attempt + 1}/{max_retries}...")
                time.sleep(12)
            else:
                # Throw error if we're out of retries or it's a different error
                raise error