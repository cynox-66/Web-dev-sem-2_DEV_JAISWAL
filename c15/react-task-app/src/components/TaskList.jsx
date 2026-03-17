import TaskItem from './TaskItem'

/**
 * TaskList — renders filtered tasks or an empty state.
 */
export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">�</span>
        <p className="empty-title">NOTHING HERE, DUDE</p>
        <p className="empty-subtitle">
          ADD A TASK OR CHANGE YOUR FILTERS!
        </p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
