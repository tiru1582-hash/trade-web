import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  TrendingUp, Activity, Search, Settings, Maximize2, 
  Camera, ChevronDown, MousePointer2, PenTool, Eraser, 
  ShieldCheck, Wifi, Clock, X, BarChart2, Briefcase, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import TradingViewChart from './TradingViewChart';
import InstrumentDetails from './InstrumentDetails';
import OrderExecution from './OrderExecution';
import PositionsTable from './PositionsTable';
import MarketWatch from './MarketWatch';

const ASSET_DATA = {
  eurusd: { name: 'EURUSD', symbol: 'EURUSD', price: '1.17893', change: '0.11%', up: true },
  bitcoin: { name: 'Bitcoin', symbol: 'BTC', price: '66182.71', change: '2.02%', up: true },
};

export default function Tradingpage({ isLoggedIn }) {
  const { symbol } = useParams();
  const asset = ASSET_DATA[symbol?.toLowerCase()] || ASSET_DATA.eurusd;
  
  // Mobile UI State: determines which full-screen panel is active on mobile
  const [mobileTab, setMobileTab] = useState('chart'); 
  const [positions, setPositions] = useState([]);
  const [history, setHistory] = useState([]);

  const terminatePosition = (id) => {
    const trade = positions.find(p => p.id === id);
    if (trade) {
      setHistory(prev => [{ ...trade, closedAt: new Date().toLocaleTimeString(), finalPnl: trade.pnl.toFixed(2) }, ...prev]);
      setPositions(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#020617] text-slate-400 font-sans select-none overflow-hidden">
      
      {/* 1. TOP TICKER BAR - Hidden on mobile to save vertical space */}
      <header className="hidden lg:flex h-9 items-center bg-[#0b121d] border-b border-white/5 px-2 gap-1 overflow-x-auto scrollbar-hide shrink-0 z-50">
        <button className="bg-[#1e222d] text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest border border-slate-700 whitespace-nowrap shadow-xl">Favourites</button>
        {['Forex', 'Indices', 'Crypto'].map(tab => (
          <button key={tab} className="text-slate-500 px-3 py-1 text-[10px] font-bold hover:text-white transition-colors whitespace-nowrap uppercase tracking-tighter">{tab}</button>
        ))}
      </header>

      {/* 2. MOBILE BOTTOM NAVIGATION (Visible only on < lg screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 flex h-16 bg-[#0b121d] border-t border-white/10 shrink-0 z-[100] pb-safe">
        {[
          { id: 'watchlist', icon: <Search size={20}/>, label: 'Market' },
          { id: 'chart', icon: <BarChart2 size={20}/>, label: 'Chart' },
          { id: 'trade', icon: <Zap size={20}/>, label: 'Trade' },
          { id: 'positions', icon: <Briefcase size={20}/>, label: 'Orders' },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setMobileTab(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${mobileTab === tab.id ? 'text-cyan-400 bg-cyan-400/5' : 'text-slate-500'}`}
          >
            {tab.icon}
            <span className="text-[9px] font-black uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-1 min-h-0 relative mb-16 lg:mb-0">
        
        {/* 3. WATCHLIST SIDEBAR - Becomes full-screen overlay on mobile */}
        <aside className={`
          ${mobileTab === 'watchlist' ? 'fixed inset-0 z-[60] bg-[#0b121d]' : 'hidden'} 
          lg:relative lg:flex lg:w-72 xl:w-80 flex-col border-r border-white/5 bg-[#0b121d] shrink-0
        `}>
           <div className="lg:hidden p-4 border-b border-white/10 flex justify-between items-center">
             <span className="text-white font-black text-xs uppercase">Market Watch</span>
             <button onClick={() => setMobileTab('chart')} className="p-2 bg-white/5 rounded-lg"><X size={18} /></button>
           </div>
           <div className="flex-1 overflow-y-auto scrollbar-hide p-1">
             <MarketWatch />
           </div>
        </aside>

        {/* 4. CENTRAL TRADING ENGINE */}
        <main className={`flex-1 flex flex-col min-w-0 bg-black/20 relative ${mobileTab !== 'chart' && 'hidden lg:flex'}`}>
          {/* Main Toolbar */}
          <div className="h-12 lg:h-11 border-b border-white/5 flex items-center justify-between px-4 bg-[#0b121d] shrink-0 z-40">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-white font-black text-sm tracking-tighter italic">
                <span className="uppercase">{asset.symbol}</span>
                <ChevronDown size={14} className="text-slate-500" />
              </div>
              <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest border-l border-white/10 pl-6">
                <span className="text-cyan-400 border-b-2 border-cyan-400 pb-2.5 mt-2.5">15m</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <Settings size={16} />
              <Camera size={16} />
            </div>
          </div>

          {/* Chart Workspace */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Drawing Toolbar - Hidden on Mobile */}
            <div className="hidden sm:flex w-10 border-r border-white/5 flex-col items-center py-4 gap-6 text-slate-600 bg-[#0b121d] shrink-0">
              <MousePointer2 size={18} className="text-cyan-500" />
              <TrendingUp size={18} />
              <PenTool size={18} />
              <Eraser size={18} />
            </div>
            <div className="flex-1 relative bg-[#0a0f1d] overflow-hidden">
              <TradingViewChart symbol={symbol} />
            </div>
          </div>

          {/* POSITIONS PANEL - Embedded on Desktop, Full-screen on Mobile */}
          <div className={`
            ${mobileTab === 'positions' ? 'fixed inset-0 z-[60] bg-[#0b121d]' : 'hidden lg:flex'} 
            h-full lg:h-[28%] border-t border-white/10 bg-[#0b121d] flex flex-col shrink-0 overflow-hidden
          `}>
             <div className="lg:hidden p-4 border-b border-white/10 flex justify-between items-center">
               <span className="text-white font-black text-xs uppercase">Your Positions</span>
               <button onClick={() => setMobileTab('chart')} className="p-2 bg-white/5 rounded-lg"><X size={18} /></button>
             </div>
             <div className="flex-1 overflow-hidden">
                <PositionsTable positions={positions} history={history} onTerminate={terminatePosition} />
             </div>
          </div>
        </main>

        {/* 5. RIGHT EXECUTION PANEL - Modal on mobile */}
        <aside className={`
          ${mobileTab === 'trade' ? 'fixed inset-0 z-[60] bg-[#0b121d]' : 'hidden lg:flex'}
          lg:w-[320px] flex flex-col bg-[#0b121d] border-l border-white/5 shrink-0 z-50
        `}>
          <div className="lg:hidden p-4 border-b border-white/10 flex justify-between items-center">
            <span className="text-white font-black text-xs uppercase">New Order</span>
            <button onClick={() => setMobileTab('chart')} className="p-2 bg-white/5 rounded-lg"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {isLoggedIn ? (
               <OrderExecution 
                 asset={asset} 
                 addPosition={(p) => {
                   setPositions([p, ...positions]);
                   if(window.innerWidth < 1024) setMobileTab('positions');
                 }}
               />
            ) : ""}
            <div className="mt-auto border-t border-white/5">
                <InstrumentDetails symbol={symbol} />
            </div>
          </div>
        </aside>
      </div>

    </div>
  );
}

const AuthFallback = () => (
  <div className="flex flex-col h-full p-8 text-center justify-center">
    <ShieldCheck size={48} className="text-cyan-500 mx-auto mb-4" />
    <h3 className="text-white font-black uppercase text-xs tracking-widest mb-2">Secure Link Required</h3>
    <button className="w-full py-4 bg-cyan-500 text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">Sign In</button>
  </div>
);