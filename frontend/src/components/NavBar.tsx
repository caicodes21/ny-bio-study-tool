import { useState } from 'react'
import { Link } from 'react-router-dom'
import Chevron from './Chevron'

export default function Navbar() {

    const [dropdownOpen, setDropdownOpen] = useState(false)

    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-surface border-b border-border">
            <Link to="/" className="group flex flex-col items-center">
                <div className="flex flex-row text-2xl font-semibold">
                    <h1 className="text-green-800">Pluri</h1>
                    <h1>Study</h1>
                </div>
                <span className="block h-0.5 bg-text w-0 group-hover:w-full transition-all duration-300 mx-auto" />
            </Link>

            <div className="flex items-center">

                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-1 px-2 py-2 text-text text-lg hover:cursor-pointer"
                    >
                        Study
                        <Chevron rotate={dropdownOpen} width={12} height={12}/>
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

                <Link 
                    to="/about" 
                    className="px-4 py-2 text-lg text-text"
                >
                    About
                </Link>
            </div>


        </nav>
    )
}