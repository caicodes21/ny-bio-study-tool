import Chevron from "../Chevron"

interface AnswerExplanationProps {
    show: boolean
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
    text: React.ReactNode
}

export default function AnswerKey({show, setShow, text}: AnswerExplanationProps) {
    return (
        <>
            <button
                onClick={() => setShow(!show)}
                className="flex items-center gap-1"
            >
                Answer Key
                <Chevron rotate={show} width={12} height={12}/>
            </button>
            <div
                style={{
                    maxHeight: show ? "500px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.5s ease"
                }}
            >
                {text}
            </div>
        </>
    )
}