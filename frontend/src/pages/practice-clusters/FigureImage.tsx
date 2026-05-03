import type { ClusterImage } from "../../types";

interface FigureImageProps {
    clusterImage: ClusterImage
}

export default function FigureImage({ clusterImage }: FigureImageProps) {
    return (
        <img
            src={clusterImage.url}
            alt={clusterImage.description}
            height={350}
            width={450}
            loading="lazy" 
        />
    )
}