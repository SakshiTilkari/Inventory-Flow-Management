import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden transition-opacity ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:block`}
      >
        <nav className="mt-16 p-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              Products
            </NavLink>
            {user?.role === 'admin' && (
              <>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  Categories
                </NavLink>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  Users
                </NavLink>
              </>
            )}
           </nav>
      </aside>
    </>
  );
};


export default Sidebar;