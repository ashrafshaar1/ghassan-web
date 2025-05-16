import React, { useState, useEffect } from 'react';
import '../styles/OffersSection.css';

const OffersSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const offers = [
    {
      id: 1,
      title: "Luxury Set",
      price: "1999$ (Was 2450$)",
      image: "../assets/Offers/offer 1.JPEG",
      description: "Master bedroom with a drossoire and a commode, Salon, dining table with 6 chairs."
    },
    {
      id: 2,
      title: "Classy Package",
      price: "999$ (Was 1380$)",
      image: "../assets/Offers/offer 2.JPEG",
      description: "Bedroom with drossoire and a closet, Living room, Table set, Center table and Mattress."
    },
    {
      id: 3,
      title: "Booming Bundle",
      price: "399$ (Was 715$)",
      image: "../assets/Offers/offer 3.JPEG",
      description: "4-seats outdoor ratin dining set with a table and costumisable fabric color, Single seats outdoor swing, Wicker roking chair, 6 Ratin chairs and a foldable table."
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