import { useEffect, useRef } from 'react'

export default function GlowTrail() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.innerWidth <= 768 || !ref.current) return
    const el = ref.current
    let glowX = 0, glowY = 0, targetX = 0, targetY = 0, active = false, raf

    const onMove = (e) => { targetX = e.clientX; targetY = e.clientY; if (!active) { active = true; el.classList.add('active') } }
    const onLeave = () => { active = false; el.classList.remove('active') }

    function animate() {
      glowX += (targetX - glowX) * 0.08
      glowY += (targetY - glowY) * 0.08
      el.style.left = glowX + 'px'
      el.style.top = glowY + 'px'
      raf = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="glow-trail" id="glowTrail" ref={ref}></div>
}
