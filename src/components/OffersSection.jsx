import React, { useState, useEffect } from 'react';
import '../styles/OffersSection.css';

const OffersSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const offers = [
    {
      id: 1,
      title: "Luxury Sofa Set",
      price: "$999.99 (Was $1299.99)",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Premium 3-piece sofa set with top-grain leather and high-density foam cushions. Includes 3-seater sofa and two armchairs. Limited stock available."
    },
    {
      id: 2,
      title: "Dining Table Package",
      price: "$799.99 (Was $1099.99)",
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "6-piece dining set with extendable solid oak table (60\" to 84\") and 6 upholstered chairs. Includes free delivery and assembly."
    },
    {
      id: 3,
      title: "Bedroom Bundle",
      price: "$1499.99 (Was $1999.99)",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      description: "Complete bedroom set with king-size bed frame, two nightstands, and dresser. Solid wood construction with hand-rubbed finish."
    }
  ];

  const handleOfferClick = (offer) => {
    setSelectedOffer(offer);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  return (
    <section className="offers-section" id="offers-section">
      <div className="corner-decoration top-left"></div>
      <div className="corner-decoration bottom-right"></div>
      
      <div className="section-header">
        <h2>SPECIAL OFFERS</h2>
        <p className="subtitle">Limited time deals on our premium products</p>
        <div className="gold-line"></div>
      </div>

      <div className="offers-container">
        {offers.map((offer) => (
          <div 
            className="offer-card" 
            key={offer.id}
            onClick={() => handleOfferClick(offer)}
          >
            <div className="card-image-container">
              <img 
                src={offer.image} 
                alt={offer.title}
                className="card-image"
              />
            </div>
            <div className="card-content">
              <h3>{offer.title}</h3>
              <p className="price">{offer.price}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedOffer && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <div className="modal-image-container">
              <img 
                src={selectedOffer.image} 
                alt={selectedOffer.title}
                className="modal-image"
              />
            </div>
            <div className="modal-text-content">
              <h2>{selectedOffer.title}</h2>
              <p className="modal-price">{selectedOffer.price}</p>
              <p className="modal-description">{selectedOffer.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OffersSection;