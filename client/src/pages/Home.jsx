import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, getProducts } from '../services/api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import '../styles/Home.css';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));

    getProducts()
      .then(data => setProducts(data.slice(0, 3))) // Show only first 3 featured products
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <Hero />

      <section className="categories-section">
        <div className="container">
          <h2>Our Categories</h2>
          <p className="section-subtitle">Explore Products for Your Needs</p>
          <div className="categories-grid">
            {categories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2>Featured Products</h2>
          <p className="section-subtitle">Ready-to-Use Furniture Available <i>Now</i></p>
          <div className="products-grid">
            {products.map((prod, index) => (
              <ProductCard 
                key={prod.id} 
                product={prod} 
                variant={index === 1 ? 'primary' : 'secondary'} 
              />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banners-section">
        <div className="container">
          <div className="cta-banners">
            <div className="cta-banner">
              <div className="cta-content">
                <h3>Customize Your Furniture</h3>
                <p>Create your ideal design.</p>
                <button className="btn btn-secondary" onClick={() => navigate('/customize')}>Start Customizing <span>&rarr;</span></button>
              </div>
              <div className="cta-image">
                <img src="/assets/cta_customize.png" alt="Customize" />
              </div>
            </div>
            <div className="cta-banner track-banner">
              <div className="cta-content">
                <h3>Track Your Order</h3>
                <p>Check your order status.</p>
                <button className="btn btn-primary" onClick={() => navigate('/track')}>Track Now <span>&rarr;</span></button>
              </div>
              <div className="cta-image">
                <img src="/assets/cta_track.png" alt="Track" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
