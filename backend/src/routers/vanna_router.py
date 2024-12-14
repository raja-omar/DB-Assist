"""
This module defines a FastAPI router for interacting with Vanna.
"""
import os
import time
from typing import AsyncIterator

from dotenv import load_dotenv
from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

import psycopg2

from sqlalchemy import select
from sqlalchemy.orm import Session

from dtos.ask_question import AskQuestionInput, AskQuestionResponse
from dtos.setup_input import SetupInput, SetupInputSimple
from dtos.documentation import DocumentationResponse
from models import DbConnection, Documentation
from services.database_service import get_db
from services import vanna_service

load_dotenv()

router = APIRouter()


@router.post("/api/vanna/setup")
async def create_setup(input: SetupInput):
    """Create new setup"""
    vn = vanna_service.vn
    vn.connect_to_postgres(host=input.Host, dbname=input.Database,  # connect to the user's db
                           user=input.User, password=input.Password, port=input.Port)
    df_information_schema = vn.run_sql(
        "SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE table_schema = 'public'")
    plan = vn.get_training_plan_generic(df_information_schema)
    # TODO create a DB service or something for this code.
    conn = psycopg2.connect(host=os.getenv("POSTGRES_HOST"), dbname=os.getenv("POSTGRES_DB"),  # connect to ai_assistant db
                            user=os.getenv("POSTGRES_USER"), password=os.getenv("POSTGRES_PASSWORD"), port=os.getenv("POSTGRES_PORT"))
    cur = conn.cursor()
    cur.execute("INSERT INTO db_connection (host, dbname, \"user\", \"password\", port) VALUES (%s,%s, %s,%s,%s)",
                (input.Host, input.Database, input.User, input.Password, input.Port))
    conn.commit()
    conn.close()

    vn.train(plan=plan)
    return {"message": "successfully set up!"}


@router.post("/api/vanna/setup-simple")
async def create_setup_simple(input: SetupInputSimple):
    """Create new setup"""
    pass


@router.post("/api/vanna/ask", response_model=AskQuestionResponse)
async def ask_question(input: AskQuestionInput):
    """Ask a question"""
    vn = vanna_service.vn
    # TODO This should be pulled from the database/ passed from somewhere dynamically
    conn = psycopg2.connect(host="localhost", dbname="ai_assistant",
                            user="postgres", password="postgres", port=5432)
    cur = conn.cursor()
    cur.execute("select * FROM db_connection")
    config = cur.fetchone()
    conn.close()
    # TODO Create a class to represent these options
    vn.connect_to_postgres(host=config[1], dbname=config[2],
                           user=config[3], password=config[4], port=config[5])
    sql = vn.generate_sql(input.Question)
    df = vn.run_sql(sql=sql)
    answer = vn.generate_summary(input.Question, df)

    return {"Answer": answer}


async def stream_answer(answer: str) -> AsyncIterator[str]:
    chunk_size = 200  # might need to play around with the size of each chunk
    for i in range(0, len(answer), chunk_size):
        yield answer[i:i + chunk_size]


@router.post("/api/vanna/ask-streamed")
async def ask_question_streamed(input: AskQuestionInput):
    """Ask a question"""
    vn = vanna_service.vn
    # TODO This should be pulled from the database/ passed from somewhere dynamically
    vn.connect_to_postgres(host="localhost", dbname="sample",
                           user="sampleuser", password="samplepassword", port=5432)
    sql = vn.generate_sql(input.Question)
    df = vn.run_sql(sql=sql)
    message_log = [
        vn.system_message(
            f"You are a helpful data assistant. The user asked the question: '{
                input.Question}'\n\nThe following is a pandas DataFrame with the results of the query: \n{df.to_markdown()}\n\n"
        ),
        vn.user_message(
            "Briefly summarize the data based on the question that was asked. Do not respond with any additional explanation beyond the summary." +
            vn._response_language()
        ),
    ]

    async def answer_stream():
        async for chunk in vn.submit_prompt_streamed(message_log):
            yield chunk

    return StreamingResponse(answer_stream(), media_type="text/plain")


@router.get("/api/vanna/get-documentation")
async def get_documentation(db: Session = Depends(get_db)) -> list[DocumentationResponse]:
    """
    Fetches all generated documentation from the database.

    Args:
        db (Session, optional): A SQLAlchemy database session. Defaults to a session provided by 
        the `get_db` dependency.
        See https://fastapi.tiangolo.com/tutorial/dependencies/

    Returns:
        list[DocumentationResponse]: A list of Documentation objects, each representing 
        documentation for a single table.
    """
    return db.scalars(select(Documentation)).all()


@router.get("/api/vanna/create-documentation", status_code=201)
async def create_documentation(db: Session = Depends(get_db)):
    """
    Generates documentation for all tables using the LLM. Tables are found
    by querying the target database for a list of table names in the public schema.
    Generated documentation is saved in the Documentation table.

    Args:
        db (Session, optional): A SQLAlchemy database session. Defaults to a session provided by 
        the `get_db` dependency.
        See https://fastapi.tiangolo.com/tutorial/dependencies/

    Returns:
    str: A success message.
    """
    vn = vanna_service.vn
    db_config = db.scalars(select(DbConnection)).first()
    vn.connect_to_postgres(**(db_config.to_dict()))

    tables = [
        row["table_name"]
        for row in vn.run_sql(
            "SELECT table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = 'public';"
        ).to_dict(orient="records")]
    for table in tables:
        # You will get rate-limited without waiting between each call.
        time.sleep(1)
        query = f"""
        Generate documentation for the {table} table.
        Please fill in the following template to provide a table description:
        --- Template Start ---
        [Table Name]: _______________________________________________________
        [Column List]:
        • [column1_name] - [column1_description]
        • [column2_name] - [column2_description]
        ...
        [Additional Information]:
        --- Template End ---
        """

        llm_prompt = vn.add_ddl_to_prompt(query, vn.get_related_ddl(query))
        llm_prompt = vn.add_documentation_to_prompt(
            llm_prompt, vn.get_related_documentation(query)
        )
        message_log = [
            vn.system_message("You are a helpful sql analyst."),
            vn.user_message(llm_prompt),
        ]
        content = vn.submit_prompt(message_log).replace("```", "")
        db.add(Documentation(content=content))
    db.commit()
    return "Successfully Created Documentation."
