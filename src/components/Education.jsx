import { GraduationCap, School, BookOpen } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'

const items = [
  { icon: <GraduationCap size={16} />, date: '2022 - Present', title: 'B.Tech Computer Science Engineering', org: 'Chandigarh University', label: 'CGPA', value: '7.48', color: 'text-accent' },
  { icon: <School size={16} />, date: '2021', title: 'Class XII', org: 'G.S.S.S SAI', label: 'Score', value: '73.4%', color: 'text-accent2' },
  { icon: <BookOpen size={16} />, date: '2019', title: 'Class X', org: 'Dhruva Public School', label: 'Score', value: '86%', color: 'text-gold' },
]

export default function Education() {
  return (
    <section className="section section-alt" id="education">
      <div className="container">
        <AnimateOnScroll className="section-header">
          <span className="section-tag">&lt;education&gt;</span>
          <h2 className="section-title">Education <span className="text-gradient">Timeline</span></h2>
          <p className="section-subtitle">My academic journey</p>
        </AnimateOnScroll>
        <div className="timeline">
          {items.map((item, i) => (
            <AnimateOnScroll key={i} className="timeline-item">
              <div className="timeline-marker">{item.icon}</div>
              <div className="timeline-card">
                <div className="timeline-date">{item.date}</div>
                <h3>{item.title}</h3>
                <p className="timeline-org">{item.org}</p>
                <div className="timeline-score">
                  <span className="score-label">{item.label}</span>
                  <span className={`score-value ${item.color}`}>{item.value}</span>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
