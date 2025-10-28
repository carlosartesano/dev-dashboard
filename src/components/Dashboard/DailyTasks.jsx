import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const DailyTasks = () => {
  const [tasks, setTasks] = useLocalStorage('dev-dashboard-tasks', []);
  const [inputValue, setInputValue] = useState('');

  // Add new task
  const addTask = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    const newTask = {
      id: Date.now().toString(),
      text: trimmedValue,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="card h-[500px] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0">
        <h2 className="text-xl font-bold text-black dark:text-white mb-4 text-center">🎯 Today's Focus</h2>

        {/* Input Section */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="input flex-1"
            placeholder="Add a task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="btn-primary flex items-center gap-2 px-4"
            onClick={addTask}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Task List - Scrollable */}
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-sm text-black dark:text-white">
              No tasks yet. Add one to get started!
            </div>
          ) : (
            tasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-center gap-3 p-3 rounded-lg transition-all duration-200 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10"
            >
              {/* Checkbox */}
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="sr-only"
                />
                <div
                  className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200"
                  style={{
                    borderColor: task.completed
                      ? 'var(--color-primary)'
                      : 'rgba(255, 255, 255, 0.3)',
                    backgroundColor: task.completed
                      ? 'var(--color-primary)'
                      : 'transparent',
                  }}
                >
                  {task.completed && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </label>

              {/* Task Text */}
              <span
                className="flex-1 text-base text-black dark:text-white transition-all duration-200"
                style={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  opacity: task.completed ? 0.6 : 1,
                }}
              >
                {task.text}
              </span>

              {/* Delete Button */}
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded hover:bg-red-500 hover:bg-opacity-20"
                aria-label="Delete task"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0">
        {totalTasks > 0 && (
          <div className="text-sm text-black dark:text-white pt-3 border-t border-gray-200 dark:border-border-subtle">
            {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'} · {completedTasks} completed
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyTasks;
