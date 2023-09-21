import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TaskProvider } from '../context/TaskContext';
import Loading from '../components/shared/Loading';

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;
  if (!isAuthenticated && !loading) return <Navigate to='/login' />;

  return (
    <TaskProvider>
      <Outlet />
    </TaskProvider>
  );
};

export default ProtectedRoutes;
