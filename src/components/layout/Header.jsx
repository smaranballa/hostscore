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
      <Link to="/" className="nav-logo">
        Host<span>Score</span>
      </Link>
      <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`} id="nav-links">
        <li>
          <Link 
            to="/" 
            className={isActive('/') ? 'active' : ''} 
            onClick={closeMenu}
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
          <Link 
            to="/audit" 
            className={isActive('/audit') ? 'active' : ''} 
            onClick={closeMenu}
          >
            Free Audit
          </Link>
        </li>
        <li>
          <a href="#pricing" onClick={closeMenu}>
            Pricing
          </a>
        </li>
        <li>
          <a href="#waitlist" className="nav-cta btn" onClick={closeMenu}>
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