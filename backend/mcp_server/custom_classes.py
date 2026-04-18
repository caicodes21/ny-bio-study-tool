from typing import Literal, Optional
from pydantic import BaseModel, Field

class DataTableRow(BaseModel):
    row_number: int = Field(description="The row number, starting from 1", ge=1)
    column_values: dict[str, str | int | float] = Field(description="Maps a column to its associated value in the row")

class DataTable(BaseModel):
    column_names: list[str] = Field(description="Ordered list of column header names")
    row_values: list[DataTableRow] = Field(description="List of row objects containing row number and row cell values")

class MultipleChoice(BaseModel):
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
    data_table: Optional[DataTable] = Field(
        default=None,
        description="Optional data table if the question references tabular data; column_names is an ordered list of headers, row_values is a list of rows containing the cell values for each row"
    )
    correct_answer: str = Field(description="The correct answer choice")
    wrong_choices: list[str] = Field(description="List of incorrect answer choices")

