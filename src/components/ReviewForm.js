import React, { useState, useRef, useEffect } from 'react';
import {
  HONEYPOT_FIELD_NAME,
  HONEYPOT_STYLE,
  isLikelySpam,
} from '../utils/spamGuard';
import './ReviewForm.css';

const W = {
  DEEP_FOREST:     '#03605C',
  DEEP_FOREST_DK:  '#024442',
  INK:             '#655F59',
  CREAM:           '#F8F3EB',
  CREAM_SOFT:      '#F1E7CE',
  PAPER:           '#F8F3EB',
  MEADOW_GOLD:     '#B5882D',
  SEAL_TERRACOTTA: '#D76427',
  SUCCESS:         '#3F7A3B',
  BURGUNDY:        '#95373A',
};

const scopedStyles = `
  .rvf, .rvf * { box-sizing: border-box; }
  .rvf {
    background: ${W.CREAM};
    border: 1px solid rgba(3,96,92,0.14);
    padding: 28px 30px 30px;
    margin-top: 24px;
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    color: ${W.INK};
  }
  .rvf__eyebrow {
    display: inline-block;
    background: ${W.DEEP_FOREST}; color: ${W.CREAM};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 5px 10px;
    margin-bottom: 10px;
  }
  .rvf__title {
    margin: 0 0 6px;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(22px, 2.6vw, 28px);
    color: ${W.DEEP_FOREST_DK}; font-weight: 700; line-height: 1.2;
  }
  .rvf__sub {
    margin: 0 0 20px;
    color: ${W.INK}; font-size: 14.5px; line-height: 1.6;
  }
  .rvf__row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    margin-bottom: 14px;
  }
  .rvf__field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .rvf__row .rvf__field { margin-bottom: 0; }
  .rvf__field label {
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    font-weight: 700; color: ${W.DEEP_FOREST};
  }
  .rvf__field input,
  .rvf__field select,
  .rvf__field textarea {
    background: ${W.PAPER};
    color: ${W.DEEP_FOREST_DK};
    border: 1.5px solid rgba(3,96,92,0.20);
    padding: 11px 13px;
    font-size: 15px;
    font-family: inherit;
    outline: none;
    transition: border-color 180ms ease, background 180ms ease;
  }
  .rvf__field textarea { resize: vertical; min-height: 120px; }
  .rvf__field input:focus,
  .rvf__field select:focus,
  .rvf__field textarea:focus {
    border-color: ${W.SEAL_TERRACOTTA};
    background: ${W.CREAM};
  }
  .rvf__field select {
    appearance: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23024442' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    background-size: 12px 8px;
    padding-right: 40px;
  }
  .rvf__msg {
    padding: 12px 14px;
    margin-bottom: 16px;
    font-size: 14px; line-height: 1.5;
    border-left: 3px solid;
  }
  .rvf__msg--success {
    background: rgba(63,122,59,0.10);
    border-color: ${W.SUCCESS};
    color: ${W.SUCCESS};
  }
  .rvf__msg--error {
    background: rgba(149,55,58,0.08);
    border-color: ${W.BURGUNDY};
    color: ${W.BURGUNDY};
  }
  .rvf__submit {
    background: ${W.DEEP_FOREST}; color: ${W.CREAM};
    border: 1.5px solid ${W.DEEP_FOREST};
    padding: 14px 28px;
    font-size: 12.5px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 700; cursor: pointer;
    font-family: inherit;
    transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;
  }
  .rvf__submit:hover:not(:disabled) {
    background: ${W.SEAL_TERRACOTTA}; border-color: ${W.SEAL_TERRACOTTA};
    transform: translateY(-1px);
  }
  .rvf__submit:disabled { opacity: 0.6; cursor: not-allowed; }
  .rvf__note {
    margin: 12px 0 0;
    font-size: 12px; color: ${W.INK}; opacity: 0.75;
    font-style: italic;
  }

  @media (max-width: 560px) {
    .rvf { padding: 22px 20px 24px; }
    .rvf__row { grid-template-columns: 1fr; gap: 0; }
    .rvf__row .rvf__field { margin-bottom: 14px; }
  }
`;

function ReviewForm({ productName, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    review: '',
    location: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const loadedAtRef = useRef(Date.now());
  useEffect(() => { loadedAtRef.current = Date.now(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (isLikelySpam(honeypot, loadedAtRef.current)) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', rating: 5, review: '', location: '' });
      setHoneypot('');
      setIsSubmitting(false);
      if (onSubmitSuccess) onSubmitSuccess();
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    try {
      const submissionData = {
        ...formData,
        product: productName,
        type: 'review',
        date: new Date().toISOString().split('T')[0],
        source: 'Website',
        display: 'No',
      };

      await fetch(process.env.REACT_APP_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwjKA5VJLyfN_HKzAuznTOeT-COY6AmtFqM8PW4zxumEPwJouB0cOlFZqrngqEsy4jP/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        rating: 5,
        review: '',
        location: '',
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

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
    <div className="rvf">
      <style>{scopedStyles}</style>
      <span className="rvf__eyebrow">Write a Review</span>
      <h3 className="rvf__title">Share your experience</h3>
      <p className="rvf__sub">Tell others what you thought of {productName}.</p>

      <form onSubmit={handleSubmit}>
        {/* Honeypot — hidden from users, catches dumb form-fill bots.
            Do NOT remove or rename without updating spamGuard.js. */}
        <div style={HONEYPOT_STYLE} aria-hidden="true">
          <label htmlFor={`${HONEYPOT_FIELD_NAME}-review`}>Website</label>
          <input
            type="text"
            id={`${HONEYPOT_FIELD_NAME}-review`}
            name={HONEYPOT_FIELD_NAME}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="rvf__row">
          <div className="rvf__field">
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

          <div className="rvf__field">
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

        <div className="rvf__row">
          <div className="rvf__field">
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

          <div className="rvf__field">
            <label htmlFor="rating">Rating *</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="5">5 Stars — Excellent</option>
              <option value="4">4 Stars — Very Good</option>
              <option value="3">3 Stars — Good</option>
              <option value="2">2 Stars — Fair</option>
              <option value="1">1 Star — Poor</option>
            </select>
          </div>
        </div>

        <div className="rvf__field">
          <label htmlFor="review">Your Review *</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Tell us about your experience with this product..."
          />
        </div>

        {submitStatus === 'success' && (
          <div className="rvf__msg rvf__msg--success">
            Thank you for your review! It will be published after approval.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="rvf__msg rvf__msg--error">
            Oops! Something went wrong. Please try again.
          </div>
        )}

        <button
          type="submit"
          className="rvf__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting…' : 'Submit Review'}
        </button>

        <p className="rvf__note">
          * Your review will be published after verification
        </p>
      </form>
    </div>
  );
}

export default ReviewForm;
