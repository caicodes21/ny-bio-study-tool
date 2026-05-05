# Backend for NYS Biology Study Tool

## Architecture

| Component | Tools |
| --------- | ----- |
| Database | Neon (Postgres) |
| API Layer | FastAPI |

The backend consists of a FastAPI layer that acts as a middle layer between the frontend and the database. The FastAPI layer receives requests for questions, formats the questions into a specific structure, and returns the formatted questions from the database. The database is a PostgreSQL server hosted on Neon.

The FastAPI layer currently uses asyncpg as a driver to communicate with the PostgreSQL server. If the app grows in complexity, an ORM might be incorporated to avoid writing complex SQL queries.

## Database Management

The /database sub-folder contains helper functions for directly interacting with the PostgreSQL database. This is used to manually insert new data or edit the database design.