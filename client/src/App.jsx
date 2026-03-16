import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Customize from './pages/Customize';
import TrackOrder from './pages/TrackOrder';
import About from './pages/About';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SellerDashboard from './pages/SellerDashboard';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
