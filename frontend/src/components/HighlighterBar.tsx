function HighligterIcon({width}: {width: number}) {

    return (
        <svg width={width} viewBox="0 0 120 220" role="img" xmlns="http://www.w3.org/2000/svg">
            <title>Highlighter tip icon</title>
            <desc>A black and white illustration of a highlighter marker tip, shown at a slight angle</desc>

            <g transform="translate(60,110) rotate(-20) translate(-40,-100)">
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

const HIGHLIGHTER_COLORS = [
    {
        color: "yellow",
        borderHexCode: "#DCA237",
        highlightHexCode: "#FCF6B3"
    },
    {
        color: "blue",
        borderHexCode: "#3070AD",
        highlightHexCode: "#B3D5ED"
    },
    {
        color: "green",
        borderHexCode: "#469C76",
        highlightHexCode: "#AEEADE"
    }
]

interface HighlighterBarProps {
    applyHighlights: (color: string) => void
}

export default function HighlighterBar({ applyHighlights }: HighlighterBarProps) {
    return (
        <div
            className="flex flex-row justify-center items-center border border-border bg-background rounded-full h-[50px] gap-x-5 px-5 bg-gray"
        >
            <HighligterIcon width={20} />
            <span
                className="h-7/10 w-[2px] bg-border"
            />
            <div 
                className="flex flex-row gap-x-5"
            >
                {HIGHLIGHTER_COLORS.map((option) => {
                    return (
                        <button
                            key={option.color}
                            className="h-8 w-8 rounded-full cursor-pointer hover:border-gray-500 hover:border-2"
                            style={{
                                background: option.highlightHexCode   
                            }}
                            onClick={() => applyHighlights(option.color)}
                        >
                        </button>
                    )
                })}
            </div>
        </div>
    )
}