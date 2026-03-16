import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../services/api';
import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';
import '../styles/Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories()
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  return (
    <div className="categories-page animate-fade">
      <Navbar />
      <div className="container">
        <div className="breadcrumb">Home &gt; <span>Categories</span></div>
        <h1 className="page-title">Browse Our Categories</h1>
        <p className="section-subtitle">Choose the type of furniture that suits your business needs.</p>
        
        <div className="categories-grid-full">
          {categories.map(cat => (
            <div key={cat.id} className="category-item-container">
              <CategoryCard category={cat} />
              <button 
                className="btn btn-outline"
                onClick={() => navigate('/products')}
              >
                View Products &rarr;
              </button>
            </div>
          ))}
        </div>

        <section className="promo-section-alt">
          <div className="cta-banner glass animate-fade">
            <div className="cta-content">
              <h2>Customize Your Furniture</h2>
              <p>Create your ideal design with our interactive configurator.</p>
              <button className="btn btn-secondary" onClick={() => navigate('/customize')}>Start Customizing <span>&rarr;</span></button>
            </div>
            <div className="cta-image">
              <img src="/assets/cta_customize.png" alt="Customization" />
            </div>
          </div>
        </section>

        <footer className="footer-premium">
          <div className="footer-logo">MetalForge</div>
          <p>© 2026 MetalForge Premium Furniture. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Categories;
