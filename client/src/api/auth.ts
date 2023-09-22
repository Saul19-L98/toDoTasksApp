import axios from './axios.config';
import { RegisterData } from '../schemas/auth/registerSchema';
import { LoginData } from '../schemas/auth/loginSchema';

export type RegisterType = {
  username: RegisterData['username'];
  email: RegisterData['email'];
  password: RegisterData['password'];
};

export type LoginType = {
  email: LoginData['email'];
  password: LoginData['password'];
};

export type UserCredentials = {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export type UserResponse = {
  data: UserCredentials;
};

export const registerRequest = (user: RegisterType): Promise<UserResponse> =>
  axios.post('/auth/register', user);

export const loginRequest = (user: LoginType): Promise<UserResponse> =>
  axios.post('/auth/login', user);

export const verifyToken = (): Promise<UserResponse> =>
  axios.get('/auth/verify');
