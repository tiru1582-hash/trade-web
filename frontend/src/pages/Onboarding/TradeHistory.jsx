import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Download, Filter, Calendar, 
  Info, Search, ShieldCheck, ArrowUpDown, Terminal
} from 'lucide-react';

const INITIAL_HISTORY = [
  { id: 1, pair: 'STONKS', entry: '1,068.20', exit: '1,075.45', multi: 'x10.00', pnl: 481.10, roi: '+8.35%', date: '06 Feb 2026', time: '14:20:05', hash: '0x8f...2a' },
  { id: 2, pair: 'STONKS', entry: '1,067.42', exit: '1,060.12', multi: 'x50.00', pnl: -264.40, roi: '-23.41%', date: '06 Feb 2026', time: '12:05:12', hash: '0x3c...9b' },
  { id: 3, pair: 'BTC', entry: '1,067.13', exit: '1,062.44', multi: 'x50.00', pnl: -29.94, roi: '-23.48%', date: '05 Feb 2026', time: '21:44:30', hash: '0x1a...4e' },
  { id: 4, pair: 'BTC', entry: '1,071.18', exit: '1,079.13', multi: 'x10.00', pnl: 68.36, roi: '+12.06%', date: '05 Feb 2026', time: '18:12:00', hash: '0xde...1c' },
];

export default function TradeHistory() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    return INITIAL_HISTORY.filter(item => 
      item.pair.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPnl = filteredData.reduce((acc, curr) => acc + curr.pnl, 0);

  return (
    <div className="h-full flex flex-col bg-[#020617] text-slate-300 select-none overflow-hidden font-sans antialiased">
      
      {/* 1. Institutional Header Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-[#0b121d]/80 border-b border-white/5 shrink-0 gap-4 backdrop-blur-md">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-[10px] font-black uppercase tracking-[0.3em] italic shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <Clock size={14} /> Neural Audit Log
          </div>
          
          <div className="relative group">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search ticker..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/40 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[11px] font-bold text-slate-400 focus:outline-none focus:border-cyan-500/50 transition-all w-64 font-mono tracking-tight"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <ActionButton icon={<Download size={14}/>} label="Export Audit" />
          <ActionButton icon={<Filter size={14}/>} label="Session Filter" />
        </div>
      </div>

      {/* 2. List Header */}
      <div className="grid grid-cols-7 items-center px-8 py-3.5 text-[9px] font-black uppercase tracking-[0.25em] text-slate-600 border-b border-white/5 bg-[#0f172a]/40 italic">
        <span>Timestamp</span>
        <span>Instrument</span>
        <span className="text-right">Entry_Price</span>
        <span className="text-right">Exit_Price</span>
        <span className="text-right">Leverage</span>
        <span className="text-right">Net_P&L</span>
        <span className="text-right pr-6">Verification</span>
      </div>

      {/* 3. Data Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-gradient-to-b from-[#0b121d]/20 to-transparent">
        <AnimatePresence mode="popLayout">
          {filteredData.map((trade) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              key={trade.id}
              className="grid grid-cols-7 items-center px-8 py-5 border-b border-white/[0.03] hover:bg-white/[0.02] group transition-all cursor-default"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white tabular-nums tracking-tighter">{trade.date}</span>
                <span className="text-[9px] text-slate-600 font-mono tracking-widest mt-0.5">{trade.time}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black border border-white/5 transition-all group-hover:border-white/20 ${trade.pair === 'BTC' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-400'}`}>
                  {trade.pair[0]}
                </div>
                <span className="text-xs font-black text-slate-200 uppercase tracking-tighter group-hover:text-white transition-colors">{trade.pair}</span>
              </div>

              <div className="text-right font-mono text-[11px] font-black text-slate-500 tabular-nums">
                {trade.entry}
              </div>

              <div className="text-right font-mono text-[11px] font-black text-slate-200 tabular-nums">
                {trade.exit}
              </div>

              <div className="text-right font-mono text-[11px] font-black text-slate-700 tracking-widest uppercase">
                {trade.multi}
              </div>

              <div className={`text-right font-mono text-[12px] font-black tabular-nums transition-all ${trade.pnl >= 0 ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'text-rose-500'}`}>
                {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
              </div>

              <div className="flex items-center justify-end gap-3 text-right pr-6">
                <span className="text-[9px] font-black text-slate-700 uppercase italic font-mono">{trade.hash}</span>
                <ShieldCheck size={14} className="text-cyan-500 opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 4. Global Audit Footer */}
      <footer className="h-12 bg-[#020617] border-t border-white/5 flex items-center justify-between px-8 shrink-0 text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 italic">
        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-2">
            <Terminal size={12} className="text-slate-700" />
            <span>Records_Tracked: <span className="text-white tabular-nums">{filteredData.length}</span></span>
          </div>
          <div className="flex items-center gap-2 border-l border-white/10 pl-10">
            <span>Aggregated_Flux:</span>
            <span className={`tabular-nums font-black ${totalPnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              €{totalPnl.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.6)]" />
          <span className="hidden sm:inline">Audit_Node:</span> QuantLab_01
        </div>
      </footer>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button className="flex items-center gap-2.5 px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-white/10 hover:text-white transition-all active:scale-95 hover:border-white/10 shadow-lg">
      {icon} {label}
    </button>
  );
}