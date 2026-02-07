import React, { useEffect, useRef, useState } from 'react';
import { 
  createChart, 
  ColorType, 
  CrosshairMode, 
  CandlestickSeries, 
  HistogramSeries 
} from 'lightweight-charts';

// Institutional Timeframe Options
const TIMEFRAMES = [
  { label: '1M', value: '1m' },
  { label: '5M', value: '5m' },
  { label: '15M', value: '15m' },
  { label: '1H', value: '1h' },
  { label: '4H', value: '4h' },
  { label: '1D', value: '1d' },
];

const TradingViewChart = ({ symbol = 'BTC' }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  // 1. DYNAMIC INTERVAL STATE
  const [activeInterval, setActiveInterval] = useState('1m'); 
  const [livePrice, setLivePrice] = useState('0.00');

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94a3b8',
        fontSize: 10,
        fontFamily: 'JetBrains Mono, monospace',
      },
      grid: {
        vertLines: { color: 'rgba(30, 41, 59, 0.05)' },
        horzLines: { color: 'rgba(30, 41, 59, 0.05)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
      },
    });

    chartRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: '#334155',
      priceFormat: { type: 'volume' },
      priceScaleId: '', 
    });

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    // 2. ADAPTIVE HISTORY FETCH
    const fetchHistory = async () => {
      try {
        const binanceSymbol = `${symbol}USDT`.toUpperCase();
        
        // Dynamic time offset based on interval to ensure "Yesterday" is visible
        const offsetMultiplier = activeInterval.includes('d') ? 30 : activeInterval.includes('h') ? 7 : 1;
        const startTime = Date.now() - (offsetMultiplier * 24 * 60 * 60 * 1000);
        
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${binanceSymbol}&interval=${activeInterval}&limit=1000&startTime=${startTime}`
        );
        
        const data = await response.json();
        
        const formattedData = data.map(d => ({
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
        }));

        candleSeries.setData(formattedData);
        volumeSeries.setData(data.map(d => ({
          time: d[0] / 1000,
          value: parseFloat(d[5]),
          color: parseFloat(d[4]) >= parseFloat(d[1]) ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'
        })));
        
        chart.timeScale().fitContent();
      } catch (err) {
        console.error("History fetch failed:", err);
      }
    };

    fetchHistory();

    // 3. DYNAMIC WEBSOCKET
    const binanceSymbol = `${symbol.toLowerCase()}usdt`;
    const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${binanceSymbol}@kline_${activeInterval}`);

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const candle = message.k;

      const liveCandle = {
        time: candle.t / 1000,
        open: parseFloat(candle.o),
        high: parseFloat(candle.h),
        low: parseFloat(candle.l),
        close: parseFloat(candle.c),
      };

      candleSeries.update(liveCandle);
      volumeSeries.update({
        time: candle.t / 1000,
        value: parseFloat(candle.v),
        color: parseFloat(candle.c) >= parseFloat(candle.o) ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'
      });

      setLivePrice(parseFloat(candle.c).toFixed(2));
    };

    const resizeObserver = new ResizeObserver(entries => {
      if (entries.length === 0 || !chartRef.current) return;
      const { width, height } = entries[0].contentRect;
      chartRef.current.applyOptions({ width, height });
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      socket.close(); // Closes old stream before re-running with new interval
      chart.remove();
    };
  }, [symbol, activeInterval]); // Re-runs on interval change

  return (
    <div className="w-full h-full relative bg-[#0b121d] overflow-hidden">
      {/* Top Left: Asset Info */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2">
          <h2 className="text-[10px] font-black text-white tracking-widest uppercase italic">
            {symbol}/USDT <span className="text-slate-500 font-bold ml-1">· BINANCE</span>
          </h2>
          <div className="bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            <span className="text-emerald-400 font-mono text-[10px] font-bold tabular-nums">
              {livePrice}
            </span>
          </div>
        </div>
      </div>

      {/* 4. TOP RIGHT: TIMEFRAME SELECTOR */}
      <div className="absolute top-4 right-4 z-20 flex bg-[#1e222d] border border-white/10 rounded-lg p-1 shadow-2xl">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf.value}
            onClick={() => setActiveInterval(tf.value)}
            className={`px-3 py-1 rounded text-[9px] font-black transition-all ${
              activeInterval === tf.value 
                ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]' 
                : 'text-slate-500 hover:text-white'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
};

export default TradingViewChart;