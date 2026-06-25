import { useState, useEffect, useCallback, useRef } from 'react'
import { ExternalLink, RefreshCw } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'
import { fallbackProblems, difficultyMap, defaultStats } from '../data/leetcode'

const USERNAME = import.meta.env.VITE_LEETCODE_USERNAME || 'Akshat__15_'
const API_BASE = 'https://alfa-leetcode-api.onrender.com'
const CACHE_KEY = 'leetcode-stats'
const CACHE_TTL = 10 * 60 * 1000

function getCached(key) {
  try {
    const raw = localStorage.getItem(`${CACHE_KEY}-${key}`)
    if (!raw) return null
    const { data, timestamp } = JSON.parse(raw)
    if (Date.now() - timestamp > CACHE_TTL) return null
    return data
  } catch {
    return null
  }
}

function setCached(key, data) {
  try {
    localStorage.setItem(`${CACHE_KEY}-${key}`, JSON.stringify({ data, timestamp: Date.now() }))
  } catch { /* ignore */ }
}

function CountUp({ end }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const duration = 1200
        const step = (ts) => {
          if (!start) start = ts
          const progress = Math.min((ts - start) / duration, 1)
          setCount(Math.floor(progress * end))
          if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        observer.unobserve(el)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  return <span ref={ref} className="leetcode-value">{count}</span>
}

export default function LeetCode() {
  const [stats, setStats] = useState(() => getCached('stats') || defaultStats)
  const [problems, setProblems] = useState(() => getCached('problems') || fallbackProblems)
  const [filter, setFilter] = useState('all')
  const [status, setStatus] = useState('Loaded.')
  const [refreshing, setRefreshing] = useState(false)
  const fetchedRef = useRef(false)

  const filtered = filter === 'all' ? problems : problems.filter(p => p.difficulty === filter)

  const fetchStats = useCallback(async () => {
    setRefreshing(true)
    setStatus('Fetching live stats...')

    try {
      const res = await fetch(`${API_BASE}/${USERNAME}/solved`, { cache: 'no-store' })
      if (res.ok) {
        const d = await res.json()
        const t = d.solvedProblem ?? d.totalSolved ?? 0
        const e = d.easySolved ?? d.easy ?? 0
        const m = d.mediumSolved ?? d.medium ?? 0
        const h = d.hardSolved ?? d.hard ?? 0
        if (t > 0) {
          const newStats = { totalSolved: t, easySolved: e, mediumSolved: m, hardSolved: h }
          setStats(newStats)
          setCached('stats', newStats)
        }
      }
    } catch { /* use cached */ }

    try {
      const res = await fetch(`${API_BASE}/${USERNAME}/acSubmission`, { cache: 'no-store' })
      if (res.ok) {
        const d = await res.json()
        if (d.submission && d.submission.length > 0) {
          const seen = new Set()
          const unique = d.submission.filter(s => {
            if (seen.has(s.titleSlug)) return false
            seen.add(s.titleSlug)
            return true
          })
          const mapped = unique.map(s => ({
            name: s.title,
            difficulty: difficultyMap[s.titleSlug] || 'Medium',
            tag: s.lang?.toUpperCase() || 'C++',
            lang: s.lang || 'cpp',
          }))
          setProblems(mapped)
          setCached('problems', mapped)
        }
      }
    } catch { /* use cached */ }

    setStatus('Live stats updated.')
    setRefreshing(false)
  }, [])

  useEffect(() => {
    if (!fetchedRef.current && !getCached('stats')) {
      fetchedRef.current = true
      fetchStats()
    }
  }, [fetchStats])

  return (
    <section className="section section-alt" id="leetcode">
      <div className="container">
        <AnimateOnScroll className="section-header">
          <span className="section-tag">&lt;leetcode&gt;</span>
          <h2 className="section-title">LeetCode <span className="text-gradient">Progress</span></h2>
          <p className="section-subtitle">Live coding consistency snapshot with filters</p>
        </AnimateOnScroll>
        <AnimateOnScroll className="leetcode-panel">
          <div className="leetcode-top">
            <div>
              <h3>{USERNAME}</h3>
              <p className="leetcode-status">{status}</p>
            </div>
            <div className="leetcode-actions">
              <a href={`https://leetcode.com/u/${USERNAME}/`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                <ExternalLink size={14} />Profile
              </a>
              <button className="btn btn-primary btn-sm" onClick={fetchStats} disabled={refreshing}>
                <RefreshCw size={14} className={refreshing ? 'spin' : ''} />{refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
          <div className="leetcode-stats-grid">
            {[
              ['Total Solved', stats.totalSolved, ''],
              ['Easy', stats.easySolved, 'easy'],
              ['Medium', stats.mediumSolved, 'medium'],
              ['Hard', stats.hardSolved, 'hard'],
            ].map(([l, v, cls]) => (
              <article className={`leetcode-stat-card${cls ? ` leetcode-${cls}` : ''}`} key={l}>
                <span className="leetcode-label">{l}</span>
                <CountUp end={v} />
              </article>
            ))}
          </div>
          <div className="leetcode-filter-bar">
            {['all', 'Easy', 'Medium', 'Hard'].map(f => (
              <button key={f} className={`leetcode-filter${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
          <div className="leetcode-problem-list">
            {filtered.length === 0 && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', padding: '12px', textAlign: 'center', gridColumn: '1 / -1' }}>
                No problems match this filter.
              </p>
            )}
            {filtered.map((p, i) => (
              <article className="leetcode-problem-item" key={`${p.name}-${i}`}>
                <h4>{p.name}</h4>
                <div className="leetcode-problem-meta">
                  <span className={`difficulty-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                  <span>{p.tag}</span>
                </div>
              </article>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}