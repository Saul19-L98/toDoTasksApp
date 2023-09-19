import axios from 'axios';
import { RegisterData } from '../schemas/auth/registerSchema';
import { LoginData } from '../schemas/auth/loginSchema';

const API_URI = 'http://localhost:3000/auth';

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
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
};

export const registerRequest = (user: RegisterType): Promise<UserCredentials> =>
  axios.post(`${API_URI}/register`, user);

export const loginRequest = (user: LoginType): Promise<UserCredentials> =>
  axios.post(`${API_URI}/login`, user);
