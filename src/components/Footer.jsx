import { Github, Linkedin, Trophy, Mail } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-left">
            <p>&copy; {year} Akshat. All rights reserved.</p>
          </div>
          <div className="footer-center">
            <p>Built with React + Vite</p>
          </div>
          <div className="footer-right">
            <a href="https://github.com/Akshat-ak-hub" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub"><Github size={16} /></a>
            <a href="https://linkedin.com/in/akshat-167271347" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href="https://leetcode.com/Akshat__15_" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LeetCode"><Trophy size={16} /></a>
            <a href="mailto:kakshat349@gmail.com" className="social-icon" aria-label="Email"><Mail size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}