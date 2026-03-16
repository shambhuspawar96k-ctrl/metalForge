import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="navbar glass">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="MetalForge Logo" className="navbar-logo" />
          <span>MetalForge</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/categories">Products</Link></li>
          {user?.role === 'seller' ? (
            <li><Link to="/seller-dashboard" className="seller-dashboard-link">Seller Dashboard</Link></li>
          ) : (
            <li><Link to="/customize" className="customize-link">Customize Furniture</Link></li>
          )}
          <li><Link to="/track">Track Order</Link></li>
        </ul>
        <div className="nav-actions">
          {user ? (
            <Link to="/profile" className="profile-btn">
              <div className="avatar-sm">{user.name[0].toUpperCase()}</div>
              <span>{user.name}</span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/login" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
