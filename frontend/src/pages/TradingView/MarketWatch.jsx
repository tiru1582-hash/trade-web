import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, BarChart2, Zap, Briefcase, Activity } from 'lucide-react';

export default function MarketWatch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [marketData, setMarketData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 1. Core Asset Configuration (Targeted Binance Symbols)
  const TARGET_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT', 'DOGEUSDT', 'MATICUSDT'];

  useEffect(() => {
    // 2. Establish Institutional-Grade WebSocket Connection
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const updates = {};

      data.forEach(ticker => {
        if (TARGET_SYMBOLS.includes(ticker.s)) {
          const currentPrice = parseFloat(ticker.c);
          updates[ticker.s] = {
            symbol: ticker.s.replace('USDT', ''),
            buy: currentPrice.toFixed(ticker.c < 10 ? 4 : 2),
            sell: (currentPrice * 0.9998).toFixed(ticker.c < 10 ? 4 : 2), // Simulated institutional spread
            change: `${ticker.P >= 0 ? '+' : ''}${parseFloat(ticker.P).toFixed(2)}%`,
            up: parseFloat(ticker.p) >= 0
          };
        }
      });

      // Batch updates to maintain high FPS
      setMarketData(prev => ({ ...prev, ...updates }));
      setIsLoading(false);
    };

    // 3. Connection Cleanup
    return () => socket.close();
  }, []);

  // 4. Memoized Filter for Search Performance
  const filteredInstruments = useMemo(() => {
    return Object.values(marketData).filter(item => 
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [marketData, searchQuery]);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#0b121d] gap-4">
        <Activity className="text-cyan-500 animate-spin" size={24} />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500/60 italic">
          Synchronizing Neural Nodes...
        </span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0b121d] text-slate-400 font-sans select-none overflow-hidden border-r border-white/5">
      
      {/* Search Module */}
      <div className="p-4 bg-[#0b121d]/50 backdrop-blur-md">
        <div className="relative group">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search Assets..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#020617] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-[11px] font-bold text-slate-300 focus:outline-none focus:border-cyan-500/30 transition-all placeholder:text-slate-700 shadow-inner"
          />
        </div>
      </div>

      {/* Grid Headers */}
      <div className="flex border-b border-white/5 px-6 py-2 bg-[#0f172a]/30">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 italic">Instrument</span>
        <span className="ml-auto text-[9px] font-black uppercase tracking-[0.2em] text-white/40 italic pr-4">Flux_Data</span>
      </div>

      {/* Dynamic List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-[1px] bg-white/[0.01]">
        {filteredInstruments.map((item) => (
          <Link 
            key={item.symbol} 
            to={`/trade/${item.symbol.toLowerCase()}`}
            className="flex items-center px-6 py-4 border-b border-white/[0.02] hover:bg-cyan-400/[0.03] active:bg-cyan-400/[0.06] transition-all group relative overflow-hidden"
          >
            {/* Active Indicator Glow */}
            <div className={`absolute left-0 w-[2px] h-1/2 rounded-r-full transition-all ${item.up ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-rose-500 shadow-[0_0_10px_#ef4444]'}`} />
            
            <div className="flex-1 flex flex-col">
              <span className="text-xs font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                {item.symbol}
              </span>
              <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-0.5">Spot_Execution</span>
            </div>

            {/* Price Visualization */}
            <div className="flex flex-col items-end mr-6">
              <span className={`text-xs font-black tabular-nums transition-colors duration-200 ${item.up ? 'text-emerald-400' : 'text-rose-500'}`}>
                {item.buy}
              </span>
              <span className="text-[8px] font-bold text-slate-700 font-mono tracking-tighter uppercase opacity-60">
                Bid: {item.sell}
              </span>
            </div>

            {/* Percent Flux */}
            <div className="w-16 text-right">
              <div className={`inline-block px-2 py-1 rounded-lg text-[10px] font-black tabular-nums transition-all border ${item.up ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                {item.change}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile Footer */}
      <div className="lg:hidden flex h-16 bg-[#020617] border-t border-white/5 items-center shrink-0 z-[100]">
        <MobileNavBtn icon={<Search size={18}/>} label="Market" active />
        <MobileNavBtn icon={<BarChart2 size={18}/>} label="Chart" />
        <MobileNavBtn icon={<Zap size={18}/>} label="Trade" />
        <MobileNavBtn icon={<Briefcase size={18}/>} label="Orders" />
      </div>
    </div>
  );
}

function MobileNavBtn({ icon, label, active = false }) {
  return (
    <button className={`flex-1 flex flex-col items-center gap-1 justify-center h-full transition-all ${active ? 'text-cyan-400 bg-cyan-400/5 border-t-2 border-cyan-400 -mt-[2px]' : 'text-slate-600'}`}>
      {icon}
      <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}