import { useState } from 'react'

export default function AIDisclaimer() {
    
    const [visible, setVisible] = useState(sessionStorage.getItem("ai_disclaimer") === null)

    const handleAcknowledgement = () => {
        sessionStorage.setItem("ai_disclaimer", JSON.stringify({"acknowledged": true}))
        setVisible(false)
    }

    if (!visible) return null

    return (
        <>
            <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30" />
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="bg-surface border border-border rounded-xl shadow-xl max-w-md w-full p-8 flex flex-col gap-5">
                    <h2 className="text-2xl font-semibold text-center">AI-Generated Content</h2>
                    <p className="text-text text-center leading-relaxed">
                        The questions on this website are generated with the help of AI and may contain errors.
                    </p>
                    <button
                        onClick={() => handleAcknowledgement()}
                        className="mt-2 self-center px-6 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium hover:cursor-pointer"
                    >
                        I understand
                    </button>
                </div>
            </div>
        </>
    )
}
