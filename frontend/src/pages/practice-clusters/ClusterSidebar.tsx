import { useEffect, useState } from "react"
import type { ClusterInfo } from "../../types"
import ClusterOption from "./ClusterOption"

const NUMBER_OF_CLUSTERS_PER_PAGE = 5

interface PageButtonsProps {
    currentPage: number,
    maxPage: number,
    increment: (currentPage: number) => void,
    decrement: (currentPage: number) => void
}

function PageButtons({currentPage, maxPage, increment, decrement}: PageButtonsProps) {
    return (
        <div className="flex justify-center items-center gap-4 p-2">
            <button
                onClick={() => decrement(currentPage)}
                className="px-1 rounded-md border border-border text-text hover:bg-border cursor-pointer"
                style={{
                    pointerEvents: currentPage === 0 ? "none" : "auto",
                    opacity: currentPage === 0 ? "50%" : undefined
                }}
            >
                ←
            </button>
            <span className="text-sm text-text">
                {currentPage + 1} / {maxPage + 1}
            </span>
            <button
                onClick={() => increment(currentPage)}
                className="px-1 rounded-md border border-border text-text hover:bg-border hover:cursor-pointer"
                style={{
                    pointerEvents: currentPage === maxPage ? "none" : "auto",
                    opacity: currentPage === maxPage ? "50%" : undefined
                }}
            >
                →
            </button>
        </div>
    )
}

interface QuestionSideBarProps {
    clustersInfo: ClusterInfo[],
    selectedCluster: number | null,
    handleClusterSelection: (clusterNumber: number) => void
}


export default function ClusterSidebar({ 
    clustersInfo,
    selectedCluster,
    handleClusterSelection
}: QuestionSideBarProps) {

    const [currentPage, setCurrentPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)
    const [totalClusterCount, setTotalClusterCount] = useState(0)

    useEffect(() => {

        setTotalClusterCount(clustersInfo.length)
        const newMaxPage = Math.ceil(clustersInfo.length / NUMBER_OF_CLUSTERS_PER_PAGE) - 1
        setMaxPage(newMaxPage)

        if (currentPage > newMaxPage) {
            setCurrentPage(Math.max(0, newMaxPage))
        }

    }, [clustersInfo])
    
    const incrementPage = (currentPage: number) => {
        if (currentPage + 1 <= maxPage) setCurrentPage(currentPage + 1)
    }

    const decrementPage = (currentPage: number) => {
        if (currentPage > 0) setCurrentPage(currentPage - 1)
    }

    return (
        <div className="flex flex-col w-9/10 mx-auto rounded-lg border border-border">
            <div 
                className="flex justify-between text-lg font-semibold bg-surface border-b border-border rounded-t-lg p-2 h-12">
                <h1 className="">Clusters</h1>
                <h1 className={`${totalClusterCount ? undefined : "hidden"}`}>{`${totalClusterCount} total`}</h1>
            </div>
            <div 
                className="flex flex-col flex-1 rounded-b-lg"
            >
                {
                    clustersInfo.length ?
                    <div>
                        {clustersInfo
                            .slice(currentPage * NUMBER_OF_CLUSTERS_PER_PAGE, currentPage * NUMBER_OF_CLUSTERS_PER_PAGE + NUMBER_OF_CLUSTERS_PER_PAGE)
                            .map((cluster) => (
                                <ClusterOption
                                    key={cluster.title}
                                    cluster={cluster}
                                    selectedCluster={selectedCluster}
                                    handleClusterSelection={handleClusterSelection}
                                />
                            ))
                        }
                        <PageButtons
                            currentPage={currentPage}
                            maxPage={maxPage}
                            increment={incrementPage}
                            decrement={decrementPage}
                        />
                    </div> :
                    <p className="m-auto p-8">Select a Topic</p>
                }
            </div>

        </div>
    )
}