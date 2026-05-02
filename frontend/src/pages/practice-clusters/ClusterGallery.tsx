import type { ClusterInfo } from "../../types"
import ClusterCard from "./ClusterCard"

export default function ClusterGallery(clustersInfo: ClusterInfo[]) {

    return (
        clustersInfo.map((cluster, idx) => {
            <ClusterCard 
                key={`cluster-${cluster.clusterNumber}`}
                cluster={cluster} 
            />
        })
    )

}