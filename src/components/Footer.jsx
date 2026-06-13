import { Github, Linkedin, Trophy } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-left">
          <a href="#hero" className="nav-logo"><span className="logo-bracket">&lt;</span>Akshat<span className="logo-bracket"> /&gt;</span></a>
          <p>Aspiring Software Engineer</p>
        </div>
        <div className="footer-center"><p>Designed & Built by <span className="text-accent">Akshat</span></p></div>
        <div className="footer-right">
          <a href="https://github.com/Akshat-ak-hub" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub"><Github size={18} /></a>
          <a href="https://linkedin.com/in/akshat-167271347" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href="https://leetcode.com/u/akshat__15_/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LeetCode"><Trophy size={18} /></a>
        </div>
      </div>
    </footer>
  )
}
