from pydantic import BaseModel
from typing import List
from dtos.named_object import NameObject


class SetupInput(BaseModel):
    Host: str
    Database: str
    User: str
    Password: str
    Port: int
    DDL: List[str]
    Documentation: str
    SQLQueries: str

class SetupInputSimple(BaseModel):
    ConnectionString: str
    DDL: List[str]
    Documentation: str
    SQLQueries: str