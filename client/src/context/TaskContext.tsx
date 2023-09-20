import { createContext, useContext } from 'react';
import { TaskType } from '../schemas/tasks/taskSchema';
import { createTask, getTasks } from '../api/task';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface ITaskContext {
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
      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <TaskContext.Provider value={{ createNewTask, getTasksRequest }}>
      {children}
    </TaskContext.Provider>
  );
};
