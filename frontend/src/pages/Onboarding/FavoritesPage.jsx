import React, { useState } from 'react';
import { ChevronDown, Circle, TrendingUp, Zap, ShieldCheck, Activity } from 'lucide-react';

const AutoTradePage = () => {
  const [isAutoTrading, setIsAutoTrading] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automated Trading</h1>
          <p className="text-gray-500 mt-1">Manage your algorithmic trading bots and strategies.</p>
        </div>

        {/* Status Pill */}
        <div className="bg-[#1E2229] rounded-full p-2 pl-6 flex items-center gap-6 border border-gray-800 shadow-xl">
          <span className="font-bold whitespace-nowrap">
            Status: <span className={isAutoTrading ? "text-[#65B366]" : "text-gray-500"}>
              {isAutoTrading ? 'ACTIVE' : 'PAUSED'}
            </span>
          </span>
          <button 
            onClick={() => setIsAutoTrading(!isAutoTrading)}
            className={`w-16 h-9 rounded-full relative transition-all duration-300 shadow-inner ${isAutoTrading ? 'bg-[#65B366]' : 'bg-gray-600'}`}
          >
            <div className={`absolute top-1 w-7 h-7 bg-white rounded-full shadow-md transition-all duration-300 ${isAutoTrading ? 'right-1' : 'left-1'}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Strategy & Status */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-[#1E2229] rounded-3xl p-8 shadow-xl border border-gray-800">
            <div className="mb-10">
              <label className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] block mb-4">
                Active Strategy
              </label>
              <div className="group relative">
                <div className="w-full bg-[#121418] p-5 rounded-2xl flex justify-between items-center cursor-pointer border border-gray-800 hover:border-[#65B366] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#65B366]/10 rounded-xl text-[#65B366]">
                      <ShieldCheck size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Risk Level: Med</p>
                      <p className="text-lg font-bold">Balanced Alpha</p>
                    </div>
                  </div>
                  <ChevronDown size={20} className="text-gray-500" />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Live Status</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#65B366]/10 rounded-full">
                  <Circle size={6} fill="#65B366" className="text-[#65B366] animate-pulse" />
                  <span className="text-[#65B366] text-xs font-bold uppercase">Running</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#121418] rounded-xl">
                  <span className="text-gray-500 text-sm font-medium">Last Trade</span>
                  <div className="text-right">
                    <p className="text-[#65B366] font-bold">+$120.45</p>
                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">5 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#121418] rounded-xl">
                  <span className="text-gray-500 text-sm font-medium">Daily Profit</span>
                  <span className="text-2xl font-black text-white">+$350.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1E2229] p-6 rounded-3xl border border-gray-800">
              <Zap size={20} className="text-yellow-500 mb-2" />
              <p className="text-2xl font-bold">84%</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-tight">Win Rate</p>
            </div>
            <div className="bg-[#1E2229] p-6 rounded-3xl border border-gray-800">
              <Activity size={20} className="text-blue-500 mb-2" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-tight">Trades Today</p>
            </div>
          </div>
        </div>

        {/* Right Column: Performance Analytics */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-[#1E2229] rounded-3xl p-8 shadow-xl border border-gray-800 h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp size={20} className="text-[#65B366]" />
                Bot Performance
              </h3>
              <select className="bg-[#121418] border border-gray-800 text-sm rounded-lg px-3 py-1 outline-none">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
              </select>
            </div>

            {/* Performance Placeholder - In real app, use Recharts here */}
            <div className="w-full h-80 bg-[#121418] rounded-2xl border border-gray-800 flex items-center justify-center relative overflow-hidden">
               <svg className="w-full h-full p-4" viewBox="0 0 100 40" preserveAspectRatio="none">
                 <defs>
                   <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#65B366" stopOpacity="0.3" />
                     <stop offset="100%" stopColor="#65B366" stopOpacity="0" />
                   </linearGradient>
                 </defs>
                 <path d="M0,40 L0,30 L10,32 L20,25 L30,28 L40,15 L50,18 L60,10 L70,12 L80,5 L90,8 L100,2 L100,40 Z" fill="url(#chartGradient)" />
                 <path d="M0,30 L10,32 L20,25 L30,28 L40,15 L50,18 L60,10 L70,12 L80,5 L90,8 L100,2" fill="none" stroke="#65B366" strokeWidth="1" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center opacity-10">
                 <Activity size={120} />
               </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">Uptime</p>
                <p className="text-lg font-bold">99.9%</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">Avg. Execution</p>
                <p className="text-lg font-bold">45ms</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs font-bold uppercase">API Status</p>
                <p className="text-lg font-bold text-[#65B366]">Healthy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoTradePage;