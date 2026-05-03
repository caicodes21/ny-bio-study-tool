import { useState } from 'react'
import { fetchPracticeCluster } from '../services/practiceClustersServices'

export function usePracticeClusters() {

  const [practiceClusters, setPracticeClusters] = useState<any[] | null>(null)
  const [isLoadingPracticeClusters, setIsLoadingPracticeClusters] = useState(true)
  const [practiceClustersError, setPracticeClustersError] = useState(null)

  async function fetchPracticeClusters(filters: number[]) {
    setIsLoadingPracticeClusters(true)
    try {
      const clusters = await Promise.all(filters.map((num) => fetchPracticeCluster(num)))
      setPracticeClusters(clusters)
    } catch (err: any) {
      setPracticeClustersError(err)
    } finally {
      setIsLoadingPracticeClusters(false)
    }
  }

  return { practiceClusters, isLoadingPracticeClusters, practiceClustersError, fetchPracticeClusters }
  
}