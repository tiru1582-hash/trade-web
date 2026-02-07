import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Coins, BarChart3, Box, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';

const CATEGORIES = [
  { id: 'cryptos', name: 'Cryptos', count: 100, sub: 'BTC, ETH, SOL...', icon: <Box size={18} /> },
  { id: 'forex', name: 'Forex', count: 74, sub: 'EURUSD, GBPJPY...', icon: <Coins size={18} /> },
  { id: 'indices', name: 'Indices', count: 17, sub: 'US 30, DAX 40...', icon: <BarChart3 size={18} /> },
];

const TABS = ['Trending', 'Top Gainers', 'Volume', 'New'];

export default function MarketExplore() {
  const [activeCat, setActiveCat] = useState('cryptos');
  const [search, setSearch] = useState('');
  const [instruments, setInstruments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Initial Market Data (REST API)
  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&sparkline=false');
        const data = await response.json();
        
        const formatted = data.map(coin => ({
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          sell: (coin.current_price * 0.9998).toFixed(2), // Mock spread
          buy: coin.current_price.toFixed(2),
          change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
          rangeMin: coin.low_24h,
          rangeMax: coin.high_24h,
          active: 'none'
        }));
        
        setInstruments(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Market fetch failed:", err);
      }
    };
    fetchMarkets();
  }, []);

  // 2. Real-Time Price Updates (Binance WebSocket)
  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      setInstruments(prev => prev.map(inst => {
        // Match symbol (e.g., BTCUSDT) from the global ticker stream
        const update = data.find(ticker => ticker.s === `${inst.symbol}USDT`);
        if (update) {
          const newPrice = parseFloat(update.c);
          return {
            ...inst,
            sell: (newPrice * 0.9998).toFixed(2),
            buy: newPrice.toFixed(2),
            active: newPrice > parseFloat(inst.buy) ? 'buy' : 'sell' // Flash effect
          };
        }
        return inst;
      }));
    };

    return () => socket.close(); // Clean up on unmount
  }, [loading]);

  const filteredInstruments = useMemo(() => {
    return instruments.filter(inst => 
      inst.symbol.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, instruments]);

  if (loading) return <div className="h-full flex items-center justify-center text-cyan-500 font-black italic uppercase">Linking Neural Nodes...</div>;

  return (
    <div className="h-full flex bg-[#020617] text-slate-300 font-sans select-none overflow-hidden">
      {/* Category Sidebar (Existing UI) */}
      <aside className="w-[320px] flex flex-col border-r border-white/5 bg-[#0b121d]/50 backdrop-blur-xl shrink-0">
        <div className="p-6 border-b border-white/5">
          <div className="relative group">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Filter instruments..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-[11px] font-bold text-slate-300 focus:outline-none focus:border-cyan-500/50 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-1">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} onClick={() => setActiveCat(cat.id)} className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${activeCat === cat.id ? 'bg-cyan-500/10 border border-cyan-500/20' : 'hover:bg-white/5'}`}>
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${activeCat === cat.id ? 'bg-cyan-500 text-black' : 'bg-white/5 text-slate-500'}`}>{cat.icon}</div>
                <div className="flex flex-col">
                  <span className={`text-xs font-black uppercase tracking-widest ${activeCat === cat.id ? 'text-white' : 'text-slate-400'}`}>{cat.name}</span>
                  <span className="text-[9px] font-bold text-slate-600 uppercase mt-0.5">{cat.sub}</span>
                </div>
              </div>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${activeCat === cat.id ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-slate-600'}`}>{cat.count}</span>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Instrument Terminal */}
      <main className="flex-1 flex flex-col min-w-0 bg-black/20">
        <div className="h-14 flex items-center bg-[#0b121d]/80 border-b border-white/5 px-6 gap-2 overflow-x-auto scrollbar-hide shrink-0">
          {TABS.map(tab => (
            <button key={tab} className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'Trending' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-slate-500 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[2fr_1fr_1fr_0.8fr_1.5fr_0.5fr] items-center px-8 py-4 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 border-b border-white/5 italic">
          <span>Asset / Symbol</span>
          <span className="text-center">Neutral Bid</span>
          <span className="text-center">Neutral Ask</span>
          <span className="text-center">24H Flux</span>
          <span className="text-center">Session Range</span>
          <span className="text-right">Node</span>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="popLayout">
            {filteredInstruments.map((item) => (
              <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={item.symbol} className="grid grid-cols-[2fr_1fr_1fr_0.8fr_1.5fr_0.5fr] items-center px-8 py-5 border-b border-white/[0.03] hover:bg-cyan-500/[0.02] transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-[10px] font-black text-cyan-500">{item.symbol.substring(0, 2)}</div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-white uppercase tracking-tighter">{item.symbol}</span>
                    <span className="text-[9px] font-bold text-slate-600 uppercase">Live Node</span>
                  </div>
                </div>

                {['sell', 'buy'].map((side) => (
                  <div key={side} className="px-2">
                    <div className={`py-3 rounded-xl border font-mono text-[11px] font-black text-center transition-all ${item.active === side ? (side === 'buy' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border-rose-500/40') : 'bg-black/40 border-white/5 text-slate-300'}`}>
                      {item[side]}
                    </div>
                  </div>
                ))}

                <div className={`text-center text-[10px] font-black ${item.change.startsWith('-') ? 'text-rose-500' : 'text-emerald-500'}`}>{item.change}</div>

                <div className="px-6 flex flex-col gap-2">
                  <div className="flex justify-between text-[9px] font-black font-mono tabular-nums opacity-60">
                    <span>{item.rangeMin}</span>
                    <span>{item.rangeMax}</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full relative overflow-hidden">
                    <div className="absolute inset-y-0 left-1/4 right-1/4 bg-cyan-500/20" />
                  </div>
                </div>

                <div className="flex justify-end pr-2"><Zap size={16} className="text-slate-700 hover:text-cyan-400" /></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}