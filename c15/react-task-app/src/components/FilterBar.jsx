import { memo } from 'react'
import FILTERS from '../constants/filters'

/**
 * FilterBar — renders from FILTERS config array.
 * Adding a new filter = adding one object to the array.
 * Memoized — only re-renders when activeFilter changes.
 */
function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-bar">
      {FILTERS.map(({ key, label, icon }) => (
        <button
          key={key}
          className={`filter-btn ${activeFilter === key ? 'active' : ''}`}
          onClick={() => onFilterChange(key)}
        >
          <span className="filter-icon">{icon}</span>
          {label}
        </button>
      ))}
    </div>
  )
}

export default memo(FilterBar)
