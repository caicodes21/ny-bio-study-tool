import QuestionOption from "./QuestionOption"
import { useEffect, useState } from "react"

const NUMBER_OF_QUESTIONS_PER_PAGE = 10

interface PageButtonsProps {
    currentPage: number,
    maxPage: number,
    increment: (currentPage: number) => void,
    decrement: (currentPage: number) => void
}

function PageButtons({currentPage, maxPage, increment, decrement}: PageButtonsProps) {
    return (
        <div className="flex justify-center items-center gap-4 p-2">
            <button
                onClick={() => decrement(currentPage)}
                className="px-1 rounded-md border border-border text-text hover:bg-border cursor-pointer"
                style={{
                    pointerEvents: currentPage === 0 ? "none" : "auto",
                    opacity: currentPage === 0 ? "50%" : undefined
                }}
            >
                ←
            </button>
            <span className="text-sm text-text">
                {currentPage + 1} / {maxPage + 1}
            </span>
            <button
                onClick={() => increment(currentPage)}
                className="px-1 rounded-md border border-border text-text hover:bg-border hover:cursor-pointer"
                style={{
                    pointerEvents: currentPage === maxPage ? "none" : "auto",
                    opacity: currentPage === maxPage ? "50%" : undefined
                }}
            >
                →
            </button>
        </div>
    )
}

interface TopicCount {
    topic: string,
    count: number
}

interface QuestionSideBarProps {
    topicCounts: TopicCount[],
    fetchQuestion: (topic: string, number: number) => void,
    selectedQuestionTopic: string | null,
    selectedQuestionNumber: number | null,
    reviewProgress: Record<string, number[]>
}

export default function QuestionSidebar({ topicCounts, fetchQuestion, selectedQuestionTopic, selectedQuestionNumber, reviewProgress }: QuestionSideBarProps) {

    const [currentPage, setCurrentPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)
    const [questionOptions, setQuestionOptions] = useState<React.ReactElement[]>([])
    const [totalQuestionCount, setTotalQuestionCount] = useState(0)

    useEffect(() => {

        const totalCount = topicCounts.reduce((accumulator, entry) => accumulator + entry.count, 0)
        setTotalQuestionCount(totalCount)
        const newMaxPage = Math.floor(totalCount / NUMBER_OF_QUESTIONS_PER_PAGE)
        setMaxPage(newMaxPage)
        
        if (currentPage > newMaxPage) {
            setCurrentPage(newMaxPage)
        }

        const options = topicCounts.flatMap((entry) => Array.from({length: entry.count}, (_, idx) => <QuestionOption key={`${entry.topic}-question-${idx}`} topic={entry.topic} questionNumber={idx + 1} fetchQuestion={fetchQuestion} selectedQuestionTopic={selectedQuestionTopic} selectedQuestionNumber={selectedQuestionNumber} reviewProgress={reviewProgress} />))

        setQuestionOptions(options)

    }, [topicCounts])
    
    const incrementPage = (currentPage: number) => {
        if (currentPage + 1 <= maxPage) setCurrentPage(currentPage + 1)
    }

    const decrementPage = (currentPage: number) => {
        if (currentPage > 0) setCurrentPage(currentPage - 1)
    }

    return (
        <div className="flex flex-col border border-border w-9/10 md:w-5/8 mx-auto rounded-lg">
            <div className="flex justify-between font-semibold bg-surface rounded-t-lg border-b border-border p-2">
                <h1 className="">Questions</h1>
                <h1 className={`${totalQuestionCount ? undefined : "hidden"}`}>{`${totalQuestionCount} total`}</h1>
            </div>
            <div className="flex flex-col flex-1 min-h-50">
                {
                    questionOptions.length ? 
                    <div>
                        {questionOptions.slice(currentPage * 10, currentPage * 10 + 10)}
                        <PageButtons currentPage={currentPage} maxPage={maxPage} increment={incrementPage} decrement={decrementPage} />
                    </div> :
                    <p className="m-auto md:pb-8">Select a Topic</p>
                }
            </div>

        </div>
    )
}