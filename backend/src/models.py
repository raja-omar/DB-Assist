"""
This module holds classes that represent database tables in a SQLAlchemy ORM compatible format.

Note: These classes are not pydantic classes and cannot be used directly as the input or response 
for an endpoint. Create a pydantic model in backend>src>dtos, see dtos>documentation.py 
for an example.
"""
from typing import List
from sqlalchemy import Text, String, ForeignKey
from sqlalchemy.types import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship
from services.database_service import Base


class DbConnection(Base):
    """
    Represents a database connection stored in the database.

    Attributes:
        id (int): The primary key of the connection.
        host (str): The hostname or IP address of the database server.
        dbname (str): The name of the database to connect to.
        user (str): The username for the database connection.
        password (str): The password for the database connection (stored securely).
        port (str): The port number to connect to the database on.
    """

    __tablename__ = "db_connection"

    id: Mapped[int] = mapped_column(primary_key=True)
    host: Mapped[str] = mapped_column(String(50), nullable=False)
    dbname: Mapped[str] = mapped_column(String(50), nullable=False)
    user: Mapped[str] = mapped_column(String(50), nullable=False)
    password: Mapped[str] = mapped_column(String(50), nullable=False)
    port: Mapped[str] = mapped_column(String(50), nullable=False)

    def to_dict(self):
        """
        Converts the DbConnection object to a dictionary. Used to pass the connection details as a dictionary
        to vn.connect_to_postgres().
        Usage: `vn.connect_to_postgres(**(db_config.to_dict()))`
        """
        return {
            "host": self.host,
            "dbname": self.dbname,
            "user": self.user,
            "password": self.password,
            "port": self.port
        }


class DocumentChunk(Base):
    """
    Represents a chunk of content within a document.

    Attributes:
        id (int): The primary key of the document chunk.
        content (str): The text content of the chunk.
        document_id (int): Foreign key referencing a Document object.
        embedding_id (int): Foreign key referencing a embedding object.

    Relationships:
        document: One-to-Many relationship with Document (backref: chunks).
        embedding: One-to-Many relationship with embedding (backref: chunks).
    """

    __tablename__ = "document_chunk"

    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(Text)
    document_id: Mapped[int] = mapped_column(ForeignKey("document.id"))
    embedding_id: Mapped[int] = mapped_column(ForeignKey("embedding.id"))

    document: Mapped["Document"] = relationship(
        "Document", back_populates="chunks"
    )
    embedding: Mapped["Embedding"] = relationship(
        "Embedding", back_populates="chunks")


class DocumentFiletype(Base):
    """
    Represents a document file type (e.g., PDF, DOCX).

    Attributes:
        id (int): The primary key of the document file type.
        name (str): The name of the file type.

    Relationships:
        documents: One-to-Many relationship with Document (backref: document_type).
    """
    __tablename__ = "document_filetype"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    documents: Mapped[List["Document"]] = relationship(
        "Document", back_populates="document_type")


class Document(Base):
    """
    Represents a document stored in the database.

    Attributes:
        id (int): The primary key of the document.
        document_url (str): The URL of the document.
        document_type_id (int): Foreign key referencing a DocumentFiletype object.

    Relationships:
        document_type: Many-to-One relationship with DocumentFiletype (backref: documents).
        chunks: One-to-Many relationship with DocumentChunk (backref: document).
    """

    __tablename__ = "document"

    id: Mapped[int] = mapped_column(primary_key=True)
    document_url: Mapped[str] = mapped_column(String(255), nullable=False)
    document_type_id: Mapped[int] = mapped_column(
        ForeignKey("document_filetype.id")
    )

    document_type: Mapped["DocumentFiletype"] = relationship(
        "DocumentFiletype", back_populates="documents")
    chunks: Mapped[List["DocumentChunk"]] = relationship(
        "DocumentChunk", back_populates="document")


class Documentation(Base):
    """
    Represents a documentation document.

    Attributes:
        id (int): The primary key of the documentation document.
        content (str): The content of the documentation document.
    """

    __tablename__ = "documentation"

    id: Mapped[int] = mapped_column(primary_key=True)
    content: Mapped[str] = mapped_column(Text)


class Embedding(Base):
    """
    Represents a vector embedding of a document chunk.

    Attributes:
        id (int): The primary key of the embedding.
        embedding (List[float]): The vector embedding.

    Relationships:
        chunks: One-to-Many relationship with DocumentChunk (backref: embedding).
    """

    __tablename__ = "embedding"

    id: Mapped[int] = mapped_column(primary_key=True)
    embedding: Mapped[List[float]] = mapped_column(ARRAY(float))

    chunks: Mapped[List["DocumentChunk"]] = relationship(
        "DocumentChunk", back_populates="embedding"
    )
