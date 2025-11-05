import React from 'react';
import './StarRating.css';

function StarRating({ rating, totalReviews, showCount = true, size = 'medium' }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(
        <span key={i} className="star star--full">★</span>
      );
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <span key={i} className="star star--half">★</span>
      );
    } else {
      stars.push(
        <span key={i} className="star star--empty">★</span>
      );
    }
  }

  return (
    <div className={`star-rating star-rating--${size}`}>
      <div className="star-rating__stars">
        {stars}
      </div>
      {showCount && totalReviews > 0 && (
        <span className="star-rating__count">
          {rating.toFixed(1)} ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
}

export default StarRating;
