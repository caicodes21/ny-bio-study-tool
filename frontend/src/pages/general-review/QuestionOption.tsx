import Star from "./Star"
import { snakeToCamelTopics, questionOptionPillColors } from "./utils"

interface QuestionOptionProps {
    topic: string,
    questionNumber: number,
    selectedQuestionTopic: string | null,
    selectedQuestionNumber: number | null,
    fetchQuestion: (topic: string, number: number) => void,
    reviewProgress: Record<string, number[]>
}

export default function QuestionOption({ 
    topic, 
    questionNumber, 
    selectedQuestionTopic, 
    selectedQuestionNumber, 
    fetchQuestion, 
    reviewProgress 
}: QuestionOptionProps) {

    const correctlyAnsweredQuestions = reviewProgress[topic]

    return (
        <button 
            className="flex justify-between items-center px-2 gap-x-2 border-b border-border last:border-0 min-h-12 md:py-1 w-full cursor-pointer"
            style={{
                background: selectedQuestionTopic === topic && selectedQuestionNumber === questionNumber ? "#F2F1EE" : undefined
            }}
            onClick={() => fetchQuestion(topic, questionNumber)}
        >
            <div className="flex items-center gap-x-2">
                <p>{`Question ${questionNumber}`}</p>
                {
                    correctlyAnsweredQuestions?.includes(questionNumber) &&
                    <Star 
                        strokeColor={questionOptionPillColors.find((option) => option.topic === topic)?.borderColor}
                        fillColor={questionOptionPillColors.find((option) => option.topic === topic)?.bodyColor}
                    />
                }
            </div>
            <span
                className="border rounded-full p-1 text-xs truncate max-w-50 md:max-w-100"
                style={{
                    color: questionOptionPillColors.find((option) => option.topic === topic)?.borderColor,
                    background: questionOptionPillColors.find((option) => option.topic === topic)?.bodyColor,
                    borderColor: questionOptionPillColors.find((option) => option.topic === topic)?.borderColor
                }}
            >{snakeToCamelTopics[topic]}</span>
        </button>
    )
}