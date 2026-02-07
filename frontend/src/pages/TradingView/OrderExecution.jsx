import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, ChevronRight, Info, Zap, CheckCircle2 } from 'lucide-react';

export default function OrderExecution({ asset, mode, onCancel, addPosition }) {
  const [tradeMode, setTradeMode] = useState(mode); // 'buy' or 'sell'
  const [amount, setAmount] = useState(10000);
  const [orderType, setOrderType] = useState('MARKET');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const isBuy = tradeMode === 'buy';
  const price = parseFloat(asset.price.replace(',', ''));
  const leverage = 30; // Standard leverage in Skilling screen
  const cashNeeded = ((amount * price) / leverage).toFixed(2);

  const handleTrade = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      addPosition({
        id: Date.now(),
        asset: asset.name,
        type: isBuy ? 'Long' : 'Short',
        leverage: `${leverage}x`,
        entry: price,
        amount: amount.toLocaleString(),
        pnl: 0,
        up: true
      });
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 1000);
  };

  if (isConfirmed) {
    return (
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#121926] border border-emerald-500/30 rounded-lg p-6 text-center space-y-6">
        <CheckCircle2 size={48} className="text-emerald-500 mx-auto" />
        <h3 className="text-lg font-bold text-white uppercase italic">Order Executed</h3>
        <button onClick={onCancel} className="w-full py-3 bg-blue-500 text-white rounded font-bold text-xs uppercase tracking-widest">Done</button>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#121926] text-white flex flex-col border-l border-white/5">
      {/* Header with Symbol and Star */}
      <div className="p-4 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-lg">★</span>
          <span className="font-bold text-sm tracking-widest uppercase">{asset.name}</span>
        </div>
        <button onClick={onCancel} className="bg-blue-500 p-1.5 rounded-full rotate-180">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Buy/Sell Tab Switcher */}
      <div className="flex border-b border-white/5">
        <button 
          onClick={() => setTradeMode('sell')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${!isBuy ? 'border-b-2 border-blue-500 text-white' : 'text-slate-500'}`}
        >
          Sell
        </button>
        <button 
          onClick={() => setTradeMode('buy')}
          className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${isBuy ? 'border-b-2 border-blue-500 text-white' : 'text-slate-500'}`}
        >
          Buy
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Price and Type Selection */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[10px] text-slate-500 font-bold uppercase flex items-center gap-1">
              Price <span className="text-emerald-400">▲ 0.13%</span>
            </div>
            <div className="text-xl font-bold font-mono tracking-tight">{price}</div>
          </div>
          <div className="w-32">
            <label className="text-[10px] text-slate-500 font-bold uppercase">Buy Type</label>
            <select className="w-full bg-[#1c2533] border border-white/10 rounded p-1.5 text-xs font-bold mt-1">
              <option>MARKET</option>
              <option>ORDER</option>
            </select>
          </div>
        </div>

        {/* Amount Input with Inc/Dec Buttons */}
        <div className="space-y-2">
          <label className="text-[10px] text-slate-500 font-bold uppercase">Amount/Units</label>
          <div className="flex items-center bg-black/40 border border-white/10 rounded overflow-hidden">
            <button onClick={() => setAmount(Math.max(0, amount - 100))} className="p-3 bg-white/5 hover:bg-white/10 text-slate-400">
              <Minus size={14} />
            </button>
            <input 
              type="text" 
              value={amount.toLocaleString()} 
              readOnly 
              className="flex-1 bg-transparent text-center font-bold text-lg outline-none"
            />
            <button onClick={() => setAmount(amount + 100)} className="p-3 bg-white/5 hover:bg-white/10 text-slate-400">
              <Plus size={14} />
            </button>
          </div>
          <div className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            EUR { (amount * price).toLocaleString() }
          </div>
        </div>

        {/* Dynamic Margin Readout */}
        <div className="space-y-1">
          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Cash needed (EUR)</label>
          <div className="bg-black/40 border border-white/10 rounded p-3 text-center font-bold text-sm tracking-wider">
            {cashNeeded}
          </div>
        </div>

        {/* Toggles */}
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase">
            Stop loss at <div className="w-8 h-4 bg-slate-700 rounded-full relative"><div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full" /></div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase">
            Take profit at <div className="w-8 h-4 bg-slate-700 rounded-full relative"><div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full" /></div>
          </div>
        </div>

        {/* Main Execution Button */}
        <button 
          onClick={handleTrade}
          className="w-full py-4 bg-blue-500 hover:bg-blue-400 text-white font-black uppercase tracking-[0.2em] rounded shadow-lg shadow-blue-500/20 transition-all text-xs"
        >
          {isSubmitting ? 'Processing...' : isBuy ? 'Buy' : 'Sell'}
        </button>        
      </div>
    </div>
  );
}