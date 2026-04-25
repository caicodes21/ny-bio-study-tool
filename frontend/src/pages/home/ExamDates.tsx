import { useExamDates } from "../../hooks/useExamDates"

export function ExamDates() {

    const { examDates, isLoadingExamDates, examDatesError } = useExamDates()

    if (!isLoadingExamDates && examDates) {
        const formattedDates = examDates.map((date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" , timeZone: "UTC"}))
        return <p className="text-md text-center">Upcoming Exam Dates: {formattedDates.join(" | ")}</p>
    }

    if (examDatesError) {
        console.log(examDatesError)
    }

    return <p className="text-md text-center">Upcoming Exam Dates: Loading...</p>
}