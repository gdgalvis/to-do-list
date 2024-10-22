import React, { useState, useEffect } from 'react';
import "./styles/style.css";

interface Task {
  id: number;
  description: string;
}

const App: React.FC = () => {
  const [taskInput, setTaskInput] = useState<string>('');  
  const [taskList, setTaskList] = useState<Task[]>([]);     

  // Local Storage
  useEffect(() => {
    const storedTasks = localStorage.getItem('task-list');
    if (storedTasks) {
      try {
        setTaskList(JSON.parse(storedTasks));  
      } catch (e) {
        console.error("Error parsing local storage", e);
        setTaskList([]);
      }
    }
  }, []);


  useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem('task-list', JSON.stringify(taskList));
    }
  }, [taskList]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  // Add task
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
  //Handles adding task using enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };
  // Delete task
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
          onKeyDown={handleKeyPress}
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