import sys
import os
import asyncpg
from dotenv import load_dotenv
from pydantic import Field, ValidationError
from typing import Any, Literal
from custom_classes import GeneralReviewQuestion, DataTable, PracticeCluster, StandardCodes
import json

load_dotenv()
conn_string = os.getenv("PG_DB_URL")

async def fetch_standards_by_topic(
    topic: Literal[
            "structure_and_function", 
            "matter_and_energy_in_organisms_and_ecosystems",
            "interdependent_relationships_in_ecosystems",
            "inheritance_and_variation_of_traits",
            "natural_selection_and_evolution",
            "earths_systems"
        ] = Field(description="A biology topic")
) -> list[tuple[str, ...]] | None:
    """
    Fetch learning standards from the database by their topic.

    Queries the learning_standards table and returns the code, definition,
    and clarification statement for each matched standard.

    Args:
        topic: A biology topic

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
                    WHERE topic = $1;
                """,
                topic
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


async def fetch_standards_by_code(
    codes_list: list[StandardCodes] = Field(description="A list of standard codes (ex: HS-LS1-1)")
) -> list[tuple[str, ...]] | None:
    """
    Fetch learning standards from the database by their codes.

    Queries the learning_standards table and returns the code, definition,
    and clarification statement for each matched standard.

    Args:
        codes_list (list[StandardCodes]): A list of standard codes

    Returns:
        A list of tuples, each containing:
            - standard_code (str): The standard's code identifier.
            - standard_definition (str): The full definition of the standard.
            - clarification_statement (str): Additional clarification for the standard.
        Returns an empty list if no matches are found or None if the connection string is not set.
        Returns early if no codes are inputted.
    """

    if len(codes_list) == 0:
        return

    try:
        if conn_string:
            conn = await asyncpg.connect(conn_string)
            standards = await conn.fetch(
                """
                    SELECT * 
                    FROM learning_standards 
                    WHERE standard_code = ANY($1);
                """,
                codes_list
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
        standard_codes: A list of standard codes to match against cluster standards (e.g. ["HS-LS1-1", "HS-LS1-2"]).

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


async def insert_general_review_questions(
    review_questions: list[GeneralReviewQuestion] = Field(description="A list of multiple choice questions that review biology concepts")
) -> None:
    """
    ALWAYS ASK for permission before using this tool.
    Inserts a list of multple choice questions into the general_review table.

    For each question, counts the current number of questions belonging to 
    the topic in the db and increments it to be the number for this question.

    Args:
        review_questions: A list of GeneralReviewQuestion, each representing a question with the following keys:
                        - topic (Literal[
                                    "structure_and_function", 
                                    "matter_and_energy_in_organisms_and_ecosystems",
                                    "interdependent_relationships_in_ecosystems",
                                    "inheritance_and_variation_of_traits",
                                    "natural_selection_and_evolution",
                                    "earths_systems"
                                ]): topic for the question
                        - difficulty (str): either "easy" or "medium"
                        - question (str): question wording
                        - correct_answer (str): correct answer
                        - data_table (optional DataTable): tabular data for questions that reference a table
                            DataTable has:
                                - column_names (list[str]): ordered list of column header names
                                - row_values list[DataTableRow]: a list of rows containing the cell values for each row
                                DataTableRow has: row_number (int, 1-indexed) and column_values (dict mapping column name to value) 
                        - choices (MultpleChoices): a dictionary of correct answer and distractor choices
                        - answer_explanation (str): an explanation of why the correct answer is right 
                        Returns early without inserting if the list is empty.
    """

    if len(review_questions) == 0:
        return
    
    try:
        if conn_string:
            conn = await asyncpg.connect(conn_string)
            async with conn.transaction():

                total_question_count = await conn.fetchval("SELECT COUNT(*) FROM general_review")

                topics = list({q.topic for q in review_questions})
                counts_by_topic = await conn.fetch(
                    "SELECT topic, COUNT(*) as count FROM general_review WHERE topic = ANY($1) GROUP BY topic",
                    topics
                )
                topic_counts = {row["topic"]: row["count"] for row in counts_by_topic}

                records = []
                for q in review_questions:
                    total_question_count += 1
                    topic_counts[q.topic] = topic_counts.get(q.topic, 0) + 1

                    data_table = q.data_table.model_dump_json() if q.data_table else None

                    records.append((
                        total_question_count, q.topic, q.difficulty, topic_counts[q.topic], q.question, 
                        data_table, q.choices.model_dump_json(), q.answer_explanation
                    ))

                await conn.executemany(
                    """
                    INSERT INTO general_review (id, topic, difficulty, question_number, question, data_table, choices, answer_explanation)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
                    """,
                    records
                )

    except Exception as e:
        print("Failed to insert general review questions.", file=sys.stderr)
        print(e, file=sys.stderr)
    finally:
        if conn:
            await conn.close()


async def insert_practice_cluster(
    practice_cluster: PracticeCluster = Field(description="A cluster made for practice")
) -> None:
    """
    ALWAYS ASK for permission before using this tool.
    Inserts a practice cluster into the practice_clusters table.

    Counts the current total number of clusters in the db and uses it to assign a number to this cluster.

    Args:
        practice_cluster: A PracticeCluster, each representing a cluster with the following keys:
                        - title (str): the title of the cluster
                        - topic_list (Literal[
                                        "structure_and_function", 
                                        "matter_and_energy_in_organisms_and_ecosystems",
                                        "interdependent_relationships_in_ecosystems",
                                        "inheritance_and_variation_of_traits",
                                        "natural_selection_and_evolution",
                                        "earths_systems"
                                    ][]): an array of topics relevant to the cluster
                        - standards_assessed (StandardCodes[]): an array of standards relevant to the cluster
                        - cluster_sections (ClusterSection[]): an array of sections in the cluster
    """

    try:
        if conn_string:

            conn = await asyncpg.connect(conn_string)
            async with conn.transaction():

                count = await conn.fetchval("SELECT COUNT(*) FROM practice_clusters")
                cluster_number = count + 1

                params = [
                    cluster_number,
                    practice_cluster.title,
                    practice_cluster.topic_list,
                    practice_cluster.standards_assessed,
                    json.dumps([section.model_dump(mode="json", exclude_none=False) for section in practice_cluster.cluster_sections])
                ]

                await conn.execute(
                    """
                    INSERT INTO practice_clusters (cluster_number, title, topic_list, standards_assessed, cluster_sections)
                    VALUES ($1, $2, $3, $4, $5);
                    """,
                    *params
                )

    except Exception as e:
        print("Failed to insert practice cluster.", file=sys.stderr)
        print(e, file=sys.stderr)
    finally:
        if conn:
            await conn.close()

