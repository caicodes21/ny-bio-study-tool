const questionOptionPillColors = [
    {
        topic: "structure_and_function",
        borderColor: "#469C76",
        bodyColor: "#AEEADE"
    },
    {
        topic: "matter_and_energy_in_organisms_and_ecosystems",
        borderColor: "#DCA237",
        bodyColor: "#FCF6B3"
    },
    {
        topic: "interdependent_relationships_in_ecosystems",
        borderColor: "#3070AD",
        bodyColor: "#B3D5ED"
    },
    {
        topic: "inheritance_and_variation_of_traits",
        borderColor: "#C66526",
        bodyColor: "#F7CBA9"
    },
    {
        topic: "natural_selection_and_evolution",
        borderColor: "#C07DA5",
        bodyColor: "#F8D6E3"
    },
    {
        topic: "earths_systems",
        borderColor: "#9C6E3D",
        bodyColor: "#D8B28A"
    }
]

const snakeToCamelTopics: Record<string, string> = {
    "inheritance_and_variation_of_traits": "Inheritance and Variation of Traits",
    "interdependent_relationships_in_ecosystems": "Interdependent Relationships in Ecosystems",
    "matter_and_energy_in_organisms_and_ecosystems": "Matter and Energy in Organisms and Ecosystems",
    "natural_selection_and_evolution": "Natural Selection and Evolution",
    "structure_and_function": "Structure and Function",
    "earths_systems": "Earth's Systems"
}

interface TopicPillProps {
    topic: string,
    width?: number
}

export default function TopicPill({topic, width}: TopicPillProps) {
    return (
        <span
            className="border rounded-full p-1 text-xs truncate max-w-50 md:max-w-100"
            style={{
                color: questionOptionPillColors.find((option) => option.topic === topic)?.borderColor,
                background: questionOptionPillColors.find((option) => option.topic === topic)?.bodyColor,
                borderColor: questionOptionPillColors.find((option) => option.topic === topic)?.borderColor,
                width: width ? `${width}px` : undefined
            }}
        >
            {snakeToCamelTopics[topic]}
        </span>
    )
}