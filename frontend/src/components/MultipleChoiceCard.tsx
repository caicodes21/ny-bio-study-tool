import type { MultipleChoiceQuestion } from "../types/question";

interface MultipleChoiceCardProps {
    question: MultipleChoiceQuestion
}

export default function MultipleChoiceCard({question}: MultipleChoiceCardProps) {

    const choices = [question.correctAnswer, ...question.wrongChoices]
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]]
    }
    
    return (
        <div className="flex flex-col items-center">
            <p>{question.question}</p>
            {
                choices.map((choice, idx) => {
                    return (
                        <p key={`choice-${idx}`}>
                            {choice}
                        </p>
                    )
                })
            }
            <button>
                Submit
            </button>
        </div>
    )
}