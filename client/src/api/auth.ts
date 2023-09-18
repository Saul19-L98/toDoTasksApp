import axios from 'axios';
import { RegisterData } from '../schemas/register/registerSchema';

const API_URI = 'http://localhost:3000/auth';

type RegisterType = {
  username: RegisterData['username'];
  email: RegisterData['email'];
  password: RegisterData['password'];
};

export const registerRequest = (user: RegisterType) =>
  axios.post(`${API_URI}/register`, user);
