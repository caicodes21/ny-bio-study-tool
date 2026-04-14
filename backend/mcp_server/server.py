import httpx
from mcp.server.fastmcp import FastMCP
from mcp_tools import fetch_relevant_clusters, fetch_standards_by_code

mcp = FastMCP("pg_db_mcp")

mcp.tool()(fetch_relevant_clusters)
mcp.tool()(fetch_standards_by_code)

def main():
    mcp.run(transport="stdio")

if __name__ == "__main__":
    main()