import { usePracticeClustersInfo } from "../../hooks/usePracticeClustersInfo"
import TopicMenu from "../../components/topic-menu/TopicMenu"
import { useState, useEffect } from "react"
import ClusterSidebar from "./ClusterSidebar"
import type { ClusterInfo } from "../../types"
import { usePracticeClusters } from "../../hooks/usePracticeClusters"
import ClusterDisplay from "./ClusterDisplay"

function filterClusterInfo(clustersInfo: ClusterInfo[] | null, targetTopics: string[]) {

    if (!clustersInfo) return []

    return clustersInfo.filter((cluster) => {

        for (const topic of cluster.topicList) {
            if (targetTopics.includes(topic)) {
                return true
            }
        }

        return false
    })
}

export default function PracticeClusters() {

    const { clustersInfo, isLoadingClustersInfo, clustersInfoError } = usePracticeClustersInfo()
    const { practiceClusters, isLoadingPracticeClusters, practiceClustersError, fetchPracticeClusters } = usePracticeClusters()
    if (clustersInfoError) console.log(clustersInfoError)
    if (practiceClustersError) console.log(practiceClustersError)

    const [selectedTopics, setSelectedTopics] = useState<string[]>([])
    const [selectedCluster, setSelectedCluster] = useState<number | null>(null)

    const handleTopicSelection = (topic: string) => {
        if (!selectedTopics.includes(topic)) {
            setSelectedTopics([...selectedTopics, topic])
        } else {
           setSelectedTopics(selectedTopics.filter((selected) => selected != topic))
        }
    }

    const handleClusterSelection = (clusterNumber: number) => {
        if (selectedCluster === clusterNumber) setSelectedCluster(null)
        else setSelectedCluster(clusterNumber)
    }

    useEffect(() => {
        if (selectedCluster) {
            fetchPracticeClusters([selectedCluster])
        }
    }, [selectedCluster])

    return (
        <div className="flex flex-col items-center">
            <TopicMenu selectedTopics={selectedTopics} handleSelection={handleTopicSelection}/>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-[30%_70%] md:items-start w-full gap-y-5">
                <ClusterSidebar 
                    clustersInfo={filterClusterInfo(clustersInfo, selectedTopics)}
                    selectedCluster={selectedCluster}
                    handleClusterSelection={handleClusterSelection}
                />
                {
                    practiceClusters?.length && <ClusterDisplay practiceCluster={practiceClusters[0]} />
                }
            </div>

        </div>
    )
}