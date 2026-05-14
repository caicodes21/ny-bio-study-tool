# New York State Biology Regents Study Tool

A study tool for the NYS Biology Regents exam

## Context

In 2025, New York State implemented a new Biology Regents exam as part of its ongoing efforts to align its science standards to the Next Generation Science Standards. Unlike the old Living Environment Regents exam, the new Biology Regents exam assesses student learning through clusters. A cluster is a set of reading passages and visuals about a real-world phenomenon, and students connect the given information to answer biology questions. This exam is a drastic change from the older exam, which emphasized rote memorization of facts and concepts. Due to this change, many teachers and students feel uncertain about how to prepare for this new exam.

The goal of this tool is to provide support for students through two main ways:

* general review questions that reinforce foundational biology concepts
* practice cluster questions that resemble the questions from the actual exam

## User-Friendly UI

Users can choose from a diverse set of AI-generated biology review questions.
![General Review](https://res.cloudinary.com/dcuiyqf9w/video/upload/c_scale,h_400/e_loop/dl_350,vs_1.5s/general_review_ebzcae.gif)

The practice clusters are made with AI-assistance. Users can answer multiple-choice and constructed-response questions about real-world phenomena.
![Practice Clusters](https://res.cloudinary.com/dcuiyqf9w/video/upload/c_scale,h_400/e_loop/dl_350,vs_1.5s/practice_clusters_x0y9u7.gif)

## App Architecture

                    ┌─────────────────────┐
                    │      FRONTEND       │
                    │  Vite · React       │
                    │  Tailwind · Chart.js│
                    └────────┬────────────┘
                             │
                    ┌────────▼────────────┐
                    │     API LAYER       │
                    │      FastAPI        │
                    └────────┬────────────┘
                             │
                    ┌────────▼────────────┐
                    │     DATABASE        │
                    │  Neon · PostgreSQL  │
                    └─────────────────────┘
                             ▲
                             │ 
                    ┌────────┴────────────┐
                    │  QUESTION GENERATION│
                    │ Chainlit · LangChain│
                    │       · LLM         │
                    └─────────────────────┘

| Component | Tools |
| --------- | ----- |
| Frontend | Vite, React, Tailwind, Chart.js |
| Database | Neon (Postgres) |
| API Layer | FastAPI |
| Question Generation | Chainlit and LangChain app with MCP server to the database |

The frontend communicates with the FastAPI layer to fetch questions from the PostgreSQL database hosted on Neon. The Chainlit app can be connected to the MCP server to fetch information related to the NYS biology curriculum. This way, the LLM models can generate relevant questions. The MCP server allows the use of other AI tools, such as Claude Desktop, to generate questions and save them in the database.

## Planned Steps

This tool is currently in development. Here are the steps for the near future:

* Improve the quality of the general review questions and practice clusters.
* Add helpful study tools (e.g. highlighter).
* Add features to the FastAPI layer to avoid database fetch rate limits.

## Completed Steps

~~Build a pipeline for generating review questions and mock exam questions using large language models.~~

~~Build a database to store the generated questions.~~

~~Set up a middle API layer to handle user requests from the frontend.~~

~~Build a frontend for users to practice questions.~~

## License
 
This project is licensed under the [MIT License](LICENSE).

## Disclaimer
This is an unofficial and independent study tool with no affiliation, endorsement, or sponsorship from the New York State Education Department (NYSED), the New York State Board of Regents, or any other educational institution or government agency. References to the Regents Examination, which is a registered program of the New York State Education Department, are purely descriptive and are used solely to indicate the subject matter this tool is designed to help students study.

This tool is provided "as is" without warranty of any kind. The creator makes no guarantees regarding the accuracy or completeness of any content, and assumes no liability for any damages arising from its use. Use of this tool does not guarantee any particular examination result.
