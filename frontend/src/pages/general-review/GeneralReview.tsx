import MultipleChoiceCard from "../../components/question-cards/MultipleChoiceCard"
import { useGeneralReviewCounts } from "../../hooks/useGeneralReviewCounts"
import { useGeneralReviewQuestions } from "../../hooks/useGeneralReviewQuestions"
import QuestionSidebar from "./QuestionSidebar"
import TopicMenu from "../../components/topic-menu/TopicMenu"
import { getReviewTracker } from "./utils"
import { useState } from "react"
import updateReviewTracker from "./utils"

export default function GeneralReview() {

    const { reviewCounts, isLoadingReviewCounts, reviewCountsError } = useGeneralReviewCounts()
    const { reviewQuestions, isLoadingQuestions, questionsError, fetchReviewQuestions } = useGeneralReviewQuestions()

    if (reviewCountsError) console.log(reviewCountsError)
    if (questionsError) console.log(questionsError)

    const [selectedTopics, setSelectedTopics] = useState<string[]>([])
    const [questionTopic, setQuestionTopic] = useState<string | null>(null)
    const [questionNumber, setQuestionNumber] = useState<number | null>(null)
    const [progressTracker, setProgressTracker] = useState<Record<string, number[]>>(getReviewTracker())

    const handleTopicSelection = (topic: string) => {

        if (!selectedTopics.includes(topic)) {
            setSelectedTopics([...selectedTopics, topic])
        } else {
            setSelectedTopics(selectedTopics.filter((val) => val !== topic))
        }
    }

    const handleQuestionSelection = (topic: string, number: number) => {
        if (topic !== questionTopic || number !== questionNumber) {
            fetchReviewQuestions([[topic, number]])
            setQuestionTopic(topic)
            setQuestionNumber(number)
        }
    }

    const updateProgress = (topic: string, number: number) => {
        updateReviewTracker(topic, number)
        setProgressTracker(getReviewTracker())
    }

    return (
        <div className="flex flex-col items-center">
            <TopicMenu selectedTopics={selectedTopics} handleSelection={handleTopicSelection}/>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 md:items-start w-full gap-y-5">
                {
                    !isLoadingReviewCounts && reviewCounts && 
                    <QuestionSidebar 
                        topicCounts={reviewCounts.filter((entry) => selectedTopics.includes(entry.topic))} fetchQuestion={handleQuestionSelection} 
                        selectedQuestionTopic={questionTopic} 
                        selectedQuestionNumber={questionNumber} 
                        reviewProgress={progressTracker} 
                    />
                }
                {
                    !isLoadingQuestions && reviewQuestions?.length === 1 && 
                    <div className="w-9/10 mx-auto">
                        <MultipleChoiceCard 
                            question={reviewQuestions[0]} 
                            updateProgress={updateProgress} 
                        />
                    </div>
                }
            </div>


        </div>
    )
}