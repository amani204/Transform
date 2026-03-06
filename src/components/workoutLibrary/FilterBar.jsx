import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const FilterBar = ({ activeFilter, setActiveFilter, filterType, setFilterType, filters, searchQuery, setSearchQuery }) => {
  const barRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(barRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.3 }
    )
  }, [])

  const tabs = [
    { label: 'Body Part', value: 'bodyPart' },
    { label: 'Equipment', value: 'equipment' },
    { label: 'Muscle', value: 'target' },
  ]

  const getTabStyle = (isActive) => ({
    background: isActive ? 'var(--color-primary)' : 'transparent',
    color: isActive ? '#000' : 'rgba(255,255,255,0.4)',
    border: 'none'
  })

  const getPillStyle = (isActive) => ({
    background: isActive ? 'var(--color-primary)' : 'transparent',
    color: isActive ? '#000' : 'rgba(255,255,255,0.4)',
    border: '1px solid rgba(255,255,255,0.1)'
  })

  return (
    <div ref={barRef} className="py-5 bg-black">
      <div className="container-custom px-6">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">

          {/* Tabs */}
          <div className="flex gap-1 p-1 border border-white/10 bg-white/5">
            {tabs.map(tab => (
              <button
                key={tab.value}
                onClick={() => { setFilterType(tab.value); setActiveFilter('all') }}
                className="px-4 py-2 text-xs font-black uppercase transition-all duration-200"
                style={getTabStyle(filterType === tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-white text-sm py-2.5 px-4 outline-none border border-primary/20 placeholder-white/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="shrink-0 px-4 py-1.5 text-xs font-black uppercase tracking-widest transition-all duration-200"
              style={getPillStyle(activeFilter === filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterBar