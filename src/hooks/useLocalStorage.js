import { useState, useCallback } from 'react'

export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    const valueToStore = value instanceof Function ? value(stored) : value
    setStored(valueToStore)
    try {
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch { /* quota exceeded */ }
  }, [key, stored])

  return [stored, setValue]
}