import { useTasks } from './hooks/useTasks'
import TaskInput from './components/TaskInput'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import StatsBar from './components/StatsBar'
import BulkActions from './components/BulkActions'
import TaskList from './components/TaskList'
import './App.css'

function App() {
  const {
    tasks,
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
  } = useTasks()

  return (
    <div className="app">
      <header className="app-header">
        <h1>⚡ TASKFLOW ⚡</h1>
        <p className="app-subtitle">SMASH YOUR TODOS. GET STUFF DONE. 💥</p>
      </header>

      <main className="app-main">
        <TaskInput onAdd={addTask} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <StatsBar stats={stats} />
        <FilterBar activeFilter={filter} onFilterChange={setFilter} />
        <BulkActions
          stats={stats}
          onToggleAll={toggleAll}
          onClearCompleted={clearCompleted}
        />
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </main>

      <footer className="app-footer">
        <p>🎸 DOUBLE-CLICK TO EDIT · ENTER TO SAVE · ESC TO BAIL 🎸</p>
      </footer>
    </div>
  )
}

export default App
