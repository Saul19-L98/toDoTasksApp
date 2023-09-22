import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterData } from '../schemas/auth/registerSchema';
import { TextInput } from '../components/shared/forms/Text';
import { PasswordInput } from '../components/shared/forms/Password';
import { Button } from '../components/shared/Button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/shared/Container/FormContainer';
import FootPage from '../components/shared/auth/FootPage';

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });

  const { signUp, isAuthenticated } = useAuth();
  const navigation = useNavigate();

  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPassword, setisConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<RegisterData> = (data) =>
    signUp({
      username: data.username,
      email: data.email,
      password: data.password,
    });

  useEffect(() => {
    if (isAuthenticated) {
      navigation('/tasks');
      reset({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setPasswordVisibility(false);
      setisConfirmPassword(false);
    }
  }, [isAuthenticated, navigation, reset, setPasswordVisibility]);

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      title='To Do App 📜'
      footPageText={<FootPage />}
    >
      <TextInput
        label='Username'
        classNames={{
          label: 'text-white',
          input: 'p-2',
          error: 'text-red-500',
        }}
        autoComplete='username'
        type='text'
        error={errors.username?.message}
        {...register('username')}
      />
      <TextInput
        label='Email'
        classNames={{
          label: 'text-white',
          input: 'p-2',
          error: 'text-red-500',
        }}
        autoComplete='username'
        type='email'
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

      <PasswordInput
        label='Confirm Password'
        classNames={{
          label: 'text-white',
          input: 'p-2',
          error: 'text-red-500',
        }}
        autoComplete='current-password'
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
        <Button type='submit' className='mt-4'>
          Register
        </Button>
      </div>
    </FormContainer>
  );
};

export default Register;
