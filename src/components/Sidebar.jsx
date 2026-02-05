// Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Menuitems from './Menuitems';
import { assets } from '../assets/assets';
import { LogOut, User } from 'lucide-react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('PingUpuser');
    setCurrentUser(null);           // This triggers re-render + ProtectedLayout check
    setSidebarOpen(false);

    // Navigate + replace history
    navigate('/login', { replace: true });
    
    // Optional: very forceful fallback (usually not needed anymore with the new structure)
    // window.location.replace('/login');
  };

  const avatarUrl = currentUser?.profileImage || assets.defaultAvatar || 'https://via.placeholder.com/48';

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          sm:relative sm:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-100">
            <img
              src={assets.logo}
              alt="Logo"
              className="w-24 h-9 mx-auto cursor-pointer object-contain"
              onClick={() => {
                navigate('/');
                setSidebarOpen(false);
              }}
            />
          </div>

          {/* Scrollable menu */}
          <div className="flex-1 overflow-y-auto py-4">
            <Menuitems setSidebarOpen={setSidebarOpen} />
          </div>

          {/* User section */}
          <div className="border-t border-gray-200 p-3">
            <div className="flex items-center justify-between">
              <div
                className="flex items-center gap-2.5 cursor-pointer"
                onClick={() => {
                  navigate('/profile');
                  setSidebarOpen(false);
                }}
              >
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover border border-gray-300"
                />
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {currentUser?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    @{currentUser?.username || 'username'}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-red-600 transition-colors"
                title="Log out"
                aria-label="Log out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;