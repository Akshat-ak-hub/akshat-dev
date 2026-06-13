import { HeartHandshake, MapPin, Sprout, Users, Landmark, Mountain } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <div className="container">
        <AnimateOnScroll className="section-header">
          <span className="section-tag">&lt;achievements&gt;</span>
          <h2 className="section-title">Achievements & <span className="text-gradient">Impact</span></h2>
          <p className="section-subtitle">Beyond code - making a difference</p>
        </AnimateOnScroll>
        <AnimateOnScroll className="achievement-showcase">
          <div className="achievement-card-featured">
            <div className="achievement-glow"></div>
            <div className="achievement-icon-large"><HeartHandshake size={26} /></div>
            <div className="achievement-details">
              <h3>Social Internship</h3>
              <div className="achievement-location"><MapPin size={14} />Solan, Himachal Pradesh</div>
              <p>Participated in a meaningful social internship focused on rural development and community engagement. This experience strengthened leadership, empathy, and teamwork skills.</p>
              <div className="achievement-highlights">
                {[{ icon: <Sprout size={16} />, t: 'Organic Farming' },{ icon: <Users size={16} />, t: 'Community Engagement' },{ icon: <Landmark size={16} />, t: 'Gram Sabha Participation' },{ icon: <Mountain size={16} />, t: 'Rural Development' }].map(h => (
                  <div className="highlight-item" key={h.t}>{h.icon}<span>{h.t}</span></div>
                ))}
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
