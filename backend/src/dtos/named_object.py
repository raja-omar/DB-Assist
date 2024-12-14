from pydantic import BaseModel

class NameObject(BaseModel):
    Name: str
    Id: int