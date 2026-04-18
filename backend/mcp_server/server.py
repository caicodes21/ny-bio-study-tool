import httpx
from mcp.server.fastmcp import FastMCP
from mcp_tools import fetch_relevant_clusters, fetch_standards_by_topic, insert_general_review_questions

mcp = FastMCP("pg_db_mcp")

mcp.tool()(fetch_relevant_clusters)
mcp.tool()(fetch_standards_by_topic)
mcp.tool()(insert_general_review_questions)

def main():
    mcp.run(transport="stdio")

if __name__ == "__main__":
    main()