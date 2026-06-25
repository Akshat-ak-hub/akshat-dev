import { useState, useEffect } from 'react'
import './styles/main.css'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import LeetCode from './components/LeetCode'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ParticleCanvas from './components/ParticleCanvas'
import ScrollProgress from './components/ScrollProgress'
import ErrorBoundary from './components/ErrorBoundary'
import JsonLd from './components/JsonLd'

function App() {
  const [loading, setLoading] = useState(true)
  const [loaderVisible, setLoaderVisible] = useState(true)

  useEffect(() => {
    const fade = setTimeout(() => setLoading(false), 1400)
    const remove = setTimeout(() => setLoaderVisible(false), 2000)
    return () => { clearTimeout(fade); clearTimeout(remove) }
  }, [])

  return (
    <>
      <JsonLd />
      <a href="#about" className="skip-to-content" aria-label="Skip to main content">Skip to content</a>
      <ScrollProgress />
      <ParticleCanvas />
      {loaderVisible && <Loader hidden={!loading} />}
      <Navbar />
      <Hero />
      <ErrorBoundary><About /></ErrorBoundary>
      <ErrorBoundary><Education /></ErrorBoundary>
      <ErrorBoundary><Skills /></ErrorBoundary>
      <ErrorBoundary><Projects /></ErrorBoundary>
      <ErrorBoundary><Certifications /></ErrorBoundary>
      <ErrorBoundary><LeetCode /></ErrorBoundary>
      <ErrorBoundary><Achievements /></ErrorBoundary>
      <ErrorBoundary><Contact /></ErrorBoundary>
      <Footer />
      <BackToTop />
    </>
  )
}

export default App