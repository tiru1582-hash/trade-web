import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import HomeHeader from './pages/Home/HomeHeader';
import Dashboard from './pages/Dashboard/Dashboard';
import TradingPage from './pages/TradingView/TradingPage';
import PositionsTable from './pages/TradingView/PositionsTable';
import TradingTerminal from './pages/Onboarding/MarketExplore';
import FavoritesPage from './pages/Onboarding/FavoritesPage';
import TradeHistory from './pages/Onboarding/TradeHistory';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {/* 1. Main Wrapper: h-screen prevents vertical bouncing on mobile */}
      <div className="h-screen w-full bg-[#020617] text-slate-300 font-sans antialiased flex flex-col overflow-hidden">
        
        {/* Global Ambient Glows: Optimized z-index */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[120px] rounded-full opacity-50" />
        </div>

        {/* 2. Top Navigation: Always stays fixed at the top */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        {/* 3. Content Area: Flex row for Sidebar + Main Content */}
        <div className="flex flex-1 min-h-0 relative z-10 overflow-hidden">
          
          {/* Sidebar: Only visible when logged in. 
              On desktop it's a fixed strip; on mobile it's handled by your Navbar trigger */}
          {isLoggedIn && (
            <div className="hidden lg:block shrink-0 border-r border-white/5 bg-[#0b121d]">
              <Sidebar />
            </div>
          )}

          {/* 4. Main Viewport: min-w-0 prevents flex children from expanding past 100% */}
          <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <Routes>
                {/* Public Route */}
                <Route path="/" element={<div className="px-4 md:px-8 py-6"><HomeHeader /></div>} />
                
                {/* Protected Routes Wrapper */}
                <Route path="/dashboard" element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/trade/:symbol" element={
                    <div className="h-full w-full">
                      <TradingPage isLoggedIn={isLoggedIn} />
                    </div>
                  
                } />

                {/* Shared Full-Screen Styles for List Pages */}
                {[
                  { path: "/positions", component: <PositionsTable /> },
                  { path: "/marketexpl", component: <TradingTerminal /> },
                  { path: "/favorites", component: <FavoritesPage /> },
                  { path: "/history", component: <TradeHistory /> }
                ].map((route) => (
                  <Route key={route.path} path={route.path} element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <div className="h-full w-full bg-[#0b121d] overflow-y-auto">
                         {route.component}
                      </div>
                    </ProtectedRoute>
                  } />
                ))}

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>

            {/* 5. Risk Disclaimer: Sticky-ish footer only on non-chart pages */}
            <footer className="shrink-0 py-4 bg-[#020617]/80 backdrop-blur-md border-t border-white/5 px-8 text-center">
              <p className="text-[9px] text-slate-600 max-w-3xl mx-auto uppercase tracking-[0.2em] leading-loose">
                Trading involves high risks. Execution via <span className="text-cyan-500">QUANTLAB</span> neural bridge is for demonstration.
              </p>
             
            </footer>
          </main>
        </div>
      </div>
    </Router>
  );
}