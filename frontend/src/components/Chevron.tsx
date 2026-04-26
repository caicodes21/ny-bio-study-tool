interface ChevronProps {
    rotate: boolean,
    width: number,
    height: number
}

export default function Chevron({rotate, width, height}: ChevronProps) {
    return (
        <svg
            width={`${width}`}
            height={`${height}`}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform ${rotate ? 'rotate-180' : ''}`}
        >
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}