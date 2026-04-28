import { ExamDates } from "./ExamDates"
import Accordion from "../../components/Accordion"
import QuestionTypeCard from "./QuestionTypeCard"
import { generalReviewDescription, mockExamDescription, biologyTopicDescriptions, clusterDescriptions } from "./utils"
import PracticeClusterSVG from "../../assets/notepad.svg"
import GeneralReviewSVG from "../../assets/thought-bubble.svg"

export default function Home() {

    return (
        <div className="flex flex-col mt-5 gap-10">
            <div className="flex flex-col gap-5 mx-auto w-11/12">

                <div className="text-center">
                    <p className="text-4xl">
                        Practice <strong className="text-green-800">biology</strong> concepts,
                    </p>
                    <p className="text-3xl">
                        one question at a time.
                    </p>
                </div>

                <p className="text-xl text-center">
                    Prepare for the New York State Regents Biology exam
                </p>
                <ExamDates />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-15 w-full">
                <div className="w-9/10 mx-auto">
                    <QuestionTypeCard questionType="General Review" description={generalReviewDescription} svgPath={GeneralReviewSVG}  />
                </div>

                <div className="w-9/10 mx-auto">
                    <QuestionTypeCard questionType="Mock Exam Questions" description={mockExamDescription} svgPath={PracticeClusterSVG}  />
                </div>

                <div className="w-9/10 mx-auto">
                    <Accordion sections={biologyTopicDescriptions} title={"Topics in NYS Biology Standards"} />   
                </div>

                <div className="w-9/10 mx-auto">
                    <Accordion sections={clusterDescriptions} title={"Exam Structure Info"} />   
                </div>
            </div>



        </div>
    )
}