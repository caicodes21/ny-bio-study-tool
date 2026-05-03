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

interface StarProps {
    topic: string
}


export default function Star({topic}: StarProps) {
    return (
        <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Correct answer icon">
        <polygon
            points="6,1 7.5,4.5 11,5 8.5,7.5 9.2,11 6,9.2 2.8,11 3.5,7.5 1,5 4.5,4.5"
            fill={questionOptionPillColors.find((option) => option.topic === topic)?.bodyColor || "#F2C94C"}
            stroke={questionOptionPillColors.find((option) => option.topic === topic)?.borderColor || "#D4A017"}
            stroke-width="0.5"
        />
        </svg>
    )
}