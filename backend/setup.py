import os
import asyncpg
import asyncio
from dotenv import load_dotenv

load_dotenv()
conn_string = os.getenv("PG_DB_URL")

async def get_conn_pool():
    conn_pool = await asyncpg.create_pool(dsn=conn_string, statement_cache_size=0)
    return conn_pool
