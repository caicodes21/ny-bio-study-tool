from query_functions.general_review import get_question_counts, get_question_by_topic_and_number
from query_functions.practice_clusters import get_cluster_info, get_cluster_by_number
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from typing import Optional
from setup import get_conn_pool
from utils import *

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.conn_pool = await get_conn_pool()
    yield


app = FastAPI(lifespan=lifespan)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content=jsonable_encoder({"detail": exc.errors(), "body": "Re-send request with proper input"}),
    )


@app.get("/")
async def root():
    return {"message": "Welcome to BoroBio!"}


@app.get("/general-review")
async def general_review(request: Request, topic: TopicEnum | None = None, number: int | None = None):

    pool = request.app.state.conn_pool

    try:
        if topic is None and number is None:
            return await get_question_counts(pool)
        
        elif topic is not None and number is not None:
            return await get_question_by_topic_and_number(pool, topic, number)
        
        else:
            return {}
    except Exception as e:
        return {"msg": "Internal server error"}


@app.get("/practice-clusters")
async def practice_clusters(request: Request, number: int | None = None):

    pool = request.app.state.conn_pool

    try:
        if number is None:
            return await get_cluster_info(pool)
        
        else:
            return await get_cluster_by_number(pool, number)
    
    except Exception as e:
        return {"msg": "Internal server error"}