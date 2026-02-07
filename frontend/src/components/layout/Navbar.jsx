import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, User, ShieldCheck, Globe, 
  LayoutDashboard, Cpu, Layers, Bell, 
  LogOut, ChevronDown, Menu, X, TrendingUp, 
  Briefcase, History, Settings, HelpCircle
} from 'lucide-react';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsSidebarOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="w-full relative z-[100]">
        {/* 1. Top Utility Bar */}
        <div className="bg-[#020617] border-b border-white/5 px-4 lg:px-12 py-1.5 flex justify-between items-center text-[9px] font-black uppercase tracking-[0.2em]">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              MARKETS: <span className="text-emerald-500">OPEN</span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-slate-500">
              <span>NETWORK: <span className="text-cyan-500">QUANT-NODE ALPHA</span></span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-slate-500">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <ShieldCheck size={10} className="text-cyan-500" />
              <span>Secure Terminal</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <Globe size={10} />
              <span>EN</span>
            </div>
          </div>
        </div>

        {/* 2. Main Navigation Bar */}
        <nav className="bg-[#020617]/90 backdrop-blur-xl border-b border-white/10 px-4 lg:px-8 py-3 flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-4 md:gap-8">
            {/* Menu Trigger */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
            >
              <Menu size={20} />
            </button>
            
            <Link to="/" className="flex flex-col leading-none group">
              <span className="text-xl md:text-2xl font-black tracking-tighter text-white italic group-hover:text-cyan-400 transition-colors">
                QUANT<span className="text-cyan-500">LAB</span>
              </span>
            </Link>

            {isLoggedIn && (
              <div className="hidden lg:flex items-center relative group">
                <Search size={14} className="absolute left-3 text-slate-500 group-focus-within:text-cyan-500" />
                <input 
                  type="text" 
                  placeholder="Search our Instruments" 
                  className="bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs font-bold text-slate-300 w-64 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 lg:gap-8 border-l border-white/10 pl-4 lg:pl-8">
                <AccountStat label="Cash Available" value="€10,000.00" />
                
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[8px] text-slate-500 font-black uppercase">P&L</span>
                  <span className="text-xs font-mono font-black text-emerald-500 tracking-tighter">€0.00</span>
                </div>

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-white/10 transition-all">
                  <div className="hidden md:flex flex-col items-start leading-tight">
                    <span className="text-[8px] font-black text-cyan-500 uppercase">Demo Trading</span>
                    <span className="text-[10px] font-bold text-slate-200">EUR-DEMO-001</span>
                  </div>
                  <User size={14} className="text-slate-400" />
                  <ChevronDown size={14} className="text-slate-500" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={handleLogin} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-cyan-400">Login</button>
                <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 md:px-6 py-2 rounded-lg text-[10px] font-black uppercase">Open Account</button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* 3. SIDEBAR COMPONENT */}
      {/* Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside className={`fixed top-0 left-0 h-full w-[280px] bg-[#0b121d] border-r border-white/10 z-[200] transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#020617]">
            <span className="text-lg font-black text-white italic tracking-tighter">
              QUANT<span className="text-cyan-500">MENU</span>
            </span>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1 text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <SidebarSection label="Markets">
              <SidebarLink icon={<TrendingUp size={18}/>} label="Trade" to="/trade" active />
              <SidebarLink icon={<Search size={18}/>} label="Market Search" to="/marketexpl" />
              <SidebarLink icon={<History size={18}/>} label="History" to="/history" />
            </SidebarSection>

            <SidebarSection label="Account">
              <SidebarLink icon={<Briefcase size={18}/>} label="Favorites" to="/favorites" />
              <SidebarLink icon={<Layers size={18}/>} label="Positions" to="/positions" />
              <SidebarLink icon={<Bell size={18}/>} label="Alerts" to="/alerts" />
            </SidebarSection>

            <SidebarSection label="Support">
              <SidebarLink icon={<Settings size={18}/>} label="Settings" to="/settings" />
              <SidebarLink icon={<HelpCircle size={18}/>} label="Help Center" to="/help" />
            </SidebarSection>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-white/5 bg-[#020617]">
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 bg-rose-500/5 hover:bg-rose-500/10 rounded-xl transition-all font-black text-xs uppercase"
              >
                <LogOut size={18} />
                Logout Session
              </button>
            ) : (
              <button 
                onClick={handleLogin}
                className="w-full bg-cyan-500 text-black py-3 rounded-xl font-black text-xs uppercase"
              >
                Login to Node
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

// Sidebar Sub-components
function SidebarSection({ label, children }) {
  return (
    <div className="mb-6 px-4">
      <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-3 px-4">{label}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SidebarLink({ icon, label, to, active }) {
  return (
    <Link 
      to={to} 
      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${active ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
    >
      <span className={active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400 transition-colors'}>
        {icon}
      </span>
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </Link>
  );
}

function AccountStat({ label, value }) {
  return (
    <div className="hidden sm:flex flex-col items-end">
      <span className="text-[8px] text-slate-500 font-black uppercase tracking-tighter">{label}</span>
      <span className="text-xs font-mono font-black text-white tracking-tighter leading-none mt-1">{value}</span>
    </div>
  );
}