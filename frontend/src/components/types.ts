export type FigureType = "image" | "table" | "line" | "bar"

export type QuestionType = "multiple-choice" | "constructed-response"

export type BiologyTopic = "structure_and_function" | "matter_and_energy_in_organisms_and_ecosystems" | 
                           "interdependent_relationships_in_ecosystems" | "inheritance_and_variation_of_traits" | "natural_selection_and_evolution" | "earths_systems"

export type StandardCodes = "HS-LS1-1" | "HS-LS1-2" | "HS-LS1-3" | "HS-LS1-5" | "HS-LS1-6" | "HS-LS1-7" | "HS-LS2-3" | 
                            "HS-LS2-4" | "HS-LS2-5" | "HS-LS2-1" | "HS-LS2-2" | "HS-LS2-6" | "HS-LS2-7" | "HS-LS2-8" | "HS-LS1-4" | "HS-LS3-1" | "HS-LS3-2" | "HS-LS3-3" | "HS-LS1-8" | "HS-LS4-1" | "HS-LS4-2" | "HS-LS4-3" | "HS-LS4-4" | "HS-LS4-5" | "HS-ESS2-6" | "HS-ETS1-1" | "HS-ETS1-2" | "HS-ETS1-3" | "HS-ETS1-4"

export type DifficultyLevel = "easy" | "medium"

export type CellValue = string | number

export interface DataTable {
  columnNames: string[],
  rowValues: [number, Array<CellValue>][]
}

export interface GeneralReviewQuestion {
    questionID: number
    topic: BiologyTopic
    difficulty: DifficultyLevel
    questionNumber: number
    question: string
    dataTable: DataTable | null
    correctAnswer: string
    wrongChoices: string[]
    answerExplanation: string
}

export interface ClusterSectionBase {
  sectionNumber: number
}

export interface ClusterTitle extends ClusterSectionBase {
  sectionType: "title",
  title: string
}

export interface ClusterText extends ClusterSectionBase {
  sectionType: "text",
  text: string
}

export interface ClusterFigure extends ClusterSectionBase {
  sectionType: "figure",
  description: string
}

export interface ClusterImage {
  figureType: "image",
  url: string,
  sources: string[]
}

export interface ClusterGraph extends ClusterFigure {
  figureType: "bar" | "line",
  dataTable: DataTable
}

export interface ClusterTable extends ClusterFigure {
  figureType: "table",
  dataTable: DataTable
}

export interface ClusterMultipleChoice extends ClusterSectionBase {
  sectionType: "question",
  questionNumber: number,
  questionType: "multiple-choice"
  question: string,
  correctAnswer: string,
  wrongChoices: string[],
  answerExplanation: string
}

export interface ClusterConstructedResponse extends ClusterSectionBase {
  sectionType: "question",
  questionNumber: number,
  questionType: "constructed-response"
  question: string,
  gradingCriteria: string,
  acceptableAnswers: string[]
}


export interface PracticeCluster {
  clusterNumber: number,
  title: string,
  topicList: BiologyTopic[],
  standardsAssessed: StandardCodes[],
  sectionsList: (ClusterTitle | ClusterText | ClusterImage | ClusterGraph | ClusterTable | ClusterMultipleChoice | ClusterConstructedResponse)[]
}