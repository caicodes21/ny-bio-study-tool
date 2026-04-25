import { useState, useEffect } from 'react'
import { fetchPracticeCluster } from '../services/practiceClustersServices'

export function usePracticeClusters(clusterNumbers: number[]) {

  const [practiceClusters, setPracticeClusters] = useState<any[] | null>(null)
  const [isLoadingPracticeClusters, setIsLoadingPracticeClusters] = useState(true)
  const [practiceClustersError, setPracticeClustersError] = useState(null)

  useEffect(() => {
    Promise.all(clusterNumbers.map((number) => fetchPracticeCluster(number)))
      .then(setPracticeClusters)
      .catch(setPracticeClustersError)
      .finally(() => setIsLoadingPracticeClusters(false))
  }, [])

  return { practiceClusters, isLoadingPracticeClusters, practiceClustersError }
  
}