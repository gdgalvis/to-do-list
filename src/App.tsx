import React, { useState } from 'react';
import "./styles/style.css";

interface Task {
  id: number;
  description: string;
}

const App: React.FC = () => {
  const [taskInput, setTaskInput] = useState<string>('');  
  const [taskList, setTaskList] = useState<Task[]>([]);     

  // Update screen
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  // Add 
  const addTask = () => {
    if (taskInput.trim()) {
      const newTask: Task = {
        id: taskList.length + 1,  
        description: taskInput,
      };
      setTaskList([...taskList, newTask]);  
      setTaskInput('');  
    }
  };

  // Delete 
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
