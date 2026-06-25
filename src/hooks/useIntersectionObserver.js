import { useEffect, useRef } from 'react'

export function useIntersectionObserver({ threshold = 0.15, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = {}) {
  const ref = useRef(null)
  const entryRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      entryRef.current = entry
      if (entry.isIntersecting) {
        el.classList.add('visible')
        if (triggerOnce) observer.unobserve(el)
      }
    }, { threshold, rootMargin })

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return ref
}