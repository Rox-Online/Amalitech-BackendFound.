export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskInput = {
  title: string;
  description?: string;
  completed?: boolean;
};

export type UpdateTaskInput = Partial<CreateTaskInput>;

class TaskService {
  private tasks: Task[] = [];

  getAll(): Task[] {
    return this.tasks.map((task) => ({ ...task }));
  }

  getById(id: string): Task | undefined {
    const task = this.tasks.find((item) => item.id === id);
    return task ? { ...task } : undefined;
  }

  create(taskData: CreateTaskInput): Task {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: this.generateId(),
      title: taskData.title.trim(),
      ...(taskData.description !== undefined
        ? { description: taskData.description.trim() }
        : {}),
      completed: Boolean(taskData.completed),
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.push(newTask);
    return { ...newTask };
  }

  update(id: string, updates: UpdateTaskInput): Task | undefined {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return undefined;
    }

    const currentTask = this.tasks[taskIndex];
    if (!currentTask) {
      return undefined;
    }

    const updatedTask: Task = {
      ...currentTask,
      title: updates.title !== undefined ? updates.title.trim() : currentTask.title,
      ...(updates.description !== undefined
        ? { description: updates.description.trim() }
        : {}),
      completed:
        updates.completed !== undefined
          ? Boolean(updates.completed)
          : currentTask.completed,
      updatedAt: new Date().toISOString(),
    };

    this.tasks[taskIndex] = updatedTask;
    return { ...updatedTask };
  }

  delete(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks.length !== initialLength;
  }

  clear(): void {
    this.tasks = [];
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

module.exports = TaskService;
