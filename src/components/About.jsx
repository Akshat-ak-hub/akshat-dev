import { Code2, BrainCircuit, Zap } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import { aboutCards } from '../data/about'

const iconMap = { Code2, BrainCircuit, Zap }

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <AnimateOnScroll className="section-header">
          <span className="section-tag">&lt;about&gt;</span>
          <h2 className="section-title">About <span className="text-gradient">Me</span></h2>
          <p className="section-subtitle">Who I am and what I do</p>
        </AnimateOnScroll>
        <div className="about-grid">
          <div className="about-text">
            <AnimateOnScroll>
              <p>
                I'm a second-year B.Tech CSE student at <strong>Chandigarh University</strong> with a deep passion for
                software development, data structures & algorithms, and emerging technologies like AI and IoT.
              </p>
              <p>
                My approach combines <span className="text-accent">engineering precision</span> with{' '}
                <span className="text-accent2">creative thinking</span> — I enjoy breaking down complex problems
                and building clean, efficient solutions.
              </p>
              <p>
                Currently exploring full-stack development with React, deepening my DSA skills (130+ problems solved
                across platforms), and preparing for impactful internships and full-time roles in software engineering.
              </p>
            </AnimateOnScroll>
          </div>
          <div className="about-cards">
            {aboutCards.map((card, i) => {
              const Icon = iconMap[card.icon]
              return (
                <AnimateOnScroll key={card.title} className="about-card" delay={i * 100}>
                  <div className="about-card-icon">{Icon && <Icon size={20} />}</div>
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.desc}</p>
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}