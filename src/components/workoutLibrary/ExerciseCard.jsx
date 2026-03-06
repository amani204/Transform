import { ArrowUpRight } from 'lucide-react'
import { MUSCLE_COLORS } from '../../services/mockData'

const GifPlaceholder = ({ name, bodyPart }) => {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-white/5">
      <div className="w-16 h-16 flex items-center justify-center font-black text-xl border-2 border-primary/30 text-primary/60">
        {initials}
      </div>
      <span className="text-xs text-white/20 uppercase tracking-widest">{bodyPart}</span>
    </div>
  )
}

const ExerciseCard = ({ exercise, onClick, animRef }) => {
  const { name, bodyPart, equipment, target, gifUrl } = exercise
  const color = MUSCLE_COLORS[target] || MUSCLE_COLORS.default

  return (
    <div
      ref={animRef}
      onClick={() => onClick(exercise)}
      className="group cursor-pointer relative overflow-hidden bg-white/5 border border-white/10 opacity-0"
    >
      {/* Image area */}
      <div className="relative h-[220px] overflow-hidden">
        {gifUrl ? (
          <img
            src={gifUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <GifPlaceholder name={name} bodyPart={bodyPart} />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70">
          <div className="flex items-center gap-2 px-5 py-2.5 font-black text-xs uppercase tracking-widest bg-primary text-black">
            View Details <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Target badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 text-xs font-black uppercase tracking-wider"
          style={{ background: color, color: '#000' }}>
          {target}
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-bold text-white text-base mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40 uppercase tracking-widest">{bodyPart}</span>
          <span className="text-xs uppercase tracking-wider px-2 py-0.5 border border-white/10 text-white/40">
            {equipment}
          </span>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500"
        style={{ background: color }} />
    </div>
  )
}

export default ExerciseCard