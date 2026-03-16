import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // Added role state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verified Corporate & Individual Personas for "Full Marketplace" experience
    const personaMap = {
      'procurement@tatasteel.com': { name: 'Tata Steel Ltd.', role: 'buyer' },
      'admin@apollohospitals.in': { name: 'Apollo Hospitals', role: 'buyer' },
      'priya.verma@outlook.com': { name: 'Priya Verma', role: 'buyer' },
      'rahul.sharma@gmail.com': { name: 'Rahul Sharma', role: 'buyer' },
      'sales@godrejinterio.com': { name: 'Godrej Interio', role: 'seller' },
      'ankit.racks@nagpurind.in': { name: 'Ankit Industrial Racks', role: 'seller' },
      'seller@metalforge.in': { name: 'MetalForge Seller Hub', role: 'seller' }
    };

    const persona = personaMap[email.toLowerCase()];
    
    const userData = { 
      email, 
      name: persona ? persona.name : email.split('@')[0], 
      role: persona ? persona.role : role, 
      joined: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) 
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    if (userData.role === 'seller') {
      navigate('/seller-dashboard');
    } else {
      navigate('/profile');
    }
    window.location.reload(); 
  };

  return (
    <div className="login-page animate-fade">
      <Navbar />
      <div className="login-container">
        <div className="login-card glass">
          <div className="card-header">
            <h2>{isLogin ? 'Welcome Back' : 'Join MetalForge'}</h2>
            <p>{isLogin ? 'Access your orders and preferences.' : 'Create an account to start configuring.'}</p>
          </div>

          <div className="role-selector-tabs">
            <button 
              className={`role-tab ${role === 'buyer' ? 'active' : ''}`}
              onClick={() => setRole('buyer')}
              type="button"
            >
              Buyer
            </button>
            <button 
              className={`role-tab ${role === 'seller' ? 'active' : ''}`}
              onClick={() => setRole('seller')}
              type="button"
            >
              Seller
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Industrial partner name" required />
              </div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="partner@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <button type="submit" className="btn btn-primary btn-block">
              {isLogin ? `Sign In as ${role.toUpperCase()} &rarr;` : `Join as ${role.toUpperCase()} &rarr;`}
            </button>
          </form>

          <div className="card-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
