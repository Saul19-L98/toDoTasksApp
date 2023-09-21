import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <nav className='flex justify-between px-10 py-5 my-3 '>
      <h1 className='text-2xl font-bold'>Task Manager</h1>
      <ul className='flex gap-x-2'>
        {isAuthenticated ? (
          <>
            <li>
              <Link
                to='/add-tasks'
                className='px-4 py-2 text-lg font-semibold text-white rounded hover:bg-white hover:text-black'
              >
                Add Task
              </Link>
            </li>

            <li>
              <Link
                to='/profile'
                className='px-4 py-2 text-lg font-semibold text-white rounded hover:bg-white hover:text-black'
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to='/'
                className='px-4 py-2 text-lg font-semibold text-white rounded hover:bg-white hover:text-black'
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to='/tasks'
                className='px-4 py-2 text-lg font-semibold text-white rounded hover:bg-white hover:text-black'
              >
                Tasks
              </Link>
            </li>
            <li>
              <Link to='/profile' className='text-lg font-semibold text-white'>
                Profile
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
