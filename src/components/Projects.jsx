import { QrCode, Globe, FileText, Dice5, Route, PlusCircle, Github, ExternalLink, BrainCircuit } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'

const projects = [
  { icon: <QrCode size={24} />, title: 'QR Code Generator',
    desc: 'A Python-based application that converts text, URLs, emails, or passwords into scannable QR codes. Features a clean interface with multiple output formats.',
    tech: ['Python', 'QR Libraries', 'CLI'], gh: 'https://github.com/Akshat-ak-hub' },

  { icon: <Globe size={24} />, title: 'Priya Public School Website',
    desc: 'A modern, responsive school website built with React and styled using Tailwind CSS. Features smooth animations with Framer Motion and is deployed on Vercel.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'Vercel'], gh: 'https://github.com/Akshat-ak-hub',
    live: 'https://priya-public-school.vercel.app/' },

  { icon: <FileText size={24} />, title: 'Online PDF Tool',
    desc: 'A comprehensive PDF processing utility built with HTML and JavaScript. Allows users to perform various operations on PDF files with a clean, intuitive interface.',
    tech: ['HTML', 'JavaScript', 'PDF Processing', 'Vercel'], gh: 'https://github.com/Akshat-ak-hub',
    live: 'https://pro-pdf.vercel.app/' },

  { icon: <Dice5 size={24} />, title: 'Digital Dice Circuit',
    desc: 'An electronic dice simulator built using IC 555 timer and IC 4017 decade counter. Demonstrates understanding of digital electronics and IoT prototyping.',
    tech: ['Electronics', 'IoT', 'IC 555', 'IC 4017'], gh: 'https://github.com/Akshat-ak-hub' },

  { icon: <Route size={24} />, title: 'Dijkstra Algorithm Visualizer',
    desc: 'Interactive graph visualizer that demonstrates Dijkstra\'s shortest path algorithm step-by-step. Includes weighted nodes, visited path highlighting, and run controls.',
    tech: ['JavaScript', 'Graph Algorithms', 'Data Structures', 'Visualization'], gh: 'https://github.com/Akshat-ak-hub',
    live: 'https://dijkstra-algorithm-nine.vercel.app/' },
    {
  icon: <BrainCircuit size={24} />,
  title: 'AlgoViz Alpha',
  desc: 'Comprehensive algorithm visualizer that demonstrates sorting, searching, tree traversals, graph algorithms, and pathfinding techniques through interactive animations, execution controls, and complexity insights.',
  tech: ['React.js', 'TypeScript', 'DSA', 'Graph Algorithms', 'Visualization'],
  gh: 'https://github.com/Akshat-ak-hub',
  live: 'https://algoviz-alpha.vercel.app/'
}
]

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
          {projects.map((p, i) => (
            <AnimateOnScroll key={p.title} className="project-card" delay={i * 100}>
              <div className="project-card-glow"></div>
              <div className="project-header">
                <div className="project-icon">{p.icon}</div>
                <div className="project-links">
                  <a href={p.gh} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub"><Github size={18} /></a>
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Live Demo"><ExternalLink size={18} /></a>
                  )}
                </div>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-description">{p.desc}</p>
              <div className="project-tech">{p.tech.map(t => <span className="tech-tag" key={t}>{t}</span>)}</div>
            </AnimateOnScroll>
          ))}
          <AnimateOnScroll className="project-card project-card-cta">
            <div className="project-card-glow"></div>
            <div className="project-cta-content">
              <div className="project-icon"><PlusCircle size={24} /></div>
              <h3 className="project-title">More Coming Soon</h3>
              <p className="project-description">Currently building more projects. Check my GitHub for the latest work.</p>
              <a href="https://github.com/Akshat-ak-hub" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm"><Github size={16} />View GitHub</a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
