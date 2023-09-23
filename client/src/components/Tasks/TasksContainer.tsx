import TaskCard from './TaskCard';
import { useTask } from '../../context/TaskContext';
import { Title } from '../shared/title';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import TasksEmpty from './TasksEmpty';

const TasksContainer = () => {
  const { userSession } = useAuth();
  const { tasks } = useTask();

  const [componentToShow, setComponentToShow] = useState<JSX.Element | null>(
    null
  );
  useEffect(() => {
    if (tasks.length === 0) {
      setComponentToShow(<TasksEmpty />);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  if (componentToShow) {
    return componentToShow;
  }

  return (
    <>
      <Title className='text-2xl text-center md:text-4xl'>
        {userSession?.username}'s tasks 📜
      </Title>
      <section className='flex justify-end max-w-full p-10 overflow-hidden '>
        <div className='grid max-w-full grid-cols-1 gap-4 mx-auto sm:grid-cols-2 lg:grid-cols-3 '>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={{
                _id: task._id,
                title: task.title,
                description: task.description,
                date: task.date,
                updatedAt: task.updatedAt,
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default TasksContainer;
