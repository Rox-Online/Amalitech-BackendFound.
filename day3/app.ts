import express from 'express';
import { requestLogger } from './middleware/requestLogger';
import * as taskController from './controllers/taskController';

const app = express();

app.use(express.json()); // Enables parsing JSON request bodies[cite: 1]
app.use(requestLogger);  // Custom logging middleware[cite: 1]

// Routes[cite: 1]
app.get('/health', taskController.getHealth);
app.get('/tasks', taskController.getAllTasks);
app.get('/tasks/:id', taskController.getTaskById);
app.post('/tasks', taskController.createTask);
app.patch('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

export default app;
