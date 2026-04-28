import type { MultipleChoiceQuestion } from "../../types/question";
import { useState } from "react";
import AnswerExplanation from "./AnswerExplanation";

interface MultipleChoiceCardProps {
    question: MultipleChoiceQuestion,
    updateProgress: (topic: string, number: number) => void
}

function shuffleChoices(choices: string[]) {
    for (let i = choices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[j]] = [choices[j], choices[i]]
    }
}

export default function MultipleChoiceCard({question, updateProgress}: MultipleChoiceCardProps) {

    const choices = [question.correctAnswer, ...question.wrongChoices]
    shuffleChoices(choices)
    
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showExplanation, setShowExplanation] = useState(false)

    const handleAnswer = (choice: string) => {
        setSelectedAnswer(choice)
        setIsSubmitted(true)

        if (question.topic && selectedAnswer === question.correctAnswer) {
            updateProgress(question.topic, question.questionNumber)
        }
    }

    const refreshCard = () => {
        setSelectedAnswer(null)
        setIsSubmitted(false)
        setShowExplanation(false)
    }

    return (
        <div className="border border-border h-full w-full rounded-lg">
            <div 
                className="p-5 border-b border-border bg-surface w-full rounded-t-lg"
            >
                {question.topic && <p className="font-semibold">{`Question ${question.questionNumber}`}</p>}
                <p>{question.question}</p>
            </div>
            <div className="flex flex-col w-full rounded-b-lg">
                {
                    choices.map((choice, idx) => {
                        return (
                            <button
                                key={`choice-${idx}`}
                                className="border border-border rounded-md py-1 px-5 text-left w-11/12 mt-5 mx-auto hover:cursor-pointer hover:bg-surface"
                                style={{
                                    pointerEvents: isSubmitted ? "none" : "auto",
                                    background: isSubmitted && selectedAnswer == question.correctAnswer && choice === question.correctAnswer ? "#9FE593" : choice === selectedAnswer ? "#F2F1EE" : undefined,
                                    borderWidth: isSubmitted && selectedAnswer == question.correctAnswer && choice === question.correctAnswer ? "0px" : undefined
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
                        className="border border-border rounded-md p-1 w-1/3 self-center bg-surface my-5 hover:cursor-pointer hover:bg-surface"
                        onClick={() => refreshCard()}
                    >
                        Try Again
                    </button> : 
                    <button 
                        className="border border-border rounded-md p-1 w-1/3 self-center bg-surface my-5 hover:cursor-pointer hover:bg-surface"
                        style={{
                            pointerEvents: isSubmitted && selectedAnswer ? "none" : "auto",
                            opacity: isSubmitted && selectedAnswer === question.correctAnswer ? "50%" : undefined
                        }}
                        onClick={() => handleAnswer(selectedAnswer as string)}
                        disabled={!selectedAnswer}
                    >
                        {isSubmitted && selectedAnswer === question.correctAnswer ? "Correct!" : "Submit"}
                    </button>
                }
                {
                    isSubmitted && selectedAnswer === question.correctAnswer ?
                    <div className="ml-5 mb-2">
                        <AnswerExplanation show={showExplanation} setShow={setShowExplanation} text={question.answerExplanation} />
                    </div> :
                    <></>
                }
            </div>
        </div>
    )
}