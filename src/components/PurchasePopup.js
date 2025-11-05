import React, { useState, useEffect } from 'react';
import { fetchReviewsWithCache, getRandomReview } from '../utils/fetchReviews';
import './PurchasePopup.css';

function PurchasePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews on mount
    fetchReviewsWithCache().then(setReviews).catch(console.error);
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;

    // Show popup after random delay (5-15 seconds)
    const initialDelay = Math.random() * 10000 + 5000;

    const initialTimer = setTimeout(() => {
      showRandomPopup();
    }, initialDelay);

    // Show popup periodically (every 20-30 seconds)
    const intervalTimer = setInterval(() => {
      showRandomPopup();
    }, Math.random() * 10000 + 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
    };
  }, [reviews]);

  const showRandomPopup = () => {
    if (reviews.length === 0) return;
    const review = getRandomReview(reviews);
    if (!review) return;
    const timeAgo = generateTimeAgo();

    setCurrentReview({ ...review, timeAgo });
    setIsVisible(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  };

  const generateTimeAgo = () => {
    const options = [
      '2 mins ago',
      '5 mins ago',
      '8 mins ago',
      '12 mins ago',
      '15 mins ago',
      '20 mins ago',
      'just now'
    ];
    return options[Math.floor(Math.random() * options.length)];
  };

  if (!currentReview || !isVisible) return null;

  return (
    <div className={`purchase-popup ${isVisible ? 'visible' : ''}`}>
      <button
        className="popup-close"
        onClick={() => setIsVisible(false)}
        aria-label="Close"
      >
        ✕
      </button>

      <div className="popup-content">
        <div className="popup-icon">🛒</div>
        <div className="popup-text">
          <strong>{currentReview.customer}</strong> from{' '}
          <strong>{currentReview.location}</strong>
          <div className="popup-action">
            ordered {currentReview.product}
          </div>
          <div className="popup-time">{currentReview.timeAgo}</div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePopup;
