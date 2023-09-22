import { useTask } from '../../context/TaskContext';
import { Button } from '../shared/Button';
import { Title } from '../shared/title';

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    description: string;
    date: string;
  };
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { deleteTask } = useTask();
  return (
    <div className='bg-stone-700'>
      <div className='max-w-sm overflow-hidden rounded shadow-lg'>
        <div className='px-6 py-4'>
          <Title className='mb-2 text-xl font-bold'>{task.title}</Title>
          <p className='text-base text-white'>{task.description}</p>
          <p className='text-base text-white'>
            <span className='text-orange-200'>Created At: </span>
            {new Date(task.date).toDateString()}
          </p>
        </div>
        <div className='px-6 pt-4 pb-2'>
          <span className='inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full'>
            #photography
          </span>
          <span className='inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full'>
            #travel
          </span>
          <Button
            className='bg-red-700 hover:bg-red-400'
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            <span className='text-white'>DELETE</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
