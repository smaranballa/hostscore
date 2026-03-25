import React, { useState, useEffect } from 'react';
import { joinWaitlist } from '../utils/forms';
import '../styles/home.css';

const Home = () => {
  const [heroEmail, setHeroEmail] = useState('');
  const [finalEmail, setFinalEmail] = useState('');
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [finalSubmitted, setFinalSubmitted] = useState(false);
  const [heroLoading, setHeroLoading] = useState(false);
  const [finalLoading, setFinalLoading] = useState(false);

  // Check for scroll flags when component mounts
  useEffect(() => {
    // Check if we need to scroll to pricing section
    if (sessionStorage.getItem('scrollToPricing') === 'true') {
      sessionStorage.removeItem('scrollToPricing');
      setTimeout(() => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    // Check if we need to scroll to waitlist section
    if (sessionStorage.getItem('scrollToWaitlist') === 'true') {
      sessionStorage.removeItem('scrollToWaitlist');
      setTimeout(() => {
        const waitlistSection = document.getElementById('waitlist');
        if (waitlistSection) {
          waitlistSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  // Reveal animation on scroll
  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { 
        if (e.isIntersecting) e.target.classList.add('visible'); 
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    setHeroLoading(true);
    
    const success = await joinWaitlist(heroEmail, 'hero');
    if (success) {
      setHeroSubmitted(true);
      setHeroEmail('');
      setHeroLoading(false);
    } else {
      setHeroLoading(false);
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setFinalLoading(true);
    
    const success = await joinWaitlist(finalEmail, 'final_cta');
    if (success) {
      setFinalSubmitted(true);
      setFinalEmail('');
      setFinalLoading(false);
    } else {
      setFinalLoading(false);
    }
  };

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb a"></div>
          <div className="hero-orb b"></div>
        </div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="badge badge-green reveal">Now in early access</div>
              <h1 className="reveal reveal-d1">Get more bookings.<br /><em>In 60 seconds.</em></h1>
              <p className="hero-sub reveal reveal-d2">
                Paste your Airbnb URL. HostScore finds exactly what's costing you clicks, ratings, and revenue — and rewrites it all for you. Your first audit is free.
              </p>
              {!heroSubmitted ? (
                <form className="input-group reveal reveal-d3" onSubmit={handleHeroSubmit}>
                  <input 
                    type="email" 
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
                    className="input" 
                    placeholder="Your email address"
                    required
                    disabled={heroLoading}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={heroLoading}
                  >
                    {heroLoading ? 'Joining...' : 'Join waitlist →'}
                  </button>
                </form>
              ) : (
                <div 
                  style={{
                    background: 'var(--sand)',
                    border: '1px solid var(--accent)',
                    padding: '20px 30px',
                    borderRadius: '12px',
                    animation: 'successPulse 0.6s ease-out',
                    textAlign: 'center'
                  }}
                >
                  <div style={{fontSize: '16px', fontWeight: '600', color: 'var(--ink)', marginBottom: '4px'}}>
                    Thanks for joining the waitlist!
                  </div>
                  <div style={{fontSize: '14px', color: 'var(--ink2)'}}>
                    We will be in touch with you.
                  </div>
                </div>
              )}
              <p className="hero-fine reveal">1 free audit · No credit card required · No sign-up friction</p>
              <div className="social-proof reveal">
                <div className="avatars">
                  <span style={{background:'#C4622D'}}>SL</span>
                  <span style={{background:'#2D6A4F'}}>MK</span>
                  <span style={{background:'#6B4F8A'}}>RJ</span>
                  <span style={{background:'#2B6CB0'}}>AB</span>
                </div>
                <p className="sp-text"><strong>400+ hosts</strong> already on the waitlist</p>
              </div>
            </div>

            {/* Floating audit card */}
            <div className="reveal reveal-d2">
              <div className="audit-card">
                <div className="audit-card-top">
                  <span className="audit-card-title">Listing audit report</span>
                  <span className="score-pill">71 / 100</span>
                </div>
                <div className="audit-card-body">
                  <div className="audit-row">
                    <span className="audit-lbl">Search visibility</span>
                    <div className="bar-wrap"><div className="bar-fill" style={{width:'35%',background:'#EF4444'}}></div></div>
                    <span className="audit-val" style={{color:'#B91C1C'}}>Low</span>
                  </div>
                  <div className="audit-row">
                    <span className="audit-lbl">First impression</span>
                    <div className="bar-wrap"><div className="bar-fill" style={{width:'62%',background:'#F59E0B'}}></div></div>
                    <span className="audit-val" style={{color:'#B45309'}}>Fair</span>
                  </div>
                  <div className="audit-row">
                    <span className="audit-lbl">Guest conversion</span>
                    <div className="bar-wrap"><div className="bar-fill" style={{width:'50%',background:'#F59E0B'}}></div></div>
                    <span className="audit-val" style={{color:'#B45309'}}>Weak</span>
                  </div>
                  <div className="audit-row">
                    <span className="audit-lbl">Trust signals</span>
                    <div className="bar-wrap"><div className="bar-fill" style={{width:'45%',background:'#F59E0B'}}></div></div>
                    <span className="audit-val" style={{color:'#B45309'}}>Partial</span>
                  </div>
                  <div className="audit-row">
                    <span className="audit-lbl">Competitive edge</span>
                    <div className="bar-wrap"><div className="bar-fill" style={{width:'28%',background:'#EF4444'}}></div></div>
                    <span className="audit-val" style={{color:'#B91C1C'}}>Low</span>
                  </div>
                  <div className="audit-row">
                    <span className="audit-lbl">Revenue potential</span>
                    <div className="bar-wrap"><div className="bar-fill" style={{width:'78%',background:'#2D6A4F'}}></div></div>
                    <span className="audit-val" style={{color:'#2D6A4F'}}>Strong</span>
                  </div>
                </div>
                <div className="audit-card-footer">
                  <span>Projected after fixes</span>
                  <strong>90 / 100 &nbsp;+19 pts</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            <div className="stat reveal">
              <div className="stat-val">8<span>M+</span></div>
              <div className="stat-lbl">Active Airbnb hosts globally</div>
            </div>
            <div className="stat reveal reveal-d1">
              <div className="stat-val">70<span>%</span></div>
              <div className="stat-lbl">Listings have fixable gaps</div>
            </div>
            <div className="stat reveal reveal-d2">
              <div className="stat-val">+22</div>
              <div className="stat-lbl">Average score improvement</div>
            </div>
            <div className="stat reveal reveal-d3">
              <div className="stat-val">47<span>m</span></div>
              <div className="stat-lbl">Average time to implement fixes</div>
            </div>
          </div>
        </div>
      </div>

      {/* SAMPLE REPORT */}
      <section className="section sample-section">
        <div className="container">
          <span className="section-label reveal">See it in action</span>
          <h2 className="reveal" style={{maxWidth:'540px'}}>This is what your listing<br />is costing you.</h2>
          <p className="section-sub reveal">Every listing gets a detailed audit across what actually drives bookings — search visibility, guest trust, conversion strength, and competitive position.</p>

          <div className="sample-grid">
            {/* Score card + features */}
            <div className="reveal">
              <div className="score-card">
                <div className="sc-head">
                  <div>
                    <div className="sc-title">Listing audit report</div>
                    <div className="sc-subtitle">Seaside Cottage · 2 guests</div>
                  </div>
                  <div className="sc-score-wrap">
                    <div className="sc-score-big">71<sub>/100</sub></div>
                    <div className="sc-score-status">Needs work</div>
                  </div>
                </div>
                <div className="sc-rows">
                  <div className="sc-row">
                    <span className="sc-lbl">Search visibility</span>
                    <div className="sc-bar"><div style={{width:'35%',background:'#EF4444'}}></div></div>
                    <span className="sc-val" style={{color:'#B91C1C'}}>Low</span>
                  </div>
                  <div className="sc-row">
                    <span className="sc-lbl">First impression</span>
                    <div className="sc-bar"><div style={{width:'62%',background:'#F59E0B'}}></div></div>
                    <span className="sc-val" style={{color:'#B45309'}}>Fair</span>
                  </div>
                  <div className="sc-row">
                    <span className="sc-lbl">Guest conversion</span>
                    <div className="sc-bar"><div style={{width:'50%',background:'#F59E0B'}}></div></div>
                    <span className="sc-val" style={{color:'#B45309'}}>Weak</span>
                  </div>
                  <div className="sc-row">
                    <span className="sc-lbl">Trust signals</span>
                    <div className="sc-bar"><div style={{width:'45%',background:'#F59E0B'}}></div></div>
                    <span className="sc-val" style={{color:'#B45309'}}>Partial</span>
                  </div>
                  <div className="sc-row">
                    <span className="sc-lbl">Competitive edge</span>
                    <div className="sc-bar"><div style={{width:'28%',background:'#EF4444'}}></div></div>
                    <span className="sc-val" style={{color:'#B91C1C'}}>Low</span>
                  </div>
                  <div className="sc-row">
                    <span className="sc-lbl">Revenue potential</span>
                    <div className="sc-bar"><div style={{width:'78%',background:'#2D6A4F'}}></div></div>
                    <span className="sc-val" style={{color:'#2D6A4F'}}>Strong</span>
                  </div>
                </div>
                <div className="sc-footer">
                  <span>Projected score after fixes</span>
                  <strong style={{color:'var(--accent)'}}>90 / 100 &nbsp;+19 pts</strong>
                </div>
              </div>

              <div className="report-includes card reveal">
                <div className="card-body">
                  <div className="ri-title">What the full report includes</div>
                  <ul className="ri-list">
                    <li>Scored audit across all booking drivers</li>
                    <li>Rewritten title &amp; description — copy-paste ready</li>
                    <li>Full amenities gap checklist</li>
                    <li>Host bio draft</li>
                    <li>Priority action plan, ranked by impact</li>
                    <li>Downloadable PDF report</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* PDF preview */}
            <div className="reveal reveal-d1">
              <div className="pdf-preview">
                <div className="pdf-topbar">
                  <div className="pdf-dots">
                    <span style={{background:'#EF4444'}}></span>
                    <span style={{background:'#F59E0B'}}></span>
                    <span style={{background:'#22C55E'}}></span>
                  </div>
                  <span className="pdf-filename">hostscore_report_seaside_cottage.pdf</span>
                  <span className="pdf-pages">6 pages</span>
                </div>
                <div className="pdf-body">
                  <div className="pdf-page-title">Airbnb Listing Audit Report</div>
                  <div className="pdf-page-sub">Seaside Cottage &nbsp;·&nbsp; Score: 71/100 &nbsp;·&nbsp; Generated today</div>

                  <div className="pdf-sh">Priority fixes</div>
                  <div className="pdf-finding">
                    <span className="pf-num" style={{color:'#EF4444'}}>1</span>
                    <span>Your listing is invisible in 60% of filtered searches</span>
                  </div>
                  <div className="pdf-finding">
                    <span className="pf-num" style={{color:'#EF4444'}}>2</span>
                    <span>First impression is losing guests before they read a word</span>
                  </div>
                  <div className="pdf-finding">
                    <span className="pf-num" style={{color:'#F59E0B'}}>3</span>
                    <span>Guests are leaving without booking — here's why &amp; how to fix it</span>
                  </div>

                  <div className="pdf-sh" style={{marginTop:'14px'}}>Rewritten title</div>
                  <div className="pdf-copy-block">
                    <div className="pdf-copy-label">Recommended · 47 characters</div>
                    <div className="pdf-copy-text">Charming Cottage Steps from the Sea · Private Garden</div>
                  </div>

                  <div className="pdf-sh" style={{marginTop:'14px'}}>Rewritten description</div>
                  <div className="pdf-copy-block">
                    <div className="pdf-copy-label">About this space · 420 words</div>
                    <div className="pdf-copy-text">Wake up to birdsong and the smell of fresh linen in this quietly exceptional cottage. Tucked away from the crowds yet minutes from everything…</div>
                  </div>

                  <div className="pdf-blur-rows">
                    <div style={{width:'100%'}}></div>
                    <div style={{width:'88%'}}></div>
                    <div style={{width:'95%'}}></div>
                    <div style={{width:'75%'}}></div>
                    <div style={{width:'90%'}}></div>
                    <div style={{width:'60%'}}></div>
                  </div>
                </div>
                <div className="pdf-overlay">
                  <a href="#waitlist" className="btn btn-primary">Get your free report →</a>
                  <p>No credit card · Takes 60 seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" style={{background:'var(--sand)'}}>
        <div className="container">
          <span className="section-label reveal">How it works</span>
          <h2 className="reveal">From URL to fully optimised<br />in under a minute.</h2>
          <p className="section-sub reveal">No forms to fill. No consultants to hire. Paste your listing and let HostScore do the work.</p>
          <div className="steps-grid">
            <div className="step-card card reveal">
              <div className="card-body">
                <div className="step-num">01</div>
                <h4>Paste your Airbnb URL</h4>
                <p>Drop in your listing link — no account needed to start. HostScore fetches everything and pulls in data from nearby competitors automatically. Your first full audit is free.</p>
              </div>
            </div>
            <div className="step-card card reveal reveal-d1">
              <div className="card-body">
                <div className="step-num">02</div>
                <h4>Get your scored audit</h4>
                <p>Your listing is scored across every factor that drives bookings — visibility, trust, conversion, and competitive strength. Specific findings, not vague advice, benchmarked against similar listings in your market.</p>
              </div>
            </div>
            <div className="step-card card reveal reveal-d2">
              <div className="card-body">
                <div className="step-num">03</div>
                <h4>Apply the fixes</h4>
                <p>We don't just diagnose — we fix. Rewritten copy, a full checklist, a host bio draft. Everything is copy-paste ready. Download your PDF report and implement in under an hour.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <span className="section-label reveal">Early results</span>
          <h2 className="reveal">Hosts who optimised<br />saw results fast.</h2>
          <div className="t-grid">
            <div className="t-card card reveal">
              <div className="card-body">
                <div className="t-stars">★★★★★</div>
                <p className="t-quote">"I went from 3 bookings a month to fully booked in 6 weeks. I had no idea how much I was leaving on the table."</p>
                <div className="t-author">
                  <div className="t-avatar" style={{background:'#C4622D'}}>SM</div>
                  <div>
                    <div className="t-name">Sarah M.</div>
                    <div className="t-loc">Airbnb host · Barcelona, Spain</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="t-card card reveal reveal-d1">
              <div className="card-body">
                <div className="t-stars">★★★★★</div>
                <p className="t-quote">"The report showed me guests were leaving before they even clicked. One change doubled my click-through rate. Insane."</p>
                <div className="t-author">
                  <div className="t-avatar" style={{background:'#2D6A4F'}}>JK</div>
                  <div>
                    <div className="t-name">James K.</div>
                    <div className="t-loc">Superhost · Chiang Mai, Thailand</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="t-card card reveal reveal-d2">
              <div className="card-body">
                <div className="t-stars">★★★★★</div>
                <p className="t-quote">"I manage 12 properties. Running all of them through HostScore took 2 hours and I found gaps in every single listing."</p>
                <div className="t-author">
                  <div className="t-avatar" style={{background:'#6B4F8A'}}>PR</div>
                  <div>
                    <div className="t-name">Priya R.</div>
                    <div className="t-loc">Property manager · Cape Town, South Africa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing" style={{background:'var(--sand)'}}>
        <div className="container">
          <span className="section-label reveal">Pricing</span>
          <h2 className="reveal">One extra booking pays<br />for a year of this.</h2>
          <p className="section-sub reveal">Start with one free audit — no credit card needed. Upgrade when you see results.</p>
          <div className="plans-grid">
            <div className="plan card reveal">
              <div className="card-body">
                <div className="plan-name">Free</div>
                <div className="plan-price">$0<sub>/month</sub></div>
                <div className="plan-desc">Try it with your first listing</div>
                <div className="plan-divider"></div>
                <ul className="plan-feats">
                  <li>1 audit — forever free</li>
                  <li>Scored report with key findings</li>
                  <li>Top 3 fixes highlighted</li>
                  <li className="no">Rewritten copy</li>
                  <li className="no">PDF download</li>
                  <li className="no">Competitor analysis</li>
                </ul>
                <a href="#waitlist" className="btn btn-outline" style={{width:'100%',justifyContent:'center'}}>Start free →</a>
              </div>
            </div>
            <div className="plan card reveal reveal-d1">
              <div className="card-body">
                <div className="plan-name">Starter</div>
                <div className="plan-price">$19<sub>/month</sub></div>
                <div className="plan-desc">For hosts with 1–2 properties</div>
                <div className="plan-divider"></div>
                <ul className="plan-feats">
                  <li>3 audits per month</li>
                  <li>Full rewritten title + description</li>
                  <li>Amenities gap checklist</li>
                  <li>PDF report download</li>
                  <li className="no">Competitor analysis</li>
                  <li className="no">Photo scoring</li>
                </ul>
                <a href="#waitlist" className="btn btn-outline" style={{width:'100%',justifyContent:'center'}}>Join waitlist</a>
              </div>
            </div>
            <div className="plan plan-featured card reveal reveal-d2">
              <div className="card-body">
                <div className="plan-badge badge badge-ink">Most popular</div>
                <div className="plan-name">Pro</div>
                <div className="plan-price">$49<sub>/month</sub></div>
                <div className="plan-desc">For serious hosts with 3–10 listings</div>
                <div className="plan-divider"></div>
                <ul className="plan-feats">
                  <li>Unlimited audits</li>
                  <li>Full rewritten title + description</li>
                  <li>Amenities gap checklist</li>
                  <li>PDF report download</li>
                  <li>Competitor analysis (5 nearby)</li>
                  <li>Pricing suggestions</li>
                </ul>
                <a href="#waitlist" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>Join waitlist</a>
              </div>
            </div>
            <div className="plan card reveal reveal-d3">
              <div className="card-body">
                <div className="plan-name">Agency</div>
                <div className="plan-price">$149<sub>/month</sub></div>
                <div className="plan-desc">For property managers + agencies</div>
                <div className="plan-divider"></div>
                <ul className="plan-feats">
                  <li>Unlimited audits</li>
                  <li>White-label PDF reports</li>
                  <li>All Pro features</li>
                  <li>Photo scoring</li>
                  <li>Multi-listing dashboard</li>
                  <li>Client report sharing</li>
                </ul>
                <a href="#waitlist" className="btn btn-outline" style={{width:'100%',justifyContent:'center'}}>Join waitlist</a>
              </div>
            </div>
          </div>
          <p className="pricing-note reveal">Not getting more bookings in 30 days on a paid plan? Full refund, no questions.</p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" id="waitlist">
        <div className="final-bg">
          <div className="final-orb a"></div>
          <div className="final-orb b"></div>
        </div>
        <div className="container" style={{position:'relative',textAlign:'center'}}>
          <h2 className="reveal" style={{color:'var(--cream)'}}>Your next booking<br />is one audit <em style={{color:'var(--accent2)'}}>away.</em></h2>
          <p className="reveal" style={{color:'rgba(250,247,242,.55)',fontSize:'16px',fontWeight:'300',maxWidth:'440px',margin:'16px auto 40px'}}>Join thousands of hosts who stopped guessing and started optimising. 60 seconds. Your first audit is completely free.</p>
          {!finalSubmitted ? (
            <form className="input-group reveal" onSubmit={handleFinalSubmit} style={{maxWidth:'420px',margin:'0 auto'}}>
              <input 
                type="email" 
                value={finalEmail}
                onChange={(e) => setFinalEmail(e.target.value)}
                className="input" 
                placeholder="Your email address" 
                style={{
                  background:'rgba(255,255,255,.1)',
                  borderColor:'rgba(255,255,255,.2)',
                  color:'var(--cream)'
                }}
                required
                disabled={finalLoading}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={finalLoading}
              >
                {finalLoading ? 'Joining...' : 'Get early access →'}
              </button>
            </form>
          ) : (
            <div 
              style={{
                maxWidth:'420px',
                margin:'12px auto 0',
                background: 'rgba(250,247,242,0.15)',
                border: '1px solid rgba(250,247,242,0.3)',
                padding: '20px 30px',
                borderRadius: '12px',
                animation: 'successPulse 0.6s ease-out',
                textAlign: 'center'
              }}
            >
              <div style={{fontSize: '16px', fontWeight: '600', color: 'var(--cream)', marginBottom: '4px'}}>
                Thanks for joining the waitlist!
              </div>
              <div style={{fontSize: '13px', color: 'rgba(250,247,242,0.7)'}}>
                We will be in touch with you.
              </div>
            </div>
          )}
          <p className="reveal" style={{fontSize:'12px',color:'rgba(250,247,242,.3)',marginTop:'14px'}}>No credit card required · First audit free · Cancel anytime</p>
        </div>
      </section>
    </div>
  );
};

export default Home;