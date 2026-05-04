import { Link } from "react-router-dom"

interface QuestionTypeCardProps {
    questionType: string,
    description: string,
    svgPath: string
    destinationURL: string
}

export default function QuestionTypeCard({ questionType, description, svgPath, destinationURL }: QuestionTypeCardProps) {

    return (
        <Link 
            to={destinationURL}
            className="flex justify-center items-center px-5 border-2 border-border rounded-lg hover:cursor-pointer hover:scale-105 active:bg-surface transition-transform duration-300"
        >
            <img src={svgPath} height={100} width={100} alt={`An icon for ${questionType}`}/>
            <div className="flex flex-col p-2">
                <h1 className="text-xl font-semibold">{questionType}</h1>
                <p className="text-lg">{description}</p>
            </div>
        </Link>
    )
}