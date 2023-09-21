import { useEffect, useRef, useState } from 'react';
import { useTask } from '../context/TaskContext';
import TasksContainer from '../components/Tasks/TasksContainer';
import TasksEmpty from '../components/Tasks/TasksEmpty';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { loading } = useAuth();
  const { getTasksRequest, tasks } = useTask();
  const effectRef = useRef(false);
  const [isTasksEmpty, setIsTasksEmpty] = useState(true);

  useEffect(() => {
    (() => {
      if (effectRef.current) {
        getTasksRequest();
        console.log('reading tasks');
      }
    })();
    return () => {
      effectRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('Before if', isTasksEmpty);
    if (tasks.length > 0) {
      setIsTasksEmpty(false);
      console.log('tasks is empty');
    }
    console.log('getTasksRequest');
    console.log('After if', isTasksEmpty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  if (isTasksEmpty && loading) {
    return <TasksEmpty />;
  }

  return <TasksContainer />;
};

export default Tasks;
