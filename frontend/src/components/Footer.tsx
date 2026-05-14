import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="mt-15 flex flex-col items-center justify-center text-center text-sm text-text">
            <p className="italic">This website is not affiliated with the New York State Education department</p>
            <div className="flex gap-x-2">
                <p>Made with 💚 in NYC</p>
                <p> · </p>
                <Link to="/privacy-policy" className="underline text-gray-600">Privacy Policy</Link>
                <p> · </p>
                <Link to="/terms-of-use" className="underline text-gray-600">Terms of Use</Link>
            </div>
        </footer>
    )
}
