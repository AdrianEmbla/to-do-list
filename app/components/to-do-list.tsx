import React, { useState, useEffect } from "react";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

export default function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    setTasks([...tasks, { id: Date.now(), text: trimmed, done: false }]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-16">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-white text-black p-3 h-12 border-2 border-fuchsia-500 rounded-lg outline-none"
          placeholder="Add a new task"
        />
        <button
          onClick={addTask}
          className="bg-fuchsia-500 border-2 border-white text-white font-bold h-12 px-4 py-3 rounded-lg cursor-pointer hover:bg-fuchsia-600 transition-colors">
          Add
        </button>
      </div>

      <ul className="w-full max-w-md flex flex-col gap-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-3 p-3 border border-fuchsia-600 rounded-lg">
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              className="w-5 h-5"
            />
            <span
              className={`flex-1 ${task.done ? "line-through text-white" : ""}`}>
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-red-600 transition-colors">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
