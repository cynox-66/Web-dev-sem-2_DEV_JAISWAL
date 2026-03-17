import { memo } from 'react'

/**
 * BulkActions — "Mark all complete" + "Clear completed".
 * Only shows when there are tasks.
 */
function BulkActions({ stats, onToggleAll, onClearCompleted }) {
  const { total, completed, allDone } = stats

  if (total === 0) return null

  return (
    <div className="bulk-actions">
      <button className="bulk-btn" onClick={onToggleAll}>
        {allDone ? '↩ Uncheck All' : '✓ Complete All'}
      </button>
      {completed > 0 && (
        <button className="bulk-btn danger" onClick={onClearCompleted}>
          🗑 Clear Completed ({completed})
        </button>
      )}
    </div>
  )
}

export default memo(BulkActions)
