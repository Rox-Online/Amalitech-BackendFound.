import { Request, Response } from 'express';
const taskService = require('../services/taskService');

export const getHealth = (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
};

export const getAllTasks = (req: Request, res: Response) => {
  const tasks = taskService.getTasks();
  res.status(200).json({ success: true, data: tasks });
};

export const getTaskById = (req: Request, res: Response) => {
  const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(taskId, 10);
  const task = taskService.getTaskById(id);
  if (!task) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }
  res.status(200).json({ success: true, data: task });
};

export const createTask = (req: Request, res: Response) => {
  const { title, description, assignee } = req.body;
  if (!title || !description) {
    return res.status(400).json({ success: false, error: 'Title and description are required' });
  }
  const newTask = taskService.createTask(title, description, assignee || 'Unassigned');
  res.status(201).json({ success: true, data: newTask });
};

export const updateTask = (req: Request, res: Response) => {
  const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(taskId, 10);
  try {
    const updated = taskService.updateTaskStatus(id, req.body.status);
    res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    res.status(404).json({ success: false, error: error.message });
  }
};

export const deleteTask = (req: Request, res: Response) => {
  const taskId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(taskId, 10);
  const success = taskService.deleteTask(id);
  if (!success) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }
  res.status(204).send();
};
