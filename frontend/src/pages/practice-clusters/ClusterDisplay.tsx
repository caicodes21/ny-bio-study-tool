import type { PracticeCluster } from "../../types"

interface ClusterDisplayProps {
    practiceCluster: PracticeCluster
}

export default function ClusterDisplay({ practiceCluster }: ClusterDisplayProps) {
    console.log(practiceCluster)
    return (
        <div>

        </div>
    )
}