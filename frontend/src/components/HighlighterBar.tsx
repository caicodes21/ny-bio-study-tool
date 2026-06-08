function HighligterIcon({width}: {width: number}) {

    return (
        <svg width={width} viewBox="-40 0 160 220" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Highlighter tip icon</title>
            <desc>A black and white illustration of a highlighter marker tip, angled at 20 degrees</desc>

            <g transform="translate(60,110) rotate(-60) translate(-40,-100)">
                <rect x="12" y="5" width="56" height="90" rx="6" fill="white" stroke="black" strokeWidth="2.5"/>
                <rect x="12" y="5" width="56" height="18" rx="0" fill="black"/>
                <rect x="12" y="23" width="56" height="4" fill="black" stroke="none"/>
                <rect x="16" y="27" width="48" height="60" rx="2" fill="#f5f5f5" stroke="none"/>

                <polygon points="12,95 68,95 58,145 22,145" fill="white" stroke="black" strokeWidth="2.5" strokeLinejoin="round"/>
                <line x1="12" y1="95" x2="68" y2="95" stroke="black" strokeWidth="2.5"/>

                <rect x="22" y="145" width="36" height="16" rx="3" fill="black" stroke="black" strokeWidth="2"/>
                <ellipse cx="40" cy="161" rx="9" ry="4" fill="black" stroke="black" strokeWidth="1.5"/>

                <rect x="20" y="10" width="12" height="10" rx="1" fill="white" opacity="0.35" stroke="none"/>
            </g>
        </svg>
    )
}

function EraserIcon({width}: {width: number}) {

    return (
        <svg width={width} viewBox="210 110 260 180" role="img" xmlns="http://www.w3.org/2000/svg">
        <title>Eraser toolbar icon angled clean</title>
        <desc>A simple black and white eraser icon tilted at 20 degrees for a UI toolbar.</desc>

        <g transform="translate(340, 200) rotate(20)">
            <rect x="-110" y="-55" width="150" height="110" rx="8" fill="white" stroke="black" strokeWidth="8"/>
            <rect x="40" y="-55" width="80" height="110" rx="8" fill="black" stroke="black" strokeWidth="8"/>
        </g>
        </svg>
    )
}

const HIGHLIGHTER_COLORS = [
    {
        color: "yellow",
        highlightHexCode: "#FCF6B3"
    },
    {
        color: "blue",
        highlightHexCode: "#B3D5ED"
    },
    {
        color: "green",
        highlightHexCode: "#AEEADE"
    },
    {
        color: "clear",
        highlightHexCode: "#FFF"
    }
]

interface HighlighterBarProps {
    applyHighlights: (color: string) => void
}

export default function HighlighterBar({ applyHighlights }: HighlighterBarProps) {
    return (
        <div
            className="flex flex-row justify-center items-center border border-border bg-background rounded-full h-[50px] gap-x-2 px-2 bg-gray"
        >
            <HighligterIcon width={20} />
            <span
                className="h-7/10 w-[2px] bg-border"
            />
            <div 
                className="flex flex-row gap-x-2"
            >
                {HIGHLIGHTER_COLORS.map((option) => {

                    if (option.color !== "clear") {
                        return (
                            <button
                                key={option.color}
                                className="h-8 w-8 rounded-full cursor-pointer border-gray-500 border-2 hover:border-black"
                                style={{
                                    background: option.highlightHexCode   
                                }}
                                onClick={() => applyHighlights(option.color)}
                            />
                        )
                    }

                    return (
                        <button
                            key={option.color}
                            className="flex flex-row justify-center items-center border-gray-500 border h-8 w-8 rounded-full cursor-pointer"
                            style={{
                                background: option.highlightHexCode   
                            }}
                            onClick={() => applyHighlights(option.color)}
                        >
                            <EraserIcon width={20}/>
                        </button>
                    )

                })}
            </div>
        </div>
    )
}