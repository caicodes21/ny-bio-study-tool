export default function TermsOfUse() {
    return (
        <div className="flex flex-col justify-center items-center">

            <h1 className="mt-5 text-xl">Terms of Use</h1>
            <p className="italic text-gray-600">Last updated: June 22, 2026</p>

            <div className="flex flex-col gap-2 mt-5 w-8/10">

                <h3 className="font-semibold text-gray-600">Acceptance of Terms</h3>

                <p>
                    By accessing or using this website, you agree to these Terms of Use. If you do not agree, please discontinue use of this website.
                </p>

                <h3 className="font-semibold text-gray-600">About This Site</h3>

                <p>
                    This website is a free, publicly available, and independent educational study tool created to support students in preparing for the New York State Life Science: Biology Regents examination. This website has no affiliation, endorsement, or sponsorship from the New York State Education Department, the New York State Board of Regents, or any other educational institution or government agency. References to the Regents Examination, which is a registered program of the New York State Education Department, are purely descriptive and are used solely to indicate the subject matter this website is designed to help students study.
                </p>

                <h3 className="font-semibold text-gray-600">Permitted Use</h3>

                <p>
                    This website is intended for personal, non-commercial educational use. Website visitors may not:
                </p>

                <ul className="list-disc list-inside flex flex-col gap-1">
                    <li>Use automated tools, bots, or scrapers to access or extract content from this website</li>
                    <li>Attempt to interfere with or disrupt this website</li>
                </ul>

                <h3 className="font-semibold text-gray-600">Disclaimer of Warranties</h3>

                <p>
                    This website is provided "as is" and for educational purposes only. The study materials on this website, including practice questions and learning content, were generated with the assistance of AI models. While every effort is made to ensure the accuracy of the study materials, AI models can make mistakes. Use of this website does not guarantee any particular examination result.
                </p>

                <h3 className="font-semibold text-gray-600">Limitation of Liability</h3>

                <p>
                    The creator of this website is not liable for any damages arising from the use of or inability to access this website.
                </p>

                <h3 className="font-semibold text-gray-600">Third-Party Services</h3>

                <p>
                    This website relies on third-party hosting providers to operate. The creator is not responsible for the availability, performance, or data practices of the providers.
                </p>

               <h3 className="font-semibold text-gray-600">Changes to These Terms</h3>

                <p>
                    These terms may be updated if this website's infrastructure or features change. Any updates will be reflected on this page with a revised date.
                </p>

            </div>
        </div>
    )
}