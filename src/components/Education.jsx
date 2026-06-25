import { GraduationCap, BookOpen } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import { education } from '../data/education'

const iconMap = { GraduationCap, BookOpen }

export default function Education() {
  return (
    <section className="section section-alt" id="education">
      <div className="container">
        <AnimateOnScroll className="section-header">
          <span className="section-tag">&lt;education&gt;</span>
          <h2 className="section-title">Academic <span className="text-gradient">Journey</span></h2>
          <p className="section-subtitle">My educational background and achievements</p>
        </AnimateOnScroll>
        <div className="timeline">
          {education.map((item, i) => {
            const Icon = iconMap[item.icon] || GraduationCap
            return (
              <AnimateOnScroll key={item.title} className="timeline-item" delay={i * 150}>
                <div className="timeline-marker"><Icon size={16} /></div>
                <div className="timeline-card">
                  <span className="timeline-date">{item.date}</span>
                  <h3>{item.title}</h3>
                  <p className="timeline-org">{item.org}</p>
                  <div className="timeline-score">
                    <span className="score-label">Score</span>
                    <span className="score-value">{item.score}</span>
                  </div>
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}