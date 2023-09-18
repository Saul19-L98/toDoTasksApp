import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  RegisterData,
} from '../schemas/register/registerSchema';
import { TextInput } from '../shared/forms/TextInput';
import { PasswordInput } from '../shared/forms/Password';
import { Button } from '../shared/Button';
import { Title } from '../shared/title';
import { registerRequest } from '../api/auth';

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPassword, setisConfirmPassword] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    const res = await registerRequest({
      username: data.username,
      email: data.email,
      password: data.password,
    });
    console.log(res);
    reset({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setPasswordVisibility(false);
    setisConfirmPassword(false);
  });

  return (
    <div className='flex flex-col justify-center w-full h-screen max-w-md p-10 mx-auto rounded-md bg-stone-800'>
      <Title className='text-4xl text-center'>To Do App 📜</Title>
      <form className='pt-6 pb-8 mb-4 align-middle rounded shadow-md bg-stone-8080'>
        <TextInput
          label='Username'
          classNames={{ label: 'text-white', input: 'p-2' }}
          type='text'
          error={errors.username?.message}
          {...register('username')}
        />
        <TextInput
          label='Email'
          classNames={{ label: 'text-white', input: 'p-2' }}
          type='email'
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

        <PasswordInput
          label='Confirm Password'
          classNames={{ label: 'text-white', input: 'p-2' }}
          type={isConfirmPassword ? 'text' : 'password'}
          error={errors.confirmPassword?.message}
          showPasswordToggle
          onTogglePasswordVisibility={() =>
            setisConfirmPassword(!isConfirmPassword)
          }
          isPasswordVisible={isConfirmPassword}
          {...register('confirmPassword')}
        />
        <div className='flex justify-center mt-2'>
          <Button
            type='submit'
            className='mt-4'
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              event.preventDefault();
              onSubmit();
            }}
          >
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

export default Register;
