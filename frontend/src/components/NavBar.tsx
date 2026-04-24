import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const [dropdownOpen, setDropdownOpen] = useState(false)

    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border">
            <Link to="/" className="group flex flex-col items-center">
                <div className="flex flex-row text-2xl font-semibold">
                    <h1>Boro</h1>
                    <h1 className="text-green-800">Bio</h1>
                </div>
                <span className="block h-0.5 bg-text w-0 group-hover:w-full transition-all duration-300 mx-auto" />
            </Link>

            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1 px-4 py-2 text-text rounded-md text-lg hover:cursor-pointer"
                >
                    Study
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    >
                        <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

            {dropdownOpen && (
                <>
                    <div className="fixed inset-0 z-0" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-md shadow-md z-10">
                        <Link
                            to="/general-review"
                            onClick={() => setDropdownOpen(false)}
                            className="block px-4 py-2 text-md text-text hover:bg-border"
                        >
                            General Review
                        </Link>
                        <Link
                            to="/practice-clusters"
                            onClick={() => setDropdownOpen(false)}
                            className="block px-4 py-2 text-md text-text hover:bg-border"
                        >
                            Practice Clusters
                        </Link>
                    </div>
                </>
            )}
            </div>
        </nav>
    )
}