import { createContext, useState, useContext, useEffect, useRef } from 'react';
import { AxiosError } from 'axios';
import {
  registerRequest,
  RegisterType,
  UserResponse,
  LoginType,
  UserCredentials,
  loginRequest,
  verifyToken,
} from '../api/auth';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
interface IAuthContext {
  userSession: UserCredentials | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: LoginType) => void;
  logout: () => void;
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
  const [loading, setLoading] = useState(true);
  const effectRef = useRef(false);

  useEffect(() => {
    async function checkLogin() {
      const cookie = Cookies.get();
      if (!cookie.token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUserSession(null);
        return;
      }
      try {
        const res = await verifyToken();
        if (res) {
          setIsAuthenticated(true);
          setLoading(false);
          setUserSession({
            id: res.data.id,
            username: res.data.username,
            email: res.data.email,
            createdAt: res.data.createdAt,
            updatedAt: res.data.updatedAt,
          });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message);
        }
      }
    }
    if (!effectRef.current) {
      checkLogin();
      effectRef.current = true;
    }
  }, []);

  const authenticate = async <T extends UserData>(
    // Pass the appropriate request function
    requestData: (user: T) => Promise<UserResponse>,
    // Pass the user data
    userData: T,
    setIsAuthenticated: (value: boolean) => void,
    setUserSession: (data: UserCredentials) => void
  ) => {
    try {
      const res = await requestData(userData);
      setIsAuthenticated(true);
      setUserSession({
        id: res.data.id,
        username: res.data.username,
        email: res.data.email,
        createdAt: res.data.createdAt,
        updatedAt: res.data.updatedAt,
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

  const logout = () => {
    Cookies.remove('token');
    setUserSession(null);
    setIsAuthenticated(false);
    toast.success('Logged out 💀');
  };

  return (
    <AuthContext.Provider
      value={{ userSession, loading, signUp, login, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
