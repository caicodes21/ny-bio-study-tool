interface CheckmarkProps {
    color: string
}

export default function Checkmark({color}: CheckmarkProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full p-0.5"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    )
}