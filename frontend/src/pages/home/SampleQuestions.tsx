import { useGeneralReviewQuestions } from "../../hooks/useGeneralReviewQuestions"
import MultipleChoiceCard from "../../components/question-cards/MultipleChoiceCard"
import Carousel from "../../components/Carousel"

const sampleQuestionInfo: [string, number][] = [
    ["structure_and_function", 1],
    ["matter_and_energy_in_organisms_and_ecosystems", 1],
    ["interdependent_relationships_in_ecosystems", 5],
    ["inheritance_and_variation_of_traits", 1],
    ["natural_selection_and_evolution", 2]
]

export function SampleQuestions() {

    const { reviewQuestions, isLoadingQuestions, questionsError } = useGeneralReviewQuestions(sampleQuestionInfo)

    if (!isLoadingQuestions && reviewQuestions) {

        const samples = reviewQuestions.map((MCQuestion) => {
                
                const choices = [MCQuestion.correctAnswer, ...MCQuestion.wrongChoices]
                for (let i = choices.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [choices[i], choices[j]] = [choices[j], choices[i]]
                }

                return {
                    question: MCQuestion.question,
                    correctAnswer: MCQuestion.correctAnswer,
                    choices: choices,
                    answerExplanation: MCQuestion.answerExplanation
                }
            })
        
        return <Carousel slides={samples.map((question, idx) => <MultipleChoiceCard key={`question-${idx}`} question={question}/>)} />
    }

    if (questionsError) {
        console.log(questionsError)
    }

    return <Carousel slides={[<></>]}/>
}