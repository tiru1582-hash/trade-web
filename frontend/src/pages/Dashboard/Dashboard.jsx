import React, { useState, useEffect } from 'react';
import MarketList from './MarketList';
import BotControl from './BotControl';
import RiskManagement from './RiskManagement';
import SystemLogs from './SystemLogs';


export default function Dashboard() {
  const [active, setActive] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, time: '15:20:01', msg: 'SYSTEM_READY_STABLE', type: 'info' },
    { id: 2, time: '15:20:05', msg: 'MARKET_DATA_CONNECTED', type: 'success' }
  ]);

  useEffect(() => {
    if (active) {
      const interval = setInterval(() => {
        const newLog = {
          id: Date.now(),
          time: new Date().toLocaleTimeString('en-GB', { hour12: false }),
          msg: Math.random() > 0.5 ? 'ANALYZING_MARKET_TRENDS' : 'EXECUTING_STRATEGY_P3',
          type: 'action'
        };
        setLogs(prev => [newLog, ...prev].slice(0, 10));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [active]);

  return (
    <div className="min-h-screen bg-[#020617] px-4 py-8 lg:px-12 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-12 gap-8 pb-12">
          
          {/* Left Side (70%): Markets & Data */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="flex flex-col space-y-2 mb-4 border-l-4 border-cyan-500 pl-6">
              <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                Market <span className="text-cyan-500">Intelligence</span>
              </h1>
              <p className="text-sm text-slate-500 font-medium tracking-wide">
                Real-time neural tracking & exchange execution nodes.
              </p>
            </div>

            {/* Asset Table with Dark Theme */}
            <MarketList />

          </div>

          {/* Right Side (30%): Controls & Intelligence */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Account Status Card - QuantLAB Branded */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 rounded-2xl shadow-xl border border-white/10 flex justify-between items-center group">
               <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">Terminal Access</span>
                 <span className="text-sm font-bold mt-1">Institutional Node #42</span>
               </div>
               <div className="flex flex-col items-end">
                 <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black italic border border-white/20 group-hover:bg-white/30 transition-colors">
                   PRO TRADER
                 </span>
                 <span className="text-[9px] text-blue-200 mt-2 font-mono">LATENCY: 12ms</span>
               </div>
            </div>

            {/* Dark Themed Widgets */}
            <BotControl active={active} setActive={setActive} />
            <RiskManagement />
            <SystemLogs logs={logs} />
          </div>

        </div>
      </div>
    </div>
  );
}