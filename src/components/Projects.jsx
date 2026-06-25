import { Github, ExternalLink, PlusCircle } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section className="section section-alt" id="projects">
      <div className="container">
        <AnimateOnScroll className="section-header">
          <span className="section-tag">&lt;projects&gt;</span>
          <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
          <p className="section-subtitle">Real proof of technical ability</p>
        </AnimateOnScroll>
        <div className="projects-grid">
          {projects.map((p, i) => {
            const Icon = p.icon
            return (
              <AnimateOnScroll key={p.title} className="project-card" delay={i * 100}>
                <div className="project-card-glow"></div>
                <div className="project-header">
                  <div className="project-icon">{Icon && <Icon size={24} />}</div>
                  <div className="project-links">
                    <a href={p.gh} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="View on GitHub">
                      <Github size={18} />
                    </a>
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Live Demo">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-description">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map(t => <span className="tech-tag" key={t}>{t}</span>)}
                </div>
              </AnimateOnScroll>
            )
          })}
          <AnimateOnScroll className="project-card project-card-cta">
            <div className="project-card-glow"></div>
            <div className="project-cta-content">
              <div className="project-icon"><PlusCircle size={24} /></div>
              <h3 className="project-title">More Coming Soon</h3>
              <p className="project-description">Currently building more projects. Check my GitHub for the latest work.</p>
              <a href="https://github.com/Akshat-ak-hub" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                <Github size={16} />View GitHub
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}