import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginData } from '../schemas/auth/loginSchema';
import { TextInput } from '../components/shared/forms/Text';
import { PasswordInput } from '../components/shared/forms/Password';
import { Button } from '../components/shared/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormContainer from '../components/shared/Container/FormContainer';
import FootPage from '../components/shared/auth/FootPage';

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
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      footPageText={<FootPage />}
      title='To Do App 📜'
    >
      <TextInput
        label='Email'
        classNames={{
          label: 'text-white',
          input: 'p-2',
          error: 'text-red-500',
        }}
        autoComplete='username'
        type='text'
        error={errors.email?.message}
        {...register('email')}
      />
      <PasswordInput
        label='Password'
        classNames={{
          label: 'text-white',
          input: 'p-2',
          error: 'text-red-500',
        }}
        autoComplete='current-password'
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
    </FormContainer>
  );
};

export default Login;
