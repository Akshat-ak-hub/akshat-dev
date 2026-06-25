import { useState, useEffect, useRef } from 'react'
import AnimateOnScroll from './AnimateOnScroll'
import { skillCategories } from '../data/skills'
import { Code2, Globe, GitBranch, Wrench } from 'lucide-react'

const iconMap = { Code2, Globe, GitBranch, Wrench }

function SkillBar({ name, percent, color }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(percent), 200)
        observer.unobserve(el)
      }
    }, { threshold: 0.3 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [percent])

  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-info">
        <span className="skill-name">{name}</span>
        <span className="skill-percent">{percent}%</span>
      </div>
      <div className="skill-bar">
        <div className={`skill-bar-fill ${color}`} style={{ width: `${width}%` }}></div>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <AnimateOnScroll className="section-header">
          <span className="section-tag">&lt;skills&gt;</span>
          <h2 className="section-title">Technical <span className="text-gradient">Skills</span></h2>
          <p className="section-subtitle">Technologies and tools I work with</p>
        </AnimateOnScroll>
        <div className="skills-grid">
          {skillCategories.map(cat => {
            const Icon = iconMap[cat.icon]
            return (
              <AnimateOnScroll key={cat.name} className="skill-category">
                <div className="skill-category-header">
                  {Icon && <Icon size={24} />}
                  <h3>{cat.name}</h3>
                </div>
                <div className="skill-items">
                  {cat.skills.map(skill => (
                    <SkillBar key={skill.name} name={skill.name} percent={skill.percent} color={cat.color} />
                  ))}
                </div>
              </AnimateOnScroll>
            )
          })}
        </div>
      </div>
    </section>
  )
}