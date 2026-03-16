import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../services/api';
import Navbar from '../components/Navbar';
import '../styles/SellerDashboard.css';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 842000,
    activeOrders: 12,
    inventoryCount: 0,
    rating: 4.8
  });

  useEffect(() => {
    if (!user || user.role !== 'seller') {
      navigate('/login');
      return;
    }

    // Fetch products belonging to this seller (mocked)
    getProducts()
      .then(data => {
        setProducts(data.slice(0, 5));
        setStats(prev => ({ ...prev, inventoryCount: data.length }));
      })
      .catch(err => console.error(err));
  }, [user, navigate]);

  if (!user || user.role !== 'seller') return null;

  return (
    <div className="seller-dashboard-page animate-fade">
      <Navbar />
      <div className="container dashboard-layout">
        <header className="dashboard-header">
          <div className="header-info">
            <h1>Seller Console</h1>
            <p>Welcome back, <strong>{user.name}</strong>. Your industrial distribution is performing well.</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary">+ List New Product</button>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card glass luxury-border">
            <span className="stat-label">Total Revenue</span>
            <h3 className="stat-value">₹{stats.totalSales.toLocaleString('en-IN')}</h3>
            <span className="stat-trend positive">↑ 12% vs last month</span>
          </div>
          <div className="stat-card glass">
            <span className="stat-label">Active Orders</span>
            <h3 className="stat-value">{stats.activeOrders}</h3>
            <span className="stat-trend">2 processing</span>
          </div>
          <div className="stat-card glass">
            <span className="stat-label">Live Inventory</span>
            <h3 className="stat-value">{stats.inventoryCount}</h3>
            <span className="stat-trend">4 stock alerts</span>
          </div>
          <div className="stat-card glass">
            <span className="stat-label">Seller Rating</span>
            <h3 className="stat-value">{stats.rating} / 5.0</h3>
            <div className="rating-mini-stars">★★★★★</div>
          </div>
        </section>

        <div className="dashboard-content-grid">
          <section className="inventory-section glass">
            <div className="section-header">
              <h2>My Inventory</h2>
              <button className="text-btn">View All</button>
            </div>
            <div className="seller-product-table">
              <div className="table-row table-header">
                <span>Product</span>
                <span>Category</span>
                <span>Price</span>
                <span>Stock</span>
                <span>Status</span>
              </div>
              {products.map(prod => (
                <div key={prod.id} className="table-row">
                  <div className="prod-cell">
                    <img src={prod.image} alt={prod.name} className="mini-thumb" />
                    <span>{prod.name}</span>
                  </div>
                  <span>{prod.category}</span>
                  <span>₹{prod.price.toLocaleString('en-IN')}</span>
                  <span>{Math.floor(Math.random() * 50) + 10} units</span>
                  <span className="status-badge live">Live</span>
                </div>
              ))}
            </div>
          </section>

          <aside className="seller-sidebar">
            <div className="sidebar-widget glass">
              <h3>Recent Sales</h3>
              <div className="mini-feed">
                <div className="feed-item">
                  <div className="feed-icon">₹</div>
                  <div className="feed-text">
                    <strong>New Order #AF-9921</strong>
                    <p>Heavy Duty Rack - ₹12,500</p>
                  </div>
                </div>
                <div className="feed-item">
                  <div className="feed-icon">✓</div>
                  <div className="feed-text">
                    <strong>Order Delivered</strong>
                    <p>Batch #AF-9801 received by Alpha Ind.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-widget promo-widget premium-gradient">
              <h3>Boost Your Visibility</h3>
              <p>Promoted listings get 3x more views in the Indian market.</p>
              <button className="btn btn-secondary btn-sm">Learn More</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
