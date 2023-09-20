import axios from './axios.config';
import { TaskType } from '../schemas/tasks/taskSchema';

export const getTasks = () => axios.get('/api/tasks');

export const getTaskReques = (id: string) => axios.get(`/api/tasks/${id}`);

export const createTask = (task: TaskType) => axios.post('/api/tasks', task);

export const updateTask = (id: string, task: TaskType) =>
  axios.put(`/api/tasks/${id}`, task);

export const deleteTask = (id: string) => axios.delete(`/api/tasks/${id}`);
