import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles/ProductListing.css';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: 250000,
  });
  const [sortBy, setSortBy] = useState('Most Popular');

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    let result = products;
    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category);
    }
    result = result.filter(p => p.price <= filters.priceRange);
    
    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(result);
  }, [filters, sortBy, products]);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="product-listing-page animate-fade">
      <Navbar />
      <div className="container">
        <div className="breadcrumb">Home &gt; Products &gt; <span>{filters.category}</span></div>
        <h1>{filters.category === 'All' ? 'Our Industrial Collection' : filters.category}</h1>
        <p className="subtitle">High-quality, durable furniture solutions for the Indian industrial sector.</p>


        <div className="listing-layout">
          <aside className="sidebar">
            <div className="filter-group">
              <h4>Filter Products</h4>
              <div className="filter-section">
                <h5>Categories</h5>
                {categories.map(cat => (
                  <label key={cat} className="radio-label">
                    <input 
                      type="radio" 
                      name="category"
                      checked={filters.category === cat}
                      onChange={() => setFilters({...filters, category: cat})} 
                    /> {cat}
                  </label>
                ))}
              </div>
              <div className="filter-section">
                <h5>Max Price: ₹{parseInt(filters.priceRange).toLocaleString('en-IN')}</h5>
                <input type="range" min="3000" max="250000" step="1000" value={filters.priceRange} 
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})} />
              </div>
              <button className="btn btn-secondary w-full">Customize Furniture</button>
            </div>
          </aside>

          <main className="main-content">
            <div className="listing-header">
              <span>Showing {filteredProducts.length} products found</span>
              <div className="sort-by">
                Sort By: 
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option>Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="products-grid-listing">
              {filteredProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} variant="primary" />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
