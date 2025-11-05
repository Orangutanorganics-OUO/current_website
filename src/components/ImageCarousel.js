import React, { useState, useEffect, useRef } from 'react';
import './ImageCarousel.css';

function ImageCarousel({ images, alt = 'Product image' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState(new Set([0]));
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    [nextIndex, prevIndex].forEach(index => {
      if (!loadedImages.has(index)) {
        const img = new Image();
        img.src = images[index];
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, index]));
        };
      }
    });
  }, [currentIndex, images, loadedImages]);

  const goToPrevious = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(slideIndex);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation();
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  return (
    <div className="carousel">
      <div
        className="carousel__container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.length > 1 && (
          <button
            className="carousel__button carousel__button--prev"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        <div className="carousel__image-container">
          <img
            src={images[currentIndex]}
            alt={`${alt} ${currentIndex + 1}`}
            className="carousel__image"
            loading="lazy"
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            className="carousel__button carousel__button--next"
            onClick={goToNext}
            aria-label="Next image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="carousel__dots">
          {images.map((_, slideIndex) => (
            <button
              key={slideIndex}
              className={`carousel__dot ${slideIndex === currentIndex ? 'active' : ''}`}
              onClick={(e) => goToSlide(slideIndex, e)}
              aria-label={`Go to image ${slideIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageCarousel;
