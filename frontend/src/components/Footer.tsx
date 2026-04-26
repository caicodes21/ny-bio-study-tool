import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mt-15 flex flex-col items-center justify-center text-center text-sm text-text">
            <p className="italic">Not affiliated or sponsored by the New York State Education department</p>
            <div className="flex gap-x-2">
                <p>Made with 💚 in NYC</p>
                <p> | </p>
                <Link to="/about" className="text-gray-500 underline">About</Link>
            </div>
        </footer>
    )
}
