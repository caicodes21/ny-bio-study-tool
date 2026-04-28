import { useState, useEffect } from 'react'
import { fetchPracticeClustersCounts } from '../services/practiceClustersServices'

export function usePracticeClustersCounts() {

  const [clusterCounts, setClusterCounts] = useState<any[] | null>(null)
  const [isLoadingClusterCounts, setIsLoadingClusterCounts] = useState(true)
  const [clusterCountsError, setClusterCountsError] = useState(null)

  useEffect(() => {
    fetchPracticeClustersCounts()
      .then(setClusterCounts)
      .catch(setClusterCountsError)
      .finally(() => setIsLoadingClusterCounts(false))
  }, [])

  return { clusterCounts, isLoadingClusterCounts, clusterCountsError }
  
}