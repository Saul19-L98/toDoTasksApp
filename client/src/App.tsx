import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import TaskForm from './pages/TaskForm';
import ProtectedRoutes from './routes/ProtectedRoutes';
import { Profile } from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<h1>About</h1>} />
          <Route path='*' element={<h1>Not Found</h1>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/add-tasks' element={<TaskForm />} />
            <Route path='/tasks/:id' element={<TaskForm />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
