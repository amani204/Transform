// src/hooks/useExercises.js
import { useState, useEffect, useCallback, useRef } from 'react'

const BASE_URL = 'https://exercisedb.p.rapidapi.com'
export const LIMIT = 10

const getHeaders = () => ({
  'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
})

// ── Module-level state (persists across remounts) ─────────────────────────────
const cache         = new Map()
let   apiAvailable  = null          // null = unknown, true/false after first check
let   lastCheckTime = 0
const CHECK_INTERVAL = 60 * 60 * 1000  // 60 minutes

// ── Static filter lists ───────────────────────────────────────────────────────
export const STATIC_BODY_PARTS = [
  'all', 'back', 'cardio', 'chest', 'lower arms', 'lower legs',
  'neck', 'shoulders', 'upper arms', 'upper legs', 'waist',
]
export const STATIC_EQUIPMENT = [
  'all', 'assisted', 'band', 'barbell', 'body weight', 'bosu ball',
  'cable', 'dumbbell', 'ez barbell', 'hammer', 'kettlebell',
  'leverage machine', 'medicine ball', 'olympic barbell',
  'resistance band', 'rope', 'smith machine', 'stability ball',
  'stationary bike', 'weighted',
]
export const STATIC_TARGETS = [
  'all', 'abductors', 'abs', 'adductors', 'biceps', 'calves',
  'cardiovascular system', 'delts', 'forearms', 'glutes',
  'hamstrings', 'lats', 'pectorals', 'quads', 'traps', 'triceps', 'upper back',
]

// ── Mock data (shown when API is unavailable) ─────────────────────────────────
const MOCK_EXERCISES = [
  { id: '0001', name: '3/4 Sit-Up',         bodyPart: 'waist',      equipment: 'body weight', target: 'abs',        secondaryMuscles: ['hip flexors'], instructions: ['Lie on your back with knees bent.', 'Curl up to 45 degrees.', 'Lower back down slowly.'] },
  { id: '0002', name: 'Barbell Bench Press', bodyPart: 'chest',      equipment: 'barbell',     target: 'pectorals',  secondaryMuscles: ['triceps', 'delts'], instructions: ['Lie on bench, grip barbell.', 'Lower to chest.', 'Press back up.'] },
  { id: '0003', name: 'Pull Up',             bodyPart: 'back',       equipment: 'body weight', target: 'lats',       secondaryMuscles: ['biceps'], instructions: ['Hang from bar with wide grip.', 'Pull chest to bar.', 'Lower slowly.'] },
  { id: '0004', name: 'Squat',               bodyPart: 'upper legs', equipment: 'body weight', target: 'quads',      secondaryMuscles: ['glutes', 'hamstrings'], instructions: ['Stand with feet shoulder-width.', 'Lower until thighs are parallel.', 'Drive back up.'] },
  { id: '0005', name: 'Push Up',             bodyPart: 'chest',      equipment: 'body weight', target: 'pectorals',  secondaryMuscles: ['triceps', 'delts'], instructions: ['Start in plank position.', 'Lower chest to floor.', 'Push back up.'] },
  { id: '0006', name: 'Deadlift',            bodyPart: 'back',       equipment: 'barbell',     target: 'lats',       secondaryMuscles: ['glutes', 'hamstrings'], instructions: ['Stand over barbell.', 'Hinge at hips and grip bar.', 'Drive hips forward to stand.'] },
  { id: '0007', name: 'Plank',               bodyPart: 'waist',      equipment: 'body weight', target: 'abs',        secondaryMuscles: ['shoulders', 'glutes'], instructions: ['Forearms on ground, body straight.', 'Hold position.', 'Keep core tight throughout.'] },
  { id: '0008', name: 'Dumbbell Curl',       bodyPart: 'upper arms', equipment: 'dumbbell',    target: 'biceps',     secondaryMuscles: ['forearms'], instructions: ['Hold dumbbells at sides.', 'Curl up to shoulders.', 'Lower slowly.'] },
  { id: '0009', name: 'Tricep Dip',          bodyPart: 'upper arms', equipment: 'body weight', target: 'triceps',    secondaryMuscles: ['chest', 'shoulders'], instructions: ['Grip bars, arms straight.', 'Lower until elbows at 90°.', 'Push back up.'] },
  { id: '0010', name: 'Lunge',               bodyPart: 'upper legs', equipment: 'body weight', target: 'quads',      secondaryMuscles: ['glutes', 'hamstrings'], instructions: ['Stand upright.', 'Step forward and lower knee.', 'Return to standing.'] },
  { id: '0011', name: 'Shoulder Press',      bodyPart: 'shoulders',  equipment: 'dumbbell',    target: 'delts',      secondaryMuscles: ['triceps'], instructions: ['Hold dumbbells at shoulders.', 'Press overhead.', 'Lower with control.'] },
  { id: '0012', name: 'Leg Raise',           bodyPart: 'waist',      equipment: 'body weight', target: 'abs',        secondaryMuscles: ['hip flexors'], instructions: ['Lie flat, legs straight.', 'Raise legs to 90°.', 'Lower without touching floor.'] },
]

// ── API availability check ────────────────────────────────────────────────────
const checkApiAvailability = async () => {
  const now = Date.now()
  // Skip if checked recently
  if (apiAvailable !== null && now - lastCheckTime < CHECK_INTERVAL) {
    return apiAvailable
  }

  try {
    const res = await fetch(
      `${BASE_URL}/exercises?limit=1&offset=0`,
      { headers: getHeaders() }
    )
    apiAvailable  = res.ok
    lastCheckTime = now
    if (apiAvailable) console.info('[ExerciseDB] API is available ✓')
    else              console.warn('[ExerciseDB] API unavailable, using mock data.')
  } catch {
    apiAvailable  = false
    lastCheckTime = now
    console.warn('[ExerciseDB] API unreachable, using mock data.')
  }

  return apiAvailable
}

// ── Fetch with headers + cache ────────────────────────────────────────────────
const apiFetch = async (url, signal) => {
  if (cache.has(url)) return cache.get(url)
  const res = await fetch(url, { headers: getHeaders(), signal })
  if (!res.ok) throw new Error(`${res.status}`)
  const data = await res.json()
  cache.set(url, data)
  return data
}

const buildUrl = (filterType, activeFilter, searchQuery, page) => {
  const offset   = (page - 1) * LIMIT
  const paginate = `?limit=${LIMIT}&offset=${offset}`
  const base     = `${BASE_URL}/exercises`

  if (searchQuery.trim())    return `${base}/name/${encodeURIComponent(searchQuery.trim().toLowerCase())}`
  if (activeFilter === 'all') return `${base}${paginate}`
  if (filterType === 'bodyPart')  return `${base}/bodyPart/${encodeURIComponent(activeFilter)}${paginate}`
  if (filterType === 'equipment') return `${base}/equipment/${encodeURIComponent(activeFilter)}${paginate}`
  if (filterType === 'target')    return `${base}/target/${encodeURIComponent(activeFilter)}${paginate}`
  return `${base}${paginate}`
}

// ── Filter mock data client-side ──────────────────────────────────────────────
const filterMock = (filterType, activeFilter, searchQuery, page) => {
  let results = MOCK_EXERCISES

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase()
    results = results.filter(ex =>
      ex.name.toLowerCase().includes(q) ||
      ex.bodyPart.toLowerCase().includes(q) ||
      ex.target.toLowerCase().includes(q)
    )
  } else if (activeFilter !== 'all') {
    results = results.filter(ex => {
      if (filterType === 'bodyPart')  return ex.bodyPart  === activeFilter
      if (filterType === 'equipment') return ex.equipment === activeFilter
      if (filterType === 'target')    return ex.target    === activeFilter
      return true
    })
  }

  const start = (page - 1) * LIMIT
  return {
    exercises: results.slice(start, start + LIMIT),
    hasMore:   start + LIMIT < results.length,
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export const useExercises = () => {
  const [filterType,   setFilterType]   = useState('bodyPart')
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery,  setSearchQuery]  = useState('')
  const [page,         setPage]         = useState(1)

  const [exercises,  setExercises]  = useState([])
  const [isLoading,  setIsLoading]  = useState(true)
  const [error,      setError]      = useState(null)
  const [hasMore,    setHasMore]    = useState(false)
  const [usingMock,  setUsingMock]  = useState(false)

  const abortRef    = useRef(null)
  const fetchingRef = useRef(false)

  const fetchExercises = useCallback(async () => {
    if (fetchingRef.current) return
    fetchingRef.current = true

    if (abortRef.current) abortRef.current.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setIsLoading(true)
    setError(null)

    try {
      // 1. Check if API is available (cached for 60 min)
      const available = await checkApiAvailability()

      if (!available) {
        // Use mock data
        const { exercises: mock, hasMore: mockHasMore } =
          filterMock(filterType, activeFilter, searchQuery, page)
        setExercises(mock)
        setHasMore(mockHasMore)
        setUsingMock(true)
      } else {
        // Use real API
        const url  = buildUrl(filterType, activeFilter, searchQuery, page)
        const data = await apiFetch(url, controller.signal)
        const results = Array.isArray(data) ? data : []
        setExercises(results)
        setHasMore(searchQuery.trim() ? false : results.length === LIMIT)
        setUsingMock(false)
      }
    } catch (e) {
      if (e.name === 'AbortError') return

      // API failed mid-session — fall back to mock silently
      console.warn('[ExerciseDB] Request failed, falling back to mock:', e.message)
      const { exercises: mock, hasMore: mockHasMore } =
        filterMock(filterType, activeFilter, searchQuery, page)
      setExercises(mock)
      setHasMore(mockHasMore)
      setUsingMock(true)
      apiAvailable  = false
      lastCheckTime = Date.now()
    } finally {
      setIsLoading(false)
      fetchingRef.current = false
    }
  }, [filterType, activeFilter, searchQuery, page])

  useEffect(() => {
    fetchingRef.current = false
    fetchExercises()
    return () => {
      if (abortRef.current) abortRef.current.abort()
      fetchingRef.current = false
    }
  }, [fetchExercises])

  const changeFilter     = useCallback((f) => { setActiveFilter(f); setPage(1) }, [])
  const changeFilterType = useCallback((t) => { setFilterType(t); setActiveFilter('all'); setPage(1) }, [])
  const changeSearch     = useCallback((q) => { setSearchQuery(q); setPage(1) }, [])
  const goToPage         = useCallback((p) => setPage(p), [])

  const filterOptions =
    filterType === 'bodyPart'  ? STATIC_BODY_PARTS  :
    filterType === 'equipment' ? STATIC_EQUIPMENT   :
    STATIC_TARGETS

  return {
    exercises, isLoading, error, hasMore, usingMock,
    page, setPage: goToPage, LIMIT,
    filterType, activeFilter, searchQuery, filterOptions,
    changeFilter, changeFilterType, changeSearch,
  }
}