import type { ClusterText } from "../../types"

interface TextProps {
    clusterText: ClusterText
}

export default function Text({ clusterText }: TextProps ) {
    return (
        <p>{clusterText.text}</p>
    )
}