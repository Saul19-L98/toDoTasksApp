import TaskCard from './TaskCard';
import { useTask } from '../../context/TaskContext';

const TasksContainer = () => {
  const { tasks } = useTask();
  return (
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
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default TasksContainer;
