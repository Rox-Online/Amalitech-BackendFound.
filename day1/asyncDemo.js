import { getTaskById } from './taskService.js';

// Simulate fetching a task asynchronously after a delay
export async function fetchTaskWithDelay(id, delayMs = 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const task = getTaskById(id);
        resolve(task);
      } catch (error) {
        reject(error);
      }
    }, delayMs);
  });
}