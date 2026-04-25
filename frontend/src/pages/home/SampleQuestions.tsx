import { useGeneralReviewQuestions } from "../../hooks/useGeneralReviewQuestions"
import MultipleChoiceCard from "../../components/MultipleChoiceCard"
import Carousel from "../../components/Carousel"

const sampleQuestionInfo: [string, number][] = [
    ["structure_and_function", 1],
    ["matter_and_energy_in_organisms_and_ecosystems", 1],
    ["interdependent_relationships_in_ecosystems", 5],
    ["inheritance_and_variation_of_traits", 1],
    ["natural_selection_and_evolution", 1]
]

export function SampleQuestions() {

    const { reviewQuestions, isLoadingQuestions, questionsError } = useGeneralReviewQuestions(sampleQuestionInfo)

    if (!isLoadingQuestions && reviewQuestions) {
        return <Carousel slides={reviewQuestions.map((MCQuestion) => <MultipleChoiceCard question={MCQuestion} />)}/>
    }

    if (questionsError) {
        console.log(questionsError)
    }

    return <Carousel slides={[<></>]}/>
}