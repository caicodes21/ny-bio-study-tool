export interface MultipleChoiceQuestion {
    question: string,
    correctAnswer: string,
    choices: string[],
    answerExplanation: string
}

export interface ConstructedResponseQuestions {
    question: string,
    gradingCriteria: string,
    acceptableAnswers: string[]
}