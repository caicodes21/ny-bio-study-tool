from mcp.server.fastmcp import FastMCP
from mcp_tools import fetch_relevant_clusters, fetch_standards_by_code, fetch_standards_by_topic, insert_general_review_questions, insert_practice_cluster

mcp = FastMCP("pg_db_mcp")

mcp.tool()(fetch_relevant_clusters)
mcp.tool()(fetch_standards_by_topic)
mcp.tool()(fetch_standards_by_code)
mcp.tool()(insert_general_review_questions)
mcp.tool()(insert_practice_cluster)

def main():
    mcp.run(transport="stdio")

if __name__ == "__main__":
    main()