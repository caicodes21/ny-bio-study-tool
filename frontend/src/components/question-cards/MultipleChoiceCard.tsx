import type { MultipleChoiceQuestion } from "../../types/question";
import { useState } from "react";
import AnswerExplanation from "./AnswerExplanation";

interface MultipleChoiceCardProps {
    question: MultipleChoiceQuestion
}

export default function MultipleChoiceCard({question}: MultipleChoiceCardProps) {

    const choices = question.choices
    
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showExplanation, setShowExplanation] = useState(false)

    const handleAnswer = (choice: string) => {
        setSelectedAnswer(choice)
        setIsSubmitted(true)
    }

    const refreshCard = () => {
        setSelectedAnswer(null)
        setIsSubmitted(false)
        setShowExplanation(false)
    }

    return (
        <div className="h-full">
            <p className="p-5 bg-surface border-b border-b-border w-full">
                {question.question}
            </p>
            <div className="flex flex-col mx-5 gap-5 my-5">
                {
                    choices.map((choice, idx) => {
                        return (
                            <button
                                key={`choice-${idx}`}
                                className="border border-border rounded-md py-1 px-5 text-left hover:cursor-pointer hover:bg-surface"
                                style={{
                                    pointerEvents: isSubmitted ? "none" : "auto",
                                    background: choice == question.correctAnswer && isSubmitted ? "#9FE593" : choice == selectedAnswer ? "#F2F1EE" : undefined,
                                    borderWidth: choice == selectedAnswer || choice == question.correctAnswer && isSubmitted ? "2px" : undefined,
                                    borderColor: choice == question.correctAnswer && isSubmitted ? "#469C65" : "#DDDBD7",
                                }}
                                onClick={() => setSelectedAnswer(choice)}
                                disabled={isSubmitted}
                            >
                                {choice}
                            </button>
                        )
                    })
                }
                {
                    isSubmitted && selectedAnswer !== question.correctAnswer ?
                    <button
                        className="border border-border rounded-md p-1 w-1/3 self-center bg-surface hover:cursor-pointer hover:bg-surface"
                        onClick={() => refreshCard()}
                    >
                        Try Again
                    </button> : 
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
                }
                {
                    isSubmitted ?
                    <AnswerExplanation show={showExplanation} setShow={setShowExplanation} text={question.answerExplanation} /> :
                    <></>
                }

            </div>


        </div>
    )
}