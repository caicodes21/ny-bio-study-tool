export default function About() {
    return (
        <div className="flex flex-col justify-center items-center">

            <h1 className="mt-5 text-3xl text-center">Welcome to BoroBio!</h1>
            <h2 className="mt-1 text-xl text-center">A convenient study tool for the NYS Regents Biology exam</h2>

            <div className="flex flex-col gap-2 mt-5 w-8/10">
                <p>
                    In 2025, NYS implemented a new biology exam aligned to the NYS P-12 Science Learning Standards. The exam goes beyond basic recall of biology facts and emphasizing careful reading, problem-solving, and critical-thinking skills. Teachers and students across the state probably feel unclear as to how to prepare for this new exam. 
                </p>
                <p>
                    BoroBio is created to help students prepare for the exam by providing review questions for foundational biology concepts and mock exam problems to get familiar with the exam style. Hope you enjoy using it!
                </p>

                <h3 className="font-semibold text-gray-600">General Review Questions</h3>

                <p>
                    General review questions are multiple-choice questions that focus on helping students recall essential biology concepts. The state biology exam has reading passages about biology topics. A student needs to have a firm grasp of fundamental biology concepts to understand the passages - kind of like how a lawyer needs to know legal terms to read law documents. The general review questions are meant to reinforce the core knowledge expected in high school biology.
                </p>

                <h3 className="font-semibold text-gray-600">Mock Exam Questions</h3>

                <p>
                    Mock exam questions are designed to imitate the questions on the actual Regents exam. The exam is broken into sections called clusters. Each cluster contains reading passages, charts, and/or images related to a specific biological phenomenon, such as ocean acidification on marine life. In order to answer the questions, students have to reference the information provided in the cluster and connect them to biology concepts. The exam focuses on higher-level thinking skills of apply, analyze, and evaluate. Students need strong literacy and reasoning skills to perform well on the exam.
                </p>

                <h3 className="font-bold text-red-950">Disclaimer</h3>

                <p className="text-red-950">
                    This is an unofficial and independent study tool with no affiliation, endorsement, or sponsorship from the New York State Education Department (NYSED), the New York State Board of Regents, or any other educational institution or government agency. References to the Regents Examination, which is a registered program of the New York State Education Department, are purely descriptive and are used solely to indicate the subject matter this tool is designed to help students study. Use of this tool does not guarantee any particular examination result.
                </p>

                <p className="text-red-950">
                    The questions on this website are designed with the help of AI models, which can make mistakes. This website does not guarantee the accuracy of any of its content.
                </p>

            </div>


            

        </div>
    )
}