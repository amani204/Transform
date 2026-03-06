import { useState, useEffect, useRef, useMemo } from 'react'
import gsap from 'gsap'
import { Dumbbell } from 'lucide-react'


import {
  MOCK_EXERCISES,
  BODY_PARTS,
  EQUIPMENT_LIST,
  TARGET_MUSCLES,
} from '../services/mockData'
import SkeletonCard from '../components/WorkoutLibrary/SkeletonCard'
import ExerciseCard from '../components/WorkoutLibrary/ExerciseCard'
import FilterBar from '../components/WorkoutLibrary/FilterBar'
import ExerciseModal from '../components/WorkoutLibrary/ExerciseModal'

const WorkoutLibraryPage = () => {
  const [filterType, setFilterType] = useState('bodyPart')
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const gridRef = useRef(null)
  const cardRefs = useRef([])

  // Simulate loading
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [activeFilter, filterType, searchQuery])

  // GSAP animation
  useEffect(() => {
    if (isLoading) return
    const validCards = cardRefs.current.filter(Boolean)
    if (!validCards.length) return

    gsap.fromTo(validCards,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.1 }
    )
  }, [isLoading])

  // Filter options based on type
  const filterOptions = useMemo(() => {
    const options = {
      bodyPart: BODY_PARTS,
      equipment: EQUIPMENT_LIST,
      target: TARGET_MUSCLES
    }
    return options[filterType] || []
  }, [filterType])

  // Filter and search exercises
  const filteredExercises = useMemo(() => {
    let results = MOCK_EXERCISES

    if (activeFilter !== 'all') {
      results = results.filter(ex => ex[filterType] === activeFilter)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(ex => 
        [ex.name, ex.target, ex.bodyPart, ex.equipment].some(field => 
          field.toLowerCase().includes(query)
        )
      )
    }

    return results
  }, [activeFilter, filterType, searchQuery])

  const stats = [
    { label: 'Exercises', value: MOCK_EXERCISES.length + '+' },
    { label: 'Body Parts', value: BODY_PARTS.length - 1 },
    { label: 'Equipment', value: EQUIPMENT_LIST.length - 1 },
    { label: 'Muscle Groups', value: TARGET_MUSCLES.length - 1 },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Hero Section */}
      <div className="py-42 pb-12 px-6 relative overflow-hidden border-b border-white/10">
        <div className="container-custom relative z-10">
          <span className="block text-primary font-black tracking-[0.2em] text-xs uppercase mb-4">
            Workout Library
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            Find Your Exercise
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Browse {MOCK_EXERCISES.length}+ exercises by muscle group, equipment, or name.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-8">
            {stats.map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/30 uppercase tracking-widest mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filterType={filterType}
        setFilterType={setFilterType}
        filters={filterOptions}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Content */}
      <div className="container-custom px-6 py-12" ref={gridRef}>
        {!isLoading && (
          <div className="flex items-center justify-between mb-8">
            <p className="text-white/30 text-sm uppercase tracking-widest">
              {filteredExercises.length === 0
                ? 'No results'
                : `${filteredExercises.length} exercise${filteredExercises.length !== 1 ? 's' : ''}`
              }
            </p>
            {(activeFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => { setActiveFilter('all'); setSearchQuery('') }}
                className="text-xs text-white/30 hover:text-primary transition-colors uppercase tracking-widest"
              >
                Clear filters ✕
              </button>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredExercises.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <Dumbbell className="w-12 h-12 text-white/10 mb-4" />
            <h3 className="text-white/30 text-xl font-bold mb-2">No exercises found</h3>
            <p className="text-white/20 text-sm">Try a different filter or search term</p>
          </div>
        )}

        {/* Exercise Grid */}
        {!isLoading && filteredExercises.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredExercises.map((exercise, i) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                onClick={setSelectedExercise}
                animRef={el => cardRefs.current[i] = el}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {!isLoading && filteredExercises.length > 0 && (
          <div className="text-center mt-16">
            <button className="px-10 py-4 font-black uppercase tracking-widest text-sm text-white/40 border border-white/10 hover:text-white transition-colors">
              Load More
            </button>
            <p className="text-white/20 text-xs mt-3 uppercase tracking-widest">
              Showing {filteredExercises.length} results
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedExercise && (
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  )
}

export default WorkoutLibraryPage