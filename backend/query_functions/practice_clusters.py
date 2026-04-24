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

query_filepath = "./sql_queries/practice_clusters.sql"
_queries = parse_sql_queries(query_filepath)

async def get_cluster_info(pool: asyncpg.Pool):
    return await pool.fetch(_queries["get_cluster_info"])

async def get_cluster_by_number(pool: asyncpg.Pool, number: int):
    cluster = await pool.fetchrow(_queries["get_cluster_by_number"], number)

    formatted_cluster = {
        "clusterNumber": cluster["cluster_number"],
        "title": cluster["title"],
        "topicList": cluster["topic_list"],
        "standardsAssessed": cluster["standards_assessed"]
    }

    cluster_sections = json.loads(cluster["cluster_sections"])

    sections_list = []
    for section in cluster_sections:

        section_number = section["section_number"]
        section_type = section["section_type"]
        section_content = section["section_content"]

        current_section = {
            "sectionNumber": section_number,
            "sectionType": section_type
            }

        if section_type == "title":
            current_section["title"] = section_content["title"]
        
        elif section_type == "text":
            current_section["text"] = " ".join(section_content["sentences_list"])
        
        elif section_type == "question":

            question_type = section_content["question_type"]
            current_section["questionType"] = question_type
            current_section["questionNumber"] = section_content["question_number"]
            question_content = section_content["question_content"]

            if question_type == "multiple-choice":

                current_section["question"] = question_content["question"]
                choices = question_content["choices"]
                current_section["correctAnswer"] = choices["correct_answer"]
                current_section["wrongChoices"] = [choices["distractor_1"], choices["distractor_2"], choices["distractor_3"]]
                current_section["answerExplanation"] = question_content["answer_explanation"]
            
            elif question_type == "constructed-response":
                current_section["question"] = question_content["question"]
                current_section["gradingCriteria"] = question_content["grading_criteria"]
                current_section["acceptableAnswers"] = question_content["acceptable_answers"]

        elif section_type == "figure":

            current_section["figureType"] = section_content["figure_type"]
            current_section["figureNumber"] = section_content["figure_number"]
            current_section["description"] = section_content["description"]
            current_section["url"] = section_content["url"]
            current_section["sources"] = section_content["sources"]

            data_table = section_content["data_table"]

            if data_table:
                column_names = data_table["column_names"]
                row_values = []
                for row in data_table["row_values"]:
                    row_values.append([row["row_number"], [row["column_values"][col] for col in column_names]])
                row_values = sorted(row_values)
                current_section["data_table"] = {
                    "columnNames": column_names,
                    "rowValues": row_values
                }
            else:
                current_section["data_table"] = None

        sections_list.append(current_section)
    
    formatted_cluster["sectionsList"] = sections_list

    return formatted_cluster
