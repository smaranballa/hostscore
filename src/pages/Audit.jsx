import React, { useState, useEffect } from 'react';
import { useAuditLogic } from '../hooks/useAuditLogic';
import '../styles/audit.css';

const Audit = () => {
  const {
    currentStep,
    formData,
    auditResults,
    isLoading,
    loadingStep,
    updateFormData,
    startAudit,
    fillSample,
    downloadPDF
  } = useAuditLogic();

  const [titleCount, setTitleCount] = useState(0);
  const [descCount, setDescCount] = useState(0);

  useEffect(() => {
    setTitleCount(formData.title.length);
    setDescCount(formData.desc.length);
  }, [formData.title, formData.desc]);

  const handleInputChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleAmenityChange = (amenity, checked) => {
    const newAmenities = checked 
      ? [...formData.amenities, amenity]
      : formData.amenities.filter(a => a !== amenity);
    updateFormData({ amenities: newAmenities });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startAudit();
  };

  const amenityOptions = [
    { value: 'wifi', label: 'Wifi' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'washer', label: 'Washer' },
    { value: 'dryer', label: 'Dryer' },
    { value: 'ac', label: 'Air conditioning' },
    { value: 'heating', label: 'Heating' },
    { value: 'workspace', label: 'Dedicated workspace' },
    { value: 'tv', label: 'TV' },
    { value: 'hair-dryer', label: 'Hair dryer' },
    { value: 'iron', label: 'Iron' },
    { value: 'pool', label: 'Pool' },
    { value: 'hot-tub', label: 'Hot tub' },
    { value: 'free-parking', label: 'Free parking' },
    { value: 'paid-parking', label: 'Paid parking' },
    { value: 'ev-charger', label: 'EV charger' },
    { value: 'self-checkin', label: 'Self check-in' },
    { value: 'gym', label: 'Gym' },
    { value: 'breakfast', label: 'Breakfast' }
  ];

  const loadingSteps = [
    'Fetching listing data',
    'Analyzing search visibility',
    'Scoring conversion factors',
    'Benchmarking vs competitors',
    'Generating recommendations'
  ];

  if (currentStep === 'loading') {
    return (
      <main className="audit-app">
        <section className="audit-step">
          <div className="audit-container">
            <div className="loading-card">
              <div className="loading-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
              </div>
              <h2>Analyzing your listing...</h2>
              <div className="loading-steps">
                {loadingSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`loading-step ${index <= loadingStep ? 'done' : ''}`}
                  >
                    <span className="step-check">✓</span>
                    <span className="step-text">{step}</span>
                  </div>
                ))}
              </div>
              <p className="loading-sub">This takes about 60 seconds. Don't close this tab.</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (currentStep === 'results' && auditResults) {
    return (
      <main className="audit-app">
        <section className="audit-step">
          <div className="audit-container">
            <div className="results-header">
              <div>
                <span className="section-label">Your audit report</span>
                <h2>Listing Analysis Complete</h2>
                <p className="lead">Overall score: <strong>{auditResults.scores.overall}/100</strong></p>
              </div>
              <div className="report-actions">
                <button className="btn btn-outline" onClick={downloadPDF}>Download PDF ↓</button>
                <a href="/#waitlist" className="btn btn-primary">Unlock full report →</a>
              </div>
            </div>

            <div className="results-grid">
              {/* Overall score card */}
              <div className="score-overview card">
                <div className="card-body">
                  <div className="score-circle-wrap">
                    <div className="score-circle">
                      <svg viewBox="0 0 100 100">
                        <circle className="score-bg" cx="50" cy="50" r="42" />
                        <circle 
                          className="score-fill" 
                          cx="50" 
                          cy="50" 
                          r="42"
                          style={{
                            strokeDasharray: `${2 * Math.PI * 42}`,
                            strokeDashoffset: `${2 * Math.PI * 42 - (auditResults.scores.overall / 100) * 2 * Math.PI * 42}`,
                            stroke: auditResults.scores.overall >= 70 ? 'var(--green)' : 
                                   auditResults.scores.overall >= 50 ? 'var(--amber)' : 'var(--red)'
                          }}
                        />
                      </svg>
                      <div className="score-value">{auditResults.scores.overall}</div>
                    </div>
                    <div className="score-label">Overall Score</div>
                  </div>
                  <div className="score-breakdown">
                    <div className="sb-item">
                      <span className="sb-label">Search visibility</span>
                      <span className={`sb-val ${auditResults.scores.visibility < 50 ? 'low' : 'fair'}`}>
                        {auditResults.scores.visibility}/100
                      </span>
                    </div>
                    <div className="sb-item">
                      <span className="sb-label">First impression</span>
                      <span className={`sb-val ${auditResults.scores.impression < 50 ? 'low' : 'fair'}`}>
                        {auditResults.scores.impression}/100
                      </span>
                    </div>
                    <div className="sb-item">
                      <span className="sb-label">Guest conversion</span>
                      <span className={`sb-val ${auditResults.scores.conversion < 50 ? 'low' : 'fair'}`}>
                        {auditResults.scores.conversion}/100
                      </span>
                    </div>
                    <div className="sb-item">
                      <span className="sb-label">Trust signals</span>
                      <span className={`sb-val ${auditResults.scores.trust < 50 ? 'low' : 'fair'}`}>
                        {auditResults.scores.trust}/100
                      </span>
                    </div>
                    <div className="sb-item">
                      <span className="sb-label">Competitive edge</span>
                      <span className={`sb-val ${auditResults.scores.competitive < 50 ? 'low' : 'fair'}`}>
                        {auditResults.scores.competitive}/100
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key findings */}
              <div className="findings-card card">
                <div className="card-body">
                  <h3 style={{marginBottom:'16px'}}>Priority fixes</h3>
                  <div className="findings-list">
                    {auditResults.findings.map((finding, index) => (
                      <div key={index} className={`finding-item ${finding.severity}`}>
                        <span className="finding-icon">!</span>
                        <div>
                          <strong>{finding.title}</strong>
                          <p>{finding.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rewritten copy preview */}
              <div className="copy-preview card">
                <div className="card-body">
                  <h3 style={{marginBottom:'16px'}}>Recommended copy</h3>
                  <div className="copy-section">
                    <div className="copy-label">
                      <span>Original title</span>
                      <span className="char-count">{formData.title.length} characters</span>
                    </div>
                    <div className="copy-text original">"{formData.title}"</div>
                  </div>
                  <div className="copy-section">
                    <div className="copy-label">
                      <span>Recommended title</span>
                      <span className="char-count good">{auditResults.rewritten.newTitle.length} characters</span>
                    </div>
                    <div className="copy-text recommended">{auditResults.rewritten.newTitle}</div>
                  </div>
                  <div className="copy-section">
                    <div className="copy-label">
                      <span>Recommended description opening</span>
                    </div>
                    <div className="copy-text recommended">{auditResults.rewritten.newDesc}</div>
                  </div>
                  <div className="copy-cta">
                    <p>Full rewritten description available in premium report</p>
                    <a href="/#waitlist" className="btn btn-primary">Get full copy →</a>
                  </div>
                </div>
              </div>

              {/* Amenities checklist */}
              <div className="amenities-card card">
                <div className="card-body">
                  <h3 style={{marginBottom:'16px'}}>Amenities gap analysis</h3>
                  <p style={{fontSize:'13px',color:'var(--muted)',marginBottom:'16px'}}>
                    Based on top-performing listings in your market
                  </p>
                  <div className="amenities-grid">
                    {formData.amenities.map(amenity => (
                      <div key={amenity} className="amenity-item has">
                        <span className="amenity-check">✓</span>
                        <span>{amenity.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                      </div>
                    ))}
                    {auditResults.missingAmenities.map(amenity => (
                      <div key={amenity} className="amenity-item missing">
                        <span className="amenity-check">!</span>
                        <span>{amenity.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action plan */}
              <div className="action-plan card">
                <div className="card-body">
                  <h3 style={{marginBottom:'16px'}}>Your action plan</h3>
                  <div className="plan-timeline">
                    <div className="plan-item">
                      <div className="plan-time">Now</div>
                      <div className="plan-content">
                        <strong>Update your title</strong>
                        <p>Add your top 3 filterable amenities. Expected impact: +15% CTR</p>
                      </div>
                    </div>
                    <div className="plan-item">
                      <div className="plan-time">Today</div>
                      <div className="plan-content">
                        <strong>Rewrite description opening</strong>
                        <p>Lead with what guests filter for. Expected impact: +22% conversion</p>
                      </div>
                    </div>
                    <div className="plan-item">
                      <div className="plan-time">This week</div>
                      <div className="plan-content">
                        <strong>Add missing amenities</strong>
                        <p>Install self check-in, add workspace photo. Expected impact: +10% bookings</p>
                      </div>
                    </div>
                    <div className="plan-item">
                      <div className="plan-time">This month</div>
                      <div className="plan-content">
                        <strong>Professional photos</strong>
                        <p>First 5 photos should match your top filters. Expected impact: +35% CTR</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Competitor benchmark */}
              <div className="competitor-card card">
                <div className="card-body">
                  <h3 style={{marginBottom:'16px'}}>How you compare</h3>
                  <p style={{fontSize:'13px',color:'var(--muted)',marginBottom:'16px'}}>
                    vs. top 10 similar listings in your market
                  </p>
                  <div className="comparison-bars">
                    <div className="comp-row">
                      <span className="comp-label">Your score</span>
                      <div className="comp-bar-wrap">
                        <div className="comp-bar yours" style={{width:`${auditResults.scores.overall}%`}}></div>
                      </div>
                      <span className="comp-val">{auditResults.scores.overall}</span>
                    </div>
                    <div className="comp-row">
                      <span className="comp-label">Market average</span>
                      <div className="comp-bar-wrap">
                        <div className="comp-bar avg" style={{width:'58%'}}></div>
                      </div>
                      <span className="comp-val">58</span>
                    </div>
                    <div className="comp-row">
                      <span className="comp-label">Top performer</span>
                      <div className="comp-bar-wrap">
                        <div className="comp-bar top" style={{width:'92%'}}></div>
                      </div>
                      <span className="comp-val">92</span>
                    </div>
                  </div>
                  <p className="comp-note">You're above average but missing key features that top performers have.</p>
                </div>
              </div>
            </div>

            {/* Upsell CTA */}
            <div className="results-cta card">
              <div className="card-body">
                <div className="results-cta-grid">
                  <div>
                    <h3>Unlock your full report</h3>
                    <p>Get the complete PDF with: fully rewritten description, amenities checklist, host bio draft, photo recommendations, and competitor analysis.</p>
                  </div>
                  <div>
                    <a href="/#waitlist" className="btn btn-primary btn-lg">Join waitlist for early access →</a>
                    <p style={{fontSize:'12px',color:'var(--muted)',marginTop:'8px'}}>First audit free · No credit card required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Input form (default step)
  return (
    <main className="audit-app">
      <section className="audit-step">
        <div className="audit-container">
          <div className="audit-header">
            <span className="section-label">Free audit tool</span>
            <h1>Enter your listing details</h1>
            <p className="lead">
              Paste your listing content and get a complete analysis of what's costing you bookings — and exactly how to fix it. No scraping, no signup required.
            </p>
          </div>

          <div className="listing-form-card card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-section">
                  <label htmlFor="lf-title">Your current title</label>
                  <input
                    type="text"
                    id="lf-title"
                    className="input"
                    placeholder="e.g., Charming apartment near city center"
                    maxLength="100"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                  <p className="input-hint">{titleCount} / 100 characters</p>
                </div>

                <div className="form-section" style={{marginTop:'20px'}}>
                  <label htmlFor="lf-desc">Your description (first 500 characters)</label>
                  <textarea
                    id="lf-desc"
                    className="input"
                    placeholder="Paste your listing description..."
                    maxLength="500"
                    rows="5"
                    value={formData.desc}
                    onChange={(e) => handleInputChange('desc', e.target.value)}
                    required
                  />
                  <p className="input-hint">{descCount} / 500 characters</p>
                </div>

                <div className="form-section" style={{marginTop:'20px'}}>
                  <label>Amenities you offer</label>
                  <p className="input-hint" style={{marginBottom:'10px'}}>Select all that apply</p>
                  <div className="amenities-select-grid">
                    {amenityOptions.map(amenity => (
                      <label key={amenity.value} className="amenity-checkbox">
                        <input
                          type="checkbox"
                          value={amenity.value}
                          checked={formData.amenities.includes(amenity.value)}
                          onChange={(e) => handleAmenityChange(amenity.value, e.target.checked)}
                        />
                        {amenity.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-section" style={{marginTop:'20px'}}>
                  <label htmlFor="lf-price">Nightly rate (USD)</label>
                  <input
                    type="number"
                    id="lf-price"
                    className="input"
                    placeholder="150"
                    min="1"
                    max="9999"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="form-section" style={{marginTop:'20px'}}>
                  <label htmlFor="lf-location">City/Region</label>
                  <input
                    type="text"
                    id="lf-location"
                    className="input"
                    placeholder="e.g., Barcelona, Spain"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg" 
                  style={{width:'100%',marginTop:'24px'}}
                  disabled={isLoading}
                >
                  {isLoading ? 'Analyzing...' : 'Analyze my listing →'}
                </button>
                <p className="input-hint" style={{textAlign:'center',marginTop:'12px'}}>
                  Takes ~60 seconds · Free · No credit card required
                </p>

                <div className="divider" style={{margin:'24px 0'}}></div>

                <p style={{fontSize:'13px',color:'var(--muted)',textAlign:'center'}}>Or try a sample audit:</p>
                <div className="sample-urls" style={{justifyContent:'center'}}>
                  <button type="button" onClick={() => fillSample('cottage')}>Cozy cottage</button>
                  <button type="button" onClick={() => fillSample('apartment')}>Modern apartment</button>
                  <button type="button" onClick={() => fillSample('villa')}>Beach villa</button>
                </div>
              </form>
            </div>
          </div>

          <div className="trust-signals">
            <div className="trust-item">
              <span className="trust-icon">⏱</span>
              <div>
                <strong>60 seconds</strong>
                <p>From input to full report</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✓</span>
              <div>
                <strong>400+ audits</strong>
                <p>Run for hosts globally</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <div>
                <strong>Private</strong>
                <p>Your data stays secure</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Audit;