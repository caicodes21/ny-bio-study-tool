import sys
import os
import asyncpg
from dotenv import load_dotenv
from pydantic import Field
from typing import Any
import json

load_dotenv()
conn_string = os.getenv("PG_DB_URL")

async def fetch_standards_by_code(
    standard_codes: list[str] = Field(description="A list of standard codes")
) -> list[tuple[str, ...]] | None:
    """
    Fetch learning standards from the database by their standard codes.

    Queries the learning_standards table and returns the code, definition,
    and clarification statement for each matched standard.

    Args:
        standard_codes: A list of standard codes to look up (e.g. ["HS-LS1-1", "HS-LS1-2"]).

    Returns:
        A list of tuples, each containing:
            - standard_code (str): The standard's code identifier.
            - standard_definition (str): The full definition of the standard.
            - clarification_statement (str): Additional clarification for the standard.
        Returns an empty list if no matches are found or None if the connection string is not set.
    """

    try:
        if conn_string:
            conn = await asyncpg.connect(conn_string)
            standards = await conn.fetch(
                """
                    SELECT * 
                    FROM learning_standards 
                    WHERE standard_code = ANY($1::text[])
                """,
                standard_codes
            )

            res = [(
                    s["standard_code"],
                    s["standard_definition"],
                    s["clarification_statement"]
                ) for s in standards]
            
            return res
                    
    except Exception as e:
        print("Failed to fetch standards.", file=sys.stderr)
        print(e, file=sys.stderr)
    finally:
        if conn:
            await conn.close()

async def fetch_relevant_clusters(
    standard_codes: list[str] = Field(description="A list of standard codes")
) -> list[list[dict]] | None:
    """
    Fetch clusters most relevant to the given standard codes.

    Retrieves the 2 clusters from the official_clusters table with the most
    standards in common with the provided codes, plus 1 randomly selected
    unrelated cluster.

    Args:
        standard_codes: A list of standard codes to match against cluster 
        standards (e.g. ["HS-LS1-1", "HS-LS1-2"]).

    Returns:
        A list of clusters or None if connection string is not set.
    """

    try:
        if conn_string:
            conn = await asyncpg.connect(conn_string)
            clusters = await conn.fetch(
                """
                    WITH common_counts AS (
                        SELECT
                            id,
                            COUNT(standard.val) AS common_count
                        FROM official_clusters
                        LEFT JOIN LATERAL unnest(standards_assessed) AS standard(val)
                            ON standard.val = ANY($1::text[])
                        GROUP BY id
                        ORDER BY common_count DESC
                        LIMIT 2
                    ),
                    irrelevant_ids AS (
                        SELECT
                            id
                        FROM official_clusters
                        WHERE id NOT IN (SELECT id FROM common_counts)
                        ORDER BY RANDOM()
                        LIMIT 1
                    ),
                    target_ids AS (
                        SELECT id FROM common_counts
                        UNION
                        SELECT id FROM irrelevant_ids
                    )

                    SELECT *
                    FROM official_clusters
                    WHERE id IN (SELECT id FROM target_ids)

                """, 
                standard_codes
            )

            res = [c["sections"] for c in clusters]

            return [json.loads(c) for c in res]

    except Exception as e:
        print("Failed to fetch relevant clusters", file=sys.stderr)
        print(e, file=sys.stderr)
    
    finally:
        if conn:
            await conn.close()