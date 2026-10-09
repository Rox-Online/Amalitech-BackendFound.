import {
  getAllTasks,
  addTask,
  getTaskById,
  getTasksByStatus,
  updateTask,
  deleteTask,
  getTaskSummary
} from './taskService.js';
import { fetchTaskWithDelay } from './asyncDemo.js';

async function run() {
  console.log('--- DAY 1 EXERCISES ---');

  // 1. Summary
  console.log('\nInitial Task Summary:', getTaskSummary());

  // 2. Add Task
  const newCreated = addTask({
    title: 'Review PR comments',
    status: 'pending',
    priority: 'high',
    assignee: 'Sam'
  });
  console.log('\nAdded Task:', newCreated);

  // 3. Filter by Status
  console.log('\nPending Tasks:', getTasksByStatus('pending'));

  // 4. Update Task
  const updated = updateTask(1, { status: 'in-progress' });
  console.log('\nUpdated Task 1:', updated);

  // 5. Delete Task
  try {
    deleteTask(2);
    console.log('\nDeleted Task 2. New total count:', getAllTasks().length);
  } catch (error) {
    console.log('\nDelete Task 2 skipped:', error.message);
  }

  // 6. Async Fetch Demo
  console.log('\nFetching Task 3 asynchronously...');
  const asyncTask = await fetchTaskWithDelay(3, 500);
  console.log('Fetched Async Task:', asyncTask);

  // 7. Intentional Error Handling with try/catch
  console.log('\nTesting intentional error handling for non-existent ID 999:');
  try {
    await fetchTaskWithDelay(999, 500);
  } catch (error) {
    console.error('Caught expected error:', error.message);
  }
}

run();