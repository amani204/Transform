// src/components/WorkoutLibrary/Pagination.jsx
import { ChevronLeft, ChevronRight } from 'lucide-react'
const Pagination = ({ page, hasMore, onPrev, onNext, isLoading }) => {
  if (!hasMore && page <= 1) return null

  return (
    <div className="flex items-center justify-center gap-4 mt-14">

      <button
        onClick={onPrev}
        disabled={page === 1 || isLoading}
        className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
        style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
      >
        <ChevronLeft className="w-4 h-4" /> Prev
      </button>

      {/* Page number */}
      <div
        className="bg-primary w-10 h-10 flex items-center justify-center font-black text-sm" 
      >
        {page}
      </div>
      

      <button
        onClick={onNext}
        disabled={!hasMore || isLoading}
        className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
        style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' }}
      >
        Next <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

export default Pagination
