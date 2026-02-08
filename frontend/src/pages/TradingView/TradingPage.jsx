import React, { useState } from 'react';

const TradePage = () => {
  const [timeframe, setTimeframe] = useState('1m');

  return (
    <div className="min-h-screen bg-[#121418] text-white font-sans p-6">

      {/* Header Info */}
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-3xl font-semibold mb-1">Google</h2>
          <p className="text-gray-400">Current Price: <span className="text-white">$1,750</span></p>
        </div>
        
        {/* Timeframe Selectors */}
        <div className="flex bg-[#1E2229] p-1 rounded-lg gap-1">
          {['1m', '5H', '1H', '2D'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                timeframe === t ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="relative grid grid-cols-12 gap-6">
        {/* Chart Area */}
        <div className="col-span-12 lg:col-span-9 bg-white rounded-xl h-[400px] flex items-end p-4 overflow-hidden">
          {/* Mock Chart SVG */}
          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d="M0,35 L5,32 L10,36 L15,30 L20,33 L25,25 L30,28 L35,15 L40,22 L45,18 L50,12 L55,17 L60,10 L65,20 L70,12 L75,15 L80,8 L85,18 L90,12 L100,10"
              fill="none"
              stroke="#2D333B"
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* Sidebar Order Panel */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-[#1E2229] p-5 rounded-xl shadow-xl border border-gray-800">
            <button className="w-full bg-[#65B366] hover:bg-green-600 text-white font-bold py-6 rounded-xl text-2xl mb-4 transition-colors">
              BUY
            </button>
            <button className="w-full bg-[#D95D55] hover:bg-red-600 text-white font-bold py-6 rounded-xl text-2xl mb-8 transition-colors">
              SELL
            </button>

            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Amount</label>
                <div className="relative">
                  <input 
                    type="text" 
                    defaultValue="$ 100" 
                    className="w-full bg-slate-50 text-black p-3 rounded-lg font-bold outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Leverage</span>
                  <span className="text-gray-400">5x</span>
                </div>
                <div className="relative">
                  <select className="w-full bg-[#121418] border border-gray-700 p-3 rounded-lg appearance-none text-white">
                    <option>1x</option>
                  </select>
                  <span className="absolute right-3 top-3 text-gray-400 text-sm">1x</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-6 flex items-center gap-3">
        <span className="text-gray-400 text-sm">SMA / EMA</span>
        <button className="w-10 h-5 bg-gray-600 rounded-full relative">
          <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
        </button>
      </div>
    </div>
  );
};

export default TradePage;