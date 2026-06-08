from query_functions.general_review import get_question_counts, get_question_by_topic_and_number
from query_functions.practice_clusters import get_cluster_info, get_cluster_by_number
from query_functions.exam_dates import get_exam_dates
from contextlib import asynccontextmanager
import asyncio
from fastapi import FastAPI, Request, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from setup import get_conn_pool
from utils import TopicEnum
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.conn_pool = await get_conn_pool()
    yield
    try:
        await asyncio.wait_for(app.state.conn_pool.close(), timeout=10)
    except TimeoutError:
        app.state.conn_pool.terminate()


allowed_origins = [origin for origin in os.getenv("ALLOWED_ORIGINS", "").split(",") if len(origin)]


app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["GET"]
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content=jsonable_encoder({"detail": exc.errors(), "body": "Re-send request with proper input"}),
    )


@app.get("/")
async def root():
    return {"message": "Welcome to PluriStudy!"}


@app.get("/general-review")
async def general_review(request: Request, topic: TopicEnum | None = None, number: int | None = None):

    pool = request.app.state.conn_pool

    if (topic is None) != (number is None):
        raise HTTPException(status_code=400, detail="Missing either topic or question number") 

    try:
        if topic is None and number is None:
            return await get_question_counts(pool)
        
        elif topic is not None and number is not None:
            return await get_question_by_topic_and_number(pool, topic, number)
                    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/practice-clusters")
async def practice_clusters(request: Request, number: int | None = None):

    pool = request.app.state.conn_pool

    try:
        if number is None:
            return await get_cluster_info(pool)
        
        else:
            return await get_cluster_by_number(pool, number)
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/exam-dates")
async def exam_dates(request: Request):

    pool = request.app.state.conn_pool

    try:
        return await get_exam_dates(pool)
    
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal server error")