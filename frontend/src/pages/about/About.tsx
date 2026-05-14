import Accordion from "../../components/Accordion"
import { biologyTopicDescriptions, examDescriptions } from "./utils"

export default function About() {
    return (
        <div className="flex flex-col justify-center items-center">

            <h1 className="mt-5 text-3xl text-center">Welcome to PluriStudy!</h1>
            <h2 className="mt-1 text-xl text-center">A convenient study tool for the NYS Life Science: Biology Regents exam</h2>

            <div className="flex flex-col gap-2 mt-5 w-8/10">
                <p>
                    In 2025, NYS began to implement the Life Science: Biology Regents exam aligned to the NYS P-12 Science Learning Standards <span> </span>
                    <a
                        href="https://www.nysed.gov/standards-instruction/science"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                    >
                        (click here)
                    </a>
                    . The exam goes beyond basic recall of biology facts. It emphasizes careful reading, problem-solving, and critical-thinking skills. This is a drastic deviation from the style of the previous Living Environment Regents exam. 
                </p>

                <p>
                    PluriStudy is created to help students prepare for this new exam by providing general review questions and practice exam materials. Hope you enjoy using it!
                </p>

                <h3 className="font-semibold text-gray-600">General Review Questions</h3>

                <p>
                    General review questions on PluriStudy are multiple-choice questions that focus on helping students recall essential biology concepts. The Life Science: Biology Regents exam has reading passages about biology topics. A student needs to have a firm grasp of fundamental biology concepts to understand the passages - kind of like how a lawyer needs to know legal terms to read law documents. The general review questions are meant to reinforce the essential knowledge expected in high school biology.
                </p>

                <h3 className="font-semibold text-gray-600">Practice Cluster Questions</h3>

                <p>
                    Practice cluster questions on PluriStudy are designed to imitate the questions on the actual Regents exam. The exam is broken into sections called clusters. Each cluster contains reading passages, charts, and/or images related to a specific biological phenomenon, such as effects of deforestation on native species. In order to answer the questions, students have to reference the information provided in the cluster and connect them to biology concepts. The cluster questions require higher-level thinking skills, such as apply, analyze, and evaluate. Students need strong literacy and reasoning skills to excel on the exam.
                </p>

                <h3 className="font-semibold text-gray-600">Information about the Life Science: Biology Regents Exam</h3>

                <p>
                    The NYS Life Science: Biology Regents exam assesses students' learning of high school-level life science concepts. It is offered three times every year: January, June, and August.

                    Here are some common questions regarding the exam:
                </p>

                <div>
                    <Accordion sections={examDescriptions} title={null} />   
                </div>

                <p>
                    The NYS high school biology curriculum is aligned with a popular set of standards known as the Next Generation Science Standards, which emphasize scientific inquiry and critical thinking.

                    Here are the topics covered in the biology curriculum:
                </p>

                <div>
                    <Accordion sections={biologyTopicDescriptions} title={null} />
                    <p className="text-sm italic">
                        The Life Science: Biology Regents exam will additionally assess skills and concepts related to these two topics: Earth's Systems and Engineering, Technology, and the Applications of Science.
                    </p>
                </div>

            </div>


            

        </div>
    )
}