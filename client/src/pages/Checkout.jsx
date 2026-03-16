import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [step, setStep] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);
  const [shipping, setShipping] = useState({
    fullName: user?.name || 'Rahul Sharma',
    phone: '',
    email: user?.email || '',
    address: '',
    city: '',
    state: 'Maharashtra',
    zip: ''
  });

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
  ];

  // Load customized config if available
  const savedConfig = JSON.parse(localStorage.getItem('customConfig') || '{}');
  const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct') || '{}');
  const isCustom = !!savedConfig.totalPrice;
  const isSelected = !!selectedProduct.id;

  const cartItem = isCustom ? {
    name: `Custom ${savedConfig.frameType} Rack`,
    price: savedConfig.totalPrice,
    qty: 1,
    image: '/assets/prod_rack.png',
    details: `${savedConfig.height}mm, ${savedConfig.shelfCount} Shelves, ${savedConfig.finish}`
  } : (isSelected ? {
    name: selectedProduct.name,
    price: selectedProduct.price,
    qty: 1,
    image: selectedProduct.image,
    details: selectedProduct.category
  } : {
    name: 'Double Sided Gondola Rack',
    price: 7600,
    qty: 1,
    image: '/assets/prod_rack.png',
    details: 'Standard Retail Specification'
  });

  const subtotal = cartItem.price * cartItem.qty;
  const shippingCost = isCustom ? 1200 : 500; // Custom units are heavier
  const tax = Math.round(subtotal * 0.18); // 18% GST (Standard in India)
  const total = subtotal + shippingCost + tax;

  const handlePlaceOrder = async () => {
    if (!shipping.phone || !shipping.address) {
      alert('Please fill in your shipping details for delivery in India.');
      return;
    }
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shipping,
          items: [cartItem],
          total
        })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.removeItem('customConfig'); // Clear after order
        localStorage.removeItem('selectedProduct'); // Clear after order
        setIsOrdered(true);
        // We'll use the ID from the response in the success message
        window.tempOrderId = data.orderId; 
      }
    } catch (err) {
      console.error('Order failed:', err);
    }
  };

  if (isOrdered) {
    return (
      <div className="checkout-page animate-fade">
        <Navbar />
        <div className="container success-container">
          <div className="success-card glass">
            <div className="success-icon">✓</div>
            <h1>Order Placed Successfully!</h1>
            <p>Your order <strong>{window.tempOrderId || '#MF-101010'}</strong> has been confirmed. We've sent a GST invoice to {shipping.email}.</p>
            <div className="success-actions">
              <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
              <button className="btn btn-outline" onClick={() => navigate('/products')}>Keep Shopping</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page animate-fade">
      <Navbar />
      <div className="container">
        <div className="breadcrumb">Home &gt; Checkout &gt; <span>Review Your Order</span></div>
        
        <div className="checkout-layout">
          <div className="checkout-main">
            <section className="checkout-step glass">
              <div className="step-header">
                <h3>Step 1: Shipping Details (India Delivery)</h3>
              </div>
              <div className="form-grid">
                <div className="input-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={shipping.fullName} 
                    onChange={(e) => setShipping({...shipping, fullName: e.target.value})} 
                  />
                </div>
                <div className="input-group">
                  <label>Phone Number (+91)</label>
                  <input 
                    type="text" 
                    placeholder="9876543210"
                    value={shipping.phone} 
                    onChange={(e) => setShipping({...shipping, phone: e.target.value})} 
                  />
                </div>
                <div className="input-group full-width">
                  <label>Email Address (For Invoice)</label>
                  <input 
                    type="email" 
                    value={shipping.email} 
                    onChange={(e) => setShipping({...shipping, email: e.target.value})} 
                  />
                </div>
                <div className="input-group full-width">
                  <label>Street Address / Industry Area</label>
                  <input 
                    type="text" 
                    placeholder="Sector, Landmark, etc."
                    value={shipping.address} 
                    onChange={(e) => setShipping({...shipping, address: e.target.value})} 
                  />
                </div>
                <div className="input-group">
                  <label>City / District</label>
                  <input 
                    type="text" 
                    value={shipping.city} 
                    onChange={(e) => setShipping({...shipping, city: e.target.value})} 
                  />
                </div>
                <div className="input-group">
                  <label>State</label>
                  <select 
                    value={shipping.state} 
                    onChange={(e) => setShipping({...shipping, state: e.target.value})}
                  >
                    {indianStates.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>PIN Code</label>
                  <input 
                    type="text" 
                    placeholder="400001"
                    value={shipping.zip} 
                    onChange={(e) => setShipping({...shipping, zip: e.target.value})} 
                  />
                </div>
              </div>
            </section>

            <section className="checkout-step glass mt-40">
              <div className="step-header">
                <h3>Step 2: Payment Method</h3>
              </div>
              <div className="payment-options">
                <label className="payment-opt active">
                  <input type="radio" name="payment" defaultChecked />
                  <div className="opt-content">
                    <span className="opt-title">Cash on Delivery</span>
                    <p>Pay when you receive your furniture.</p>
                  </div>
                </label>
                <label className="payment-opt disabled">
                  <input type="radio" name="payment" disabled />
                  <div className="opt-content">
                    <span className="opt-title">Credit / Debit Card</span>
                    <p>Processing via secure gateway (Maintenance).</p>
                  </div>
                </label>
              </div>
              <button className="btn btn-primary w-full mt-40" onClick={handlePlaceOrder}>Place Order &rarr;</button>
            </section>
          </div>

          <aside className="order-summary-sidebar">
            <div className="summary-card glass">
              <h3>Order Summary</h3>
              <div className="summary-item-detail">
                <div className="item-img-box">
                  <img src={cartItem.image} alt={cartItem.name} />
                </div>
                <div>
                  <div className="item-name">{cartItem.name}</div>
                  <div className="item-meta">Qty: {cartItem.qty} {cartItem.details && `| ${cartItem.details}`}</div>
                  <div className="item-price">₹{cartItem.price.toLocaleString('en-IN')}</div>
                </div>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>₹{shippingCost.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Tax (GST)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
