import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/GallerySection.css';

const GallerySection = ({ title, description, items = [], id }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const galleryScrollRef = useRef(null);
  const isScrollingRef = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const normalizeImagePath = (path) => {
    return path ? path.replace(/^\.\.\/\.\.\//, '/') : '';
  };

  const scrollToSection = (index) => {
    if (!galleryScrollRef.current || isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    const sectionWidth = galleryScrollRef.current.offsetWidth;
    galleryScrollRef.current.scrollTo({
      left: sectionWidth * index,
      behavior: 'smooth'
    });
    setCurrentIndex(index);
    
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 500);
  };

  const handleScroll = () => {
    if (!galleryScrollRef.current || isScrollingRef.current) return;
    
    const scrollLeft = galleryScrollRef.current.scrollLeft;
    const sectionWidth = galleryScrollRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / sectionWidth);
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchStartX.current - touchEndX.current) > 50) {
      if (touchStartX.current > touchEndX.current) {
        // Swiped left
        scrollToSection((currentIndex + 1) % Math.ceil(items.length / 4));
      } else {
        // Swiped right
        const newIndex = currentIndex === 0 ? Math.ceil(items.length / 4) - 1 : currentIndex - 1;
        scrollToSection(newIndex);
      }
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
    const galleryScroll = galleryScrollRef.current;
    if (!galleryScroll) return;

    galleryScroll.addEventListener('scroll', handleScroll);
    galleryScroll.addEventListener('touchstart', handleTouchStart, { passive: true });
    galleryScroll.addEventListener('touchmove', handleTouchMove, { passive: true });
    galleryScroll.addEventListener('touchend', handleTouchEnd);

    return () => {
      galleryScroll.removeEventListener('scroll', handleScroll);
      galleryScroll.removeEventListener('touchstart', handleTouchStart);
      galleryScroll.removeEventListener('touchmove', handleTouchMove);
      galleryScroll.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, items.length]);

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
    if (items.length === 0 || modalOpen) return;
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % Math.ceil(items.length / 4);
      scrollToSection(nextIndex);
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
        <div 
          className="gallery-scroll" 
          id={`${id}GalleryScroll`}
          ref={galleryScrollRef}
        >
          {[...Array(Math.ceil(items.length / 4))].map((_, pageIndex) => (
            <div className="gallery-page" key={`page-${pageIndex}`}>
              {[...Array(2)].map((_, rowIndex) => (
                <div className="gallery-row" key={`row-${rowIndex}`}>
                  {items.slice(pageIndex * 4 + rowIndex * 2, pageIndex * 4 + (rowIndex + 1) * 2).map((item, itemIndex) => {
                    const absoluteIndex = pageIndex * 4 + rowIndex * 2 + itemIndex;
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
          onClick={() => scrollToSection((currentIndex + 1) % Math.ceil(items.length / 4))}
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" color="black" />
        </div>

        <div 
          className="scroll-arrow left" 
          onClick={() => {
            const newIndex = currentIndex === 0 ? Math.ceil(items.length / 4) - 1 : currentIndex - 1;
            scrollToSection(newIndex);
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" color="black" />
        </div>
        
        <div className="dots-container">
          {[...Array(Math.ceil(items.length / 4))].map((_, index) => (
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