# ⚡ QuantLab | Institutional Trading Terminal

**QuantLab** is a high-performance, quantitative trading interface designed for zero-latency market execution. By bypassing a traditional backend and connecting directly to financial data streams, QuantLab provides institutional-grade price discovery and technical analysis in a sleek, glassmorphic environment.

---

## 🚀 Key Modules

### 1. Neural Execution Hub (`TradingPage.jsx`)

The central engine of the terminal. It maintains a persistent **WebSocket** link to the markets, distributing live price payloads to all sub-nodes (Charts, Order Books, and Position Tables) simultaneously.

### 2. High-Fidelity Charting (`TradingViewChart.jsx`)

Powered by `lightweight-charts`, this module handles:

* **Historical Reconstruction:** Fetches up to 1,000 bars of history via REST API.
* **Live Flux:** Real-time candlestick updates via Binance `@kline` streams.
* **Adaptive Timeframes:** Instant switching between 1M, 1H, and 1D intervals.

### 3. Market Discovery (`MarketExplore.jsx` & `MarketWatch.jsx`)

Real-time asset tracking utilizing:

* **CoinGecko API:** For global market cap and asset metadata.
* **Mini-Ticker Streams:** High-speed price flux for broad market monitoring.

---

## 🛠️ Tech Stack

* **Core:** React 18
* **Styling:** Tailwind CSS (Custom "Quant" Dark Theme)
* **Animations:** Framer Motion (Layout transitions & Micro-interactions)
* **Charts:** Lightweight Charts (TradingView)
* **Icons:** Lucide React
* **Data:** Binance API (REST & WebSockets), CoinGecko API

---

## 📦 Installation & Deployment

To initialize the terminal on your local node:

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/quantlab-terminal.git
cd quantlab-terminal

```


2. **Install Dependencies:**
```bash
npm install

```


3. **Start the Development Server:**
```bash
npm run dev

```



---

## 🔌 Data Integration Architecture

The terminal utilizes a "No-Backend" strategy for maximum speed:

* **REST Polling:** Used only for initial metadata and historical data sets.
* **WebSocket Pushes:** Handles all live price movement (`lastPrice`, `bid`, `ask`).
* **Client-Side Computation:** P&L, margin requirements, and spread logic are calculated locally on the client's CPU to ensure sub-millisecond responsiveness.

---

## 📋 Best Practices Included

* **Data Fidelity:** Uses `tabular-nums` and `font-mono` to prevent UI "jitter" during rapid price updates.
* **Memory Efficiency:** Strict WebSocket cleanup logic in `useEffect` to prevent memory leaks.
* **Responsive Design:** Optimized grid layouts for ultra-wide desktop monitors and mobile "On-the-Go" execution.

---

## 📜 License

Internal QuantLab Distribution. Unauthorized redistribution of Quantitative Execution logic is prohibited.
