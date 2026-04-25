export interface MultipleChoiceQuestion {
    question: string,
    correctAnswer: string,
    wrongChoices: string[]
}

export interface ConstructedResponseQuestions {
    question: string,
    gradingCriteria: string,
    acceptableAnswers: string[]
}