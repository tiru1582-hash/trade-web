import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Layers, 
  Star, 
  Clock, 
  ShieldCheck, 
  Settings, 
  HelpCircle,
  Zap,
  LayoutGrid,
  Activity
} from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();
  
    const mainActions = [
      { id: 'chart', icon: <BarChart3 size={20} />, label: 'Trading Chart', path: '/trade/BTC' },
      { id: 'market', icon: <LayoutGrid size={20} />, label: 'Market Watch', path: '/marketexpl' },
      { id: 'favorites', icon: <Star size={20} />, label: 'Favorites', path: '/favorites' },
      { id: 'history', icon: <Clock size={20} />, label: 'Trade History', path: '/history' },
    ];
  
    const utilityActions = [
      { id: 'settings', icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
      { id: 'help', icon: <HelpCircle size={20} />, label: 'Support', path: '/help' },
    ];
  
    return (
      /* h-screen is required for justify-between to work */
      <aside className="w-[60px] h-screen bg-[#020617] border-r border-white/5 flex flex-col items-center py-4 justify-between z-50 shrink-0">
        
        {/* 1. TOP SECTION: Branding and Navigation */}
        <div className="flex flex-col gap-3 w-full items-center">
          <NavLink to="/dashboard" className="p-2 mb-2 block">
            <div className="w-9 h-9 rounded-xl bg-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform">
              <Zap size={20} className="text-black fill-black" />
            </div>
          </NavLink>
  
          {mainActions.map((item) => (
            <SidebarIcon 
              key={item.id}
              {...item} 
              active={location.pathname === item.path} 
            />
          ))}
        </div>
  
        {/* 2. BOTTOM SECTION: Pushed to the base */}
        <div className="flex flex-col gap-3 w-full items-center mb-2">
          {utilityActions.map((item) => (
            <SidebarIcon 
              key={item.id} 
              {...item} 
              active={location.pathname === item.path} 
            />
          ))}
          
          {/* Profile Node */}
          <div className="mt-2 pt-4 border-t border-white/10 w-full flex justify-center">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer overflow-hidden shadow-lg group">
               <img 
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                 alt="User" 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
               />
            </div>
          </div>
        </div>
      </aside>
    );
  }

function SidebarIcon({ icon, label, active, path }) {
  return (
    <div className="relative group flex items-center justify-center w-full px-2">
      <NavLink
        to={path}
        className={({ isActive }) => `
          p-2.5 rounded-xl transition-all duration-300 relative z-10 flex items-center justify-center w-full
          ${active || isActive 
            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[inset_0_0_10px_rgba(6,182,212,0.05)]' 
            : 'text-slate-500 hover:text-white hover:bg-white/5'
          }
        `}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {icon}
        </motion.div>
      </NavLink>

      {/* Hover Tooltip (Institutional Style) */}
      <div className="absolute left-16 px-3 py-2 bg-[#0f172a] border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] text-white opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-[60] shadow-2xl translate-x-[-10px] group-hover:translate-x-0">
        {label}
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#0f172a] border-l border-b border-white/10 rotate-45" />
      </div>

      {/* Vertical Active Indicator */}
      {active && (
        <motion.div 
          layoutId="activeSide"
          className="absolute left-0 w-1 h-7 bg-cyan-500 rounded-r-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        />
      )}
    </div>
  );
}