import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/GallerySection.css';

const GallerySection = ({ title, description, items = [], id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const normalizeImagePath = (path) => {
    return path ? path.replace(/^\.\.\/\.\.\//, '/') : '';
  };

  const scrollToSection = (index) => {
    const galleryScroll = document.getElementById(`${id}GalleryScroll`);
    if (galleryScroll) {
      const sectionWidth = galleryScroll.offsetWidth;
      galleryScroll.scrollTo({
        left: sectionWidth * index,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const openModal = (item, index) => {
    if (!item) return;
    setSelectedItem(item);
    setSelectedItemIndex(index);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
    
    setTimeout(() => {
      const modal = document.querySelector('.modal');
      if (modal) modal.classList.add('open');
    }, 10);
  };

  const closeModal = () => {
    const modal = document.querySelector('.modal');
    if (modal) modal.classList.remove('open');
    
    setTimeout(() => {
      setModalOpen(false);
      document.body.style.overflow = "auto";
    }, 300);
  };

  const navigateModal = (direction) => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = selectedItemIndex > 0 ? selectedItemIndex - 1 : items.length - 1;
    } else {
      newIndex = selectedItemIndex < items.length - 1 ? selectedItemIndex + 1 : 0;
    }
    setSelectedItem(items[newIndex]);
    setSelectedItemIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (modalOpen) {
        if (e.key === 'ArrowLeft') navigateModal('prev');
        if (e.key === 'ArrowRight') navigateModal('next');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, items, modalOpen]);

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(() => {
      if (!modalOpen) {
        const nextIndex = (currentIndex + 1) % Math.ceil(items.length / 8);
        scrollToSection(nextIndex);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, items.length, modalOpen]);

  if (!items || items.length === 0) {
    return <div className={`section-background ${id}-background`}>No items to display</div>;
  }

  return (
    <div className={`section-background ${id}-background`} id={`${id}-section`}>
      <div className="gallery-title">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      
      <div className="gallery-container">
        <div className="gallery-scroll" id={`${id}GalleryScroll`}>
          {[...Array(Math.ceil(items.length / 8))].map((_, pageIndex) => (
            <div className="gallery-page" key={`page-${pageIndex}`}>
              {[...Array(2)].map((_, rowIndex) => (
                <div className="gallery-row" key={`row-${rowIndex}`}>
                  {items.slice(pageIndex * 8 + rowIndex * 4, pageIndex * 8 + (rowIndex + 1) * 4).map((item, itemIndex) => {
                    const absoluteIndex = pageIndex * 8 + rowIndex * 4 + itemIndex;
                    const normalizedImage = normalizeImagePath(item.image);
                    return (
                      <div 
                        className="gallery-item"
                        key={`item-${pageIndex}-${rowIndex}-${itemIndex}`}
                        onClick={() => openModal(item, absoluteIndex)}
                      >
                        <div className="item-image-container">
                          {normalizedImage && (
                            <img 
                              src={normalizedImage} 
                              alt={item.title || 'Gallery item'} 
                              className="item-image"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                console.error('Failed to load image:', normalizedImage);
                              }}
                            />
                          )}
                        </div>
                        <div className="item-info">
                          <h3 className="item-title">{item.title}</h3>
                          <div className="item-price">{item.price}</div>
                          <p className="item-description">{item.shortDescription}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
        
        <div 
          className="scroll-arrow right" 
          onClick={() => scrollToSection((currentIndex + 1) % Math.ceil(items.length / 8))}
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" color="black" />
        </div>
        
        <div className="dots-container">
          {[...Array(Math.ceil(items.length / 8))].map((_, index) => (
            <div 
              key={`dot-${index}`}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => scrollToSection(index)}
            ></div>
          ))}
        </div>
      </div>

      {modalOpen && selectedItem && (
        <div className={`modal ${modalOpen ? 'open' : ''}`} onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <div className="modal-header">
              <h2 className="modal-title">{selectedItem.title}</h2>
              <div className="modal-price">{selectedItem.price}</div>
            </div>
            
            <div className="modal-body">
              <div className="modal-image-container">
                {selectedItem.image && (
                  <img 
                    src={normalizeImagePath(selectedItem.image)} 
                    alt={selectedItem.title} 
                    className="modal-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      console.error('Failed to load modal image:', selectedItem.image);
                    }}
                  />
                )}
              </div>
              <p className="modal-description">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;