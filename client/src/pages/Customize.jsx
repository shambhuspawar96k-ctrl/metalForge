import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Customize.css';

// --- Dynamic SVG Component ---
const ProductSVG = ({ type, height, shelfCount, color, panelType }) => {
  const scale = 0.15;
  const svgHeight = height * scale + 40;
  const uprightHeight = height * scale;
  const shelfSpacing = uprightHeight / (shelfCount + 1);
  
  const finishColors = {
    'Industrial Grey': '#64748b',
    'Matte Black': '#1e293b',
    'Premium Orange': '#f97316',
    'Steel Blue': '#3b82f6',
  };
  
  const currentColor = finishColors[color] || '#64748b';

  return (
    <svg width="100%" height="400" viewBox={`0 0 300 ${svgHeight}`} preserveAspectRatio="xMidYMid meet" className="dynamic-rack-svg">
      {/* Background Panel (Conditional) */}
      {panelType !== 'None' && type === 'Heavy Rack' && (
        <rect 
          x="60" y="20" width="180" height={uprightHeight} 
          fill={panelType === 'Perforated' ? 'url(#perforated)' : (panelType === 'Wire Mesh' ? 'url(#mesh)' : '#cbd5e1')}
          opacity="0.3"
        />
      )}
      
      {/* Structural Rendering based on Type */}
      {type === 'Heavy Rack' && (
        <>
          <rect x="50" y="20" width="10" height={uprightHeight} fill={currentColor} rx="2" />
          <rect x="240" y="20" width="10" height={uprightHeight} fill={currentColor} rx="2" />
          {[...Array(shelfCount)].map((_, i) => (
            <rect key={i} x="55" y={20 + (i + 1) * shelfSpacing} width="190" height="6" fill={currentColor} rx="1" />
          ))}
        </>
      )}

      {type === 'Mezzanine' && (
        <>
          <rect x="20" y={uprightHeight + 10} width="260" height="15" fill="#475569" rx="2" />
          <rect x="40" y="20" width="15" height={uprightHeight} fill={currentColor} />
          <rect x="245" y="20" width="15" height={uprightHeight} fill={currentColor} />
          <rect x="40" y="20" width="220" height="10" fill={currentColor} />
          <line x1="40" y1="50" x2="260" y2="50" stroke={currentColor} strokeWidth="2" strokeDasharray="5,5" />
        </>
      )}

      {type === 'Slotted Angle' && (
        <>
          {[50, 110, 170, 230].map(x => (
            <rect key={x} x={x} y="20" width="6" height={uprightHeight} fill={currentColor} />
          ))}
          {[...Array(shelfCount)].map((_, i) => (
            <rect key={i} x="45" y={20 + (i + 1) * shelfSpacing} width="200" height="4" fill={currentColor} />
          ))}
        </>
      )}
      
      {/* Patterns */}
      <defs>
        <pattern id="perforated" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="2" fill="#94a3b8" />
        </pattern>
        <pattern id="mesh" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 0 0 L 10 10 M 10 0 L 0 10" stroke="#94a3b8" strokeWidth="1" />
        </pattern>
      </defs>
    </svg>
  );
};

const Customize = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // 0: Select Product, 1-5: Config
  
  const [config, setConfig] = useState({
    type: 'Heavy Rack',
    frameType: 'Heavy Duty',
    height: 1800,
    shelfCount: 5,
    loadPerShelf: 250,
    panelType: 'Plain Metal',
    finish: 'Industrial Grey',
    accessories: {
      sideGuards: false,
      labelHolders: true
    }
  });

  useEffect(() => {
    const baseProduct = JSON.parse(localStorage.getItem('customizeBase'));
    if (baseProduct) {
      setConfig(prev => ({
        ...prev,
        type: baseProduct.category.includes('Mezzanine') ? 'Mezzanine' : (baseProduct.category.includes('Slotted') ? 'Slotted Angle' : 'Heavy Rack'),
        finish: baseProduct.specifications?.Finish || 'Industrial Grey',
      }));
      localStorage.removeItem('customizeBase'); // Use once
      setCurrentStep(1); // Jump to config
    }
  }, []);

  const [prices, setPrices] = useState({
    base: 4500,
    addons: 0,
    total: 4500
  });

  useEffect(() => {
    let base = 4500;
    if (config.type === 'Mezzanine') base = 25000;
    if (config.type === 'Slotted Angle') base = 3200;

    let addons = 0;
    // Frame
    addons += config.frameType === 'Heavy Duty' ? 1200 : 0;
    addons += (config.height - 1200) * 0.5;
    // Shelves
    addons += config.shelfCount * 450;
    addons += (config.loadPerShelf / 100) * 200;
    // Finish & Panels
    addons += config.finish === 'Premium Orange' ? 800 : 0;
    addons += config.panelType === 'Perforated' ? 1000 : 400;
    // Accessories
    if (config.accessories.sideGuards) addons += 1500;
    if (config.accessories.labelHolders) addons += 600;

    setPrices({ base, addons, total: base + addons });
  }, [config]);

  const steps = [
    { id: 0, name: 'Select Product', desc: 'Category' },
    { id: 1, name: 'Frame', desc: 'Structure & Height' },
    { id: 2, name: 'Storage', desc: 'Shelves & Load' },
    { id: 3, name: 'Aesthetics', desc: 'Finish & Panels' },
    { id: 4, name: 'Accessories', desc: 'Safety & Utility' },
    { id: 5, name: 'Review', desc: 'Final Summary' }
  ];

  const handleNext = () => currentStep < 5 && setCurrentStep(currentStep + 1);
  const handleBack = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  return (
    <div className="customize-page animate-fade">
      <Navbar />
      <div className="container">
        <div className="breadcrumb">Home &gt; Customize &gt; <span>{steps[currentStep].name}</span></div>
        
        <div className="stepper-horizontal">
          {steps.map(s => (
            <div key={s.id} className={`step-node ${currentStep === s.id ? 'active' : (currentStep > s.id ? 'done' : '')}`} onClick={() => setCurrentStep(s.id)}>
              <div className="node-circle">{currentStep > s.id ? '✓' : s.id}</div>
              <span className="node-label">{s.name}</span>
            </div>
          ))}
        </div>

        <div className="customize-layout">
          <div className="preview-section">
            <div className="preview-card glass">
              <div className="preview-header">
                <span className="badge">Interactive 2D Preview</span>
                <h3>{config.type} Configuration</h3>
              </div>
              
              <div className="visualizer-box">
                <ProductSVG 
                  type={config.type}
                  height={config.height} 
                  shelfCount={config.shelfCount} 
                  color={config.finish}
                  panelType={config.panelType}
                />
              </div>

              <div className="live-data-grid">
                <div className="data-item">
                  <span className="data-label">Structural Load</span>
                  <span className="data-val">{(config.shelfCount * config.loadPerShelf).toLocaleString()} kg Total</span>
                </div>
                <div className="data-item">
                  <span className="data-label">Build Grade</span>
                  <span className="data-val">{config.frameType}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="controls-section glass">
            <div className="step-header-complex">
              <span className="step-num">Step {currentStep}</span>
              <h2>{steps[currentStep].desc}</h2>
            </div>

            <div className="scrollable-controls">
              {currentStep === 0 && (
                <div className="control-set">
                   <div className="control-group">
                    <label>Select Your Base Configuration</label>
                    <div className="toggle-cards three-cols">
                      {[
                        { name: 'Heavy Rack', desc: 'Standard Industrial Storage' },
                        { name: 'Mezzanine', desc: 'Space Optimization Floor' },
                        { name: 'Slotted Angle', desc: 'Light-Weight Utility' },
                        { name: 'Mobile Rack', desc: 'High-Density Compactor' },
                        { name: 'Work Bench', desc: 'Industrial Grade Surface' },
                        { name: 'Cantilever', desc: 'Long Bar/Pipe Storage' }
                      ].map(p => (
                        <div 
                          key={p.name} 
                          className={`toggle-card ${config.type === p.name ? 'active' : ''}`}
                          onClick={() => setConfig({...config, type: p.name})}
                        >
                          <div className="check-mark"></div>
                          <h4>{p.name}</h4>
                          <p>{p.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="control-set">
                  <div className="control-group">
                    <label>Frame Duty Grade</label>
                    <div className="toggle-cards">
                      {['Light Duty', 'Heavy Duty'].map(type => (
                        <div 
                          key={type} 
                          className={`toggle-card ${config.frameType === type ? 'active' : ''}`}
                          onClick={() => setConfig({...config, frameType: type})}
                        >
                          <div className="check-mark"></div>
                          <h4>{type}</h4>
                          <p>{type === 'Heavy Duty' ? '3.5mm Steel - Industrial' : '2.0mm Steel - Commercial'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="control-group">
                    <label>Frame Height: {config.height}mm</label>
                    <div className="custom-range">
                      <input type="range" min="1200" max="2400" step="300" 
                        value={config.height} onChange={(e) => setConfig({...config, height: parseInt(e.target.value)})} />
                      <div className="range-marks">
                        <span>1.2m</span><span>1.5m</span><span>1.8m</span><span>2.1m</span><span>2.4m</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="control-set">
                  <div className="control-group">
                    <label>Adjust Shelf Count</label>
                    <div className="premium-counter">
                      <button onClick={() => setConfig({...config, shelfCount: Math.max(2, config.shelfCount - 1)})}>−</button>
                      <div className="counter-val">
                        <span className="big-num">{config.shelfCount}</span>
                        <span className="unit">Levels</span>
                      </div>
                      <button onClick={() => setConfig({...config, shelfCount: Math.min(8, config.shelfCount + 1)})}>+</button>
                    </div>
                  </div>
                  <div className="control-group">
                    <label>Load Capacity per Shelf</label>
                    <div className="chip-grid">
                      {[150, 250, 400, 600].map(load => (
                        <button 
                          key={load} 
                          className={`chip ${config.loadPerShelf === load ? 'active' : ''}`}
                          onClick={() => setConfig({...config, loadPerShelf: load})}
                        >
                          {load} kg
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="control-set">
                  <div className="control-group">
                    <label>Surface Finish (Powder Coated)</label>
                    <div className="color-palette">
                      {['Industrial Grey', 'Matte Black', 'Premium Orange', 'Steel Blue'].map(c => (
                        <div 
                          key={c}
                          className={`color-swatch ${config.finish === c ? 'active' : ''}`}
                          onClick={() => setConfig({...config, finish: c})}
                        >
                          <div className={`swatch-circle ${c.toLowerCase().replace(' ', '-')}`}></div>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="control-group">
                    <label>Back Panel Style</label>
                    <div className="panel-options">
                      {['Plain Metal', 'Perforated', 'Wire Mesh'].map(p => (
                        <div 
                          key={p}
                          className={`panel-opt ${config.panelType === p ? 'active' : ''}`}
                          onClick={() => setConfig({...config, panelType: p})}
                        >
                          <h4>{p}</h4>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="control-set">
                  <div className="control-group">
                    <label>Optional Accessories</label>
                    <div className="acc-list">
                      <div 
                        className={`acc-item ${config.accessories.sideGuards ? 'active' : ''}`}
                        onClick={() => setConfig({...config, accessories: {...config.accessories, sideGuards: !config.accessories.sideGuards}})}
                      >
                        <div className="acc-info">
                          <h4>Side Mesh Guards</h4>
                          <p>Prevents items from falling off the sides.</p>
                        </div>
                        <div className="price-tag-small">+ ₹1,500</div>
                      </div>
                      <div 
                        className={`acc-item ${config.accessories.labelHolders ? 'active' : ''}`}
                        onClick={() => setConfig({...config, accessories: {...config.accessories, labelHolders: !config.accessories.labelHolders}})}
                      >
                        <div className="acc-info">
                          <h4>Magnetic Label Holders</h4>
                          <p>Set of 10 for inventory management.</p>
                        </div>
                        <div className="price-tag-small">+ ₹600</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="review-set">
                  <div className="review-summary-card">
                    <h3>Final Configuration Review</h3>
                    <ul className="review-list">
                      <li><strong>Grade:</strong> {config.frameType} ({config.height}mm)</li>
                      <li><strong>Storage:</strong> {config.shelfCount} Shelves @ {config.loadPerShelf}kg/level</li>
                      <li><strong>Finish:</strong> {config.finish}</li>
                      <li><strong>Privacy:</strong> {config.panelType} Back</li>
                      <li><strong>Add-ons:</strong> {Object.entries(config.accessories).filter(([k,v]) => v).map(([k]) => k.replace(/([A-Z])/g, ' $1')).join(', ') || 'None'}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="footer-controls">
              <div className="price-display">
                <span className="total-label">Subtotal</span>
                <span className="total-price">₹{prices.total.toLocaleString('en-IN')}</span>
              </div>
              <div className="cta-group">
                {currentStep > 0 && <button className="btn btn-outline" onClick={handleBack}>Back</button>}
                {currentStep < 5 ? (
                  <button className="btn btn-primary" onClick={handleNext}>Next Step</button>
                ) : (
                  <button className="btn btn-secondary" onClick={() => {
                    localStorage.setItem('customConfig', JSON.stringify({
                      ...config,
                      totalPrice: prices.total
                    }));
                    navigate('/checkout');
                  }}>Complete Configuration &rarr;</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
