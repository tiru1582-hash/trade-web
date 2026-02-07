import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Zap, BarChart3, ChevronRight, Loader2 } from 'lucide-react';

const PopularAsset = ({ name, symbol, price, change, logo, index, navigate, up }) => (
  <div 
    className="relative group cursor-pointer transition-all duration-300 hover:-translate-x-3"
    style={{ marginLeft: `${index * 15}px` }} 
  >
    <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all group-hover:bg-cyan-500/10 group-hover:border-cyan-500/40
      [clip-path:polygon(8%_0%,100%_0%,100%_100%,0%_100%)] ml-4">
      
      <div className="flex items-center gap-4 pl-6">
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/5 group-hover:border-cyan-500/50 transition-colors">
          <img src={logo} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="text-sm font-black text-white tracking-tight uppercase">{name}</div>
          <div className="text-[10px] text-slate-500 font-mono font-bold tracking-widest">{symbol}</div>
        </div>
      </div>

      <div className="flex items-center gap-6 pr-6">
        <div className="text-right">
          <div className="text-sm font-black text-white tabular-nums tracking-tighter">${price}</div>
          <div className={`text-[10px] font-black ${up ? 'text-emerald-400' : 'text-rose-500'}`}>
            {up ? '▲' : '▼'} {change}
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/trade/${symbol.split('/')[0].toLowerCase()}`);
          }} 
          className="bg-cyan-500 text-black text-[10px] font-black uppercase py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center ml-auto"
        >
          Trade <ChevronRight size={14} />
        </button>
      </div>
    </div>
  </div>
);

export default function HomeHeader() {
  const navigate = useNavigate();
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Initial Data Fetch (CoinGecko)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&sparkline=false'
        );
        const data = await response.json();
        const formatted = data.map(coin => ({
          name: coin.name,
          symbol: `${coin.symbol.toUpperCase()}/USD`,
          price: coin.current_price.toLocaleString(),
          change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
          logo: coin.image,
          up: coin.price_change_percentage_24h >= 0,
          rawPrice: coin.current_price
        }));
        setTrendingData(formatted);
        setLoading(false);
      } catch (error) {
        console.error("Data fetch error:", error);
      }
    };
    fetchInitialData();
  }, []);

  // 2. Real-Time WebSocket Updates (Binance)
  useEffect(() => {
    if (trendingData.length === 0) return;

    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!miniTicker@arr');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTrendingData(prev => prev.map(asset => {
        const ticker = data.find(t => t.s === `${asset.symbol.split('/')[0]}USDT`);
        if (ticker) {
          const newPrice = parseFloat(ticker.c);
          return {
            ...asset,
            price: newPrice.toLocaleString(),
            up: newPrice >= asset.rawPrice,
            rawPrice: newPrice
          };
        }
        return asset;
      }));
    };

    return () => socket.close();
  }, [loading]);

  return (
    <div className="relative overflow-hidden rounded-[40px] bg-[#020617] mb-12 border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] min-h-[500px] flex items-center">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(6,182,212,0.08),transparent_50%)]" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 lg:p-20 items-center w-full">
        <div className="lg:col-span-6 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <BarChart3 size={12} /> Next-Gen Quantitative Execution
          </div>
          
          <h1 className="text-5xl lg:text-8xl font-black text-white tracking-tighter leading-[0.85]">
            QUANT<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">LAB</span> <br />
            <span className="text-3xl lg:text-5xl font-light text-slate-400">Trading Intelligence.</span>
          </h1>
          
          <p className="max-w-md text-slate-400 text-sm leading-relaxed">
            Harness institutional-grade algorithms and neural execution. 
            Step into global markets with the speed of <span className="text-white font-bold italic">QuantLab</span>.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button onClick={() => navigate('/marketexpl')} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2 group">
              Start Executing <TrendingUp size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border border-white/10 hover:bg-white/5 text-white px-8 py-4 rounded-xl font-bold transition-all">
              Live Demo
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center gap-4 mb-8 ml-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Live Node Feed</span>
          </div>
          
          <div className="flex flex-col gap-2">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="text-cyan-500 animate-spin" size={40} />
              </div>
            ) : (
              trendingData.map((asset, i) => (
                <PopularAsset 
                  key={asset.name} 
                  {...asset} 
                  index={i} 
                  navigate={navigate} 
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}