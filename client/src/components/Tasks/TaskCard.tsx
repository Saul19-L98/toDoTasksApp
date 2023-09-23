import { useTask } from '../../context/TaskContext';
import { Button } from '../shared/Button';
import { Title } from '../shared/title';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  task: {
    _id: string;
    title: string;
    description: string;
    date: string;
    updatedAt: string;
  };
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { deleteTask } = useTask();
  const navigate = useNavigate();

  const wasCreatedToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    const taskDate = new Date(task.date).toISOString().slice(0, 10);
    return today === taskDate;
  };

  return (
    <div className='p-2 bg-stone-700 '>
      <div className='flex flex-col justify-between w-full h-full max-w-sm overflow-hidden rounded'>
        <div>
          <div className='px-6 py-4'>
            <Title className='mb-2 text-xl font-bold'>{task.title}</Title>
            <p className='text-base text-white'>{task.description}</p>
            <p className='text-base text-white'>
              <span className='text-orange-200'>Created At: </span>
              {new Date(task.date).toDateString()}
            </p>
            {!wasCreatedToday() && (
              <p className='text-base text-white'>
                <span className='text-pink-200'>Updated At: </span>
                {new Date(task.updatedAt).toDateString()}
              </p>
            )}
          </div>
        </div>
        <div>
          <div className='flex px-6 pt-4 pb-2 justify-evenly'>
            <Button
              className='bg-yellow-500 hover:bg-yellow-400'
              onClick={() => navigate(`/tasks/${task._id}`)}
            >
              <span className='text-white'>Edit</span>
            </Button>
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
    </div>
  );
};

export default TaskCard;
