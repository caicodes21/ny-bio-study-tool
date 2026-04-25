import { useState } from 'react'

interface CarouselProps {
    slides: React.ReactNode[]
}

export default function Carousel({ slides }: CarouselProps) {
    const [index, setIndex] = useState(0)

    const prev = () => setIndex(i => (i - 1 + slides.length) % slides.length)
    const next = () => setIndex(i => (i + 1) % slides.length)

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <div className="w-full border border-border rounded-md min-h-85">
                {slides[index]}
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={prev}
                    className="px-4 py-2 rounded-md border border-border text-text hover:bg-border hover:cursor-pointer"
                >
                    ←
                </button>
                <span className="text-sm text-text">
                    {index + 1} / {slides.length}
                </span>
                <button
                    onClick={next}
                    className="px-4 py-2 rounded-md border border-border text-text hover:bg-border hover:cursor-pointer"
                >
                    →
                </button>
            </div>
        </div>
    )
}
