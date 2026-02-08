import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Components
import Dashboard from './pages/Dashboard/Dashboard';
import TradingPage from './pages/TradingView/TradingPage';
import AutoTradePage from './pages/Onboarding/FavoritesPage';
import HistoryPositions from './pages/Onboarding/TradeHistory';
import AppLayout from './components/layout/layout';
import SettingsPage from './pages/Settings/Settings';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <Routes>
        {/* 1. Public Landing Page */}
        <Route path="/" element={<div>Login Page / Home Header</div>} />

        {/* 2. Protected App Wrapper */}
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <AppLayout>
                <Routes>
                  {/* Remove the <th> tag that was causing a break */}
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="trade" element={<TradingPage />} />
                  <Route path="auto-trade" element={<AutoTradePage />} />
                  <Route path="history" element={<HistoryPositions />} />
                  <Route path="settings" element={<SettingsPage/>} />
                  
                  {/* Catch-all: If user is logged in but hits an unknown sub-path */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </AppLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}