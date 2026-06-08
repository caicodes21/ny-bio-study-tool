import type { ClusterConstructedResponse, ClusterGraph, ClusterImage, ClusterMultipleChoice, ClusterSection, ClusterTable, PracticeCluster } from "../../types"
import { useState, useEffect, useRef, useCallback } from "react"
import FigureImage from "./FigureImage"
import FigureTable from "./FigureTable"
import FigureBar from "./FigureBar"
import Text from "./Text"
import Title from "./Title"
import FigureLine from "./FigureLine"
import MultipleChoiceCard from "../../components/question-cards/MultipleChoiceCard"
import ConstructedResponseCard from "../../components/question-cards/ConstructedResponseCard"
import HighlighterBar from "../../components/HighlighterBar"

interface ClusterDisplayProps {
    practiceCluster: PracticeCluster
}

interface HighlightRange {
    color: string,
    range: Range
}

function parseClusterFigure(section: ClusterImage | ClusterGraph | ClusterTable) {

    switch (section.figureType) {
        case "image":
            return <FigureImage clusterImage={section} />
        case "table":
            return <FigureTable clusterTable={section}/>
        case "bar":
            return <FigureBar clusterBar={section} />
        case "line":
            return <FigureLine clusterLine={section}/>
    }
}

function parseClusterQuestion(section: ClusterMultipleChoice | ClusterConstructedResponse) {

    switch (section.questionType) {
        case "multiple-choice":
            return <MultipleChoiceCard question={section}/>
        case "constructed-response":
            return <ConstructedResponseCard question={section} />
    }
}

function parseClusterSection(section: ClusterSection) {

    switch (section.sectionType) {
        case "title":
            return <Title clusterTitle={section} />
        
        case "text":
            return <Text clusterText={section}/>
        
        case "figure":
            return parseClusterFigure(section)
        
        case "question":
            return parseClusterQuestion(section)

    }
}

export default function ClusterDisplay({ practiceCluster }: ClusterDisplayProps) {

    const [newRange, setNewRange] = useState<Range | null>(null)
    const [highlights, setHighlights] = useState<HighlightRange[]>([])
    const [toolbarPos, setToolbarPos] = useState<{ top: number, left: number } | null>(null)

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const makeHighlightRange = (startContainer: Node, endContainer: Node, start: number, end: number, color: string) => {
        const newRange = document.createRange()
        newRange.setStart(startContainer, start)
        newRange.setEnd(endContainer, end)
        return {
            color: color,
            range: newRange
        }
    }

    const evaluateSelection = useCallback(() => {

        const selection = window.getSelection()
        if (!selection || selection.isCollapsed) {
            setToolbarPos(null)
            return
        }

        const selectedRange = selection.getRangeAt(0)
        const container = selectedRange.commonAncestorContainer
        const isWithinSingleParagraph = container.nodeType === Node.TEXT_NODE ||
            (container.nodeType === Node.ELEMENT_NODE && (container as Element).tagName === "P")

        if (!isWithinSingleParagraph) {
            setToolbarPos(null)
            return
        }

        setNewRange(selectedRange)

        const rect = selectedRange.getBoundingClientRect()
        const toolbarYOffset = 40
        setToolbarPos({ top: rect.top + toolbarYOffset, left: rect.left })
    }, [])

    const handleSelectionSettled = useCallback(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(evaluateSelection, 200)
    }, [evaluateSelection])

    useEffect(() => {
        document.addEventListener("selectionchange", handleSelectionSettled)
        document.addEventListener("touchend", handleSelectionSettled)
        return () => {
            document.removeEventListener("selectionchange", handleSelectionSettled)
            document.removeEventListener("touchend", handleSelectionSettled)
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [handleSelectionSettled])

    const applyHighlights = (color: string) => {
        if (newRange) {

            const newStart = newRange.startOffset
            const newEnd = newRange.endOffset

            const filteredHighlights: HighlightRange[] = []
            for (const previous of highlights) {

                const previousColor = previous.color
                const previousStart = previous.range.startOffset
                const previousEnd = previous.range.endOffset

                // check whether the two ranges are from the same container
                // only go through the cases if the ranges are from the same container
                if (previous.range.startContainer !== newRange.startContainer) {
                    filteredHighlights.push(previous)
                    continue
                }

                // case 1: new range completely covers a previous range
                if (newStart <= previousStart && newEnd >= previousEnd) {
                    continue
                }

                // case 2: new range overlaps with the start of the previous range
                else if (newStart <= previousStart && previousStart < newEnd && newEnd < previousEnd) {
                    filteredHighlights.push(makeHighlightRange(previous.range.startContainer, previous.range.endContainer, newEnd, previousEnd, previousColor))
                }

                // case 3: new range overlaps with the end of the previous range
                else if (newStart > previousStart && newStart < previousEnd && previousEnd <= newEnd) {
                    filteredHighlights.push(makeHighlightRange(previous.range.startContainer, previous.range.endContainer, previousStart, newStart, previousColor))
                }

                // case 4: new range is inside the previous range
                else if (previousStart < newStart && newEnd < previousEnd) {
                    const trimmedRanges = [
                        makeHighlightRange(previous.range.startContainer, previous.range.endContainer, previousStart, newStart, previousColor), 
                        makeHighlightRange(previous.range.startContainer, previous.range.endContainer, newEnd, previousEnd, previousColor)
                    ]
                    filteredHighlights.push(...trimmedRanges)
                }

                // case 5: no overlap
                else {
                    filteredHighlights.push(previous)
                }
                
            }

            if (color !== "clear") {
                filteredHighlights.push({
                    color: color, 
                    range: newRange
                })
            }
            setHighlights(filteredHighlights)
            setNewRange(null)
            setToolbarPos(null)
        }
    }

    useEffect(() => {

        const yellowRanges = highlights.filter((h) => h.color === "yellow").map((h) => h.range)
        const blueRanges = highlights.filter((h) => h.color === "blue").map((h) => h.range)
        const greenRanges = highlights.filter((h) => h.color === "green").map((h) => h.range)
        CSS.highlights.set("yellow-highlight", new Highlight(...yellowRanges))
        CSS.highlights.set("blue-highlight", new Highlight(...blueRanges))
        CSS.highlights.set("green-highlight", new Highlight(...greenRanges))

    }, [highlights])

    return (
        <>
        {toolbarPos && (
            <div 
                className={`fixed px-[8px] py-[4px]`}
                style={{ 
                    top: toolbarPos.top, 
                    left: toolbarPos.left, 
                }}
            >
                <HighlighterBar applyHighlights={applyHighlights} />
            </div>
        )}
        <div
            className="flex flex-col justify-center items-center w-9/10 mx-auto gap-5"
        >
            <div
                className="self-start"
            >
                <p><strong>Directions: </strong>Read the following passage and interpret the model(s) to answer the practice questions.</p>
                <p><strong>Highlighter Tool: </strong>You can double-click and drag to highlight text.</p>
            </div>
            {
                practiceCluster.sectionsList.map((section) => {
                    return (
                        <div key={`cluster-${practiceCluster.clusterNumber}-${section.sectionType}-${section.sectionNumber}`} className="w-full">
                            {parseClusterSection(section)}
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}