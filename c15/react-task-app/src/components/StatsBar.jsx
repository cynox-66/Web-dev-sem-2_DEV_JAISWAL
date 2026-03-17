import { memo } from 'react'

/**
 * StatsBar — shows task counts.
 * Memoized so it doesn't re-render unless stats object changes.
 */
function StatsBar({ stats }) {
  const { total, completed, pending } = stats

  return (
    <div className="stats-bar">
      <div className="stat">
        <span className="stat-value">{total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-value">{completed}</span>
        <span className="stat-label">Done</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-value">{pending}</span>
        <span className="stat-label">Pending</span>
      </div>
      {total > 0 && (
        <>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">
              {Math.round((completed / total) * 100)}%
            </span>
            <span className="stat-label">Rate</span>
          </div>
        </>
      )}
    </div>
  )
}

export default memo(StatsBar)
