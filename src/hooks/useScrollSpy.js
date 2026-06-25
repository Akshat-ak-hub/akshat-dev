import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds = [], offset = 120) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean)
      let cur = ''
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - offset) cur = s.id
      })
      setActive(cur)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds, offset])

  return active
}