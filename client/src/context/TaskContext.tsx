import { createContext, useContext, useState } from 'react';
import { TaskDataResponse } from '../api/task';
import { TaskType } from '../schemas/tasks/taskSchema';
import { createTask, getTasks, deleteTaskRequest } from '../api/task';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface ITaskContext {
  tasks: TaskDataResponse[];
  deleteTask: (id: string) => void;
  createNewTask: (task: TaskType) => void;
  getTasksRequest: () => void;
}

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskContext = createContext({} as ITaskContext);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTask must be used within an TaskProvider');
  return context;
};

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<TaskDataResponse[]>([]);

  const createNewTask = async (task: TaskType) => {
    try {
      await createTask(task);
      toast.success('Task created successfully 🥳');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };
  const getTasksRequest = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteTaskRequest(id);
      getTasksRequest();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <TaskContext.Provider
      value={{ createNewTask, getTasksRequest, tasks, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
