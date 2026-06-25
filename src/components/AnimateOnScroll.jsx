import { useEffect } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

export default function AnimateOnScroll({ children, className = '', direction = 'up', delay = 0 }) {
  const ref = useIntersectionObserver({ threshold: 0.15, rootMargin: '0px 0px -50px 0px', triggerOnce: true })

  useEffect(() => {
    if (delay && ref.current) {
      ref.current.style.transitionDelay = `${delay}ms`
    }
  }, [delay, ref])

  return <div ref={ref} className={`animate-on-scroll anim-${direction} ${className}`}>{children}</div>
}