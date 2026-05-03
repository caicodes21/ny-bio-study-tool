import Checkmark from "./Checkmark"

const snakeToCamelTopics: Record<string, string> = {
    "inheritance_and_variation_of_traits": "Inheritance and Variation of Traits",
    "interdependent_relationships_in_ecosystems": "Interdependent Relationships in Ecosystems",
    "matter_and_energy_in_organisms_and_ecosystems": "Matter and Energy in Organisms and Ecosystems",
    "natural_selection_and_evolution": "Natural Selection and Evolution",
    "structure_and_function": "Structure and Function",
    "earths_systems": "Earth's Systems"
}

const topicCardDescriptions = [
    {
        topic: "structure_and_function",
        subTopicList: ["Protein synthesis", "cell structure", "organ systems", "feedback mechanisms"],
        headerColor: "#4EC4A4",
        bodyColor: "#AEEADE"
    },
    {
        topic: "matter_and_energy_in_organisms_and_ecosystems",
        subTopicList: ["Cellular respiration", "photosynthesis", "energy flow", "carbon cycle"],
        headerColor: "#F2E055",
        bodyColor: "#FCF6B3"
    },
    {
        topic: "interdependent_relationships_in_ecosystems",
        subTopicList: ["Biodiversity", "ecological interactions", "human impacts"],
        headerColor: "#5598CC",
        bodyColor: "#B3D5ED"
    },
    {
        topic: "inheritance_and_variation_of_traits",
        subTopicList: ["Cellular division", "reproduction", "genetic variation"],
        headerColor: "#E8885A",
        bodyColor: "#F7CBA9"
    },
    {
        topic: "natural_selection_and_evolution",
        subTopicList: ["Natural selection", "adaptations", "common ancestry"],
        headerColor: "#E896B4",
        bodyColor: "#F8D6E3"
    },
    {
        topic: "earths_systems",
        subTopicList: ["Carbon cycle", "human impacts on carbon cycle"],
        headerColor: "#9C6E3D",
        bodyColor: "#D8B28A"
    }
]

interface TopicMenuProp {
    selectedTopics: string[],
    handleSelection: (topic: string) => void
}

export default function TopicMenu({selectedTopics, handleSelection}: TopicMenuProp) {

    return (
        <>
            <div
                className="flex gap-x-5 w-9/10 mt-5 overflow-x-auto p-2"
            >
                {
                    topicCardDescriptions.map((description, idx) => {

                        const { topic, subTopicList, headerColor, bodyColor } = description

                        return (
                            <div
                                key={`topic-card-${idx}`}
                                className="flex-1 cursor-pointer min-w-40 transition-transform hover:scale-105 duration-300"
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
                                    className="border-l border-r border-b border-border rounded-b-md p-2 min-h-50 md:min-h-40"
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