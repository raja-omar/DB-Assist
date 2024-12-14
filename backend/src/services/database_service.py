"""
This module is for database configuration and session management.
"""
import os

from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

from dotenv import load_dotenv

load_dotenv()


SQLALCHEMY_DATABASE_URL = os.getenv("POSTGRES_CONN_STRING")

engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """
    Yields a database session within a context manager.

    Using this function as a FastAPI dependency is an easy way to obtain a database session 
    and automatically close it at the end of the context.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
