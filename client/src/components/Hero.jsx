import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Hero.css';
import heroImg from '../assets/hero_rack.png';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>Customize & Order<br />Metal Furniture Easily</h1>
          <p>Design the perfect furniture for your business or buy ready-made products.</p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => navigate('/customize')}>Start Customizing <span>&rarr;</span></button>
            <button className="btn btn-outline" onClick={() => navigate('/products')}>Browse Products <span>&rarr;</span></button>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="Modern metal furniture rack" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
