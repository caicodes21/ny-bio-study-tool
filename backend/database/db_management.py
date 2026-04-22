import os
import asyncio
import asyncpg
import json
from dotenv import load_dotenv
from pydantic import Field

load_dotenv()
conn_string = os.getenv("PG_DB_URL")

async def drop_table(
        table_name: str = Field(description="Name of table to be dropped")
    ) -> None:
    """
    Drops a table from the database if it exists.

    Args:
        table_name: The name of the table to drop.
    """

    def quote_identifier(name: str) -> str:
        """Safely quote a PostgreSQL identifier to prevent SQL injection."""
        # Escape any double quotes within the name, then wrap in double quotes
        return '"' + name.replace('"', '""') + '"'

    try:
        if conn_string:
            conn = await asyncpg.connect(conn_string)
            await conn.execute(f"DROP TABLE IF EXISTS {quote_identifier(table_name)};")
    except Exception as e:
        print("Failed to drop table.")
        print(e)
    finally:
        if conn:
            await conn.close()


async def create_official_clusters_table() -> None:
    """
    Creates the official_clusters table if it does not already exist.

    The table stores clusters of questions with the following columns:
        - id: Auto-incrementing primary key.
        - source: The source of the cluster (either exam or sample).
        - title: The title of the cluster.
        - standards_assessed: An array of learning standard codes assessed by the cluster.
        - num_of_questions: The number of questions in the cluster.
        - sections: A JSONB blob containing the full content for the cluster.
    """

    try:
        if conn_string:
            conn = await asyncpg.connect(conn_string)
            await conn.execute(
            """
                CREATE TABLE IF NOT EXISTS official_clusters (
                    id SERIAL PRIMARY KEY,
                    source TEXT,
                    title TEXT,
                    standards_assessed TEXT[],
                    num_of_questions SMALLINT,
                    sections JSONB
                )
            """)
    except Exception as e:
        print("Failed to create table.")
        print(e)
    finally:
        if conn:
            await conn.close()


async def create_learning_standards_table() -> None:
    """
    Creates the learning_standards table if it does not already exist.

    The table stores learning standards with the following columns:
        - id: Auto-incrementing primary key.
        - topic: The subject or topic area the standard belongs to.
        - standard_code: The unique code identifying the standard.
        - standard_definition: The full text definition of the standard.
        - clarification_statement: Additional clarification or context for the standard.
    """
    try:
        if conn_string:
            conn = await asyncpg.connect(conn_string)
            await conn.execute(
            """
                CREATE TABLE IF NOT EXISTS learning_standards (
                    id SERIAL PRIMARY KEY,
                    topic TEXT,
                    standard_code TEXT,
                    standard_definition TEXT,
                    clarification_statement TEXT
                )
            """)
    except Exception as e:
        print("Failed to create table.")
        print(e)
    finally:
        if conn:
            await conn.close()


async def create_general_review_table() -> None:
    """
    Creates the general_review table if it does not already exist.

    The table stores general review questions with the following columns:
        - id: record id serving as primary key
        - topic: The biology topic that the question falls under
        - difficulty: The difficulty level of the question
        - question_number: The question number under this topic
        - question: The wording of the question itself
        - data_table: An optional JSON data table
        - choices: A JSON object of correct answer and distractors
        - answer_explanation: rationale behind the correct answer
    """
    try:
        if conn_string:
            conn = await asyncpg.connect(conn_string)
            await conn.execute(
            """
                CREATE TABLE IF NOT EXISTS general_review (
                    id SMALLINT PRIMARY KEY,
                    topic TEXT NOT NULL,
                    difficulty TEXT NOT NULL,
                    question_number SMALLINT NOT NULL,
                    question TEXT NOT NULL,
                    data_table JSONB,
                    choices JSONB NOT NULL,
                    answer_explanation TEXT NOT NULL
                );
            """)
    except Exception as e:
        print("Failed to create general_review table.")
        print(e)
    finally:
        if conn:
            await conn.close()


async def create_practice_cluster_table() -> None:
    """
    Creates the practice_clusters table if it does not already exist.

    The table stores practice clusters with the following columns:
        - cluster_number: cluster number serving as primary key
        - title: The title for this cluster
        - topic_list: A list of topics that this cluster falls under
        - standards_assessed: A list of standards assessed by this cluster
        - cluster_sections: A list of the sections of this cluster
    """
    try:
        if conn_string:
            conn = await asyncpg.connect(conn_string)
            await conn.execute(
            """
                CREATE TABLE IF NOT EXISTS practice_clusters (
                    cluster_number SMALLINT PRIMARY KEY,
                    title TEXT NOT NULL,
                    topic_list TEXT[] NOT NULL,
                    standards_assessed TEXT[] NOT NULL,
                    cluster_sections JSONB NOT NULL
                );
            """)
    except Exception as e:
        print("Failed to create practice_clusters table.")
        print(e)
    finally:
        if conn:
            await conn.close()


async def insert_learning_standards(
        standard_list: list[dict] = Field(description="A list of biology learning standards")
    ) -> None:
    """
    Inserts a list of learning standards into the learning_standards table.

    Each standard dict must have keys in this order: topic, standard_code,
    standard_definition, clarification_statement.

    Args:
        standards_list: A list of dicts, each representing a learning standard.
                       Returns early without inserting if the list is empty.
    """

    if len(standards_list) == 0:
        return

    values = []
    for standard in standards_list:
        values.append(tuple(standard.values()))
            
    try:
        if conn_string:
            conn = await asyncpg.connect(conn_string)
            await conn.executemany(
                """
                    INSERT INTO learning_standards (topic, standard_code, standard_definition, clarification_statement)
                    VALUES ($1, $2, $3, $4);
                """,
                values
            )
    except Exception as e:
        print("Failed to insert standards.")
        print(e)
    finally:
        if conn:
            await conn.close()


async def insert_official_clusters(
        clusters_list: list[dict] = Field(description="A list of clusters with its componets organized in JSON format")
    ) -> None:
    """
    Inserts a list of clusters into the official_clusters table.

    For each cluster, counts the number of multiple-choice and
    constructed-response sections as num_of_questions, and collects
    the unique standards assessed across those sections.

    Args:
        clusters_list: A list of dicts, each representing a cluster with the following keys:
                        - source (str): The origin of the cluster.
                        - title (str): The title of the cluster.
                        - sections (list): A list of section dicts, each with
                          a "type" and nested "section" containing
                          "standardAssessed".
                        Returns early without inserting if the list is empty.
    """

    if len(cluster_list) == 0:
        return

    values = []
    for cluster in clusters_list:

        num_of_questions = 0
        standards_assessed = []

        for section in cluster["sections"]:
            if section["type"] == "multiple-choice" or section["type"] == "constructed-response":
                num_of_questions += 1
                standard = section["section"]["standardAssessed"]
                if standard not in standards_assessed:
                    standards_assessed.append(standard)
        
        values.append((
            cluster["source"],
            cluster["title"],
            standards_assessed,
            num_of_questions,
            json.dumps(cluster["sections"], sort_keys=False)
        ))
    
    try:
        if conn_string:
            conn = await asyncpg.connect(conn_string)
            await conn.executemany(
                """
                    INSERT INTO official_clusters (source, title, standards_assessed, num_of_questions, sections)
                    VALUES ($1, $2, $3, $4, $5);
                """,
                values
            )
    except Exception as e:
        print("Failed to insert clusters.")
        print(e)
    finally:
        if conn:
            await conn.close()

async def insert_general_review_questions(
        questions_list: list[dict] = Field(description="A list of general review questions")
    ) -> None:
    """
    Inserts a list of general review questions into the general_review table.

    For each question, assign it a unique record id and a topic question number

    Args:
        questions_list: A list of dicts, each representing a review question with the following keys:
                        - topic (str): topic that the question falls under,
                        - difficulty (str): question difficulty,
                        - question (str): wording of the questions,
                        - data_table (dict): an optional data table,
                        - choices (dict): all the answer choices, including correct answer,
                        - answer_explanation (str): rationale behind the correct answer
                        Returns early without inserting if the list is empty.
    """

    if len(questions_list) == 0:
        return

    try:
        if conn_string:
            conn = await asyncpg.connect(conn_string)
            total_question_count = await conn.fetchval("SELECT COUNT(*) FROM general_review")

            topic_count = {}
            for q in questions_list:
                topic = q["topic"]
                if topic not in topic_count.keys():
                    count = await conn.fetchval("SELECT COUNT(*) FROM general_review WHERE topic = $1", topic)
                    topic_count[topic] = count
            
            records = []
            for q in questions_list:
                total_question_count += 1
                topic_count[q["topic"]] += 1
                records.append((
                    total_question_count,
                    q["topic"],
                    q["difficulty"],
                    topic_count[q["topic"]],
                    q["question"],
                    json.dumps(q["data_table"]),
                    json.dumps(q["choices"]),
                    q["answer_explanation"]
                ))
            
            res = await conn.executemany(
                """
                INSERT INTO general_review (id, topic, difficulty, question_number, question, data_table, choices, answer_explanation)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
                """,
                records
                )
            
    except Exception as e:
        print("Failed to insert general review questions.")
        print(e)
    finally:
        if conn:
            await conn.close()
