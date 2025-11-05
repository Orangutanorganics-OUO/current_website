import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm({ productName, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    review: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const submissionData = {
        ...formData,
        product: productName,
        type: "review",
        date: new Date().toISOString().split('T')[0],
        source: 'Website',
        display: 'No' // Default to No, admin will approve
      };

      const response = await fetch(process.env.REACT_APP_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwjKA5VJLyfN_HKzAuznTOeT-COY6AmtFqM8PW4zxumEPwJouB0cOlFZqrngqEsy4jP/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      // Since mode is no-cors, we assume success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        rating: 5,
        review: '',
        location: ''
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);

    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form">
      <h3 className="review-form__title">Write a Review</h3>
      <p className="review-form__subtitle">Share your experience with {productName}</p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rating">Rating *</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="5">5 Stars - Excellent</option>
              <option value="4">4 Stars - Very Good</option>
              <option value="3">3 Stars - Good</option>
              <option value="2">2 Stars - Fair</option>
              <option value="1">1 Star - Poor</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="review">Your Review *</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Tell us about your experience with this product..."
          ></textarea>
        </div>

        {submitStatus === 'success' && (
          <div className="form-message form-message--success">
            Thank you for your review! It will be published after approval.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="form-message form-message--error">
            Oops! Something went wrong. Please try again.
          </div>
        )}

        <button
          type="submit"
          className="btn btn--primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>

        <p className="review-form__note">
          * Your review will be published after verification
        </p>
      </form>
    </div>
  );
}

export default ReviewForm;
