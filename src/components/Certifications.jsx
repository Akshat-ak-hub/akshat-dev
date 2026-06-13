import { Lightbulb, PenTool, Terminal, Layers, Workflow, Braces, BadgeCheck } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'

const certs = [
  { icon: <Lightbulb size={22} />, title: 'Design Thinking and Creativity for Innovation', desc: 'Completed coursework in creative problem-solving methodologies and innovative design frameworks.', badge: 'Certified' },
  { icon: <PenTool size={22} />, title: 'Academic Writing Skills and IPR', desc: 'Trained in academic writing standards, research documentation, and intellectual property rights.', badge: 'Certified' },
  { icon: <Terminal size={22} />, title: 'Python Basics: Selection and Iteration', desc: 'Mastered Python fundamentals including control flow, loops, conditional logic, and iteration patterns.', badge: 'Certified' },
  { icon: <Layers size={22} />, title: 'Full Stack Development Course', desc: 'Completed end-to-end development training covering frontend, backend, APIs, and deployment workflows.', badge: 'Completed' },
  { icon: <Workflow size={22} />, title: 'Development Methodologies Overview (Coursera)', desc: 'Learned agile and software lifecycle methodologies, planning approaches, and team collaboration practices.', badge: 'Coursera' },
  { icon: <Braces size={22} />, title: 'Object-Oriented Programming and Functions (Coursera)', desc: 'Strengthened OOP fundamentals, reusable function design, and structured problem decomposition techniques.', badge: 'Coursera' },
]

export default function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="container">
        <AnimateOnScroll className="section-header">
          <span className="section-tag">&lt;certifications&gt;</span>
          <h2 className="section-title">Certifications & <span className="text-gradient">Learning</span></h2>
          <p className="section-subtitle">Continuous learning and professional development</p>
        </AnimateOnScroll>
        <div className="certs-grid">
          {certs.map(c => (
            <AnimateOnScroll key={c.title} className="cert-card">
              <div className="cert-icon">{c.icon}</div>
              <div className="cert-content"><h3>{c.title}</h3><p>{c.desc}</p></div>
              <div className="cert-badge"><BadgeCheck size={14} />{c.badge}</div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
