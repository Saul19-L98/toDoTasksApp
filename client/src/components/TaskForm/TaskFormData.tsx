import FormContainer from '../shared/Container/FormContainer';
import { TextInput } from '../shared/forms/Text';
import { TextArea } from '../shared/forms/TextArea';
import { Button } from '../shared/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { taskSchema, TaskType } from '../../schemas/tasks/taskSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTask } from '../../context/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';

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

  const { id } = useParams();
  const { createNewTask, updateTask, getTask } = useTask();
  const effectRef = useRef(false);

  useEffect(() => {
    async function loadTask() {
      if (id) {
        const task = await getTask(id);
        setValue('title', task!.title);
        setValue('description', task!.description);
        setValue('date', task!.date);
      }
    }
    if (!effectRef.current) {
      loadTask();
      effectRef.current = true;
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigation = useNavigate();

  const addDate = () => {
    register('date');
    const dateToAdd = new Date().toISOString().slice(0, 10);
    setValue('date', `${dateToAdd}T10:00:00Z`);
  };

  const onSubmit: SubmitHandler<TaskType> = (data) => {
    if (!id) {
      createNewTask(data);
    } else {
      updateTask(id, data);
    }
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
          textarea: 'p-2 h-40',
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
