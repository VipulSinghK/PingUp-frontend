import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu, X } from 'lucide-react';
const Layout = ({ currentUser, setCurrentUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Outlet />
      </div>

      <button
        type="button"
        className="sm:hidden fixed top-3 right-3 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};


export default Layout;