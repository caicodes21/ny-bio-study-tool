import type { MultipleChoiceQuestion } from "../../types/question";
import { useState } from "react";
import AnswerExplanation from "./AnswerExplanation";
import type { DataTable } from "../../types";

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

function MCDataTable({columnNames, rowValues}: DataTable) {

    return (
        <table className="text-center border border-black">
            <thead>
                <tr className="border-b">
                    {columnNames.map((col) => <th key={`${col}`} className="border-r">{col}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    rowValues.map((row) => {

                        const [rowNum, cellValues] = [...row]

                        return (
                            <tr key={`row-${rowNum}`} className="border-b">
                                {
                                    cellValues.map((val, idx) => 
                                    <td key={`row-${rowNum}-col-${idx+1}`} className="border-r">
                                        {val}
                                    </td>)
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )

}

export default function MultipleChoiceCard({question, updateProgress}: MultipleChoiceCardProps) {

    const { topic, questionNumber, correctAnswer, wrongChoices, dataTable, answerExplanation } = question
    const choices = [correctAnswer, ...wrongChoices]
    shuffleChoices(choices)
    
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showExplanation, setShowExplanation] = useState(false)

    const handleAnswer = (choice: string) => {
        setSelectedAnswer(choice)
        setIsSubmitted(true)

        if (topic && selectedAnswer === correctAnswer) {
            updateProgress(topic, questionNumber)
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
                className="flex flex-col p-5 border-b border-border bg-surface w-full rounded-t-lg"
            >
                {topic && <p className="font-semibold">{`Question ${questionNumber}`}</p>}
                <p>{question.question}</p>
                {dataTable && <MCDataTable columnNames={dataTable.columnNames} rowValues={dataTable.rowValues} />}
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
                                    background: isSubmitted && selectedAnswer == correctAnswer && choice === correctAnswer ? "#9FE593" : choice === selectedAnswer ? "#F2F1EE" : undefined,
                                    borderWidth: isSubmitted && selectedAnswer == correctAnswer && choice === correctAnswer ? "0px" : undefined,
                                    textDecoration: isSubmitted && choice === selectedAnswer && selectedAnswer !== correctAnswer ? "line-through" : undefined
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
                    isSubmitted && selectedAnswer !== correctAnswer ?
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
                            opacity: isSubmitted && selectedAnswer === correctAnswer ? "50%" : undefined
                        }}
                        onClick={() => handleAnswer(selectedAnswer as string)}
                        disabled={!selectedAnswer}
                    >
                        {isSubmitted && selectedAnswer === correctAnswer ? "Correct!" : "Submit"}
                    </button>
                }
                {
                    isSubmitted && selectedAnswer === correctAnswer ?
                    <div className="ml-5 mb-2">
                        <AnswerExplanation show={showExplanation} setShow={setShowExplanation} text={answerExplanation} />
                    </div> :
                    <></>
                }
            </div>
        </div>
    )
}