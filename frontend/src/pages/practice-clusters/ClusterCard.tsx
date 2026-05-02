import type { ClusterInfo } from "../../types";

interface ClusterCardProps {
    cluster: ClusterInfo
}

export default function ClusterCard({cluster}: ClusterCardProps) {

    return (
        <div className="flex flex-col text-start">
            <h1 className="font-semibold">{cluster.title}</h1>
            <div className="flex gap-1">
                <p>{cluster.multipleChoiceCount} MC</p>
                <p>{cluster.constructedResponseCount} CR</p>
            </div>
        </div>
    )

}