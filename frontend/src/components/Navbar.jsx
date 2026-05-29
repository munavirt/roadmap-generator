import React from 'react';
import { Menu, Search, Bell, Moon } from 'lucide-react';

const Navbar = ({ setSidebarOpen }) => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button
          className="p-2 -ml-2 md:hidden text-slate-500 hover:bg-slate-100 rounded-lg"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:flex items-center bg-slate-100 rounded-full px-3 py-1.5 focus-within:ring-2 ring-primary-200 transition-all">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm ml-2 w-48 text-slate-700 placeholder-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Moon className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 flex items-center justify-center text-white text-sm font-medium shadow-sm cursor-pointer border border-white">
          U
        </div>
      </div>
    </header>
  );
};

export default Navbar;
