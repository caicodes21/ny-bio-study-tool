import Carousel from "../../components/Carousel"

export default function Home() {

    const placeholderSlides = [
        <div>Hello</div>,
        <div>World</div>
    ]

    return (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2 mx-auto w-11/12">
                <p className="text-4xl text-center">
                    Master <strong>biology</strong>,
                </p>
                <p className="text-3xl text-center">
                    one question at a time.
                </p>
                <p className="text-2xl text-center">
                    Review. Reinforce. Repeat.
                </p>
                <p className="text-md text-center">
                    Upcoming Exam Dates: June 18 | August 19
                </p>
            </div>

            <div className="mx-auto w-11/12">
                <Carousel slides={placeholderSlides}/>
            </div>

        </div>
    )
}