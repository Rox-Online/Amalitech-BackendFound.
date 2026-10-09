import { tasks } from './data.js';

let taskList = [...tasks];

function getNextTaskId() {
  const highestId = taskList.reduce((maxId, task) => Math.max(maxId, task.id), 0);
  return highestId + 1;
}

// 1. Add a task
export function addTask(newTask) {
  const task = { id: getNextTaskId(), ...newTask };
  taskList.push(task);
  return task;
}

// 2. Find task by ID
export function getTaskById(id) {
  const task = taskList.find((t) => t.id === id);
  if (!task) {
    throw new Error(`Task with ID ${id} not found.`);
  }
  return task;
}

// 3. Filter tasks by status
export function getTasksByStatus(status) {
  return taskList.filter((t) => t.status === status);
}

// 4. Update a task
export function updateTask(id, updates) {
  const task = getTaskById(id);
  Object.assign(task, updates);
  return task;
}

// 5. Delete a task
export function deleteTask(id) {
  const initialLength = taskList.length;
  taskList = taskList.filter((t) => t.id !== id);
  if (taskList.length === initialLength) {
    throw new Error(`Cannot delete: Task with ID ${id} not found.`);
  }
  return true;
}

// 6. Summary function
export function getTaskSummary() {
  const total = taskList.length;
  const statusCounts = taskList.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {});

  return { totalTasks: total, countsByStatus: statusCounts };
}

export function getAllTasks() {
  return taskList;
}