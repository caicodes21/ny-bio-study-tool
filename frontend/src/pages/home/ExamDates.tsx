import { useExamDates } from "../../hooks/useExamDates"

export function ExamDates() {

    const { examDates, isLoadingExamDates, examDatesError } = useExamDates()

    if (!isLoadingExamDates && examDates) {
        const formattedDates = examDates.map((date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" , timeZone: "UTC"}))
        return (
            <div className="text-lg text-center">
                <p>Upcoming Exam Dates:</p>
                <p>{formattedDates.join(" | ")}</p>
            </div>
        )
    }

    if (examDatesError) {
        console.log(examDatesError)
    }

    return <p className="text-md text-center">Upcoming Exam Dates: Loading...</p>
}