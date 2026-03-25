import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { joinWaitlist } from '../../utils/forms';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await joinWaitlist(email, 'footer');
    if (success) {
      setIsSubmitted(true);
      setEmail('');
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
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#waitlist">Join waitlist</a></li>
              <li><Link to="/blog">Blog</Link></li>
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
              />
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ padding: '9px 16px', fontSize: '13px' }}
              >
                →
              </button>
            </form>
            {isSubmitted && (
              <div className="success-banner" style={{ marginTop: '8px', fontSize: '12px' }}>
                <span>✓</span> Subscribed!
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