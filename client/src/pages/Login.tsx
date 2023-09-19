import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginData } from '../schemas/auth/loginSchema';
import { TextInput } from '../shared/forms/TextInput';
import { PasswordInput } from '../shared/forms/Password';
import { Button } from '../shared/Button';
import { Title } from '../shared/title';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { login, isAuthenticated } = useAuth();
  const navigation = useNavigate();

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const onSubmit: SubmitHandler<LoginData> = (data) =>
    login({
      email: data.email,
      password: data.password,
    });

  useEffect(() => {
    if (isAuthenticated) {
      navigation('/tasks');
      reset({
        email: '',
        password: '',
      });
      setPasswordVisibility(false);
    }
  }, [isAuthenticated, navigation, reset, setPasswordVisibility]);

  return (
    <div className='flex flex-col justify-center w-full h-screen max-w-md p-10 mx-auto rounded-md bg-stone-800'>
      <Title className='text-4xl text-center'>To Do App 📜</Title>
      <form
        className='pt-6 pb-8 mb-4 align-middle rounded shadow-md bg-stone-8080'
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          label='Email'
          classNames={{ label: 'text-white', input: 'p-2' }}
          type='text'
          error={errors.email?.message}
          {...register('email')}
        />
        <PasswordInput
          label='Password'
          classNames={{ label: 'text-white', input: 'p-2' }}
          type={isPasswordVisible ? 'text' : 'password'}
          error={errors.password?.message}
          showPasswordToggle
          onTogglePasswordVisibility={() =>
            setPasswordVisibility(!isPasswordVisible)
          }
          isPasswordVisible={isPasswordVisible}
          {...register('password')}
        />
        <div className='flex justify-center mt-2'>
          <Button type='submit' className='mt-4'>
            Register
          </Button>
        </div>
      </form>
      <p className='text-xs text-center text-gray-500 sm:text-sm '>
        &copy;2023 Sallanez. All rights reserved.
      </p>
    </div>
  );
};

export default Login;
