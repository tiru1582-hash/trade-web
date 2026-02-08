import React from 'react';
import { Search, Download, Filter } from 'lucide-react';

const FullPageHistory = () => {
  const tableData = [
    { asset: 'Google', buyPrice: '$1,600', currentPrice: '$1,750', pl: '+$150', status: 'profit', date: '2024-05-20' },
    { asset: 'Tesla', buyPrice: '$140', currentPrice: '-130', pl: 'Open', status: 'neutral', date: '2024-05-21' },
    { asset: 'Tesla', buyPrice: '-10', currentPrice: '45,000', pl: 'Open', status: 'loss', date: '2024-05-21' },
    { asset: 'Apple', buyPrice: '$150', currentPrice: '+44,850', pl: 'Open', status: 'profit', date: '2024-05-22' },
    { asset: 'BTC', buyPrice: '40,000', currentPrice: '+45,000', pl: 'Closed', status: 'neutral', date: '2024-05-22' },
    { asset: 'ETH', buyPrice: '-2,800', currentPrice: '+3,200', pl: 'Closed', status: 'profit', date: '2024-05-23' },
  ];

  return (
    <div className="min-h-screen bg-[#121418] font-sans text-white flex flex-col">
      {/* Top Header Bar - Now spanning full width */}
      <header className="h-20 border-b border-gray-800 flex items-center justify-between px-8 bg-[#121418]/50 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold">History / Positions</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              className="bg-[#1E2229] border border-gray-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-gray-600 transition w-64"
            />
          </div>
          <button className="p-2 bg-[#1E2229] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition">
            <Filter size={20} />
          </button>
          <button className="flex items-center gap-2 bg-[#65B366] px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-600 transition">
            <Download size={18} /> Export
          </button>
        </div>
      </header>

      {/* Full Width Table Content */}
      <div className="p-8 flex-1">
        <div className="bg-[#1E2229] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl h-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#2D333B]/30 text-gray-500 text-[11px] font-bold uppercase tracking-widest">
                <th className="py-5 px-8">Date</th>
                <th className="py-5 px-6">Asset</th>
                <th className="py-5 px-6 text-center">Buy Price</th>
                <th className="py-5 px-6 text-center">Current Price</th>
                <th className="py-5 px-8 text-right">P/L Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {tableData.map((row, index) => (
                <tr key={index} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 px-8 text-gray-500 font-medium">{row.date}</td>
                  <td className="py-6 px-6 text-lg font-bold">{row.asset}</td>
                  <td className="py-6 px-6 text-center text-lg">
                    {row.status === 'loss' && row.asset === 'Tesla' ? (
                      <span className="bg-[#D95D55] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-red-900/20">
                        {row.buyPrice}
                      </span>
                    ) : (
                      <span className="text-gray-300">{row.buyPrice}</span>
                    )}
                  </td>
                  <td className="py-6 px-6 text-center text-lg">
                    {row.currentPrice.startsWith('+') || (row.status === 'profit' && row.currentPrice !== '-130') ? (
                      <span className="bg-[#65B366] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-green-900/20">
                        {row.currentPrice}
                      </span>
                    ) : (
                      <span className="text-gray-300">{row.currentPrice}</span>
                    )}
                  </td>
                  <td className="py-6 px-8 text-right text-lg">
                    {row.pl === '+$150' ? (
                      <span className="bg-[#65B366] text-white px-4 py-1.5 rounded-full text-sm font-bold">
                        {row.pl}
                      </span>
                    ) : (
                      <span className="text-gray-400 font-medium">{row.pl}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Pagination Footer */}
          <div className="bg-[#2D333B]/20 px-8 py-4 border-t border-gray-800 flex justify-between items-center text-sm text-gray-500">
            <span>Showing 6 of 48 positions</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#121418] rounded-lg border border-gray-800 hover:text-white transition">Previous</button>
              <button className="px-4 py-2 bg-[#121418] rounded-lg border border-gray-800 hover:text-white transition">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageHistory;