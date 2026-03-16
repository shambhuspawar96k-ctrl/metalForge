import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/BottomNav.css';

const BottomNav = () => {
  return (
    <nav className="bottom-nav glass">
      <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon">🏠</div>
        <span>Home</span>
      </NavLink>
      <NavLink to="/categories" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon">📦</div>
        <span>Items</span>
      </NavLink>
      <NavLink to="/customize" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon pulse-blue">⚙️</div>
        <span>Build</span>
      </NavLink>
      <NavLink to="/track" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon">🚚</div>
        <span>Track</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-icon">👤</div>
        <span>Me</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
