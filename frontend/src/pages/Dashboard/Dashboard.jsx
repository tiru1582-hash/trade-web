import React, { useState } from 'react';
import { ChevronDown, Circle, TrendingUp } from 'lucide-react';

const TradingDashboard = () => {
  const [isAutoTrading, setIsAutoTrading] = useState(true);
  const [timeframe, setTimeframe] = useState('1m');

  const positions = [
    { asset: 'Google', buy: '$1,600', current: '$1,750', pl: '+$150', status: 'Profit' },
    { asset: 'Tesla', buy: '$140', current: '-130', pl: 'Open', status: 'Neutral' },
    { asset: 'Apple', buy: '$150', current: '+44,850', pl: 'Open', status: 'Neutral' },
    { asset: 'BTC', buy: '40,000', current: '+45,000', pl: 'Closed', status: 'Neutral' },
  ];

  return (
    <div className="min-h-screen bg-[#121418] text-white p-6 font-sans">

      <div className="grid grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Chart & History */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Chart Section */}
          <div className="bg-[#1E2229] rounded-2xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold">Google</h2>
                <p className="text-gray-400">Current Price: <span className="text-white">$1,750</span></p>
              </div>
              <div className="flex bg-[#2D333B] p-1 rounded-lg">
                {['1m', '5H', '1H', '2D'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-4 py-1 rounded-md text-sm font-bold transition ${timeframe === t ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-64 bg-white rounded-xl mb-4 relative overflow-hidden">
               {/* Mock SVG Path for the Chart */}
               <svg className="w-full h-full p-4" viewBox="0 0 100 40" preserveAspectRatio="none">
                 <path d="M0,35 L10,30 L20,38 L30,20 L40,25 L50,10 L60,18 L70,5 L80,15 L90,8 L100,12" fill="none" stroke="#2D333B" strokeWidth="1" />
               </svg>
            </div>
            
            <div className="flex items-center justify-end gap-3">
              <span className="text-gray-400 text-xs font-bold uppercase">SMA / EMA</span>
              <button className="w-10 h-5 bg-gray-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </button>
            </div>
          </div>

          {/* History / Positions Table */}
          <div className="bg-[#1E2229] rounded-2xl p-6 border border-gray-800">
            <h3 className="text-2xl font-bold mb-6">History / Positions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-xs font-bold uppercase tracking-wider border-b border-gray-800">
                    <th className="pb-4">Asset</th>
                    <th className="pb-4 text-right">Buy Price</th>
                    <th className="pb-4 text-right">Current Price</th>
                    <th className="pb-4 text-right">P/L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {positions.map((row, i) => (
                    <tr key={i} className="group hover:bg-white/5 transition">
                      <td className="py-4 font-bold">{row.asset}</td>
                      <td className="py-4 text-right">{row.buy}</td>
                      <td className="py-4 text-right font-medium">
                        <span className={row.current.startsWith('+') ? 'text-green-400' : ''}>{row.current}</span>
                      </td>
                      <td className="py-4 text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.pl.includes('+') ? 'bg-[#65B366] text-white' : 'text-gray-400'}`}>
                          {row.pl}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Controls */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Automated Trading Toggle */}
          <div className="bg-[#1E2229] rounded-full p-4 flex items-center justify-between border border-gray-800">
            <h2 className="text-lg font-bold ml-4">
              Automated Trading: <span className={isAutoTrading ? "text-white" : "text-gray-500"}>
                {isAutoTrading ? 'ON' : 'OFF'}
              </span>
            </h2>
            <button 
              onClick={() => setIsAutoTrading(!isAutoTrading)}
              className={`w-14 h-8 rounded-full relative transition-colors ${isAutoTrading ? 'bg-[#65B366]' : 'bg-gray-600'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isAutoTrading ? 'right-1' : 'left-1'}`} />
            </button>
          </div>

          {/* Execution Panel */}
          <div className="bg-[#1E2229] rounded-2xl p-6 border border-gray-800 shadow-xl">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="bg-[#65B366] hover:bg-green-600 h-24 rounded-xl text-2xl font-bold transition">BUY</button>
              <button className="bg-[#D95D55] hover:bg-red-600 h-24 rounded-xl text-2xl font-bold transition">SELL</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-gray-500 text-xs font-bold uppercase block mb-2">Amount</label>
                <input type="text" defaultValue="$ 100" className="w-full bg-slate-50 text-black p-3 rounded-lg font-bold text-lg outline-none" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold uppercase text-gray-500 mb-2">
                  <span>Leverage</span>
                  <span>5x</span>
                </div>
                <div className="relative">
                  <select className="w-full bg-[#121418] border border-gray-700 p-3 rounded-lg text-white appearance-none font-bold">
                    <option>1x</option>
                  </select>
                  <div className="absolute right-3 top-4 text-gray-400 pointer-events-none">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Status */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h3 className="text-xl font-bold mb-4">Status</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Circle size={8} fill="#65B366" className="text-[#65B366] animate-pulse" />
                  <span className="text-gray-300">Running</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last trade:</span>
                  <span className="text-[#65B366] font-bold">+$120 (5m ago)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Profit today:</span>
                  <span className="font-bold">+350</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TradingDashboard;