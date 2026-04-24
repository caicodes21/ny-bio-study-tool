export type FigureType = "image" | "table" | "line" | "bar"

export type QuestionType = "multiple-choice" | "constructed-response"

export type BiologyTopic = "structure_and_function" | "matter_and_energy_in_organisms_and_ecosystems" | "interdependent_relationships_in_ecosystems" | "inheritance_and_variation_of_traits" | "natural_selection_and_evolution" | "earths_systems"

export type StandardCodes = "HS-LS1-1" | "HS-LS1-2" | "HS-LS1-3" | "HS-LS1-5" | "HS-LS1-6" | "HS-LS1-7" | "HS-LS2-3" | 
                            "HS-LS2-4" | "HS-LS2-5" | "HS-LS2-1" | "HS-LS2-2" | "HS-LS2-6" | "HS-LS2-7" | "HS-LS2-8" | "HS-LS1-4" | "HS-LS3-1" | "HS-LS3-2" | "HS-LS3-3" | "HS-LS1-8" | "HS-LS4-1" | "HS-LS4-2" | "HS-LS4-3" | "HS-LS4-4" | "HS-LS4-5" | "HS-ESS2-6" | "HS-ETS1-1" | "HS-ETS1-2" | "HS-ETS1-3" | "HS-ETS1-4"

export type DifficultyLevel = "easy" | "medium"

export interface DataTableRow {
    rowNumber: number
    columnValues: Record<string, string | number>[]
}

export interface DataTable {
    columnNames: string[]
    rowValues: DataTableRow[]
}


export interface MultipleChoiceQuestion {
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

export interface ClusterTitle {
  title: string
}

export interface ClusterText {
  sentencesList: string[]
}

export interface ClusterFigure {
  figureNumber: number
  figureType: FigureType
  description: string
  dataTable: DataTable | null
  url?: string
  sources?: string[]
}

export interface ClusterMultipleChoice {
  question: string
  correctAnswer: string
  wrongChoices: string[]
  answerExplanation: string
}

export interface ClusterConstructedResponse {
  question: string
  gradingCriteria: string
  acceptableAnswers: string[]
}

export interface ClusterQuestion {
  questionNumber: number
  questionType: QuestionType
  questionContent: ClusterMultipleChoice | ClusterConstructedResponse
}

export interface ClusterSection {
  sectionNumber: number
  sectionContent: ClusterTitle | ClusterText | ClusterFigure | ClusterQuestion
}

export interface PracticeCluster {
  title: string
  topicList: BiologyTopic[]
  standardsAssessed: StandardCodes[]
  clusterSections: ClusterSection[]
}