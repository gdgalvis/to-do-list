import React, { useState, useEffect } from 'react';
import "./styles/style.css";

interface Task {
  id: number;
  description: string;
}

const App: React.FC = () => {
  const [taskInput, setTaskInput] = useState<string>('');  // For storing input value
  const [taskList, setTaskList] = useState<Task[]>([]);     // For storing the list of tasks

  // Load tasks from local storage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('task-list');
    if (storedTasks) {
      try {
        setTaskList(JSON.parse(storedTasks));  // Parse and set the task list from local storage
      } catch (e) {
        console.error("Error parsing local storage", e);
        setTaskList([]);
      }
    }
  }, []);

  // Save tasks to local storage whenever taskList changes
  useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem('task-list', JSON.stringify(taskList));
    }
  }, [taskList]);

  // Handle task input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  // Add task to the list
  const addTask = () => {
    if (taskInput.trim()) {
      const newTask: Task = {
        id: taskList.length + 1,   // Assigning a unique ID based on the length of the array
        description: taskInput,
      };
      setTaskList([...taskList, newTask]);  // Add the new task to the taskList array
      setTaskInput('');  // Clear the input after adding
    }
  };

  // Delete task by ID
  const deleteTask = (id: number) => {
    setTaskList(taskList.filter(task => task.id !== id));
  };

  return (
    <div className="container">
      <h1>Task</h1>
      <div className="input-container">
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Enter your task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div>
        {taskList.length === 0 ? (
          <p className="no-tasks">No tasks yet.</p>
        ) : (
          <ul className="task-list">
            {taskList.map((task) => (
              <li key={task.id}>
                <span>
                  {task.id}. {task.description}
                </span>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;