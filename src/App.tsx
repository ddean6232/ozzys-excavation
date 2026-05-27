import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import GenericPage from './pages/GenericPage'
import CoverageMap from './pages/CoverageMap'
import ChatWidget from './components/ChatWidget'

function AppLayout() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen scroll-smooth">
      <Navbar scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/coverage" element={<CoverageMap />} />
        <Route path="/:slug" element={<GenericPage />} />
      </Routes>
      <ChatWidget />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
