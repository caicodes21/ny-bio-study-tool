import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Navbar from "./components/NavBar"
import Footer from "./components/Footer"
import About from "./pages/about/About"
import GeneralReview from "./pages/general-review/GeneralReview"
import PracticeClusters from "./pages/practice-clusters/PracticeClusters"
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy"
import TermsOfUse from "./pages/terms-of-use/TermsOfUse"
import PauseModal from "./components/PauseModal"

function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">

        <Navbar />

        <PauseModal />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/general-review" element={<GeneralReview />} />
            <Route path="/practice-clusters" element={<PracticeClusters />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
          </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App
