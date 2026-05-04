import type { ConstructedResponseQuestion } from "../../types/question"
import { useRef, useState } from "react"
import AnswerKey from "./AnswerKey"

interface ConstructedResponseCardProps {
    question: ConstructedResponseQuestion
}

function formatAnswerKey(gradingCriteria: string, acceptableAnswers: string[]) {

    return (
        <div>
            <p className="font-semibold">Here is the criteria for a complete answer: </p>
            <p>{gradingCriteria}</p>
            <p className="font-semibold">Here are examples of acceptable answers:</p>
            <ul className="list-disc list-inside">
                {acceptableAnswers.map((answer, idx) => {
                    return (
                        <li key={`answer_${idx}`}>{answer}</li>
                    )
                })}
            </ul>
        </div>
    )

}

export default function ConstructedResponseCard({question}: ConstructedResponseCardProps) {

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)

    const ref = useRef<HTMLTextAreaElement>(null)
    const handleResponse = () => {
        if (ref.current) {
            ref.current.style.height = "auto"
            ref.current.style.height = `${ref.current.scrollHeight}px`
        }
    }

    return (
        <div className="flex flex-col border border-border h-full w-full md:w-9/10 mx-auto rounded-lg">
            <div 
                className="p-5 border-b border-border bg-surface rounded-t-lg"
            >
                <p className="font-semibold text-lg">Question {question.questionNumber}</p>
                {question.question.split("\n").map((chunk, idx) => <p key={`chunk_${idx}`}>{chunk.trim()}</p>)}
            </div>

            <textarea 
                className="w-full border-b border-border resize-none focus:outline-none focus:ring-2 focus:ring-gray-600 p-5"
                style={{
                    opacity: isSubmitted ? "60%" : undefined
                }}
                ref={ref} 
                onInput={handleResponse}
                disabled={isSubmitted}
            />

            {
                isSubmitted ? 
                <button
                    className="border border-border rounded-md p-1 w-1/3 self-center bg-surface my-5 hover:cursor-pointer hover:bg-surface"
                    onClick={() => setIsSubmitted(false)}
                >
                    Edit Response
                </button> :
                <button
                    className="border border-border rounded-md p-1 w-1/3 self-center bg-surface my-5 hover:cursor-pointer hover:bg-surface"
                    onClick={() => setIsSubmitted(true)}
                >
                    Submit
                </button>
            }
            {
                isSubmitted ?
                <div className="mx-5 mb-2">
                    <AnswerKey show={showAnswer} setShow={setShowAnswer} text={formatAnswerKey(question.gradingCriteria, question.acceptableAnswers)}/>
                </div> : 
                <></>
            }
        </div>
    )

}