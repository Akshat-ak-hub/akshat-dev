import { Trophy, MapPin } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import { achievements } from '../data/achievements'

const iconMap = { Trophy }

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <div className="container">
        <AnimateOnScroll className="section-header">
          <span className="section-tag">&lt;achievements&gt;</span>
          <h2 className="section-title">Key <span className="text-gradient">Achievements</span></h2>
          <p className="section-subtitle">Milestones that define my journey</p>
        </AnimateOnScroll>
        <div className="achievement-showcase">
          {achievements.map((a, i) => {
            const Icon = iconMap[a.icon] || Trophy
            return (
              <AnimateOnScroll key={a.title} className="achievement-card-featured" delay={i * 100}>
                <div className="achievement-icon-large"><Icon size={28} /></div>
                <div className="achievement-details">
                  <h3>{a.title}</h3>
                  <div className="achievement-location"><MapPin size={14} />{a.location}</div>
                  <p>{a.desc}</p>
                  <div className="achievement-highlights">
                    {a.highlights.map(h => (
                      <div className="highlight-item" key={h}><Trophy size={12} />{h}</div>
                    ))}
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