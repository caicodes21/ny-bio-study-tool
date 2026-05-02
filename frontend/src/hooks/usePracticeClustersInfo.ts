import { useState, useEffect } from 'react'
import { fetchPracticeClustersInfo } from '../services/practiceClustersServices'

export function usePracticeClustersInfo() {

  const [clustersInfo, setClustersInfo] = useState<any[] | null>(null)
  const [isLoadingClustersInfo, setIsLoadingClustersInfo] = useState(true)
  const [clustersInfoError, setClustersInfoError] = useState(null)

  useEffect(() => {
    fetchPracticeClustersInfo()
      .then(setClustersInfo)
      .catch(setClustersInfoError)
      .finally(() => setIsLoadingClustersInfo(false))
  }, [])

  return { clustersInfo, isLoadingClustersInfo, clustersInfoError }
  
}