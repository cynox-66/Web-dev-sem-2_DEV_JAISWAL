import { useReducer, useState, useMemo, useCallback } from 'react'
import { taskReducer, initialState } from '../reducers/taskReducer'
import FILTERS from '../constants/filters'

/**
 * useTasks — single hook that owns all task state + logic.
 * Components just consume the returned API.
 */
export function useTasks() {
  const [tasks, dispatch] = useReducer(taskReducer, initialState)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // ── Actions (stable refs via useCallback) ──
  const addTask = useCallback(
    (text) => dispatch({ type: 'ADD_TASK', payload: { text } }),
    []
  )
  const deleteTask = useCallback(
    (id) => dispatch({ type: 'DELETE_TASK', payload: { id } }),
    []
  )
  const toggleTask = useCallback(
    (id) => dispatch({ type: 'TOGGLE_TASK', payload: { id } }),
    []
  )
  const editTask = useCallback(
    (id, text) => dispatch({ type: 'EDIT_TASK', payload: { id, text } }),
    []
  )
  const clearCompleted = useCallback(
    () => dispatch({ type: 'CLEAR_COMPLETED' }),
    []
  )
  const toggleAll = useCallback(
    () => dispatch({ type: 'TOGGLE_ALL' }),
    []
  )

  // ── Derived / filtered list (memoized) ──
  const filteredTasks = useMemo(() => {
    const filterObj = FILTERS.find((f) => f.key === filter)
    const predicate = filterObj ? filterObj.predicate : () => true
    const query = searchQuery.toLowerCase()

    return tasks.filter(
      (t) => predicate(t) && t.text.toLowerCase().includes(query)
    )
  }, [tasks, filter, searchQuery])

  // ── Stats (memoized) ──
  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    return {
      total,
      completed,
      pending: total - completed,
      allDone: total > 0 && completed === total,
    }
  }, [tasks])

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    stats,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    clearCompleted,
    toggleAll,
  }
}
