import os
import psycopg
from dotenv import load_dotenv
from psycopg import sql

load_dotenv()
conn_string = os.getenv("DATABASE_URL")

def drop_table(table_name: str):
    """
    Drops a table from the database if it exists.

    Args:
        table_name: The name of the table to drop.
    """

    try:
        with psycopg.connect(conn_string) as conn:
            with conn.cursor() as cursor:
                cursor.execute(sql.SQL("DROP TABLE IF EXISTS {}").format(sql.Identifier(table_name)))
                conn.commit()
    except Exception as e:
        print("Failed to drop table.")
        print(e)

def create_official_clusters_table():
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
        with psycopg.connect(conn_string) as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    CREATE TABLE IF NOT EXISTS official_clusters (
                            id SERIAL PRIMARY KEY,
                            source TEXT,
                            title TEXT,
                            standards_assessed TEXT[],
                            num_of_questions SMALLINT,
                            sections JSONB
                    )
                """)
                conn.commit()
    except Exception as e:
        print("Failed to create table.")
        print(e)

def create_learning_standards_table():
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
        with psycopg.connect(conn_string) as conn:
            with conn.cursor() as cursor:
                cursor.execute("""
                    CREATE TABLE IF NOT EXISTS learning_standards (
                            id SERIAL PRIMARY KEY,
                            topic TEXT,
                            standard_code TEXT,
                            standard_definition TEXT,
                            clarification_statement TEXT
                    )
                """)
                conn.commit()
    except Exception as e:
        print("Failed to create table.")
        print(e)

def insert_learning_standards(standardsList):
    """
    Inserts a list of learning standards into the learning_standards table.

    Each standard dict must have keys in this order: topic, standard_code,
    standard_definition, clarification_statement.

    Args:
        standardsList: A list of dicts, each representing a learning standard.
                       Returns early without inserting if the list is empty.
    """

    if len(standardsList) == 0:
        return None

    values = []
    for standard in standardsList:
        values.append(tuple(standard.values()))
            
    try:
        with psycopg.connect(conn_string) as conn:
            with conn.cursor() as cursor:
                cursor.executemany("""
                    INSERT INTO learning_standards (topic, standard_code, standard_definition, clarification_statement)
                    VALUES (%s, %s, %s, %s);
                    """,
                    values
                )
                conn.commit()
    except Exception as e:
        print("Failed to insert standards.")
        print(e)

def insert_official_clusters(clustersList):
    """
    Inserts a list of clusters into the official_clusters table.

    For each cluster, counts the number of multiple-choice and
    constructed-response sections as num_of_questions, and collects
    the unique standards assessed across those sections.

    Args:
        clustersList: A list of dicts, each representing a cluster with the
                      following keys:
                        - source (str): The origin of the cluster.
                        - title (str): The title of the cluster.
                        - sections (list): A list of section dicts, each with
                          a 'type' and nested 'section' containing
                          'standardAssessed'.
                      Returns early without inserting if the list is empty.
    """

    if len(clustersList) == 0:
        return None

    values = []
    for cluster in clustersList:

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
        with psycopg.connect(conn_string) as conn:
            with conn.cursor() as cursor:
                cursor.executemany("""
                    INSERT INTO official_clusters (source, title, standards_assessed, num_of_questions, sections)
                    VALUES (%s, %s, %s, %s, %s);
                    """,
                    values
                )
                conn.commit()
    except Exception as e:
        print("Failed to insert clusters.")
        print(e)