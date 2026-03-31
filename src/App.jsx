import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { DataProvider } from './context/DataContext'
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
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import ScrollToTop from './components/ScrollToTop'

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <OfflineBanner />}
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adopt" element={<Adopt />} />
          <Route path="/foster" element={<Foster />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <InstallPrompt />}
    </>
  )
}

export default function App() {
  return (
    <DataProvider>
      <Router basename="/RecyclePom">
        <AppContent />
      </Router>
    </DataProvider>
  )
}
