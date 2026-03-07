
import { useEffect, useRef, useState } from 'react'
import { X, Dumbbell, Target, Layers } from 'lucide-react'
import gsap from 'gsap'

const MUSCLE_COLORS = {
  abs: '#ff6400', biceps: '#f59e0b', calves: '#10b981',
  delts: '#3b82f6', glutes: '#8b5cf6', hamstrings: '#ec4899',
  lats: '#06b6d4', pectorals: '#ff6400', quads: '#84cc16',
  triceps: '#f97316', traps: '#a78bfa',
  'cardiovascular system': '#ef4444',
}
const getColor = (target) => MUSCLE_COLORS[target] || '#6b7280'

// Shared blob cache with ExerciseCard
const gifCache = new Map()

const useGif = (id) => {
  const [src,     setSrc]     = useState(() => gifCache.get(id) || null)
  const [loading, setLoading] = useState(!gifCache.has(id))
  const [error,   setError]   = useState(false)

  useEffect(() => {
    if (!id) { setError(true); setLoading(false); return }
    if (gifCache.has(id)) { setSrc(gifCache.get(id)); setLoading(false); return }

    let cancelled = false
    const url = `https://exercisedb.p.rapidapi.com/image?exerciseId=${id}&resolution=360`

    fetch(url, {
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      },
    })
      .then(res => { if (!res.ok) throw new Error(res.status); return res.blob() })
      .then(blob => {
        if (cancelled) return
        const objectUrl = URL.createObjectURL(blob)
        gifCache.set(id, objectUrl)
        setSrc(objectUrl)
        setLoading(false)
      })
      .catch(() => { if (!cancelled) { setError(true); setLoading(false) } })

    return () => { cancelled = true }
  }, [id])

  return { src, loading, error }
}

const ExerciseModal = ({ exercise, onClose }) => {
  const overlayRef = useRef(null)
  const drawerRef  = useRef(null)
  const { src: gifSrc, loading: gifLoading, error: gifError } = useGif(exercise?.id)

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(drawerRef.current,  { x: '100%' },  { x: '0%',  duration: 0.5, ease: 'power3.out' })
  }, [])

  const handleClose = () => {
    gsap.to(drawerRef.current,  { x: '100%', duration: 0.4, ease: 'power3.in' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.15, onComplete: onClose })
  }

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const {
    id = '', name = 'Exercise', bodyPart = '', equipment = '',
    target = '', secondaryMuscles = [], instructions = [],
    difficulty, category,
  } = exercise

  const color    = getColor(target)
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div ref={overlayRef} onClick={handleClose} className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }} />

      <div ref={drawerRef}
        className="relative w-full max-w-lg h-full overflow-y-auto z-10 flex flex-col"
        style={{ background: '#0a0a0a', borderLeft: '1px solid rgba(255,255,255,0.08)' }}>

        <button onClick={handleClose}
          className="absolute top-5 right-5 z-20 p-2 text-white/30 hover:text-white transition-colors"
          style={{ border: '1px solid black' }}>
          <X className="w-4 h-4" />
        </button>

        {/* GIF */}
        <div className="relative shrink-0" style={{ height: '280px', background: '#111' }}>
          {gifLoading && (
            <div className="absolute inset-0 animate-pulse"
              style={{ background: 'rgba(255,255,255,0.04)' }} />
          )}
          {gifSrc && !gifError && (
            <img src={gifSrc} alt={name} className="w-full h-full object-cover"
              style={{ opacity: gifLoading ? 0 : 1, transition: 'opacity 0.5s ease' }} />
          )}
          {gifError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 flex items-center justify-center font-black text-2xl"
                style={{ border: `2px solid ${color}50`, color: `${color}70` }}>
                {initials}
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-20"
            style={{ background: 'linear-gradient(to top, #0a0a0a, transparent)' }} />
          <div className="absolute top-4 left-5 px-3 py-1 text-xs font-black uppercase tracking-widest"
            style={{ background: color, color: '#000' }}>
            {target}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-7 pb-10 pt-4">
          <h2 className="text-2xl font-bold text-white mb-2 capitalize leading-snug"
            style={{ fontFamily: 'Georgia, serif' }}>
            {name}
          </h2>

          {(difficulty || category) && (
            <div className="flex gap-2 mb-5">
              {[difficulty, category].filter(Boolean).map(tag => (
                <span key={tag} className="text-xs uppercase tracking-wider px-2 py-1"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { icon: Layers,   text: bodyPart },
              { icon: Dumbbell, text: equipment },
              ...(secondaryMuscles.length
                ? [{ icon: Target, text: secondaryMuscles.slice(0, 2).join(', ') }]
                : []),
            ].map(({ icon: Icon, text }) => (
              <div key={text}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider text-white/50"
                style={{ border: '1px solid rgba(255,255,255,0.09)' }}>
                <Icon className="w-3 h-3" style={{ color }} />
                {text}
              </div>
            ))}
          </div>

          <div className="w-full h-px mb-6" style={{ background: 'rgba(255,255,255,0.07)' }} />

          <p className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-4">Instructions</p>
          {instructions.length > 0 ? (
            <ol className="space-y-4">
              {instructions.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs font-black mt-0.5"
                    style={{ background: color, color: '#000' }}>
                    {i + 1}
                  </span>
                  <p className="text-white/60 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-white/30 text-sm italic">No instructions available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExerciseModal
