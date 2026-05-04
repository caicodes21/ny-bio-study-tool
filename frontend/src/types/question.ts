import type { DataTable } from "./index"

export interface MultipleChoiceQuestion {
    topic?: string,
    questionNumber: number,
    question: string,
    dataTable?: DataTable | null,
    correctAnswer: string,
    wrongChoices: string[],
    answerExplanation: string
}

export interface ConstructedResponseQuestion {
    questionNumber: number,
    question: string,
    gradingCriteria: string,
    acceptableAnswers: string[]
}