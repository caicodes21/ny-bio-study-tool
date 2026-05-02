import { usePracticeClustersInfo } from "../../hooks/usePracticeClustersInfo"

export default function PracticeClusters() {

    const { clustersInfo, isLoadingClustersInfo, clustersInfoError } = usePracticeClustersInfo()
    if (clustersInfoError) console.log(clustersInfoError)

    


    return (
        <div>
        </div>
    )
}