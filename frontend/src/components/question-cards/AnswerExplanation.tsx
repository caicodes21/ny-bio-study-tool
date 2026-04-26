import Chevron from "../Chevron"

interface AnswerExplanationProps {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    text: string
}

export default function AnswerExplanation({show, setShow, text}: AnswerExplanationProps) {
    return (
        <div>
            <button
                onClick={() => setShow(!show)}
                className="flex items-center gap-1"
            >
                Explanation
                <Chevron rotate={show} width={12} height={12}/>
            </button>
            <div
                style={{
                    maxHeight: show ? "200px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.5s ease"
                }}
            >
                <p>{text}</p>
            </div>
        </div>
    )
}