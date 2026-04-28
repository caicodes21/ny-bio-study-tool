import { useState } from 'react'
import { fetchGeneralReviewQuestion } from '../services/generalReviewServices'

export function useGeneralReviewQuestions() {

  const [reviewQuestions, setReviewQuestions] = useState<any[] | null>(null)
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
  const [questionsError, setQuestionsError] = useState(null)

  async function fetchReviewQuestions(filters: [string, number][]) {
    setIsLoadingQuestions(true)
    try {
      const questions = await Promise.all(filters.map(([topic, number]) => fetchGeneralReviewQuestion(topic, number)))
      setReviewQuestions(questions)
    } catch (err: any) {
      setQuestionsError(err)
    } finally {
      setIsLoadingQuestions(false)
    }
  }

  return { reviewQuestions, isLoadingQuestions, questionsError, fetchReviewQuestions } 
  
}