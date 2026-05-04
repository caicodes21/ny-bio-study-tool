import type { ClusterImage } from "../../types";

interface FigureImageProps {
    clusterImage: ClusterImage
}

export default function FigureImage({ clusterImage }: FigureImageProps) {
    return (
        <div className="flex flex-col items-center">
            <img
                src={clusterImage.url}
                alt={clusterImage.description}
                height={350}
                width={450}
                loading="lazy" 
            />
            <p className="text-sm italic text-gray-600 self-end">Image credit: {clusterImage.sources.join(", ")}</p>
        </div>

    )
}