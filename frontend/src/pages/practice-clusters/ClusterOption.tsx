import TopicPill from "../../components/TopicPill"
import type { ClusterInfo } from "../../types"

interface ClusterOptionProps {
    cluster: ClusterInfo,
    selectedCluster: number | null,
    handleClusterSelection: (clusterNumber: number) => void
}

export default function ClusterOption({ 
    cluster,
    selectedCluster,
    handleClusterSelection
}: ClusterOptionProps) {

    return (
        <div 
            className="flex flex-col border-b last:border-0 border-border p-2 gap-4"
            style={{
                background: cluster.clusterNumber === selectedCluster ? "#F2F1EE" : undefined
            }}
        >
            <div className="flex justify-between">
                <h1 className="font-bold">{cluster.title}</h1>
                <button
                    className="border border-border px-3 rounded-md cursor-pointer h-8 transition-transform hover:scale-105 duration-300"
                    onClick={() => handleClusterSelection(cluster.clusterNumber)}
                    style={{
                        background: cluster.clusterNumber === selectedCluster ? "#FFF" : undefined
                    }}
                >
                    Select
                </button>
            </div>
            <div className="flex flex-row gap-2">
                <p>{cluster.multipleChoiceCount} multiple-choice and {cluster.constructedResponseCount} constructed response</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {cluster.topicList.map((topic, idx) => <TopicPill key={`${topic}-${idx}`} topic={topic} />)}
            </div>
        </div>
    )
}