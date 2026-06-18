import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId, particles = [], shockwaves = []
    const MOUSE_RADIUS = 180, REPEL_FORCE = 0.8, CONNECTION_DIST = 220
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function hsl(h, s, l) { return `hsl(${h}, ${s}%, ${l}%)` }

    class Particle {
      constructor() {
        this.reset(true)
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.5 + 0.5
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.hue = Math.random() * 60 + 220
        this.opacity = Math.random() * 0.5 + 0.2
        this.pulse = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.02 + 0.005
        this.isStar = Math.random() < 0.08
        if (this.isStar) {
          this.size = Math.random() * 3 + 2
          this.opacity = 0.8
        }
      }
      update() {
        this.pulse += this.pulseSpeed
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * REPEL_FORCE
          this.speedX -= (dx / dist) * force
          this.speedY -= (dy / dist) * force
        }
        this.speedX *= 0.99
        this.speedY *= 0.99
        this.x += this.speedX
        this.y += this.speedY
        if (this.x < -50) { this.x = canvas.width + 50 }
        if (this.x > canvas.width + 50) { this.x = -50 }
        if (this.y < -50) { this.y = canvas.height + 50 }
        if (this.y > canvas.height + 50) { this.y = -50 }
      }
      draw() {
        const pulseOpacity = this.opacity * (0.8 + 0.2 * Math.sin(this.pulse))
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = hsl(this.hue + Math.sin(this.pulse * 0.5) * 20, 80, 60 + Math.sin(this.pulse) * 10)
        ctx.globalAlpha = pulseOpacity
        ctx.fill()
        if (this.isStar) {
          ctx.shadowBlur = 15
          ctx.shadowColor = hsl(this.hue, 80, 70)
          ctx.fill()
          ctx.shadowBlur = 0
        }
        ctx.globalAlpha = 1
      }
    }

    class Shockwave {
      constructor(x, y) {
        this.x = x
        this.y = y
        this.radius = 5
        this.maxRadius = Math.max(canvas.width, canvas.height) * 0.6
        this.speed = 6
        this.opacity = 1
        this.life = 1
      }
      update() {
        this.radius += this.speed
        this.life = Math.max(0, 1 - this.radius / this.maxRadius)
        this.opacity = this.life * 0.4
      }
      draw() {
        if (this.opacity <= 0) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 0.3, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(99, 102, 241, ${this.opacity * 0.6})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
      isDead() { return this.life <= 0 }
      getRadius() { return this.radius }
    }

    function initParticles() {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 3000), 400)
      for (let i = 0; i < count; i++) particles.push(new Particle())
    }
    initParticles()

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15
            const hue = (particles[i].hue + particles[j].hue) / 2
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `hsla(${hue + Math.sin(Date.now() * 0.001) * 10}, 80%, 65%, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300)
      grad.addColorStop(0, 'rgba(99, 102, 241, 0.03)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => { p.update(); p.draw() })
      drawConnections()

      shockwaves = shockwaves.filter(s => {
        s.update()
        s.draw()
        particles.forEach(p => {
          const dx = p.x - s.x
          const dy = p.y - s.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const ringDist = Math.abs(dist - s.getRadius())
          if (ringDist < 40 && dist > 0) {
            const force = (40 - ringDist) / 40 * 3
            p.speedX += (dx / dist) * force
            p.speedY += (dy / dist) * force
          }
        })
        return !s.isDead()
      })

      animId = requestAnimationFrame(animate)
    }
    animate()

    function onMouseMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    function onMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }
    function onClick(e) {
      shockwaves.push(new Shockwave(e.clientX, e.clientY))
    }
    function onTouchMove(e) {
      const t = e.touches[0]
      if (t) { mouse.x = t.clientX; mouse.y = t.clientY }
    }
    function onTouchEnd() {
      mouse.x = -9999
      mouse.y = -9999
    }
    function onTouchStart(e) {
      const t = e.touches[0]
      if (t) shockwaves.push(new Shockwave(t.clientX, t.clientY))
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('click', onClick)
    document.addEventListener('touchmove', onTouchMove, { passive: true })
    document.addEventListener('touchend', onTouchEnd)
    document.addEventListener('touchstart', onTouchStart, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('click', onClick)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
      document.removeEventListener('touchstart', onTouchStart)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas id="particles-canvas" ref={canvasRef}></canvas>
}
