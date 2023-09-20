import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TaskProvider } from '../context/TaskContext';

const ProtectedRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated && !loading) return <Navigate to='/login' />;

  return (
    <TaskProvider>
      <Outlet />
    </TaskProvider>
  );
};

export default ProtectedRoutes;
