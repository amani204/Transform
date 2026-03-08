import { useRef } from 'react'
import { Search, X } from 'lucide-react'
 import { useFilterBarEntrance } from '../../hooks'
const TABS = [
  { label: 'Body Part', value: 'bodyPart' },
  { label: 'Equipment', value: 'equipment' },
  { label: 'Muscle',    value: 'target'    },
]

const FilterBar = ({
  filterType, changeFilterType,
  activeFilter, changeFilter,
  filterOptions,
  searchQuery, changeSearch,
}) => {
  const barRef = useRef(null)
  useFilterBarEntrance(barRef)
  

  return (
    <div
      ref={barRef}
      className="sticky top-0 z-30 py-4"
      style={{
        background: 'rgba(8,8,8,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="container-custom px-6">

        {/* type tabs + search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">

          {/* Tab toggle */}
          <div className="flex gap-1 p-1"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {TABS.map(tab => (
              <button
                key={tab.value}
                onClick={() => {
                  changeFilterType(tab.value);
                }}
                className="px-4 py-1.5 text-xs font-black uppercase tracking-widest transition-all duration-200"
                style={{
                  background: filterType === tab.value ? 'var(--color-primary)' : 'transparent',
                  color:      filterType === tab.value ? '#000'    : 'rgba(255,255,255,0.35)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
              style={{ color: 'rgba(255,255,255,0.25)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => changeSearch(e.target.value)}
              placeholder="Search exercises..."
              className="w-full bg-transparent text-white text-sm py-2 pl-9 pr-8 outline-none placeholder-white/20 border border-primary"
            />
            {searchQuery && (
              <button
                onClick={() => changeSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {filterOptions.map(opt => (
            <button
              key={opt}
              onClick={() => {
                changeFilter(opt);
              }}
              className="shrink-0 px-3 py-1 text-xs font-black uppercase tracking-widest transition-all duration-200"
              style={{
                background: activeFilter === opt ? 'var(--color-primary)' : 'transparent',
                color: activeFilter === opt ? '#000' : 'rgba(255,255,255,0.35)',
                border: activeFilter === opt ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.09)',
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterBar