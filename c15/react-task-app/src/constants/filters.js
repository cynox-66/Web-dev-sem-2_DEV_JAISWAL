/**
 * Filter configuration — array-driven so adding a new filter
 * is a one-liner. Components just .map() over this.
 */
const FILTERS = [
  { key: 'all',       label: 'All',       icon: '📋', predicate: () => true },
  { key: 'pending',   label: 'Pending',   icon: '⏳', predicate: (t) => !t.completed },
  { key: 'completed', label: 'Completed', icon: '✅', predicate: (t) => t.completed },
]

export default FILTERS
