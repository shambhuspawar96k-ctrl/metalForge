import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { getOrderById } from '../services/api';
import '../styles/TrackOrder.css';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId) return;
    
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const data = await getOrderById(orderId);
      setStatus(data);
    } catch (err) {
      setError('Could not find order. Please check the ID and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-order-page animate-fade">
      <Navbar />
      <div className="container">
        <div className="track-layout">
          <div className="track-header glass">
            <h1>Track Your Order</h1>
            <p>Enter your order ID to see real-time updates on your furniture production.</p>
            <form onSubmit={handleTrack} className="track-form">
              <input 
                type="text" 
                placeholder="Enter Order ID (e.g., MF-101010)" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                disabled={loading}
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Tracking...' : 'Track Now →'}
              </button>
            </form>
            {error && <p className="error-message animate-fade">{error}</p>}
          </div>

          {status && (
            <div className="track-results glass animate-fade">
              <div className="status-banner">
                <div className="status-info">
                  <span className="label">Current Status</span>
                  <span className="value">{status.status}</span>
                </div>
                <div className="status-info text-right">
                  <span className="label">Est. Delivery</span>
                  <span className="value">{status.estimatedDelivery}</span>
                </div>
              </div>

              {status.items && status.items.length > 0 && (
                <div className="track-items-list" style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Items in this Shipment</h3>
                  {status.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <img src={item.image || '/assets/prod_rack.png'} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                        <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>Qty: {item.qty}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="timeline">
                {status.updates.map((update, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-date">{update.date}</div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <p>{update.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
