type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  assignee: string;
  createdAt: Date;
}

const tasks: Task[] = [];

function createTask(title: string, description: string, assignee: string): Task {
  const newTask: Task = {
    id: tasks.length + 1,
    title,
    description,
    status: 'TODO',
    priority: 'MEDIUM',
    assignee,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  return newTask;
}

function updateTaskStatus(id: number, status: TaskStatus): Task {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }
  task.status = status;
  return task;
}

declare const module: {
  exports: {
    createTask: typeof createTask;
    updateTaskStatus: typeof updateTaskStatus;
  };
};

module.exports = { createTask, updateTaskStatus };