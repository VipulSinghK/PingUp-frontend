// Menuitems.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { menuItemsData } from '../assets/assets';
import { CirclePlus } from 'lucide-react';

// Menuitems.jsx (updated excerpts only)
const Menuitems = ({ setSidebarOpen }) => {
  return (
    <div className="flex flex-col h-full px-3">
      <nav className="space-y-0.5">
        {menuItemsData.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-colors text-sm
              ${isActive
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <Icon size={20} strokeWidth={2.3} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-5 mb-6 px-1.5">
        <NavLink
          to="/create-post"
          onClick={() => setSidebarOpen(false)}
          className="
            flex items-center justify-center gap-2
            px-4 py-2.5 rounded-xl
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:from-indigo-600 hover:to-purple-700
            active:scale-[0.98]
            transition-all duration-200
            text-white font-medium shadow-md hover:shadow-lg text-sm
          "
        >
          <CirclePlus size={18} strokeWidth={2.5} />
          Create Post
        </NavLink>
      </div>
    </div>
  );
};

export default Menuitems;