import AgreementModal from "../../components/AgreementModal"
import { useAgreement } from "../../hooks/useAgreement"

export default function PracticeClusters() {

    const [agreed, setAgreed] = useAgreement()

    return (
        <div>
            {!agreed && <AgreementModal onAgree={() => setAgreed()} />}
            <div className={`flex flex-col items-center blur-sm pointer-events-none select-none`} />
        </div>
    )
}