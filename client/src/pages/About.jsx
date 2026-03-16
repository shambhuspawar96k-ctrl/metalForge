import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-page animate-fade">
      <Navbar />
      <div className="about-hero">
        <div className="container">
          <span className="badge">Our Story</span>
          <h1>Precision. Strength. <br/><span>Innovation.</span></h1>
        </div>
      </div>

      <div className="container">
        <section className="about-content glass">
          <div className="content-grid">
            <div className="text-side">
              <h2>Forged in Quality</h2>
              <p>At <strong>MetalForge</strong>, we don't just build furniture; we engineer industrial-grade solutions that stand the test of time. Founded in the heart of Nagpur's industrial hub, we have grown from a small workshop to a state-of-the-art facility serving supermarkets, laboratories, and commercial spaces across the country.</p>
              <p>Our commitment to using high-grade cold-rolled steel and advanced powder coating techniques ensures that every piece of MetalForge furniture is as durable as it is functional.</p>
            </div>
            <div className="stats-side">
              <div className="stat-card">
                <span className="stat-num">15+</span>
                <span className="stat-label">Years Excellence</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">500+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">100%</span>
                <span className="stat-label">Steel Grade Quality</span>
              </div>
            </div>
          </div>
        </section>

        <section className="values-section">
          <div className="section-header text-center">
            <h2>The MetalForge Pillar</h2>
            <p>What makes us the preferred choice for industrial shelving and storage.</p>
          </div>
          <div className="values-grid">
            {[
              { title: 'Modular Design', desc: 'Every component is designed to be expandable and customizable.' },
              { title: 'Extreme Load', desc: 'Our Heavy Duty series is tested for loads up to 600kg per level.' },
              { title: 'Bespoke Finish', desc: 'Industrial grade powder coating with 10+ color options.' },
              { title: 'Swift Assembly', desc: 'Boltless configuration for fast setup and reconfiguration.' }
            ].map((v, i) => (
              <div key={i} className="value-card glass">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="team-section">
          <div className="section-header">
            <h2>Our Leadership</h2>
            <p>The engineering minds behind MetalForge.</p>
          </div>
          <div className="team-grid">
            {[
              { name: 'Arjun Mehta', role: 'Founder & Chief Engineer', img: 'AM' },
              { name: 'Dr. Priya Rao', role: 'Head of Industrial Design', img: 'PR' },
              { name: 'Vikram Singh', role: 'Operations Director', img: 'VS' }
            ].map((member, i) => (
              <div key={i} className="team-card glass">
                <div className="team-avatar">{member.img}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="milestones-section glass">
          <h2>Milestones</h2>
          <div className="milestone-list">
            <div className="milestone-item">
              <span className="m-year">2011</span>
              <p>MetalForge founded as a structural steel workshop.</p>
            </div>
            <div className="milestone-item">
              <span className="m-year">2016</span>
              <p>Launched the signature 'Heavy Duty' industrial racking line.</p>
            </div>
            <div className="milestone-item">
              <span className="m-year">2021</span>
              <p>Expanded to a 50,000 sq.ft. automated manufacturing facility.</p>
            </div>
            <div className="milestone-item">
              <span className="m-year">2026</span>
              <p>Pioneering interactive 3D modular configuration for all partners.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="simple-footer container">
        <p>&copy; 2026 MetalForge Industries. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
