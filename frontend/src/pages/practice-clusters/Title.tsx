import type { ClusterTitle } from "../../types";

interface TitleProps {
    clusterTitle: ClusterTitle
}

export default function Title({ clusterTitle }: TitleProps) {

    return (
        <h1 className="font-bold text-xl text-center">{clusterTitle.title}</h1>
    )

}