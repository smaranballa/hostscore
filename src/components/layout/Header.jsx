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

  const handlePricingClick = (e) => {
    e.preventDefault();
    closeMenu();
    
    // If not on home page, navigate to home first then scroll
    if (location.pathname !== '/') {
      // Navigate to home page and then scroll to pricing
      window.location.href = '/';
      // Set a flag to scroll to pricing after navigation
      sessionStorage.setItem('scrollToPricing', 'true');
      return;
    }
    
    // Scroll to pricing section on home page
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = (e) => {
    closeMenu();
    
    // If already on home page, scroll to top
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // If on other page, let normal navigation happen (will scroll to top via ScrollToTop component)
  };

  const handleWaitlistClick = (e) => {
    e.preventDefault();
    closeMenu();
    
    // If not on home page, navigate to home first then scroll
    if (location.pathname !== '/') {
      // Navigate to home page and then scroll to waitlist
      window.location.href = '/';
      // Set a flag to scroll to waitlist after navigation
      sessionStorage.setItem('scrollToWaitlist', 'true');
      return;
    }
    
    // Scroll to waitlist section on home page
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