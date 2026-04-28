import asyncpg
import json

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

query_filepath = "./sql_queries/general_review.sql"
_queries = parse_sql_queries(query_filepath)

async def get_question_counts(pool: asyncpg.Pool):
    return await pool.fetch(_queries["get_question_counts"])

async def get_question_by_topic_and_number(pool: asyncpg.Pool, topic: str, number: int):
    question = await pool.fetchrow(_queries["get_question_by_topic_and_number"], topic, number)

    choices = json.loads(question["choices"])
    formatted_question = {
        "questionID": question["id"],
        "topic": question["topic"],
        "difficulty": question["difficulty"],
        "questionNumber": question["question_number"],
        "question": question["question"],
        "dataTable": None,
        "correctAnswer": choices["correct_answer"],
        "wrongChoices": [choices["distractor_1"], choices["distractor_2"], choices["distractor_3"]],
        "answerExplanation": question["answer_explanation"]
    }

    data_table = question["data_table"]

    if data_table != "null" and data_table is not None:
        data_table = json.loads(data_table)
        column_names = data_table["column_names"]
        row_values = []
        for row in data_table["row_values"]:
            row_values.append([row["row_number"], [row["column_values"][col] for col in column_names]])
        row_values = sorted(row_values)
        formatted_question["dataTable"] = {
            "columnNames": column_names,
            "rowValues": row_values
        }
    
    return formatted_question

        
