"""
This module contains the Pydantic model for the documentation.

Column Restrictions with Annotated:

- You can enforce column restrictions on model fields using the `typing.Annotated` 
  type from Python's `typing` module and `StringConstraints` from Pydantic.
- For example, if a database column is a string with a maximum length of 50 characters, use:
        attribute = Annotated[str, StringConstraints(max_length=50)]

When creating Pydantic models for database classes in defined in backend/src/models.py 
set the id attribute to optional (int | None).
"""
from pydantic import BaseModel, ConfigDict, Field


class DocumentationResponse(BaseModel):
    """
    Represents documentation for a single table. 

    Args:
        id (int, optional): The unique identifier of the documentation.
        content (str): The documentation text.
    """
    model_config = ConfigDict(from_attributes=True)

    id: int | None = Field(default=None)
    content: str
