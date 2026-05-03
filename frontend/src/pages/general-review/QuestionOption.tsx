import TopicPill from "../../components/TopicPill"
import Star from "./Star"

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
                    <Star topic={topic}/>
                }
            </div>
            <TopicPill topic={topic}/>
        </button>
    )
}