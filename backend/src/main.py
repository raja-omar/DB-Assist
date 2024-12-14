"""Main File"""

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import vanna_router
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(vanna_router.router)


@app.get("/")
async def root():
    return {"message": "Hello World!"}
