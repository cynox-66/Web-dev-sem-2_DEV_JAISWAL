import { memo, useState, useRef, useEffect } from 'react'

/**
 * TaskItem — single task row.
 * - Click label → toggle complete
 * - Double-click label → enter edit mode
 * - Enter → save edit
 * - Escape → cancel edit
 * - ✕ → delete
 *
 * Memoized to avoid re-rendering every item on any state change.
 */
function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const editRef = useRef(null)

  /* Punk color rotation — each task gets a different sticker color */
  const stickerColors = ['yellow', 'red', 'blue', 'green', 'pink', 'orange', 'purple']
  const colorClass = `sticker-${stickerColors[task.id % stickerColors.length]}`

  // Auto-focus input when entering edit mode
  useEffect(() => {
    if (isEditing) {
      editRef.current?.focus()
      editRef.current?.select()
    }
  }, [isEditing])

  const startEdit = () => {
    setEditText(task.text)
    setIsEditing(true)
  }

  const saveEdit = () => {
    const trimmed = editText.trim()
    if (trimmed && trimmed !== task.text) {
      onEdit(task.id, trimmed)
    }
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setEditText(task.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  return (
    <div className={`task-item ${colorClass} ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <input
          ref={editRef}
          className="task-edit-input"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEdit}
        />
      ) : (
        <span className="task-text" onDoubleClick={startEdit}>
          {task.text}
        </span>
      )}

      <div className="task-actions">
        {!isEditing && (
          <button
            className="task-btn edit-btn"
            onClick={startEdit}
            title="Edit task"
          >
            ✎
          </button>
        )}
        <button
          className="task-btn delete-btn"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default memo(TaskItem)
