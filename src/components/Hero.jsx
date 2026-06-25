import { useState, useEffect, useRef } from 'react'
import { Code2, Send, Github, Linkedin, Trophy, Mail } from 'lucide-react'
import profileImg from '../assets/profile.jpg'

const phrases = ['CSE Student', 'Data Structures & Algorithms Enthusiast', 'Python & C++ Developer', 'AI & IoT Explorer', 'Building Innovative Solutions']

export default function Hero() {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const heroRef = useRef(null)

  // Observe animate-on-scroll elements within the hero
  useEffect(() => {
    const section = heroRef.current
    if (!section) return
    // Wait for loader to finish before revealing
    const timeout = setTimeout(() => {
      const els = section.querySelectorAll('.animate-on-scroll')
      els.forEach((el, i) => {
        el.style.transitionDelay = `${i * 150}ms`
        el.classList.add('visible')
      })
    }, 1500)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const current = phrases[phraseIdx]
    const delay = deleting ? 40 : (!deleting && charIdx === current.length) ? 2000 : (deleting && charIdx === 0) ? 400 : 80

    const timer = setTimeout(() => {
      if (deleting) {
        setText(current.substring(0, charIdx - 1))
        setCharIdx(c => c - 1)
        if (charIdx <= 1) { setDeleting(false); setPhraseIdx(p => (p + 1) % phrases.length) }
      } else {
        setText(current.substring(0, charIdx + 1))
        setCharIdx(c => c + 1)
        if (charIdx + 1 === current.length) setDeleting(true)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [charIdx, deleting, phraseIdx])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-bg-glow"></div>
      <div className="hero-grid-overlay"></div>
      <div className="container hero-content">
        <div className="hero-left">
          <div className="hero-badge animate-on-scroll"><span className="badge-dot"></span>Available for opportunities</div>
          <h1 className="hero-name animate-on-scroll">Hi, I'm <span className="text-gradient">Akshat</span></h1>
          <div className="hero-role animate-on-scroll">
            <span className="typing-prefix">&gt; </span>
            <span className="typing-text">{text}</span>
            <span className="typing-cursor">|</span>
          </div>
          <p className="hero-description animate-on-scroll">
            B.Tech CSE student passionate about <span className="text-accent">software development</span>,{' '}
            <span className="text-accent2">algorithms</span>, and <span className="text-gold">AI systems</span>.
            I build solutions that merge engineering precision with creative thinking.
          </p>
          <div className="hero-buttons animate-on-scroll">
            <a href="#projects" className="btn btn-primary"><Code2 size={18} />View Projects</a>
            <a href="#contact" className="btn btn-secondary"><Send size={18} />Contact Me</a>

          </div>
          <div className="hero-socials animate-on-scroll">
            <a href="https://github.com/Akshat-ak-hub" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub"><Github size={18} /></a>
            <a href="https://linkedin.com/in/akshat-167271347" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="https://leetcode.com/Akshat__15_" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LeetCode"><Trophy size={18} /></a>
            <a href="mailto:kakshat349@gmail.com" className="social-icon" aria-label="Email"><Mail size={18} /></a>
          </div>
        </div>
        <div className="hero-right animate-on-scroll">
          <div className="hero-visual">
            <div className="hero-avatar-ring"><div className="hero-avatar"><img src={profileImg} alt="Akshat" className="avatar-img" /></div></div>
            <div className="floating-badge badge-1">Python</div>
            <div className="floating-badge badge-2">C++</div>
            <div className="floating-badge badge-3">React</div>
            <div className="floating-badge badge-4">DSA</div>
            <div className="floating-badge badge-5">Git</div>
            <div className="floating-badge badge-6">AI</div>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator"><div className="scroll-line"></div><span>Scroll</span></div>
    </section>
  )
}
