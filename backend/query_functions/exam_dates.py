import asyncpg

def parse_sql_queries(query_filepath: str) -> dict:
    """
    Reads a SQL file and returns a dict mapping a query name to its query definition
    """

    with open(query_filepath, "r") as file:
        queries = file.readlines()
        queries_by_name = {}
        
        current_query_name = ""
        for line in queries:
            if len(line.strip()) > 0:

                if "-- name:" in line:
                    current_query_name = line.split("-- name:")[1].strip()
                
                else:
                    query_definition = line.strip()
                    queries_by_name[current_query_name] = query_definition

        return queries_by_name
    
    return queries_by_name

query_filepath = "./sql_queries/exam_dates.sql"
_queries = parse_sql_queries(query_filepath)

async def get_exam_dates(pool: asyncpg.Pool):
    return await pool.fetch(_queries["get_exam_dates"])