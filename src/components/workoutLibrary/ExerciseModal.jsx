import { useEffect, useRef } from 'react'
import { X, Dumbbell, Target, Layers } from 'lucide-react'
import gsap from 'gsap'
import { MUSCLE_COLORS } from '../../services/mockData'

const ExerciseModal = ({ exercise, onClose }) => {
  const overlayRef = useRef(null)
  const drawerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.5, ease: 'power3.out' })
  }, [])

  const handleClose = () => {
    gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: onClose })
  }

  const { name, bodyPart, equipment, target, secondaryMuscles, instructions, gifUrl } = exercise
  const color = MUSCLE_COLORS[target] || MUSCLE_COLORS.default

  const getInitials = () => name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  const MetaPill = ({ icon: Icon, children }) => (
    <div className="flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider text-white/60 border border-white/10">
      <Icon className="w-3.5 h-3.5" style={{ color }} />
      {children}
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div ref={overlayRef} onClick={handleClose} className="absolute inset-0 bg-black/75 backdrop-blur" />

      {/* Drawer */}
      <div ref={drawerRef} className="relative w-full max-w-lg h-full overflow-y-auto z-10 bg-[#0a0a0a] border-l border-white/10">
        
        {/* Close button */}
        <button onClick={handleClose} className="absolute top-6 right-6 z-20 p-2 text-white/40 hover:text-white border border-white/10">
          <X className="w-5 h-5" />
        </button>

        {/* Image area */}
        <div className="relative w-full h-[300px] bg-white/5">
          {gifUrl ? (
            <img src={gifUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 flex items-center justify-center font-black text-3xl border-2 border-primary/30 text-primary/50">
                {getInitials()}
              </div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          <div className="absolute top-4 left-6 px-3 py-1.5 text-xs font-black uppercase tracking-widest"
            style={{ background: color, color: '#000' }}>
            {target}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-12">
          <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
            {name}
          </h2>

          {/* Meta pills */}
          <div className="flex flex-wrap gap-3 mb-8">
            <MetaPill icon={Layers}>{bodyPart}</MetaPill>
            <MetaPill icon={Dumbbell}>{equipment}</MetaPill>
            {secondaryMuscles?.length > 0 && (
              <MetaPill icon={Target}>Also: {secondaryMuscles.join(', ')}</MetaPill>
            )}
          </div>

          <div className="w-full h-px bg-white/10 mb-8" />

          {/* Instructions */}
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-5">Instructions</h3>
          <ol className="space-y-5">
            {instructions?.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-xs font-black"
                  style={{ background: color, color: '#000' }}>
                  {i + 1}
                </span>
                <p className="text-white/70 text-sm leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default ExerciseModal