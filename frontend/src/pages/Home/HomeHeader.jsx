import React from 'react';

const Dashboard = () => {
  const stats = [
    { label: 'BALANCE', value: '250,000' },
    { label: 'EQUITY', value: '250,000' },
    { label: 'OPEN P/L', value: '+5,000', color: 'text-green-400' },
  ];

  const assets = [
    { name: 'Google', price: '1,750', change: '+1.5%', icon: 'G', iconColor: 'text-red-500' },
    { name: 'Tesla', price: '130', change: '+3.2%', icon: 'T', iconColor: 'text-red-600' },
    { name: 'Apple', price: '45,000', change: '-0.8%', icon: 'B', iconColor: 'text-orange-400', isNegative: true },
    { name: 'ETH', price: '3,000', change: '+2.1%', icon: 'E', iconColor: 'text-gray-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      {/* Top Stats Bar */}
      <div className="flex gap-4 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#2D333B] p-4 rounded-xl flex-1 shadow-lg">
            <p className="text-gray-400 text-xs font-bold mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold text-white ${stat.color || ''}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-extrabold text-[#1A2B4C] mb-6 tracking-tight">
        MOST POPULAR ASSETS
      </h2>

      {/* Asset List */}
      <div className="space-y-4">
        {assets.map((asset, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 text-2xl font-bold ${asset.iconColor}`}>
                {asset.icon}
              </div>
              <span className="text-xl font-bold text-gray-800">{asset.name}</span>
            </div>
            
            <div className="flex items-center gap-8">
              <span className="text-xl font-bold text-gray-700">{asset.price}</span>
              <span className={`px-3 py-1 rounded-lg font-bold min-w-[70px] text-center ${asset.isNegative ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                {asset.change}
              </span>
              <button className="bg-[#4A86E8] hover:bg-blue-600 text-white px-6 py-2 rounded-full font-bold transition-colors">
                TRADE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;