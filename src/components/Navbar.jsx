import { useState, useEffect } from 'react'
import { navLinks } from '../data/navigation'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean)
      let cur = ''
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id
      })
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
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar" role="navigation" aria-label="Main navigation">
        <div className="nav-container">
          <a href="#hero" className="nav-logo" onClick={e => { e.preventDefault(); scrollTo('hero') }}>
            <span className="logo-bracket">&lt;</span>Akshat<span className="logo-bracket"> /&gt;</span>
          </a>
          <div className="nav-links" role="menubar">
            {navLinks.map(l => (
              <a key={l.id} href={`#${l.id}`} role="menuitem"
                className={`nav-link${active === l.id ? ' active' : ''}`}
                onClick={e => { e.preventDefault(); scrollTo(l.id) }}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <a href="#contact" className="nav-cta" onClick={e => { e.preventDefault(); scrollTo('contact') }}>Hire Me</a>
            <button className={`nav-toggle${mobileOpen ? ' active' : ''}`} onClick={toggleMobile}
              aria-label="Toggle navigation menu" aria-expanded={mobileOpen} aria-controls="mobile-menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-nav-overlay${mobileOpen ? ' active' : ''}`} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
        <div className="mobile-nav-content">
          {navLinks.map(l => (
            <a key={l.id} href={`#${l.id}`} className="mobile-nav-link"
              onClick={e => { e.preventDefault(); scrollTo(l.id) }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="mobile-nav-cta" onClick={e => { e.preventDefault(); scrollTo('contact') }}>Hire Me</a>
        </div>
      </div>
    </>
  )
}