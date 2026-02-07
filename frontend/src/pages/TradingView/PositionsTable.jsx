import React, { useState } from 'react';
import { ChevronDown, ListFilter, MoreHorizontal } from 'lucide-react';

export default function PositionsTable({ positions = [], history = [], onTerminate }) {
  const [activeTab, setActiveTab] = useState('POSITIONS');

  const tabs = ['POSITIONS', 'ORDERS', 'HISTORY'];

  return (
    <div className="h-full flex flex-col bg-[#0b121d] text-slate-400 font-sans select-none overflow-hidden border-t border-white/10">
      {/* 1. Tab Navigation */}
      <div className="h-10 flex items-center justify-between px-4 bg-[#0b121d] border-b border-white/5 shrink-0">
        <div className="flex gap-8 h-full">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-full flex items-center text-[10px] font-black tracking-widest transition-all relative ${
                activeTab === tab 
                ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-500 after:shadow-[0_0_8px_rgba(59,130,246,0.5)]' 
                : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 2. Actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase text-slate-400 hover:text-white transition-colors group">
            Close positions <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 3. Dynamic Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {activeTab === 'POSITIONS' && (
          <>
            {positions.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-[#0b121d] z-10 border-b border-white/5">
                  <tr className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">
                    <th className="px-6 py-3">Asset</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3 text-right">Entry</th>
                    <th className="px-6 py-3 text-right">Size</th>
                    <th className="px-6 py-3 text-right">P&L</th>
                    <th className="px-6 py-3 text-right pr-8">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03]">
                  {positions.map((pos) => (
                    <tr key={pos.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4 text-[11px] font-black text-white uppercase">{pos.asset}</td>
                      <td className={`px-6 py-4 text-[10px] font-black uppercase ${pos.type === 'Long' ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {pos.type}
                      </td>
                      <td className="px-6 py-4 text-[11px] font-mono font-bold text-slate-300 tabular-nums text-right">
                        {pos.entry}
                      </td>
                      <td className="px-6 py-4 text-[11px] font-mono font-bold text-slate-300 tabular-nums text-right">
                        {pos.amount}
                      </td>
                      <td className={`px-6 py-4 text-[11px] font-mono font-black tabular-nums text-right ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                        {pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right pr-6">
                        <button 
                          onClick={() => onTerminate(pos.id)}
                          className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded text-[9px] font-black uppercase hover:bg-rose-500 hover:text-white transition-all"
                        >
                          Terminate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              /* THE CORRECT EMPTY STATE */
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-black/5">
                <h4 className="text-sm font-black text-white uppercase tracking-widest opacity-80">No open positions</h4>
                <p className="text-[10px] text-slate-600 mt-2 font-bold uppercase tracking-widest">Active trades will be shown here</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'HISTORY' && (
           <div className="h-full flex items-center justify-center text-[10px] text-slate-600 uppercase font-black tracking-widest">
             End-to-end encrypted trade logs.
           </div>
        )}
      </div>
    </div>
  );
}