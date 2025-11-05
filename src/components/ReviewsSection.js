import React, { useState, useEffect } from 'react';
import { fetchReviewsWithCache } from '../utils/fetchReviews';
import './ReviewsSection.css';

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviewsWithCache().then(data => {
      setReviews(data);
    }).catch(console.error);
  }, []);

  // Get featured reviews (mix of products) - 5-star ratings
  const featuredReviews = reviews.filter(r => r.rating === 5).slice(0, 6);

  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-header">
          <h2 className="reviews-title">What Our Customers Say</h2>
          <p className="reviews-subtitle">
            Real stories from people who trust Orangutan Organics for their daily nutrition
          </p>
        </div>

        <div className="reviews-grid">
          {featuredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        
        <div className="reviews-stats">
          <div className="stat-item">
            <div className="stat-value">4.9</div>
            <div className="stat-label">Average Rating</div>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="star filled">★</span>
              ))}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-value">1000+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">500+</div>
            <div className="stat-label">5-Star Reviews</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-customer">
          <div className="customer-avatar">
            {review.customer.charAt(0).toUpperCase()}
          </div>
          <div className="customer-info">
            <div className="customer-name">{review.customer}</div>
            <div className="customer-location">{review.location}</div>
          </div>
        </div>
        <div className="review-rating">
          {[...Array(review.rating)].map((_, i) => (
            <span key={i} className="star filled">★</span>
          ))}
        </div>
      </div>
      
      <p className="review-text">{review.review}</p>
      
      <div className="review-footer">
        <span className="review-product">{review.product}</span>
        <span className="review-source">{review.source}</span>
      </div>
    </div>
  );
}

export default ReviewsSection;