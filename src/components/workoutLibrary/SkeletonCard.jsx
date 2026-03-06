// Skeleton loader — replace cards with these while API is fetching
const SkeletonCard = () => (
  <div
    className="overflow-hidden animate-pulse"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
  >
    {/* Image area */}
    <div className="w-full" style={{ height: '220px', background: 'rgba(255,255,255,0.05)' }} />
    {/* Content */}
    <div className="p-5 space-y-3">
      <div className="h-4 rounded-sm" style={{ background: 'rgba(255,255,255,0.07)', width: '70%' }} />
      <div className="flex justify-between">
        <div className="h-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.05)', width: '30%' }} />
        <div className="h-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.05)', width: '25%' }} />
      </div>
    </div>
  </div>
)

export default SkeletonCard