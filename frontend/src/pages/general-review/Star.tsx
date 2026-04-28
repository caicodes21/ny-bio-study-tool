interface StarProps {
    strokeColor: string | undefined,
    fillColor: string | undefined
}

export default function Star({strokeColor, fillColor}: StarProps) {
    return (
        <svg width="15" height="15" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Correct">
        <polygon
            points="6,1 7.5,4.5 11,5 8.5,7.5 9.2,11 6,9.2 2.8,11 3.5,7.5 1,5 4.5,4.5"
            fill={fillColor || "#F2C94C"}
            stroke={strokeColor || "#D4A017"}
            stroke-width="0.5"
        />
        </svg>
    )
}