const BASE_API_URL = import.meta.env.VITE_API_URL
const TABLE_NAME = "general-review"

export async function fetchGeneralReviewCounts() {

    try {

        const res = await fetch(`${BASE_API_URL}${TABLE_NAME}`)

        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`)
        }

        const result = await res.json()

        return result

    } catch (error) {
        
        console.error(error)
    
    }
}

export async function fetchGeneralReviewQuestion(topic: string, number: number) {

    try {

        const params = new URLSearchParams({
            topic: topic,
            number: String(number)
        })

        const res = await fetch(`${BASE_API_URL}${TABLE_NAME}?${params}`)
        
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`)
        }

        const result = await res.json()

        return result

    } catch (error) {
        
        console.error(error)
    
    }
}
