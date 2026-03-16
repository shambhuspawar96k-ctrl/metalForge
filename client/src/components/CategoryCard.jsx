import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryCard.css';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div className="category-card" onClick={() => navigate('/products')}>
      <div className="category-image">
        <img src={category.image} alt={category.name} />
      </div>
      <h3>{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
