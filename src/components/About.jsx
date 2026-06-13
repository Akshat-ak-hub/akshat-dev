import { Brain, Zap, Rocket } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <AnimateOnScroll className="section-header">
          <span className="section-tag">&lt;about&gt;</span>
          <h2 className="section-title">About <span className="text-gradient">Me</span></h2>
          <p className="section-subtitle">Get to know the developer behind the code</p>
        </AnimateOnScroll>
        <div className="about-grid">
          <AnimateOnScroll className="about-text" direction="left">
            <p>I'm a <strong>B.Tech Computer Science Engineering</strong> student at <strong>Chandigarh University</strong> with a deep passion for building software that solves real-world problems. My journey in tech revolves around mastering <span className="text-accent">Data Structures & Algorithms</span>, <span className="text-accent2">Python development</span>, and exploring the intersection of <span className="text-gold">IoT and artificial intelligence</span>.</p>
            <p>I believe in writing clean, efficient code and continuously pushing myself to learn new technologies. Whether it's building a QR code generator or designing electronic circuits, I approach every project with curiosity and precision.</p>
          </AnimateOnScroll>
          <AnimateOnScroll className="about-cards" direction="right">
            {[
              { icon: <Brain size={22} />, title: 'Problem Solver', desc: 'Strong analytical thinking with a focus on DSA and algorithmic challenges.' },
              { icon: <Zap size={22} />, title: 'Fast Learner', desc: 'Quickly adapt to new frameworks, languages, and technologies.' },
              { icon: <Rocket size={22} />, title: 'Tech Enthusiast', desc: 'Passionate about AI, IoT, and emerging technologies shaping the future.' },
            ].map(c => (
              <div className="about-card" key={c.title}>
                <div className="about-card-icon">{c.icon}</div>
                <div><h3>{c.title}</h3><p>{c.desc}</p></div>
              </div>
            ))}
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
