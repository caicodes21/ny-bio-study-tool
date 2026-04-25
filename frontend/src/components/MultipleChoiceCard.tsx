import type { MultipleChoiceQuestion } from "../types/question";
import { useState } from "react";

interface MultipleChoiceCardProps {
    question: MultipleChoiceQuestion
}

export default function MultipleChoiceCard({question}: MultipleChoiceCardProps) {

    const choices = [question.correctAnswer, ...question.wrongChoices]
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]]
    }
    
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleAnswer = (choice: string) => {
        setSelectedAnswer(choice)
        setIsSubmitted(true)
    }

    return (
        <div className="h-full">
            <p
                className="p-5 border-b border-b-border w-full"
            >
                {question.question}
            </p>
            <div
                className="flex flex-col mx-5 gap-5 my-5"
            >
                {
                    choices.map((choice, idx) => {
                        return (
                            <button
                                key={`choice-${idx}`}
                                className="border border-border rounded-md py-1 px-5 text-left hover:cursor-pointer hover:bg-surface"
                                style={{
                                    opacity: isSubmitted ? "50%" : "",
                                    pointerEvents: isSubmitted ? "none" : "auto",
                                    background: choice == selectedAnswer ? "#F2F1EE" : ""
                                }}
                                onClick={() => setSelectedAnswer(choice)}
                                disabled={isSubmitted}
                            >
                                {choice}
                            </button>
                        )
                    })
                }
                <button 
                    className="border border-border rounded-md p-1 w-1/3 self-center bg-surface hover:cursor-pointer hover:bg-surface"
                    style={{
                        pointerEvents: isSubmitted && selectedAnswer ? "none" : "auto"
                    }}
                    onClick={() => handleAnswer(selectedAnswer as string)}
                    disabled={!selectedAnswer}
                >
                    Submit
                </button>
            </div>


        </div>
    )
}