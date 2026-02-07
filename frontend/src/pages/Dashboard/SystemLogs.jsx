import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing, Terminal, Cpu } from 'lucide-react';

export default function SystemLogs({ logs }) {
  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-2xl p-6 h-[280px] flex flex-col shadow-2xl relative overflow-hidden group/container">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

      {/* Header - High-Tech Style */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-[11px] font-black text-slate-100 uppercase tracking-[0.2em] flex items-center gap-2">
          <Terminal size={14} className="text-cyan-500" /> 
          Neural System Feed
        </h3>
        <div className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
        </div>
      </div>
      
      {/* Log Feed Container */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-2 no-scrollbar relative z-10">
        <AnimatePresence mode="popLayout">
          {logs.map((log) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="group flex justify-between items-start border-l border-white/5 pl-4 py-1 hover:border-cyan-500/50 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-600 font-mono tracking-tighter group-hover:text-slate-400">
                  [{log.time}]
                </span>
                <span className={`text-[11px] mt-0.5 font-medium tracking-tight ${
                  log.type === 'success' ? 'text-emerald-400 font-bold' : 
                  log.type === 'action' ? 'text-cyan-400 font-bold' : 
                  'text-slate-400'
                }`}>
                  {log.msg}
                </span>
              </div>
              
              {/* Type-based Pulse Indicator */}
              <div className={`mt-2 w-1 h-1 rounded-full shadow-[0_0_8px] ${
                log.type === 'success' ? 'bg-emerald-500 shadow-emerald-500/50' : 
                log.type === 'action' ? 'bg-cyan-500 shadow-cyan-500/50' : 
                'bg-slate-700 shadow-transparent'
              }`} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Footer / Meta Info */}
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 text-[9px] text-slate-600 font-bold uppercase tracking-widest">
           <Cpu size={10} /> v4.2 Stable
        </div>
        <button className="text-[9px] font-black text-slate-500 hover:text-rose-400 uppercase tracking-widest transition-colors">
          Purge Cache
        </button>
      </div>
    </div>
  );
}