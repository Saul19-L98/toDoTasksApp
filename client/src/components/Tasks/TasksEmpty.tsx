import { Title } from '../shared/title';
import { AiOutlineFileUnknown } from 'react-icons/ai';

const TasksEmpty = () => {
  return (
    <div className='flex items-center justify-center h-screen mx-auto'>
      <div className='flex flex-col items-center pb-20'>
        <AiOutlineFileUnknown className='w-24 h-24 mr-2 text-white' />
        <Title>No tasks yet, please add a new task.</Title>
      </div>
    </div>
  );
};

export default TasksEmpty;
