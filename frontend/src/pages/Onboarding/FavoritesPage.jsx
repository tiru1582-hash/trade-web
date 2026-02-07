import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Search, Trash2, Zap, LayoutGrid, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_FAVORITES = [
  { symbol: 'EURUSD', name: 'Euro vs US Dollar', sell: '1.18130', buy: '1.18149', change: '+0.31%', up: true },
  { symbol: 'GOLD', name: 'Gold Spot', sell: '4927.43', buy: '4928.28', change: '+3.14%', up: true },
  { symbol: 'BTC', name: 'Bitcoin / USDT', sell: '66182.71', buy: '66264.69', change: '+2.02%', up: true },
  { symbol: 'TSLA', name: 'Tesla Motors', sell: '396.77', buy: '396.83', change: '+1.24%', up: true },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);
  const [searchTerm, setSearchTerm] = useState('');

  const removeFavorite = (symbol) => {
    setFavorites(prev => prev.filter(item => item.symbol !== symbol));
  };

  // Memoized search for performance
  const filteredFavs = useMemo(() => 
    favorites.filter(f => 
      f.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
      f.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [favorites, searchTerm]
  );

  return (
    <div className="h-full flex flex-col bg-[#020617] text-slate-300 select-none overflow-hidden font-sans">
      
      {/* 1. Institutional Header */}
      <header className="h-16 border-b border-white/5 bg-[#0b121d]/60 backdrop-blur-xl flex items-center justify-between px-8 shrink-0 z-20">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="absolute inset-0 bg-yellow-500/20 blur-xl group-hover:bg-yellow-500/40 transition-all rounded-full" />
            <div className="relative w-10 h-10 rounded-xl bg-[#1e222d] flex items-center justify-center border border-white/10 shadow-2xl">
              <Star size={18} className="text-yellow-500 fill-yellow-500/20" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic leading-none">Terminal</h1>
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest mt-1">Watchlist_Favorites</span>
          </div>
        </div>

        <div className="relative group">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Filter nodes..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-black/40 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-[10px] font-bold text-slate-400 focus:outline-none focus:border-cyan-500/50 transition-all w-80 focus:ring-1 focus:ring-cyan-500/10 placeholder:text-slate-700"
          />
        </div>
      </header>

      {/* 2. Grid Labels */}
      <div className="grid grid-cols-[2fr_1.2fr_1.2fr_0.8fr_0.5fr] items-center px-8 py-3.5 text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 border-b border-white/5 bg-[#0b121d]/30">
        <span className="flex items-center gap-2 italic"><Activity size={10} className="text-cyan-500"/> Instrument_Class</span>
        <span className="text-center">Neutral_Bid</span>
        <span className="text-center">Neutral_Ask</span>
        <span className="text-center">Flux_24H</span>
        <span className="text-right">Action</span>
      </div>

      {/* 3. Dynamic Node List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide bg-gradient-to-b from-[#0b121d]/20 to-transparent">
        <AnimatePresence mode="popLayout">
          {filteredFavs.length > 0 ? (
            filteredFavs.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                key={item.symbol}
                className="grid grid-cols-[2fr_1.2fr_1.2fr_0.8fr_0.5fr] items-center px-8 py-5 border-b border-white/[0.03] hover:bg-cyan-500/[0.02] group transition-all"
              >
                {/* Asset Identity */}
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className={`w-2 h-2 rounded-full ${item.up ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]' : 'bg-rose-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]'} animate-pulse`} />
                  </div>
                  <div className="flex flex-col">
                    <Link to={`/trade/${item.symbol.toLowerCase()}`} className="text-sm font-black text-white hover:text-cyan-400 transition-colors uppercase tracking-tighter italic">
                      {item.symbol}
                    </Link>
                    <span className="text-[9px] font-black text-slate-600 uppercase mt-0.5 tracking-widest">{item.name}</span>
                  </div>
                </div>

                {/* Sell/Bid Block */}
                <div className="px-3">
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-black/40 border border-white/5 group-hover:border-rose-500/20 rounded-xl py-3 text-center transition-all">
                    <span className="font-mono text-[11px] font-black text-slate-400 tabular-nums tracking-tighter">
                      {item.sell}
                    </span>
                  </motion.div>
                </div>

                {/* Buy/Ask Block */}
                <div className="px-3">
                  <motion.div whileHover={{ scale: 1.02 }} className="bg-emerald-500/5 border border-emerald-500/10 group-hover:border-emerald-500/30 rounded-xl py-3 text-center transition-all shadow-[inset_0_0_20px_rgba(16,185,129,0.02)]">
                    <span className="font-mono text-[11px] font-black text-emerald-400 tabular-nums tracking-tighter">
                      {item.buy}
                    </span>
                  </motion.div>
                </div>

                {/* Status Flux */}
                <div className="flex justify-center">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black border ${item.up ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                    {item.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {item.change}
                  </div>
                </div>

                {/* Terminal Actions */}
                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <button className="p-2.5 bg-[#1e222d] rounded-xl text-slate-500 hover:text-cyan-400 border border-white/5 transition-all shadow-xl">
                    <Zap size={14} className="fill-current" />
                  </button>
                  <button 
                    onClick={() => removeFavorite(item.symbol)}
                    className="p-2.5 bg-[#1e222d] rounded-xl text-slate-500 hover:text-rose-500 border border-white/5 transition-all shadow-xl"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 bg-[#0b121d]/20">
              <div className="w-24 h-24 bg-[#1e222d] rounded-full flex items-center justify-center mb-8 border border-white/5 shadow-2xl">
                <LayoutGrid size={32} className="text-slate-800" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">Watchlist_Empty</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Global Audit Footer */}
      <footer className="h-10 bg-[#020617] border-t border-white/5 flex items-center justify-between px-8 shrink-0 text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 italic">
        <div className="flex gap-8 items-center">
          <span>Synced_Assets: <span className="text-white">{favorites.length}</span></span>
          <span className="hidden sm:inline border-l border-white/10 pl-8">Encryption: <span className="text-emerald-500">AES-256</span></span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          Neural_Audit: <span className="text-white">Continuous</span>
        </div>
      </footer>
    </div>
  );
}