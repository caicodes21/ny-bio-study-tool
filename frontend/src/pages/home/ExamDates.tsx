import { useExamDates } from "../../hooks/useExamDates"

export function SampleQuestions() {

    const { examDates, isLoadingExamDates, examDatesError } = useExamDates()

    if (isLoadingExamDates) {
        return <></>
    }

    if (!isLoadingExamDates && examDates) {
        console.log(examDates)
    }

    if (examDatesError) {
        console.log(examDatesError)
    }

    return <></>
}