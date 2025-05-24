import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container') && 
          !event.target.closest('.mobile-menu-button')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  // Smooth scroll function with offset for fixed header
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('.top-bar')?.offsetHeight || 0;
      const offsetPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL without page reload
      window.history.pushState(null, null, `#${sectionId}`);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Navigation Bar - Now outside header-wrapper to stay sticky on entire page */}
      <div className={`top-bar ${scrolled ? 'scrolled' : ''}`} id="topBar">
        <div className="top-bar-content">
          <div className="mobile-header-row">
            <div className="logo-container">
              <img 
                src="../assets/logo.png"
                alt="Logo" 
                className="brand-logo" 
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ cursor: 'pointer' }}
              />
              <div className="brand-name"></div>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-button"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FontAwesomeIcon 
                icon={mobileMenuOpen ? faTimes : faBars} 
                className="mobile-menu-icon"
              />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul>
              <li>
                <a 
                  href="#indoor-section" 
                  onClick={(e) => scrollToSection(e, 'indoor-section')}
                >
                  INDOOR
                </a>
              </li>
              <li>
                <a 
                  href="#outdoor-section" 
                  onClick={(e) => scrollToSection(e, 'outdoor-section')}
                >
                  OUTDOORS
                </a>
              </li>
              <li>
                <a 
                  href="#accessories-section" 
                  onClick={(e) => scrollToSection(e, 'accessories-section')}
                >
                  HOME ACCESSORIES
                </a>
              </li>
              <li>
                <a 
                  href="#offers-section" 
                  onClick={(e) => scrollToSection(e, 'offers-section')}
                >
                  OFFERS
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Social Media Icons */}
          <div className="social-icons">
            <a href="https://instagram.com/ghassanfurniture" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
            <a href="https://facebook.com/ghassanfurniture1" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
            </a>
            <a href="https://tiktok.com/@ghassan.furniture" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} className="social-icon" />
            </a>
            <a href="https://wa.me/9613986878" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-container">
            <nav className="mobile-nav">
              <ul>
                <li>
                  <a 
                    href="#indoor-section" 
                    onClick={(e) => scrollToSection(e, 'indoor-section')}
                    className="mobile-nav-link"
                  >
                    INDOOR
                  </a>
                </li>
                <li>
                  <a 
                    href="#outdoor-section" 
                    onClick={(e) => scrollToSection(e, 'outdoor-section')}
                    className="mobile-nav-link"
                  >
                    OUTDOORS
                  </a>
                </li>
                <li>
                  <a 
                    href="#accessories-section" 
                    onClick={(e) => scrollToSection(e, 'accessories-section')}
                    className="mobile-nav-link"
                  >
                    HOME ACCESSORIES
                  </a>
                </li>
                <li>
                  <a 
                    href="#offers-section" 
                    onClick={(e) => scrollToSection(e, 'offers-section')}
                    className="mobile-nav-link"
                  >
                    OFFERS
                  </a>
                </li>
              </ul>
            </nav>
            <div className="mobile-social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="mobile-social-icon" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} className="mobile-social-icon" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTiktok} className="mobile-social-icon" />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} className="mobile-social-icon" />
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Content - Now inside header-wrapper but after the sticky top-bar */}
      <div className="header-wrapper">
        <div className="header-content">
          <h1>GHASSAN FURNITURE</h1>
          <p>Elegance and comfort for your living spaces</p>
          <a 
            href="#contact-section" 
            className="btn"
            onClick={(e) => scrollToSection(e, 'contact-section')}
          >
            Get In Touch
          </a>
        </div>
      </div>
      <div className='gradient'></div>
    </>
  );
};

export default Header;