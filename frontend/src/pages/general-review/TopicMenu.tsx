import Checkmark from "./Checkmark"
import { snakeToCamelTopics } from "./utils"

interface TopicDescription {
    topic: string,
    subTopicList: string[],
    headerColor: string,
    bodyColor: string
}

interface TopicMenuProp {
    topicDescriptionsList: TopicDescription[],
    selectedTopics: string[],
    handleSelection: (topic: string) => void
}

export default function TopicMenu({topicDescriptionsList, selectedTopics, handleSelection}: TopicMenuProp) {

    return (
        <>
            <div
                className="flex gap-x-5 w-9/10 mt-5 overflow-x-auto"
            >
                {
                    topicDescriptionsList.map((description, idx) => {

                        const { topic, subTopicList, headerColor, bodyColor } = description

                        return (
                            <div
                                key={`topic-card-${idx}`}
                                className="flex-1 cursor-pointer min-w-40"
                                onClick={() => {handleSelection(topic)}}
                            >
                                <div
                                    className="flex items-center border border-border rounded-t-md bg-surface p-2 h-8"
                                    style={{
                                        background: selectedTopics.includes(topic) ? headerColor : undefined,
                                        borderColor: selectedTopics.includes(topic) ? headerColor : undefined
                                    }}
                                >
                                    <span className="w-5 h-5 rounded-full border border-border bg-white">
                                        <Checkmark color={selectedTopics.includes(topic) ? headerColor : "#FFF"}/>
                                    </span>
                                </div>
                                <div
                                    className="border-l border-r border-b border-border rounded-b-md p-2 min-h-50 md:min-h-36"
                                    style={{
                                        background: selectedTopics.includes(topic) ? bodyColor : undefined,
                                        borderColor: selectedTopics.includes(topic) ? bodyColor : undefined
                                    }}
                                >
                                    <p className="font-semibold">{snakeToCamelTopics[topic]}</p>
                                    <p>{subTopicList.join(", ")}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <p className="block sm:hidden text-sm w-9/10 mt-1">Scroll for more topics →</p>
        </>
    )
}