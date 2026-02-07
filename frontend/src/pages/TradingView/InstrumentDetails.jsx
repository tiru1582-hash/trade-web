import React, { useState, useEffect } from 'react';
import { ChevronDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const InfoRow = ({ label, value, color = "text-slate-300" }) => (
  <div className="flex justify-between items-center py-1.5 group">
    <span className="text-[10px] font-bold text-slate-500 italic uppercase tracking-tight group-hover:text-slate-400 transition-colors">
      {label}
    </span>
    <span className={`text-[11px] font-bold font-mono ${color}`}>{value}</span>
  </div>
);

export default function InstrumentDetails({ symbol = 'BTC' }) {
  const [isMainOpen, setIsMainOpen] = useState(true);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketStats = async () => {
      try {
        setLoading(true);
        // Using Binance 24hr Ticker API
        const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol.toUpperCase()}USDT`);
        const data = await response.json();
        setMarketData(data);
      } catch (err) {
        console.error("Failed to fetch instrument details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketStats();
   
    const interval = setInterval(fetchMarketStats, 30000);
    return () => clearInterval(interval);
  }, [symbol]);

  // Calculate current price position in the 24h range (0-100%)
  const calculateRangePosition = () => {
    if (!marketData) return 50;
    const low = parseFloat(marketData.lowPrice);
    const high = parseFloat(marketData.highPrice);
    const current = parseFloat(marketData.lastPrice);
    return ((current - low) / (high - low)) * 100;
  };

  if (loading && !marketData) {
    return (
      <div className="h-40 flex items-center justify-center bg-[#121926] border-t border-white/5">
        <Loader2 className="animate-spin text-cyan-500" size={20} />
      </div>
    );
  }

  return (
    <div className="bg-[#121926] p-4 border-t border-white/5 space-y-4 select-none">
      <div className="space-y-3">
        <button 
          onClick={() => setIsMainOpen(!isMainOpen)}
          className="w-full flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors group"
        >
          <span>Market Info</span> 
          <motion.div animate={{ rotate: isMainOpen ? 0 : -90 }}>
            <ChevronDown size={14} className="text-slate-500 group-hover:text-cyan-500" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isMainOpen && marketData && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="flex justify-between text-[11px] font-mono mb-2">
                <span className="text-rose-500 font-bold">{parseFloat(marketData.lowPrice).toLocaleString()}</span>
                <span className="text-slate-500 font-bold uppercase text-[9px]">24H Range</span>
                <span className="text-emerald-500 font-bold">{parseFloat(marketData.highPrice).toLocaleString()}</span>
              </div>
              
              {/* Dynamic Range Bar */}
              <div className="h-0.5 w-full bg-slate-800 rounded-full relative mb-4">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ left: `${calculateRangePosition()}%` }}
                  className="absolute w-2 h-2 -top-[3px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)] z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 via-cyan-500/20 to-emerald-500/20 rounded-full" />
              </div>

              <div className="space-y-0.5">
                <InfoRow label="Symbol" value={`${symbol}/USDT`} />
                <InfoRow label="24h Change" value={`${parseFloat(marketData.priceChangePercent).toFixed(2)}%`} color={parseFloat(marketData.priceChange) >= 0 ? "text-emerald-400" : "text-rose-400"} />
                <InfoRow label="Volume (24h)" value={parseFloat(marketData.volume).toFixed(2)} />
                <InfoRow label="Weighted Avg" value={parseFloat(marketData.weightedAvgPrice).toLocaleString()} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pt-4 border-t border-white/5">
        <button onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} className="w-full flex justify-between items-center mb-2 group">
          <span className="text-[11px] font-black text-white uppercase italic group-hover:text-cyan-400 transition-colors">Technical Data</span>
          <motion.div animate={{ rotate: isAdvancedOpen ? 0 : -90 }}>
            <ChevronDown size={14} className="text-slate-500 group-hover:text-cyan-500" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isAdvancedOpen && marketData && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-0.5">
              <InfoRow label="Bid Price" value={marketData.bidPrice} color="text-emerald-400" />
              <InfoRow label="Ask Price" value={marketData.askPrice} color="text-rose-400" />
              <InfoRow label="Open Price" value={parseFloat(marketData.openPrice).toLocaleString()} />
              <InfoRow label="Last Qty" value={marketData.lastQty} />
              <InfoRow label="Total Trades" value={marketData.count} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}