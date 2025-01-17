import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TreePine, LayoutDashboard, Calendar as CalendarIcon, Map } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-green-950/90 text-white backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <TreePine className="h-8 w-8 text-green-400" />
            <span className="text-xl font-bold">BioAlert</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium
                ${isActive('/dashboard') 
                  ? 'bg-green-700 text-white' 
                  : 'text-green-200 hover:bg-green-800'}`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/calendar"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium
                ${isActive('/calendar') 
                  ? 'bg-green-700 text-white' 
                  : 'text-green-200 hover:bg-green-800'}`}
            >
              <CalendarIcon className="h-4 w-4" />
              <span>Calendario</span>
            </Link>
            
            <Link
              to="/map"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium
                ${isActive('/map') 
                  ? 'bg-green-700 text-white' 
                  : 'text-green-200 hover:bg-green-800'}`}
            >
              <Map className="h-4 w-4" />
              <span>Mapa</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;