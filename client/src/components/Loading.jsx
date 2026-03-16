import React from 'react';
import '../styles/global.css';

const Loading = ({ type = 'spinner' }) => {
  if (type === 'skeleton') {
    return (
      <div className="skeleton-container container">
        <div className="skeleton-title animate-pulse"></div>
        <div className="skeleton-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton-card glass animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="loading-overlay">
      <div className="spinner-container">
        <div className="forge-spinner">
          <div className="inner-ring"></div>
          <div className="center-glow"></div>
        </div>
        <span className="loading-text">Forging Excellence...</span>
      </div>
    </div>
  );
};

export default Loading;
