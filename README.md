# New York Biology Regents Study Tool

A study tool for the NYS Biology Regents exam

## Context

In 2025, New York State implemented a new Biology Regents exam as part of its ongoing efforts to align its science standards to the Next Generation Science Standards. Unlike the old Living Environment Regents exam, the new Biology Regents exam assesses student learning through cluster questions. A cluster is a set of reading passages and visuals about a real-world phenomenon, and students connect the given information to answer biology-themed questions. This exam is a drastic change from the older exam, which emphasized rote memorization of facts and concepts. Due to this change, many teachers and students feel uncertain about how to prepare for this new exam.

The goal of this tool is to provide support for students through two main ways:

* general review questions that reinforce foundational biology concepts
* mock exam questions that resemble cluster questions from the actual exam

## App Architecture

| Component | Tools |
| --------- | ----- |
| Frontend | Vite, React |
| Database | Neon (Postgres) |
| Middle API Layer | Hono |
| Question Generation | LangChain, large language models |

## Planned Steps

This tool is currently in development. Here are the immediate steps in the near future:

1. Build a pipeline for generating review questions and mock exam questions using large language models.
2. Build a database to store the generated questions.
3. Set up a middle API layer to handle user requests from the frontend.
4. Build a frontend for users to practice questions.

## License
 
This project is licensed under the [MIT License](LICENSE).

## Disclaimer
This is an unofficial and independent study tool with no affiliation, endorsement, or sponsorship from the New York State Education Department (NYSED), the New York State Board of Regents, or any other educational institution or government agency. References to the Regents Examination, which is a registered program of the New York State Education Department, are purely descriptive and are used solely to indicate the subject matter this tool is designed to help students study.

This tool is provided "as is" without warranty of any kind. The creator makes no guarantees regarding the accuracy or completeness of any content, and assumes no liability for any damages arising from its use. Use of this tool does not guarantee any particular examination result.