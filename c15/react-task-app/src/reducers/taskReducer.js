/**
 * Pure reducer — all task mutations live here.
 * Actions: ADD_TASK, DELETE_TASK, TOGGLE_TASK, EDIT_TASK,
 *          CLEAR_COMPLETED, TOGGLE_ALL
 */

let nextId = 1

export const initialState = []

export function taskReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const { text } = action.payload
      if (!text.trim()) return state
      return [
        ...state,
        {
          id: nextId++,
          text: text.trim(),
          completed: false,
          createdAt: Date.now(),
        },
      ]
    }

    case 'DELETE_TASK':
      return state.filter((t) => t.id !== action.payload.id)

    case 'TOGGLE_TASK':
      return state.map((t) =>
        t.id === action.payload.id ? { ...t, completed: !t.completed } : t
      )

    case 'EDIT_TASK':
      return state.map((t) =>
        t.id === action.payload.id
          ? { ...t, text: action.payload.text.trim() }
          : t
      )

    case 'CLEAR_COMPLETED':
      return state.filter((t) => !t.completed)

    case 'TOGGLE_ALL': {
      const allDone = state.every((t) => t.completed)
      return state.map((t) => ({ ...t, completed: !allDone }))
    }

    default:
      return state
  }
}
