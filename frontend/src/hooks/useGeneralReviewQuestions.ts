import { useState, useEffect } from 'react'
import { fetchGeneralReviewQuestion } from '../services/generalReviewServices'

export function useGeneralReviewQuestions(filters: [string, number][]) {

  const [reviewQuestions, setReviewQuestions] = useState<any[] | null>(null)
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true)
  const [questionsError, setQuestionsError] = useState(null)

  useEffect(() => {
    Promise.all(filters.map(([topic, number]) => fetchGeneralReviewQuestion(topic, number)))
      .then(setReviewQuestions)
      .catch(setQuestionsError)
      .finally(() => setIsLoadingQuestions(false))
  }, [filters])

  return { reviewQuestions, isLoadingQuestions, questionsError } 
  
}