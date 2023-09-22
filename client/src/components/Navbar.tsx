import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import { Title } from './shared/title';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <nav className='my-6 border-gray-200'>
      <div className='container flex flex-wrap items-center justify-between px-4 mx-auto sm:px-0'>
        <Title className='text-2xl md:text-4xl lg:text-6xl'>Task Manager</Title>
        <button
          data-collapse-toggle='mobile-menu'
          type='button'
          className='inline-flex items-center justify-center ml-3 text-white rounded-lg md:hidden hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-zinc-300'
          aria-controls='mobile-menu-2'
          aria-expanded='false'
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-6 h-6'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
              clipRule='evenodd'
            ></path>
          </svg>
          <svg
            className='hidden w-6 h-6'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            ></path>
          </svg>
        </button>
        <div className='hidden w-full md:block md:w-auto' id='mobile-menu'>
          <ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to='/add-tasks'
                    className='block px-4 py-2 text-lg font-semibold text-center text-white border-t-2 border-white rounded md:border-none hover:bg-white hover:text-black'
                  >
                    Add Task
                  </Link>
                </li>

                <li>
                  <Link
                    to='/profile'
                    className='block px-4 py-2 text-lg font-semibold text-center text-white border-t-2 border-white rounded md:border-none hover:bg-white hover:text-black'
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to='/'
                    className='block px-4 py-2 text-lg font-semibold text-center text-white border-t-2 border-white rounded md:border-none hover:bg-white hover:text-black'
                    onClick={logout}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to='/login'
                    className='block px-4 py-2 text-lg font-semibold text-center text-white border-t-2 border-white rounded md:border-none hover:bg-white hover:text-black'
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to='/register'
                    className='block px-4 py-2 text-lg font-semibold text-center text-white border-t-2 border-white rounded md:border-none hover:bg-white hover:text-black'
                  >
                    Sign In
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
