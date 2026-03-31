import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import InstallPrompt from './components/InstallPrompt'
import OfflineBanner from './components/OfflineBanner'
import Home from './pages/Home'
import Adopt from './pages/Adopt'
import Foster from './pages/Foster'
import Donate from './pages/Donate'
import About from './pages/About'
import Events from './pages/Events'
import Contact from './pages/Contact'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <Router basename="/RecyclePom">
      <ScrollToTop />
      <OfflineBanner />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/foster" element={<Foster />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <InstallPrompt />
    </Router>
  )
}
