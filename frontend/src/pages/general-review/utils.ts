function createReviewTracker() {
    
    if (!sessionStorage.getItem("review_progress")) {
        const blankProgress = {
            "inheritance_and_variation_of_traits": [],
            "interdependent_relationships_in_ecosystems": [],
            "matter_and_energy_in_organisms_and_ecosystems": [],
            "natural_selection_and_evolution": [],
            "structure_and_function": [],
            "earths_systems": []
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