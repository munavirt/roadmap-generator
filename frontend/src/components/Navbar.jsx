import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = ({ setSidebarOpen }) => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        <button
          className="p-2 -ml-2 md:hidden text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Right side icons removed */}
      </div>
    </header>
  );
};

export default Navbar;
