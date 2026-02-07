import React from 'react';
import { Shield, Play, Square, Activity, Radio } from 'lucide-react';

export default function BotControl({ active, setActive }) {
  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
      {/* Decorative Glow - Matching MarketList */}
      <div className={`absolute -top-20 -left-20 w-40 h-40 blur-[80px] rounded-full transition-all duration-700 ${
        active ? 'bg-cyan-500/20' : 'bg-blue-500/10'
      }`} />

      <div className="flex flex-col items-center relative z-10">
        {/* Status Icon Indicator */}
        <div className={`mb-6 p-5 rounded-2xl transition-all duration-500 bg-white/[0.03] border border-white/5 shadow-inner ${
          active ? 'text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'text-slate-600'
        }`}>
          {active ? (
            <Activity size={32} className="animate-pulse" />
          ) : (
            <Shield size={32} className="opacity-40" />
          )}
        </div>

        {/* Header Text */}
        <h2 className="text-lg font-black text-slate-100 tracking-tight text-center uppercase">
          Neural <span className="text-cyan-400">Execution</span>
        </h2>
        
        <div className="flex items-center mt-3 space-x-2 bg-black/20 px-3 py-1 rounded-full border border-white/5">
          <Radio 
            size={12} 
            className={`${active ? 'text-emerald-400 animate-pulse' : 'text-slate-600'}`} 
          />
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
            active ? 'text-emerald-400' : 'text-slate-500'
          }`}>
            {active ? 'Engine Live' : 'System Standby'}
          </p>
        </div>
        
        {/* Main CTA Button - Quant Styling */}
        <button 
          onClick={() => setActive(!active)}
          className={`mt-8 w-full py-4 rounded-xl font-black uppercase tracking-[0.15em] transition-all duration-300 transform active:scale-95 flex items-center justify-center text-xs ${
            active 
            ? 'bg-transparent border border-rose-500/50 text-rose-500 hover:bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.1)]' 
            : 'bg-cyan-500 text-black hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:bg-cyan-400'
          }`}
        >
          {active ? (
            <>
              <Square size={14} fill="currentColor" className="mr-2"/> 
              Terminate Session
            </>
          ) : (
            <>
              <Play size={14} fill="currentColor" className="mr-2"/> 
              Execute AI Bridge
            </>
          )}
        </button>

        {/* Technical Disclaimer */}
        <p className="mt-6 text-[9px] text-slate-500 text-center leading-relaxed uppercase tracking-widest font-medium opacity-60">
          Neural protocols active. Ensure <br /> 
          <span className="text-slate-400">AES-256 link</span> is established.
        </p>
      </div>
    </div>
  );
}