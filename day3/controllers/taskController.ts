type Request = import('express').Request;
type Response = import('express').Response;
const taskService = require('../services/taskService');

const getHealth = (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
};

const getAllTasks = (req: Request, res: Response) => {
  const tasks = taskService.getTasks();
  res.status(200).json({ success: true, data: tasks });
};

const getTaskById = (req: Request, res: Response) => {
  const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(taskId ?? '', 10);
  const task = taskService.getTaskById(id);
  if (!task) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }
  res.status(200).json({ success: true, data: task });
};

const createTask = (req: Request, res: Response) => {
  const { title, description, assignee } = req.body;
  if (!title || !description) {
    return res.status(400).json({ success: false, error: 'Title and description are required' });
  }
  const newTask = taskService.createTask(title, description, assignee || 'Unassigned');
  res.status(201).json({ success: true, data: newTask });
};

const updateTask = (req: Request, res: Response) => {
  const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(taskId ?? '', 10);
  try {
    const updated = taskService.updateTaskStatus(id, req.body.status);
    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    res.status(404).json({ success: false, error: error.message });
  }
};

const deleteTask = (req: Request, res: Response) => {
  const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(taskId ?? '', 10);
  const success = taskService.deleteTask(id);
  if (!success) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }
  res.status(204).send();
};

module.exports = { getHealth, getAllTasks, getTaskById, createTask, updateTask, deleteTask };
