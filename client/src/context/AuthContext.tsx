import { createContext, useState, useContext } from 'react';
import { AxiosError } from 'axios';
import {
  registerRequest,
  RegisterType,
  LoginType,
  UserCredentials,
  loginRequest,
} from '../api/auth';
import { toast } from 'react-toastify';

interface IAuthContext {
  userSession: UserCredentials | null;
  isAuthenticated: boolean;
  login: (user: LoginType) => void;
  signUp: (user: RegisterType) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as IAuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userSession, setUserSession] = useState<UserCredentials | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const signUp = async (user: RegisterType) => {
    try {
      const res = await registerRequest(user);
      setIsAuthenticated(true);
      setUserSession({
        email: res.email,
        username: res.username,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      });
      toast.success('Account created successfully 🎉');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        toast.error(error.response?.data.message);
        setIsAuthenticated(false);
      }
    }
  };
  const login = async (user: LoginType) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUserSession({
        email: res.email,
        username: res.username,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      });
      toast.success('Logged in successfully 🎉');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        toast.error(error.response?.data.message);
        setIsAuthenticated(false);
      }
    }
  };
  return (
    <AuthContext.Provider
      value={{ userSession, signUp, login, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
