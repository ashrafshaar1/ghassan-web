import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '../styles/Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  };

  return (
    <div className="header-wrapper">
      {/* Top Navigation Bar */}
      <div className={`top-bar ${scrolled ? 'scrolled' : ''}`} id="topBar">
        <div className="top-bar-content">
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
            <div className="brand-name">GHASSAN FURNITURE</div>
          </div>
          
          {/* Main Navigation */}
          <nav>
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
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className="social-icon" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTiktok} className="social-icon" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} className="social-icon" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Hero Content */}
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
  );
};

export default Header;