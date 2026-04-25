import { useExamDates } from "../../hooks/useExamDates"

export function ExamDates() {

    const { examDates, isLoadingExamDates, examDatesError } = useExamDates()

    if (!isLoadingExamDates && examDates) {
        return <p className="text-md text-center">Upcoming Exam Dates: {examDates.join(" | ")}</p>
    }

    if (examDatesError) {
        console.log(examDatesError)
    }

    return <p className="text-md text-center">Upcoming Exam Dates: Loading...</p>
}