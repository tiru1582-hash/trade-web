import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  History, 
  Wallet, 
  Settings, 
  Search, 
  Bell, 
  User,
  Menu,
  X 
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-200 ${
      active 
        ? 'bg-[#65B366] text-white rounded-r-2xl md:rounded-r-2xl shadow-lg shadow-green-900/20' 
        : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`}
  >
    <Icon size={22} />
    <span className="font-semibold">{label}</span>
  </Link>
);

const AppLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { id: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'Trade', icon: TrendingUp, path: '/trade' },
    { id: 'Auto-Trade', icon: Wallet, path: '/auto-trade' },
    { id: 'History', icon: History, path: '/history' },
    { id: 'Settings', icon: Settings, path: '/settings' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen bg-[#121418] text-white font-sans overflow-x-hidden">
      
      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* SIDEBAR (Desktop & Mobile) */}
      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-64 bg-[#1E2229] border-r border-gray-800 flex flex-col py-8 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="px-8 flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#65B366] rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white/20 rounded-sm transform -skew-x-12" />
            </div>
            <span className="text-2xl font-bold tracking-tighter">AvaTrade</span>
          </div>
          <button onClick={closeMobileMenu} className="lg:hidden text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 pr-4">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.id}
              to={item.path}
              active={location.pathname === item.path}
              onClick={closeMobileMenu}
            />
          ))}
        </nav>

        <div className="px-8 mt-auto pt-8 border-t border-gray-800">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center shrink-0">
              <User size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">Pro Trader</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN SECTION */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP NAVBAR */}
        <header className="h-20 bg-[#121418]/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-4 md:px-10 sticky top-0 z-50">
          <div className="flex items-center gap-4 flex-1">
            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white bg-[#1E2229] rounded-lg border border-gray-800"
            >
              <Menu size={20} />
            </button>

            {/* Responsive Search (Hidden on very small screens) */}
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#1E2229] border border-gray-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#65B366] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6 ml-4">
            <button className="relative text-gray-400 hover:text-white transition hidden xs:block">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#121418]" />
            </button>
            <div className="h-8 w-[1px] bg-gray-800 hidden xs:block" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider hidden md:block">Balance</span>
              <span className="text-sm md:text-lg font-bold text-[#65B366] whitespace-nowrap">$250,000.00</span>
            </div>
          </div>
        </header>

        {/* CONTENT RENDERER */}
        <main className="p-4 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;