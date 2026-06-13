import { useState, useEffect } from 'react'

const links = ['about', 'skills', 'projects', 'certifications', 'leetcode', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = document.querySelectorAll('.section, .hero')
      let cur = ''
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id })
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMobileOpen(false)
    document.body.style.overflow = ''
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggleMobile = () => {
    setMobileOpen(p => !p)
    document.body.style.overflow = !mobileOpen ? 'hidden' : ''
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo('hero') }}>
            <span className="logo-bracket">&lt;</span>Akshat<span className="logo-bracket"> /&gt;</span>
          </a>
          <div className="nav-links">
            {links.map(l => (
              <a key={l} href={`#${l}`} className={`nav-link${active === l ? ' active' : ''}`}
                onClick={e => { e.preventDefault(); scrollTo(l) }}>
                {l.charAt(0).toUpperCase() + l.slice(1)}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <a href="#contact" className="nav-cta" onClick={e => { e.preventDefault(); scrollTo('contact') }}>Hire Me</a>
            <button className={`nav-toggle${mobileOpen ? ' active' : ''}`} onClick={toggleMobile} aria-label="Toggle navigation" aria-expanded={mobileOpen}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-nav-overlay${mobileOpen ? ' active' : ''}`}>
        <div className="mobile-nav-content">
          {links.map(l => (
            <a key={l} href={`#${l}`} className="mobile-nav-link" onClick={e => { e.preventDefault(); scrollTo(l) }}>
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </a>
          ))}
          <a href="#contact" className="mobile-nav-cta" onClick={e => { e.preventDefault(); scrollTo('contact') }}>Hire Me</a>
        </div>
      </div>
    </>
  )
}
