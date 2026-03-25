import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const basePath = import.meta.env.BASE_URL;

  const isHomePage = () => {
    return location.pathname === '/' || location.pathname === '';
  };

  const handlePricingClick = (e) => {
    e.preventDefault();
    closeMenu();
    
    if (!isHomePage()) {
      sessionStorage.setItem('scrollToPricing', 'true');
      window.location.href = basePath;
      return;
    }
    
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = (e) => {
    closeMenu();
    
    if (isHomePage()) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleWaitlistClick = (e) => {
    e.preventDefault();
    closeMenu();
    
    if (!isHomePage()) {
      sessionStorage.setItem('scrollToWaitlist', 'true');
      window.location.href = basePath;
      return;
    }
    
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo" onClick={handleHomeClick}>
        Host<span>Score</span>
      </Link>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} id="nav-links">
        <li>
          <Link 
            to="/" 
            className={isActive('/') ? 'active' : ''} 
            onClick={handleHomeClick}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            className={isActive('/contact') ? 'active' : ''} 
            onClick={closeMenu}
          >
            Contact
          </Link>
        </li>
        <li>
          <a href="#pricing" onClick={handlePricingClick}>
            Pricing
          </a>
        </li>
        <li>
          <a href="#waitlist" className="nav-cta btn" onClick={handleWaitlistClick}>
            Get early access
          </a>
        </li>
      </ul>
      <button 
        className="nav-mobile-toggle" 
        id="nav-toggle" 
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};

export default Header;