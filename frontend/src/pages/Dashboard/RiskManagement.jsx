import React from 'react';
import { Settings, ShieldCheck, ChevronRight } from 'lucide-react';

const RiskSlider = ({ label, value, percent }) => (
  <div className="group">
    <div className="flex justify-between text-[11px] font-bold mb-3">
      <span className="text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">
        {label}
      </span>
      <span className="text-cyan-400 font-mono">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
      <div 
        className={`h-full transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.2)] ${
          label.includes('Stop') ? 'bg-rose-500' : 'bg-cyan-500'
        }`} 
        style={{ width: percent }} 
      />
    </div>
  </div>
);

export default function RiskManagement() {
  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden group/container">
      {/* Subtle Background Glow */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-cyan-500/5 blur-[60px] rounded-full" />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xs font-black text-slate-100 uppercase tracking-[0.2em] flex items-center gap-2">
            <ShieldCheck size={16} className="text-cyan-500" /> 
            Risk Protocol
          </h3>
          <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors group">
            <Settings size={14} className="text-slate-500 group-hover:text-slate-300 group-hover:rotate-90 transition-all duration-500" />
          </button>
        </div>
        
        <div className="space-y-7">
          <RiskSlider label="Max Drawdown Limit" value="2.50%" percent="65%" />
          <RiskSlider label="Auto-Take Profit" value="1.80%" percent="80%" />
          <RiskSlider label="Emergency Stop Loss" value="0.50%" percent="25%" />
        </div>

        <div className="mt-10">
          <button className="w-full flex justify-between items-center text-[11px] font-black uppercase tracking-widest text-cyan-500 hover:text-cyan-400 transition-colors group">
            Analytics Report 
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5">
          <p className="text-[9px] text-slate-600 leading-relaxed uppercase tracking-tighter">
            *Encrypted parameters active. All values synchronized via AI bridge.
          </p>
        </div>
      </div>
    </div>
  );
}