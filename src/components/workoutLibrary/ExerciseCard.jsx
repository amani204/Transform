// src/components/WorkoutLibrary/ExerciseCard.jsx
import { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'

const MUSCLE_COLORS = {
  abs: '#ff6400', biceps: '#f59e0b', calves: '#10b981',
  delts: '#3b82f6', glutes: '#8b5cf6', hamstrings: '#ec4899',
  lats: '#06b6d4', pectorals: '#ff6400', quads: '#84cc16',
  triceps: '#f97316', traps: '#a78bfa',
  'cardiovascular system': '#ef4444',
}
const getColor = (target) => MUSCLE_COLORS[target] || '#6b7280'

// ── GIF CACHE ─────────────────────────────────────────────────────
// Stores downloaded GIF blobs in memory so we don't fetch the same
// exercise multiple times. Saves bandwidth and speeds up the UI.
// The cache is at module level (outside the component) so it persists
// across all ExerciseCard instances and even page re-renders.
const gifCache = new Map()

// Custom hook that handles fetching the exercise GIF
// It returns the blob URL, loading state, and error state
// The 'skip' parameter is true when we're in mock mode (no API calls)
const useGif = (id, skip) => {
  const [src,     setSrc]     = useState(null)
  const [loading, setLoading] = useState(!skip)
  const [error,   setError]   = useState(skip) // if skip, treat as error → show placeholder

  useEffect(() => {
    // MOCK MODE: Don't fetch, just show placeholder
    if (skip) { 
      setError(true); 
      setLoading(false); 
      return 
    }
    
    // CACHE HIT: Use existing blob URL
    if (gifCache.has(id)) { 
      setSrc(gifCache.get(id)); 
      setLoading(false); 
      return 
    }

    let cancelled = false
    const url = `https://exercisedb.p.rapidapi.com/image?exerciseId=${id}&resolution=360`

    // FETCH GIF from ExerciseDB API
    fetch(url, {
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    })
      .then(res => { 
        if (!res.ok) throw new Error(res.status); 
        return res.blob() 
      })
      .then(blob => {
        if (cancelled) return
        // Convert blob to object URL and store in cache
        const objectUrl = URL.createObjectURL(blob)
        gifCache.set(id, objectUrl)
        setSrc(objectUrl)
        setLoading(false)
      })
      .catch(() => { 
        if (!cancelled) { 
          setError(true); 
          setLoading(false) 
        } 
      })

    // Cleanup function to prevent memory leaks
    return () => { 
      cancelled = true 
    }
  }, [id, skip]) // Re-run if id or skip changes

  return { src, loading, error }
}

const ExerciseCard = ({ exercise, onClick, animRef, usingMock }) => {
  const { id, name, bodyPart, equipment, target } = exercise
  const color = getColor(target)
  // Pass usingMock to skip API calls when in demo mode
  const { src, loading, error } = useGif(id, usingMock)

  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div
      ref={animRef}
      onClick={() => onClick(exercise)}
      className="group cursor-pointer relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        opacity: 0,
      }}
    >
      {/* ── IMAGE AREA ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: '220px', background: '#111' }}>

        {/* Skeleton while loading GIF */}
        {loading && (
          <div className="absolute inset-0 animate-pulse"
            style={{ background: 'rgba(255,255,255,0.05)' }} />
        )}

        {/* Real GIF - shown when fetch succeeds */}
        {src && !error && (
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}

        {/* Placeholder - shown in mock mode OR if GIF fetch fails */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.05))` }}>
            <div className="w-16 h-16 flex items-center justify-center font-black text-xl"
              style={{ border: `2px solid ${color}50`, color: `${color}90`, background: `${color}10` }}>
              {initials}
            </div>
            <span className="text-xs uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.15)' }}>
              {usingMock ? 'sample mode' : bodyPart}
            </span>
          </div>
        )}

        {/* Hover overlay - shows "View Details" button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(0,0,0,0.75)' }}>
          <div className="flex items-center gap-2 px-5 py-2.5 font-black text-xs uppercase tracking-widest"
            style={{ background: color, color: '#000' }}>
            View Details <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Target muscle badge - top right */}
        <div className="absolute top-3 right-3 px-2.5 py-1 text-xs font-black uppercase tracking-wider"
          style={{ background: color, color: '#000' }}>
          {target}
        </div>

        {/* Mock mode indicator - shows "sample" badge when using mock data */}
        {usingMock && (
          <div className="absolute top-3 left-3 px-2 py-0.5 text-xs uppercase tracking-wider"
            style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}>
            sample
          </div>
        )}
      </div>

      {/* ── CARD BODY ───────────────────────────────────────────── */}
      <div className="p-5">
        <h3 className="font-bold text-white text-sm mb-2 leading-tight capitalize"
         >
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40 uppercase tracking-widest">{bodyPart}</span>
          <span className="text-xs uppercase tracking-wider px-2 py-0.5"
            style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}>
            {equipment}
          </span>
        </div>
      </div>

      {/* Bottom accent line - animates on hover */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500"
        style={{ background: color }} />
    </div>
  )
}

export default ExerciseCard