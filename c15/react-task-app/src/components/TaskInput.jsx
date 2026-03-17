import { useState, useRef, useEffect } from 'react'

/**
 * TaskInput — form for adding new tasks.
 * Enter to submit, auto-focuses on mount.
 */
export default function TaskInput({ onAdd }) {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    onAdd(value)
    setValue('')
  }

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="WHAT'S THE MISSION? 🔥"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" disabled={!value.trim()}>
        🚀 ADD
      </button>
    </form>
  )
}
