import type { ClusterFigure, ClusterGraph, ClusterImage, ClusterSection, ClusterTable, PracticeCluster } from "../../types"
import FigureImage from "./FigureImage"
import FigureTable from "./FigureTable"

import Text from "./Text"
import Title from "./Title"

interface ClusterDisplayProps {
    practiceCluster: PracticeCluster
}

function parseClusterFigure(section: ClusterImage | ClusterGraph | ClusterTable) {

    switch (section.figureType) {
        case "image":
            return <FigureImage clusterImage={section} />
        case "table":
            return <FigureTable clusterTable={section}/>
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

    }
}

export default function ClusterDisplay({ practiceCluster }: ClusterDisplayProps) {

    return (
        <div className="flex flex-col justify-center items-center w-9/10 mx-auto gap-5">
            {
                practiceCluster.sectionsList.map((section) => {
                    return (
                        <div key={`cluster-section-${section.sectionNumber}`}>
                            {parseClusterSection(section)}
                        </div>
                    )
                })
            }
        </div>
    )
}