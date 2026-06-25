import { Award, GitBranch, Box, Code, Coffee, Monitor, BookOpen, GitMerge, BarChart3 } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import { certifications } from '../data/certifications'

const iconMap = { Award, GitBranch, Box, Code, Coffee, Monitor, BookOpen, GitMerge, BarChart3 }

export default function Certifications() {
  return (
    <section className="section section-alt" id="certifications">
      <div className="container">
        <AnimateOnScroll className="section-header">
          <span className="section-tag">&lt;certifications&gt;</span>
          <h2 className="section-title">Certifications & <span className="text-gradient">Courses</span></h2>
          <p className="section-subtitle">Completed courses from UC San Diego, IBM, Google, Meta, and more</p>
        </AnimateOnScroll>
        <div className="certs-grid">
          {certifications.map((cert, i) => {
            const Icon = iconMap[cert.icon] || Award
            return (
              <AnimateOnScroll key={cert.title} className="cert-card" delay={i * 80}>
                <div className="cert-icon">{Icon && <Icon size={22} />}</div>
                <div className="cert-content">
                  <h3>{cert.title}</h3>
                  <p>{cert.issuer}</p>
                </div>
                <div className="cert-badge">{cert.badge}</div>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}