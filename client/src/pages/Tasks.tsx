import { useEffect, useRef, useState } from 'react';
import { useTask } from '../context/TaskContext';
import TasksContainer from '../components/Tasks/TasksContainer';
import Loading from '../components/shared/Loading';

const Tasks = () => {
  const { getTasksRequest, tasks } = useTask();
  const effectRef = useRef(false);

  const [componentToShow, setComponentToShow] = useState<JSX.Element | null>(
    null
  );
  useEffect(() => {
    async function getTasks() {
      getTasksRequest().then((res) => {
        if (res === 200) {
          setComponentToShow(<TasksContainer />);
        } else {
          setComponentToShow(<Loading />);
        }
      });
    }

    if (!effectRef.current) {
      getTasks();
      effectRef.current = true;
    }
  }, [tasks, getTasksRequest]);

  return componentToShow;
};

export default Tasks;
