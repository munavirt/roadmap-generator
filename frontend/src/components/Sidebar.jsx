import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, Target, FileText, TrendingUp, Settings, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Generate Roadmap', path: '/roadmap', icon: Map },
  { name: 'Skill Gap', path: '/analysis', icon: Target },
  { name: 'Resume Analyzer', path: '/resume', icon: FileText },
  { name: 'Progress', path: '/progress', icon: TrendingUp },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:flex flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-primary-600 font-bold text-xl tracking-tight"
          >
            <Activity className="w-6 h-6" />
            <span>SkillForge</span>
          </NavLink>

          <button className="md:hidden text-slate-500" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
