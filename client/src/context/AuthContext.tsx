import { createContext, useState, useContext, useEffect } from 'react';
import { AxiosError } from 'axios';
import {
  registerRequest,
  RegisterType,
  LoginType,
  UserCredentials,
  loginRequest,
} from '../api/auth';
import Cookies from 'js-cookie';
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

type UserData = RegisterType | LoginType;

export const AuthContext = createContext({} as IAuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userSession, setUserSession] = useState<UserCredentials | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    console.log('Cookies:', document.cookie);
    console.log('Token:', token);
  }, [isAuthenticated]);
  const authenticate = async <T extends UserData>(
    // Pass the appropriate request function
    requestData: (user: T) => Promise<UserCredentials>,
    // Pass the user data
    userData: T,
    setIsAuthenticated: (value: boolean) => void,
    setUserSession: (data: UserCredentials) => void
  ) => {
    try {
      const res = await requestData(userData);
      setIsAuthenticated(true);
      setUserSession({
        id: res.id,
        email: res.email,
        username: res.username,
        createdAt: res.createdAt,
        updatedAt: res.updatedAt,
      });
      toast.success('Authenticated successfully 🎉');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        toast.error(error.response?.data.message);
        setIsAuthenticated(false);
      }
    }
  };

  const signUp = async (user: RegisterType) =>
    await authenticate(
      registerRequest,
      user,
      setIsAuthenticated,
      setUserSession
    );
  const login = async (user: LoginType) =>
    await authenticate(loginRequest, user, setIsAuthenticated, setUserSession);
  return (
    <AuthContext.Provider
      value={{ userSession, signUp, login, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
