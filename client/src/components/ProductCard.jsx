import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.css';

const ProductCard = ({ product, variant = 'primary' }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="card-rating">
          <span className="stars">{'★'.repeat(Math.floor(product.rating))}</span>
          <span className="rating-num">{product.rating}</span>
        </div>
        <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
        <button 
          className={`btn btn-${variant} w-full`}
          onClick={(e) => {
            e.stopPropagation();
            localStorage.setItem('selectedProduct', JSON.stringify(product));
            navigate('/checkout');
          }}
        >
          Add to Cart <span>&rarr;</span>
        </button>
        {product.category === 'Industrial Racks' && (
          <button 
            className="btn btn-outline btn-sm w-full mt-10"
            onClick={(e) => {
              e.stopPropagation();
              localStorage.setItem('customizeBase', JSON.stringify(product));
              navigate('/customize');
            }}
          >
            Customize ⚙️
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
