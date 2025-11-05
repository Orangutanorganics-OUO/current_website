import React, { useState } from 'react';
import { trackLead } from '../utils/metaPixel';
import './Contact.css';
import { type } from '@testing-library/user-event/dist/type';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const GOOGLE_SCRIPT_URL = process.env.REACT_APP_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwjKA5VJLyfN_HKzAuznTOeT-COY6AmtFqM8PW4zxumEPwJouB0cOlFZqrngqEsy4jP/exec';

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          type:"contact"
        })
      });

      // With no-cors mode, we can't read the response, so we assume success
      setSubmitStatus('success');

      // Track lead event in Meta Pixel
      trackLead('contact');

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-subtitle">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-items">
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>Address</h3>
                <p>Village - Bhangeli,<br/>
Gangnani, Uttarkashi,<br/>
Uttarakhand-249135, India.</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <h3>Email</h3>
                <p>share@orangutanorganics.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📱</div>
              <div className="info-content">
                <h3>Phone</h3>
                <p>+91 9147715577</p>
                <p>+91 8617735816</p>
              </div>
            </div>

            
          </div>

          <div className="social-links">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com/profile.php?id=100085440072433#" target="_blank" rel="noopener" className="social-icon">Facebook</a>
              <a href="https://www.instagram.com/orangutan.organics/" target="_blank" rel="noopener" className="social-icon">Instagram</a>
              <a href="https://www.youtube.com/@orangutanorganics3277/videos" target="_blank" rel="noopener"className="social-icon">Youtube</a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send us a Message</h2>

          {submitStatus === 'success' && (
            <div className="alert alert--success">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="alert alert--error">
              Sorry, there was an error submitting your message. Please try again or email us directly.
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
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

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="What is this regarding?"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Tell us more about your inquiry..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--large btn--full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>What are your shipping charges?</h3>
            <p>Shipping charges are calculated based on your location and order weight at checkout.</p>
          </div>
          <div className="faq-item">
            <h3>Do you ship internationally?</h3>
            <p>Currently, we only ship within India. International shipping coming soon!</p>
          </div>
          <div className="faq-item">
            <h3>Are your products certified organic?</h3>
            <p>Yes, all our products are 100% organic and sourced directly from certified Himalayan farms.</p>
          </div>
          <div className="faq-item">
            <h3>What payment methods do you accept?</h3>
            <p>We accept prepaid payments via UPI, cards, and net banking, as well as Cash on Delivery (COD).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
