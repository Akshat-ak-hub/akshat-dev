import { useEffect, useRef } from 'react'

export default function AnimateOnScroll({ children, className = '', direction = 'up', delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (delay) el.style.transitionDelay = `${delay}ms`
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('visible'); observer.unobserve(el) }
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return <div ref={ref} className={`animate-on-scroll anim-${direction} ${className}`}>{children}</div>
}
