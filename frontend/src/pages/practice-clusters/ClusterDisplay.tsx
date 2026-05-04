import type { ClusterConstructedResponse, ClusterGraph, ClusterImage, ClusterMultipleChoice, ClusterSection, ClusterTable, PracticeCluster } from "../../types"
import FigureImage from "./FigureImage"
import FigureTable from "./FigureTable"
import FigureBar from "./FigureBar"
import Text from "./Text"
import Title from "./Title"
import FigureLine from "./FigureLine"
import MultipleChoiceCard from "../../components/question-cards/MultipleChoiceCard"
import ConstructedResponseCard from "../../components/question-cards/ConstructedResponseCard"

interface ClusterDisplayProps {
    practiceCluster: PracticeCluster
}

function parseClusterFigure(section: ClusterImage | ClusterGraph | ClusterTable) {

    switch (section.figureType) {
        case "image":
            return <FigureImage clusterImage={section} />
        case "table":
            return <FigureTable clusterTable={section}/>
        case "bar":
            return <FigureBar clusterBar={section} />
        case "line":
            return <FigureLine clusterLine={section}/>
    }
}

function parseClusterQuestion(section: ClusterMultipleChoice | ClusterConstructedResponse) {

    switch (section.questionType) {
        case "multiple-choice":
            return <MultipleChoiceCard question={section}/>
        case "constructed-response":
            return <ConstructedResponseCard question={section} />
    }
}

function parseClusterSection(section: ClusterSection) {

    switch (section.sectionType) {
        case "title":
            return <Title clusterTitle={section} />
        
        case "text":
            return <Text clusterText={section}/>
        
        case "figure":
            return parseClusterFigure(section)
        
        case "question":
            return parseClusterQuestion(section)

    }
}

export default function ClusterDisplay({ practiceCluster }: ClusterDisplayProps) {

    return (
        <div className="flex flex-col justify-center items-center w-9/10 mx-auto gap-5">
            {
                practiceCluster.sectionsList.map((section) => {
                    return (
                        <div key={`cluster-section-${section.sectionNumber}`} className="w-full">
                            {parseClusterSection(section)}
                        </div>
                    )
                })
            }
        </div>
    )
}