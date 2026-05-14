import { Link } from 'react-router-dom'

interface AgreementModalProps {
    onAgree: () => void
}

export default function AgreementModal({ onAgree }: AgreementModalProps) {
    return (
        <div
            className="slideDown sticky top-0 z-10 bg-lightsurface border-b border-border px-4 py-3 flex items-center justify-between gap-4"
        >
            <p className="text-sm text-text">
                By using this website, you agree to our{' '}
                <Link to="/terms-of-use" className="underline hover:text-green-800">Terms of Use</Link>
                {' '}and{' '}
                <Link to="/privacy-policy" className="underline hover:text-green-800">Privacy Policy</Link>
                . The study content on this website are generated using AI models, which can make mistakes.
            </p>
            <button
                onClick={onAgree}
                className="shrink-0 px-4 py-1.5 bg-green-800 text-white text-sm rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium hover:cursor-pointer"
            >
                I agree
            </button>
        </div>
    )
}
