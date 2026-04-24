from typing import Literal
from pydantic import BaseModel, Field

StandardCodes = Literal[
    "HS-LS1-1", "HS-LS1-2", "HS-LS1-3", "HS-LS1-5", "HS-LS1-6", "HS-LS1-7", "HS-LS2-3", "HS-LS2-4",
    "HS-LS2-5", "HS-LS2-1", "HS-LS2-2", "HS-LS2-6", "HS-LS2-7", "HS-LS2-8", "HS-LS1-4", "HS-LS3-1",
    "HS-LS3-2", "HS-LS3-3", "HS-LS1-8", "HS-LS4-1", "HS-LS4-2", "HS-LS4-3", "HS-LS4-4", "HS-LS4-5",
    "HS-ESS2-6", "HS-ETS1-1", "HS-ETS1-2", "HS-ETS1-3", "HS-ETS1-4"
]

class MultipleChoices(BaseModel):
    correct_answer: str = Field(description="The correct answer to a multiple choice question")
    distractor_1: str = Field(description="A wrong answer choice")
    distractor_2: str = Field(description="A wrong answer choice")
    distractor_3: str = Field(description="A wrong answer choice")

class DataTableRow(BaseModel):
    row_number: int = Field(description="The row number, starting from 1", ge=1)
    column_values: dict[str, str | int | float] = Field(description="Maps a column to its associated value in the row")

class DataTable(BaseModel):
    column_names: list[str] = Field(description="Ordered list of column header names")
    row_values: list[DataTableRow] = Field(description="List of row objects containing row number and row cell values")

class GeneralReviewQuestion(BaseModel):
    topic: Literal[
        "structure_and_function",
        "matter_and_energy_in_organisms_and_ecosystems",
        "interdependent_relationships_in_ecosystems",
        "inheritance_and_variation_of_traits",
        "natural_selection_and_evolution",
        "earths_systems"
    ] = Field(description="Biology topic the question belongs to")
    difficulty: Literal["easy", "medium"] = Field(description="Difficulty level of the question")
    question: str = Field(description="Full wording of the question")
    data_table: DataTable | None = Field(
        default=None,
        description="Optional data table if the question references tabular data; column_names is an ordered list of headers, row_values is a list of rows containing the cell values for each row"
    )
    choices: MultipleChoices = Field(description="A dict of correct answer and distractor choices")
    answer_explanation: str = Field(description="An explanation of why the correct answer is right")

class ClusterTitle(BaseModel):
    title: str = Field(description="The title of the cluster")

class ClusterText(BaseModel):
    sentences_list: list[str] = Field(description="A list of the sentences in a section of text", min_length=1)

class ClusterFigure(BaseModel):
    figure_number: int = Field(description="The number of the figure, starting from 1", ge=1)
    figure_type: Literal["image", "table", "line", "bar"] = Field(description="The type of the figure")
    description: str = Field(description="A short description of the figure and its relationship to the cluster")
    data_table: DataTable | None = Field(
        default=None,
        description="An optional data table for a table, line graph, and bar graph; images do not need data table"
    )
    url: str | None = Field(
        default=None,
        description="The URL of the image, if the figure is an image"
        )
    sources: list[str] | None = Field(
        default=None,
        description="A list of the image sources, if the figure is an image"
    )

class ClusterMultipleChoice(BaseModel):
    question: str = Field(description="Full wording of the question")
    choices: MultipleChoices = Field(description="A dict of correct answer and distractor choices")
    answer_explanation: str = Field(description="An explanation of why the correct answer is right")

class ClusterConstructedResponse(BaseModel):
    question: str = Field(description="Full wording of the question")
    grading_criteria: str = Field(description="A brief description of the necessary details needed for a complete and correct answer")
    acceptable_answers: list[str] = Field(description="A list of acceptable answers to the question", min_length=2, max_length=3)

class ClusterQuestion(BaseModel):
    question_number: int = Field(description="The question number, starting from 1", ge=1)
    question_type: Literal["multiple-choice", "constructed-response"]
    question_content: ClusterMultipleChoice | ClusterConstructedResponse

class ClusterSection(BaseModel):
    section_number: int = Field(description="The number of the section, for sequential ordering purposes")
    section_content: ClusterTitle | ClusterText | ClusterFigure | ClusterQuestion
    section_type: Literal["title", "text", "figure", "question"] = Field(description="The type of the section")

class PracticeCluster(BaseModel):
    title: str = Field(description="The title of the cluster")
    topic_list: list[Literal[
        "structure_and_function",
        "matter_and_energy_in_organisms_and_ecosystems",
        "interdependent_relationships_in_ecosystems",
        "inheritance_and_variation_of_traits",
        "natural_selection_and_evolution",
        "earths_systems"
    ]] = Field(description="A list of topics related to this cluster", min_length=1)
    standards_assessed: list[StandardCodes] = Field(description="A list of standards assessed by this cluster", min_length=1)
    cluster_sections: list[ClusterSection] = Field(description="A list of the sections of the cluster", min_length=1)