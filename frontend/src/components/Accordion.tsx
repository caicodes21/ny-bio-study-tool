import React from "react"
import { useState } from "react"
import Chevron from "./Chevron"

interface AccordionSection {
    sectionTitle: string
    sectionBody: React.ReactNode
}

interface AccordionProps {
    sections: AccordionSection[],
    title: string | null
}

export default function Accordion({ sections, title }: AccordionProps) {

    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const handleClick = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx)
    }

    return (
        <div className="border border-border rounded-md overflow-hidden">
            {
                title &&
                <div className="bg-surface border-b border-border px-5 py-3">
                    <p className="text-xl font-semibold">{title}</p>
                </div>
            }
            {sections.map((section, idx) => (
                <div 
                    key={idx} 
                    className="border-b border-border last:border-b-0"
                >
                    <button
                        className="w-full flex justify-between items-center px-5 py-3 bg-surface hover:cursor-pointer text-left"
                        onClick={() => handleClick(idx)}
                    >
                        <span>{section.sectionTitle}</span>
                        <Chevron rotate={openIndex === idx} width={12} height={12}/>
                    </button>
                    <div
                        style={{
                            maxHeight: openIndex === idx ? "500px" : "0px",
                            overflow: "hidden",
                            transition: "max-height 0.5s ease"
                        }}
                    >
                        <div className="px-5 py-3">{section.sectionBody}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}
