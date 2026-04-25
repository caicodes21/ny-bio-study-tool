const BASE_API_URL = import.meta.env.VITE_API_URL
const TABLE_NAME = "practice-clusters"

export async function fetchPracticeClustersCounts() {

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

export async function fetchPracticeCluster(number: number) {

    try {

        const params = new URLSearchParams({
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
