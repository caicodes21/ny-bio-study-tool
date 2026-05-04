import { ExamDates } from "./ExamDates"
import QuestionTypeCard from "./QuestionTypeCard"
import { generalReviewDescription, practiceClusterDescription } from "./utils"
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
                    Prepare for the New York State Biology Regents exam
                </p>
                <ExamDates />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-15 w-full">
                <div className="w-9/10 mx-auto">
                    <QuestionTypeCard 
                        questionType="General Review" 
                        description={generalReviewDescription} 
                        svgPath={GeneralReviewSVG} 
                        destinationURL="/general-review"
                    />
                </div>

                <div className="w-9/10 mx-auto">
                    <QuestionTypeCard 
                        questionType="Practice Clusters" 
                        description={practiceClusterDescription} 
                        svgPath={PracticeClusterSVG}
                        destinationURL={"/practice-clusters"}
                    />
                </div>

            </div>



        </div>
    )
}