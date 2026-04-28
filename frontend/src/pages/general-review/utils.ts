export const topicCardDescriptions = [
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
    }
]

export const questionOptionPillColors = [
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
    }
]


export const snakeToCamelTopics: Record<string, string> = {
    "inheritance_and_variation_of_traits": "Inheritance and Variation of Traits",
    "interdependent_relationships_in_ecosystems": "Interdependent Relationships in Ecosystems",
    "matter_and_energy_in_organisms_and_ecosystems": "Matter and Energy in Organisms and Ecosystems",
    "natural_selection_and_evolution": "Natural Selection and Evolution",
    "structure_and_function": "Structure and Function"
}


function createReviewTracker() {
    
    if (!sessionStorage.getItem("review_progress")) {
        const blankProgress = {
            "inheritance_and_variation_of_traits": [],
            "interdependent_relationships_in_ecosystems": [],
            "matter_and_energy_in_organisms_and_ecosystems": [],
            "natural_selection_and_evolution": [],
            "structure_and_function": []
        }

        sessionStorage.setItem("review_progress", JSON.stringify(blankProgress))
    }

}


export function getReviewTracker(): Record<string, number[]> {
    const progress = sessionStorage.getItem("review_progress")
    if (progress) {
        return JSON.parse(progress) as Record<string, number[]>
    }
    return {}
}


export default function updateReviewTracker(topic: string, number: number) {

    if (!sessionStorage.getItem("review_progress")) {
        createReviewTracker()
    }

    const progress = sessionStorage.getItem("review_progress")

    if (progress) {
        const progressJSON: Record<string, number[]> = JSON.parse(progress)
        const topicProgress = progressJSON[topic]
        if (!topicProgress.includes(number)) {
            progressJSON[topic].push(number)
        }
        const progressStr = JSON.stringify(progressJSON)
        sessionStorage.setItem("review_progress", progressStr)
    }
    
}