import React from 'react';
import BottomNav from './BottomNav';
import '../styles/AppShell.css';

const AppShell = ({ children }) => {
  return (
    <div className="app-shell">
      <main className="app-content">
        {children}
      </main>
      <BottomNav />
      {/* Global Toast / Overlay Container can go here */}
    </div>
  );
};

export default AppShell;
