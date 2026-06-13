import { useEffect, useRef } from 'react'
import { Code, Globe, Wrench, Cpu } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'

const categories = [
  { icon: <Code size={22} />, title: 'Programming Languages', color: 'accent', skills: [{ name: 'Python', level: 70 },{ name: 'C++', level: 80 },{ name: 'C', level: 75 }] },
  { icon: <Globe size={22} />, title: 'Web Development', color: 'accent2', skills: [{ name: 'HTML/CSS', level: 90 },{ name: 'JavaScript', level: 75 },{ name: 'React', level: 85 },{ name: 'Tailwind CSS', level: 80 }] },
  { icon: <Wrench size={22} />, title: 'Tools & Technologies', color: 'gold', skills: [{ name: 'Git & GitHub', level: 85 },{ name: 'Arduino', level: 60 },{ name: 'Java', level: 70 },{ name: 'Vite', level: 65 }] },
  { icon: <Cpu size={22} />, title: 'Core Computer Science', color: 'gradient', skills: [{ name: 'DSA', level: 88 },{ name: 'Problem Solving', level: 85 },{ name: 'Software Development', level: 80 },{ name: 'AI & Data-driven Systems', level: 72 },{ name: 'IoT / Arduino Prototyping', level: 75 }] },
]

function SkillCategory({ cat }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll('.skill-item').forEach((item, i) => {
          const lvl = item.dataset.level; const fill = item.querySelector('.skill-bar-fill')
          if (fill && lvl) setTimeout(() => { fill.style.width = lvl + '%' }, i * 150)
        })
        obs.unobserve(el)
      }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="skill-category" ref={ref}>
      <div className="skill-category-header">{cat.icon}<h3>{cat.title}</h3></div>
      <div className="skill-items">
        {cat.skills.map(s => (
          <div className="skill-item" key={s.name} data-level={s.level}>
            <div className="skill-info"><span className="skill-name">{s.name}</span><span className="skill-percent">{s.level}%</span></div>
            <div className="skill-bar"><div className={`skill-bar-fill ${cat.color}`}></div></div>
          </div>
        ))}
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
          <h2 className="section-title">Technical <span className="text-gradient">Arsenal</span></h2>
          <p className="section-subtitle">Technologies and tools I work with</p>
        </AnimateOnScroll>
        <div className="skills-grid">
          {categories.map((c, i) => <AnimateOnScroll key={c.title} direction="scale" delay={i * 120}><SkillCategory cat={c} /></AnimateOnScroll>)}
        </div>
      </div>
    </section>
  )
}
