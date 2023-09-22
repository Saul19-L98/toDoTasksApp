import FormContainer from '../shared/Container/FormContainer';
import { TextInput } from '../shared/forms/Text';
import { TextArea } from '../shared/forms/TextArea';
import { Button } from '../shared/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { taskSchema, TaskType } from '../../schemas/tasks/taskSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTask } from '../../context/TaskContext';
import { useNavigate } from 'react-router-dom';

export const TaskFormData = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TaskType>({
    resolver: zodResolver(taskSchema),
  });

  const { createNewTask } = useTask();
  const navigation = useNavigate();

  const addDate = () => {
    register('date');
    const dateToAdd = new Date().toISOString().slice(0, 10);
    setValue('date', `${dateToAdd}T10:00:00Z`);
  };

  const onSubmit: SubmitHandler<TaskType> = (data) => {
    createNewTask(data);
    navigation('/tasks');
    reset({
      title: '',
      description: '',
      date: '',
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        label='Title'
        classNames={{
          label: 'text-white',
          input: 'p-2',
          error: 'text-red-500',
        }}
        type='text'
        error={errors.title?.message}
        {...register('title')}
      />
      <TextArea
        label='Description'
        classNames={{
          label: 'text-white',
          textarea: 'p-2',
          error: 'text-red-500',
        }}
        error={errors.description?.message}
        {...register('description')}
      />
      <div className='flex justify-center mt-2'>
        <Button type='submit' className='mt-4' onClick={() => addDate()}>
          Save
        </Button>
      </div>
    </FormContainer>
  );
};
