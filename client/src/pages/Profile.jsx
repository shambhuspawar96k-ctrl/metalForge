import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    if (user) {
      fetch('/api/orders')
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error(err));
    }
  }, [user]);

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className="profile-page animate-fade">
      <Navbar />
      <div className="container profile-layout">
        <aside className="profile-sidebar glass">
          <div className="user-avatar">{user.name[0].toUpperCase()}</div>
          <h3>{user.name}</h3>
          <p className="user-email">{user.email}</p>
          <div className="user-meta">
            <span>Customer since {user.joined}</span>
          </div>
          <button className="btn btn-outline btn-block" onClick={handleLogout}>Log Out</button>
        </aside>

        <main className="profile-main">
          {user.role === 'seller' ? (
            <section className="profile-section glass gold-border">
              <div className="section-header-row">
                <h2>Seller Account Statistics</h2>
                <button className="btn btn-secondary btn-sm" onClick={() => navigate('/seller-dashboard')}>Go to Console</button>
              </div>
              <div className="stats-mini-grid">
                <div className="mini-stat">
                  <span className="label">Store Status</span>
                  <span className="val pulse">ACTIVE</span>
                </div>
                <div className="mini-stat">
                  <span className="label">GST Verified</span>
                  <span className="val">✓ Yes</span>
                </div>
                <div className="mini-stat">
                  <span className="label">Total Listed</span>
                  <span className="val">14 Items</span>
                </div>
              </div>
            </section>
          ) : (
            <section className="profile-section glass">
              <h2>Recent Orders</h2>
              <div className="order-list">
                {orders.length > 0 ? orders.map(order => (
                  <div key={order.id} className="order-card" onClick={() => navigate('/track')}>
                    <div className="order-info">
                      <span className="order-id">{order.id}</span>
                      <span className="order-date">Placed on {order.date}</span>
                    </div>
                    <div className={`order-status badge ${order.status === 'Delivered' ? 'badge-success' : ''}`}>
                      {order.status}
                    </div>
                  </div>
                )) : <p>No orders yet.</p>}
              </div>
            </section>
          )}

          <section className="profile-section glass">
            <h2>Account Settings</h2>
            <div className="settings-grid">
              <div className="setting-item">
                <label>Company Name</label>
                <p>Modura Solutions Private Limited</p>
              </div>
              <div className="setting-item">
                <label>GST Number</label>
                <p>27AAECM1234F1Z5</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
