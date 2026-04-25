import { useState, useEffect } from 'react'
import { fetchGeneralReviewCounts } from '../services/generalReviewServices'

export function useGeneralReviewCounts() {

  const [reviewCounts, setReviewCounts] = useState(null)
  const [isLoadingReviewCounts, setIsLoadingReviewCounts] = useState(true)
  const [reviewCountsError, setReviewCountsError] = useState(null)

  useEffect(() => {
    fetchGeneralReviewCounts()
      .then(setReviewCounts)
      .catch(setReviewCountsError)
      .finally(() => setIsLoadingReviewCounts(false))
  }, [])

  return { reviewCounts, isLoadingReviewCounts, reviewCountsError }
  
}