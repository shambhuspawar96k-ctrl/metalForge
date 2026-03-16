import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error(err));

    fetch('/api/products')
      .then(res => res.json())
      .then(data => setRelatedProducts(data.filter(p => p.id !== parseInt(id)).slice(0, 3)))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div className="loading-screen">Loading Industrial Specifications...</div>;

  return (
    <div className="product-detail-page">
      <Navbar />
      <div className="container">
        <div className="breadcrumb">Home &gt; {product.category} &gt; <span>{product.name}</span></div>
        
        <div className="detail-layout">
          <div className="image-gallery">
            <img src={product.image} alt={product.name} className="main-image" />
            <div className="thumbnail-strip">
              {[1, 2, 3, 4].map(i => <div key={i} className="thumb"></div>)}
            </div>
          </div>

            <div className="product-actions">
              <div className={`stock-badge ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? '● In Stock' : '○ Out of Stock'}
              </div>
              <h1>{product.name}</h1>
              <div className="rating">
                <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
                <span className="rating-value">{product.rating}</span>
                <span className="reviews">({product.reviews} Reviews)</span>
              </div>
              <p className="description">{product.description}</p>
              <div className="price-tag">₹{product.price.toLocaleString('en-IN')}</div>
              <div className="action-btns">
                <button className="btn btn-outline" onClick={() => {
                  localStorage.setItem('selectedProduct', JSON.stringify(product));
                  navigate('/checkout');
                }} disabled={!product.inStock}>Add to Cart</button>
                <button className="btn btn-primary" onClick={() => {
                  localStorage.setItem('selectedProduct', JSON.stringify(product));
                  navigate('/checkout');
                }} disabled={!product.inStock}>Buy Now <span>&rarr;</span></button>
                {product.category === 'Industrial Racks' && (
                  <button className="btn btn-secondary" onClick={() => {
                    localStorage.setItem('customizeBase', JSON.stringify(product));
                    navigate('/customize');
                  }}>Customize This ⚙️</button>
                )}
              </div>
            </div>
          </div>

          <section className="product-tabs">
            <div className="tab-headers">
              <div className="tab active">Product Details</div>
              <div className="tab">Specifications</div>
            </div>
            <div className="tab-content">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div key={key} className="spec-item">
                  <span className="spec-key">{key}:</span>
                  <span className="spec-value">{value}</span>
                </div>
              ))}
            </div>
          </section>

        <section className="related-products">
          <h2>Related Products</h2>
          <div className="products-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
