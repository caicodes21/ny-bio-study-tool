import { useState, useEffect } from 'react'
import { fetchExamDates } from '../services/examDatesServices'

export function useExamDates() {

  const [examDates, setExamDates] = useState<any[] | null>(null)
  const [isLoadingExamDates, setIsLoadingExamDates] = useState(true)
  const [examDatesError, setExamDatesError] = useState(null)

  useEffect(() => {
    fetchExamDates()
      .then(setExamDates)
      .catch(setExamDatesError)
      .finally(() => setIsLoadingExamDates(false))
  }, [])

  return { examDates, isLoadingExamDates, examDatesError }
  
}