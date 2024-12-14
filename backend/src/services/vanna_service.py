import asyncio
from vanna.pgvector import PG_VectorStore
from vanna.google import GoogleGeminiChat
import os
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env


class MyVanna(PG_VectorStore, GoogleGeminiChat):
    def __init__(self, config=None):
        PG_VectorStore.__init__(
            self, config={'connection_string': os.getenv('POSTGRES_CONN_STRING')})
        GoogleGeminiChat.__init__(
            self, config={'api_key': os.getenv('GEMINI_API_KEY'), 'model': "gemini-1.5-flash"})

    async def submit_prompt_streamed(self, prompt, **kwargs):
        print("IS this running here")
        response = self.chat_model.generate_content(
            prompt,
            stream=True,
            generation_config={
                "temperature": self.temperature
            })
        for chunk in response:
            await asyncio.sleep(0)
            yield chunk.text


vn = MyVanna()
