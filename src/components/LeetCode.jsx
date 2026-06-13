import { useState, useEffect, useCallback, useRef } from 'react'
import { ExternalLink, RefreshCw } from 'lucide-react'
import AnimateOnScroll from './AnimateOnScroll'

const USERNAME = 'Akshat__15_'

function CountUp({ end }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
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
        obs.unobserve(el)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref} className="leetcode-value">{count}</span>
}

/* Fallback problems shown when the API is unreachable — these are real solved problems */
const fallbackProblems = [
  { name: 'Sum of Two Integers', difficulty: 'Medium', tag: 'Bit Manipulation', lang: 'cpp' },
  { name: 'Climbing Stairs', difficulty: 'Easy', tag: 'Dynamic Programming', lang: 'cpp' },
  { name: 'Contains Duplicate', difficulty: 'Easy', tag: 'Array', lang: 'cpp' },
  { name: 'House Robber II', difficulty: 'Medium', tag: 'Dynamic Programming', lang: 'cpp' },
  { name: 'House Robber', difficulty: 'Medium', tag: 'Dynamic Programming', lang: 'cpp' },
  { name: 'Find Peak Element', difficulty: 'Medium', tag: 'Binary Search', lang: 'cpp' },
  { name: 'Single Element in a Sorted Array', difficulty: 'Medium', tag: 'Binary Search', lang: 'cpp' },
  { name: 'Intersection of Two Arrays', difficulty: 'Easy', tag: 'Hash Table', lang: 'cpp' },
  { name: 'Binary Tree Inorder Traversal', difficulty: 'Easy', tag: 'Tree', lang: 'cpp' },
  { name: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', tag: 'Binary Search', lang: 'cpp' },
  { name: 'Valid Perfect Square', difficulty: 'Easy', tag: 'Binary Search', lang: 'cpp' },
  { name: 'Search Insert Position', difficulty: 'Easy', tag: 'Binary Search', lang: 'cpp' },
  { name: 'Sqrt(x)', difficulty: 'Easy', tag: 'Binary Search', lang: 'java' },
  { name: 'Search in Rotated Sorted Array II', difficulty: 'Medium', tag: 'Binary Search', lang: 'cpp' },
  { name: 'Same Tree', difficulty: 'Easy', tag: 'Tree', lang: 'cpp' },
  { name: 'Search in Rotated Sorted Array', difficulty: 'Medium', tag: 'Binary Search', lang: 'cpp' },
  { name: 'Find First and Last Position of Element in Sorted Array', difficulty: 'Medium', tag: 'Binary Search', lang: 'cpp' },
]

/* Difficulty lookup for known problems (used when API submissions don't include difficulty) */
const difficultyMap = {
  'sum-of-two-integers': 'Medium', 'climbing-stairs': 'Easy', 'contains-duplicate': 'Easy',
  'house-robber-ii': 'Medium', 'house-robber': 'Medium', 'find-peak-element': 'Medium',
  'single-element-in-a-sorted-array': 'Medium', 'intersection-of-two-arrays': 'Easy',
  'binary-tree-inorder-traversal': 'Easy', 'find-minimum-in-rotated-sorted-array': 'Medium',
  'valid-perfect-square': 'Easy', 'search-insert-position': 'Easy', 'sqrtx': 'Easy',
  'search-in-rotated-sorted-array-ii': 'Medium', 'same-tree': 'Easy',
  'search-in-rotated-sorted-array': 'Medium',
  'find-first-and-last-position-of-element-in-sorted-array': 'Medium',
  'two-sum': 'Easy', 'valid-parentheses': 'Easy',
  'longest-substring-without-repeating-characters': 'Medium',
  'binary-tree-level-order-traversal': 'Medium', 'number-of-islands': 'Medium',
  'merge-k-sorted-lists': 'Hard', 'word-ladder': 'Hard',
  'shortest-path-in-binary-matrix': 'Medium',
}

const API_BASE = 'https://alfa-leetcode-api.onrender.com'

export default function LeetCode() {
  const [stats, setStats] = useState({ totalSolved: 63, easySolved: 33, mediumSolved: 29, hardSolved: 1 })
  const [problems, setProblems] = useState(fallbackProblems)
  const [filter, setFilter] = useState('all')
  const [status, setStatus] = useState('Loading...')
  const [refreshing, setRefreshing] = useState(false)

  const filtered = filter === 'all' ? problems : problems.filter(p => p.difficulty === filter)

  const fetchStats = useCallback(async () => {
    setRefreshing(true)
    setStatus('Fetching live stats...')

    /* --- Fetch stats --- */
    try {
      const res = await fetch(`${API_BASE}/${USERNAME}/solved`, { cache: 'no-store' })
      if (res.ok) {
        const d = await res.json()
        const t = d.solvedProblem ?? d.totalSolved ?? 0
        const e = d.easySolved ?? d.easy ?? 0
        const m = d.mediumSolved ?? d.medium ?? 0
        const h = d.hardSolved ?? d.hard ?? 0
        if (t > 0) setStats({ totalSolved: t, easySolved: e, mediumSolved: m, hardSolved: h })
      }
    } catch { /* use defaults */ }

    /* --- Fetch recent AC submissions --- */
    try {
      const res = await fetch(`${API_BASE}/${USERNAME}/acSubmission`, { cache: 'no-store' })
      if (res.ok) {
        const d = await res.json()
        if (d.submission && d.submission.length > 0) {
          /* Deduplicate by titleSlug, keep most recent */
          const seen = new Set()
          const unique = d.submission.filter(s => {
            if (seen.has(s.titleSlug)) return false
            seen.add(s.titleSlug)
            return true
          })
          setProblems(unique.map(s => ({
            name: s.title,
            difficulty: difficultyMap[s.titleSlug] || 'Medium',
            tag: s.lang?.toUpperCase() || 'C++',
            lang: s.lang || 'cpp',
          })))
        }
      }
    } catch { /* use defaults */ }

    setStatus('Live stats updated.')
    setRefreshing(false)
  }, [])

  useEffect(() => { fetchStats() }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
              <a href={`https://leetcode.com/u/${USERNAME}/`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm"><ExternalLink size={14} />Profile</a>
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
              <button key={f} className={`leetcode-filter${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{f === 'all' ? 'All' : f}</button>
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
