import axios from './axios.config';
import { AxiosError, AxiosResponse } from 'axios';
import { TaskType } from '../schemas/tasks/taskSchema';
import { UserCredentials } from './auth';
export interface TaskDataResponse {
  _id: string;
  title: string;
  description: string;
  date: string;
  user: UserCredentials;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getTasks: () => Promise<
  AxiosResponse<TaskDataResponse[], AxiosError>
> = () => axios.get('/api/tasks');

export const getTaskReques = (id: string) => axios.get(`/api/tasks/${id}`);

export const createTask = (task: TaskType) => axios.post('/api/tasks', task);

export const updateTask = (id: string, task: TaskType) =>
  axios.put(`/api/tasks/${id}`, task);

export const deleteTaskRequest = (id: string) =>
  axios.delete(`/api/tasks/${id}`);
