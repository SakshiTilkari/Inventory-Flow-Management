import { useAuth } from "../../context/AuthContext";
import { FaBars } from 'react-icons/fa';

const Header = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Hamburger icon */}
          <button
            className="md:hidden text-xl"
            onClick={onToggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <FaBars />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            Inventory Management
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-500">
            {user?.name} ({user?.role})
          </span>
          <button
            onClick={logout}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
