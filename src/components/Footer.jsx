import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">
            <img src="../assets/logo.png" alt="GHASSAN FURNITURE Logo" className="brand-logo" />
            <div className="brand-name">GHASSAN FURNITURE</div>
          </div>
          <div className="footer-copyright">
            <p className="designer-credit">Designed And Published By ECLIPTIX SOCIAL.</p>
          </div>
        </div>
        <div className="footer-center">
          <p>&copy; <span>{currentYear}</span> GHASSAN FURNITURE. All Rights Reserved.</p>
        </div>
        <div className="footer-social">
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
    </footer>
  );
};

export default Footer;