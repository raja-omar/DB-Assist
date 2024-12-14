from pydantic import BaseModel

class AskQuestionInput(BaseModel):
    Question: str

class AskQuestionResponse(BaseModel):
    Answer: str