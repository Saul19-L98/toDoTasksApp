import { useEffect } from 'react';
import { useTask } from '../context/TaskContext';

const Tasks = () => {
  const { getTasksRequest } = useTask();

  useEffect(() => {
    getTasksRequest();
    console.log('tasks');
  }, []);

  return <div>Tasks</div>;
};

export default Tasks;
