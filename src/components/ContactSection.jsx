import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope,
  faPhone,
  faMapMarkerAlt 
} from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import '../styles/ContactSection.css';

const ContactSection = () => {
  return (
    <div className="section-background outdoor-background" id="contact-section">
      <div className="gallery-title">
        <h2>GET IN TOUCH</h2>
        <p>We'd love to hear from you</p>
      </div>
    
      <div className="contact-container">
        {/* Contact Information Container */}
        <div className="contact-box">
          <h3>CONTACT INFORMATION</h3>
          <div className="contact-details">
            <div className="contact-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
              <p>Quabrshmoun, Basatin Road, Mount lebanon, Lebanon</p>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <p>+961 3 986 878</p>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              <p>info@ghassanfurniture.com</p>
            </div>
          </div>
        </div>
        
        {/* Opening Hours Container */}
        <div className="contact-box">
          <h3>OPENING HOURS</h3>
          <div className="contact-details">
            <div className="contact-item">
              <FontAwesomeIcon icon={faClock} className="contact-icon" />
              <p>Monday - Saturday 9:00 AM - 7:00 PM</p>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faClock} className="contact-icon" />
              <p>Sunday Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;