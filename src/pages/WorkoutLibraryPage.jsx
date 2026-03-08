import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Dumbbell, AlertCircle } from 'lucide-react'
import { useExercises } from '../hooks/useExercises'
import { Card, Modal, Filter, Pagination, Skeleton } from '../components/workoutLibrary'
import { EQUIPMENT_LIST, BODY_PARTS, TARGET_MUSCLES } from '../services/mockData'
import { useLibraryHero, useExerciseGrid } from '../hooks'
const WorkoutLibraryPage = () => {
  const [selectedExercise, setSelectedExercise] = useState(null)

  const {
    exercises, isLoading, error, usingMock,
    page, setPage, hasMore, LIMIT,
    filterType, activeFilter, searchQuery, filterOptions,
    changeFilter, changeFilterType, changeSearch,
  } = useExercises()

  // REFS 
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const statsRef = useRef(null)
  const statusRef = useRef(null)
  const gridRef = useRef(null)
  const cardRefs = useRef([])

 useLibraryHero({ heroRef, titleRef, subtitleRef, statsRef, statusRef }, usingMock)
 useExerciseGrid(cardRefs, isLoading, exercises)

  const resultCount = exercises.length
  const hasActiveFilters = activeFilter !== 'all' || searchQuery.trim() !== ''

  return (
    <div className="bg-dark-bg min-h-screen">
      {/* HERO SECTION */}
      <div className="pt-40 pb-12 px-6 overflow-hidden border-b border-white/10 relative">
        {/* Background glow effects */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div ref={heroRef} className="container-custom relative z-10">
          <span className="block text-primary font-black tracking-[0.25em] text-xs uppercase mb-3">
            Workout Library
          </span>
          
          <h1 
            ref={titleRef}
            className="text-5xl md:text-6xl font-bold text-white leading-tight mb-3"
          >
            Find Your Exercise
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-white/40 text-lg max-w-lg"
          >
            {usingMock
              ? 'Sample exercises shown — API limit reached. Full library retries in 60 min.'
              : `${BODY_PARTS.length - 1} body parts, ${EQUIPMENT_LIST.length - 1} equipment types — powered by ExerciseDB.`
            }
          </p>

          {/* Stats Grid */}
          <div ref={statsRef} className="flex flex-wrap gap-8 mt-8">
            {[
              {
                label: 'Exercises',
                value: isLoading
                  ? '...'
                  : usingMock
                  ? '28 samples'
                  : '1,300+',
              },
              {
                label: 'Body Parts',
                value: BODY_PARTS.length - 1,
              },
              {
                label: 'Equipment',
                value: `${EQUIPMENT_LIST.length - 1}+`,
              },
              {
                label: 'Muscle Groups',
                value: `${TARGET_MUSCLES.length - 1}+`,
              },
            ].map(s => (
              <div key={s.label}>
                <div className={`text-2xl font-black transition-colors duration-500 ${
                  usingMock ? 'text-white/40' : 'text-white'
                }`}>
                  {s.value}
                </div>
                <div className="text-xs text-white/25 uppercase tracking-widest mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Status Indicator */}
          <div ref={statusRef} className="flex items-center gap-2 mt-6">
            <div className={`w-1.5 h-1.5 rounded-full ${usingMock ? 'bg-red-700' : 'bg-green-400'}`}
              style={!usingMock ? { boxShadow: '0 0 6px #4ade80', animation: 'pulse 2s infinite' } : {}} />
            <span className="text-xs uppercase tracking-widest"
              style={{ color: usingMock ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.35)' }}>
              {usingMock ? 'Offline — sample mode' : 'Live — ExerciseDB'}
            </span>
          </div>
        </div>
      </div>

      {/* FILTER BAR  */}
      <Filter
        filterType={filterType}
        changeFilterType={changeFilterType}
        activeFilter={activeFilter}
        changeFilter={changeFilter}
        filterOptions={filterOptions}
        searchQuery={searchQuery}
        changeSearch={changeSearch}
      />

      {/* MOCK MODE BANNER */}
      {usingMock && (
        <div className="flex items-center justify-center gap-2 py-2 text-xs uppercase tracking-widest"
          style={{ background: 'rgba(255,100,0,0.08)', borderBottom: '1px solid rgba(255,100,0,0.15)', color: 'rgba(255,100,0,0.6)' }}>
          <span>Showing sample data — API limit reached. Will retry in 60 min.</span>
        </div>
      )}

      {/* MAIN CONTENT  */}
      <div ref={gridRef} className="container-custom px-6 py-10">

        {/* RESULT META & CLEAR BUTTON */}
        <div className="flex items-center justify-between mb-7">
          {!isLoading && !error && (
            <p className="text-white/25 text-xs uppercase tracking-widest">
              {resultCount === 0 ? 'No results' : `${resultCount} exercises · page ${page}`}
            </p>
          )}
          
          <div className="flex items-center gap-3 ml-auto">
            {activeFilter !== 'all' && (
              <div className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-sm uppercase tracking-wider">
                {activeFilter}
              </div>
            )}
            
            {searchQuery && (
              <div className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-sm">
                "{searchQuery}"
              </div>
            )}
            
            {hasActiveFilters && (
              <button
                onClick={() => { 
                  changeFilter('all'); 
                  changeSearch('');
                  if (page !== 1) setPage(1);
                }}
                className="text-xs text-white/60 hover:text-primary transition-colors uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-sm border border-white/20 hover:border-primary/50"
              >
                Clear ✕
              </button>
            )}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-28 text-center gap-4">
            <AlertCircle className="w-10 h-10 text-red-400/40" />
            <h3 className="text-white/40 text-lg font-bold">Something went wrong</h3>
            <p className="text-white/25 text-sm max-w-xs">{error}</p>
            <button
              onClick={() => { changeFilter('all'); changeSearch(''); }}
              className="mt-2 px-6 py-2.5 text-xs font-black uppercase tracking-widest text-primary/60 hover:text-primary transition-colors"
              style={{ border: '1px solid rgba(255,100,0,0.3)' }}
            >
              Reset
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: LIMIT }).map((_, i) => <Skeleton key={i} />)}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && resultCount === 0 && (
          <div className="flex flex-col items-center justify-center py-28 text-center gap-3">
            <Dumbbell className="w-10 h-10 text-white/10" />
            <h3 className="text-white/30 text-lg font-bold">No exercises found</h3>
            <p className="text-white/20 text-sm">Try a different filter or search term</p>
          </div>
        )}

        {/* Exercise Grid */}
        {!isLoading && !error && resultCount > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {exercises.map((ex, i) => (
              <Card
                key={ex.id}
                exercise={ex}
                onClick={setSelectedExercise}
                animRef={el => { cardRefs.current[i] = el }}
                usingMock={usingMock}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!error && (
          <Pagination
            page={page}
            hasMore={hasMore}
            isLoading={isLoading}
            onPrev={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
          />
        )}
      </div>

      {/* Modal */}
      {selectedExercise && (
        <Modal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  )
}

export default WorkoutLibraryPage