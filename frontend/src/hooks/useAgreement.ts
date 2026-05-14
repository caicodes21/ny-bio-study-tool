import { useState } from 'react'

export function useAgreement() {
    const [agreed, setAgreedState] = useState(() => sessionStorage.getItem('agreePolicies') === 'true')

    const setAgreed = () => {
        sessionStorage.setItem('agreePolicies', 'true')
        setAgreedState(true)
    }

    return [agreed, setAgreed] as const
}
