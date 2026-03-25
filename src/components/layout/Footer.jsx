import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { joinWaitlist } from '../../utils/forms';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await joinWaitlist(email, 'footer');
    if (success) {
      setIsSubmitted(true);
      setEmail('');
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-logo">
              Host<span>Score</span>
            </div>
            <p className="footer-tagline">
              The fastest way to find out what's costing you Airbnb bookings — and fix it.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Product</div>
            <ul className="footer-links">
              <li>
                <a 
                  href="#pricing" 
                  onClick={(e) => {
                    e.preventDefault();
                    const basePath = import.meta.env.BASE_URL;
                    const isHome = window.location.pathname === basePath || window.location.pathname === basePath.slice(0, -1);
                    if (!isHome) {
                      sessionStorage.setItem('scrollToPricing', 'true');
                      window.location.href = basePath;
                    } else {
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#waitlist" 
                  onClick={(e) => {
                    e.preventDefault();
                    const basePath = import.meta.env.BASE_URL;
                    const isHome = window.location.pathname === basePath || window.location.pathname === basePath.slice(0, -1);
                    if (!isHome) {
                      sessionStorage.setItem('scrollToWaitlist', 'true');
                      window.location.href = basePath;
                    } else {
                      document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Join waitlist
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy">Privacy policy</Link></li>
              <li><Link to="/terms">Terms of service</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Stay updated</div>
            <p style={{ fontSize: '13px', color: 'rgba(250,247,242,.45)', marginBottom: '12px', lineHeight: '1.6' }}>
              Get hosting tips and product updates in your inbox.
            </p>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  placeholder="Email address"
                  style={{
                    background: 'rgba(255,255,255,.07)',
                    borderColor: 'rgba(255,255,255,.15)',
                    color: 'var(--cream)',
                    fontSize: '13px',
                    padding: '9px 12px'
                  }}
                  required
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ padding: '9px 16px', fontSize: '13px' }}
                  disabled={isLoading}
                >
                  {isLoading ? '...' : '→'}
                </button>
              </form>
            ) : (
              <div 
                style={{
                  background: 'rgba(250,247,242,0.1)',
                  border: '1px solid rgba(250,247,242,0.25)',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  animation: 'successPulse 0.6s ease-out',
                  fontSize: '13px'
                }}
              >
                <div style={{fontWeight: '600', color: 'var(--cream)', marginBottom: '2px'}}>
                  Thanks for joining the waitlist!
                </div>
                <div style={{color: 'rgba(250,247,242,0.6)', fontSize: '12px'}}>
                  We will be in touch with you.
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2025 HostScore. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;