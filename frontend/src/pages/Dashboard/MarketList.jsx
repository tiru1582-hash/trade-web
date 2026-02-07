import React, { useState, useEffect } from 'react';
import { Flame, Landmark, TrendingUp, ChevronRight, Activity, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MarketList = () => {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch real market data from CoinGecko Public API
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setLoading(true);
        // Fetching top 5 coins by market cap
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false'
        );
        const data = await response.json();

        // 2. Map the API response to your component's data structure
        const formattedAssets = data.map((coin) => ({
          id: coin.id,
          name: coin.name.toUpperCase(),
          symbol: `#${coin.symbol.toUpperCase()}`,
          price: coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2 }),
          change: `${coin.price_change_percentage_24h > 0 ? '+' : ''}${coin.price_change_percentage_24h.toFixed(2)}%`,
          status: 'Market Open', // Crypto is 24/7
        }));

        setAssets(formattedAssets);
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealData();
    // Optional: Auto-refresh every 60 seconds
    const interval = setInterval(fetchRealData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0f172a] p-4 md:p-6 rounded-2xl shadow-2xl border border-white/5 relative overflow-hidden group/container min-h-[400px]">
      {/* Decorative Glow Background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full group-hover/container:bg-blue-500/20 transition-all duration-700" />
      
      {/* Tab Navigation */}
      <div className="flex items-center space-x-6 md:space-x-8 mb-6 md:mb-8 border-b border-white/5 relative z-10 overflow-x-auto scrollbar-hide">
        <button className="text-slate-500 hover:text-orange-400 pb-4 transition-all shrink-0">
          <Flame size={18} />
        </button>
        <button className="text-slate-500 hover:text-cyan-400 pb-4 transition-all shrink-0">
          <Landmark size={18} />
        </button>
        <button className="text-slate-500 hover:text-emerald-400 pb-4 transition-all shrink-0">
          <Activity size={18} />
        </button>
        <button className="text-cyan-400 font-black border-b-2 border-cyan-400 pb-4 -mb-[2px] text-[10px] md:text-xs uppercase tracking-[0.2em] whitespace-nowrap shrink-0">
          Live Crypto
        </button>
      </div>

      <div className="relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
             <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
             <p className="text-slate-500 text-[10px] uppercase tracking-widest">Syncing Neural Link...</p>
          </div>
        ) : (
          <>
            {/* Header Row */}
            <div className="hidden sm:grid grid-cols-4 px-4 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              <div>Instrument</div>
              <div className="text-right">Value (USD)</div>
              <div className="text-right">24h Performance</div>
              <div className="text-right">Execution</div>
            </div>

            {/* Data Rows */}
            <div className="space-y-3">
              {assets.map((asset) => (
                <div 
                  key={asset.id} 
                  onClick={() => navigate(`/trade/${asset.symbol.replace('#', '').toLowerCase()}`)}
                  className="grid grid-cols-2 sm:grid-cols-4 items-center py-4 px-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer"
                >
                  {/* Instrument Info */}
                  <div className="flex flex-col">
                    <div className="font-bold text-slate-200 group-hover:text-cyan-400 transition-colors flex items-center gap-2 truncate text-sm md:text-base">
                      {asset.name}
                      {parseFloat(asset.change) > 0 && <TrendingUp size={12} className="text-emerald-500 hidden md:block" />}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] md:text-[10px] text-slate-500 font-mono tracking-wider">{asset.symbol}</span>
                      <span className="text-[7px] md:text-[8px] px-1 rounded font-black uppercase bg-emerald-500/10 text-emerald-500">
                        OPEN
                      </span>
                    </div>
                  </div>

                  {/* Price Display */}
                  <div className="text-right font-mono font-bold text-slate-100 tabular-nums text-sm md:text-base">
                    ${asset.price}
                    <div className={`sm:hidden text-[9px] mt-1 ${parseFloat(asset.change) > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {asset.change}
                    </div>
                  </div>

                  {/* Performance (Desktop Only) */}
                  <div className="hidden sm:block text-right">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                      parseFloat(asset.change) > 0 
                      ? 'text-emerald-400 bg-emerald-400/10 group-hover:bg-emerald-400/20' 
                      : 'text-rose-400 bg-rose-400/10 group-hover:bg-rose-400/20'
                    }`}>
                      {asset.change}
                    </span>
                  </div>

                  {/* Trade Button (Desktop Only) */}
                  <div className="hidden sm:flex justify-end">
                    <button className="bg-cyan-500 text-black text-[10px] font-black uppercase py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center">
                      Trade <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MarketList;