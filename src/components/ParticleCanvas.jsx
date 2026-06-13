import { useEffect, useRef, useState } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)
  const [isMobile] = useState(() => window.innerWidth <= 768)

  useEffect(() => {
    if (isMobile) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = [], raf
    const COUNT = 60, DIST = 120

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    class P {
      constructor() {
        this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4
        this.r = Math.random() * 1.5 + 0.5; this.o = Math.random() * 0.4 + 0.1
      }
      update() {
        this.x += this.vx; this.y += this.vy
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.o * 0.5})`; ctx.fill()
      }
    }

    for (let i = 0; i < COUNT; i++) particles.push(new P())

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => { p.update(); p.draw() })
      for (let i = 0; i < particles.length; i++)
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < DIST) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / DIST) * 0.06})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [isMobile])

  if (isMobile) return null
  return <canvas id="particles-canvas" ref={canvasRef}></canvas>
}
