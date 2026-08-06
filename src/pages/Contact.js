import React, { useState, useRef, useEffect } from 'react';
import { trackLead } from '../utils/metaPixel';
import {
  HONEYPOT_FIELD_NAME,
  HONEYPOT_STYLE,
  isLikelySpam,
} from '../utils/spamGuard';
import './Contact.css';

const W = {
  DEEP_FOREST:  '#03605C',
  INK:              '#655F59',
  SEAL_TERRACOTTA:  '#D76427',
  CREAM:            '#F8F3EB',
  MEADOW_GOLD:      '#B5882D',
  CREAM_SOFT:      '#F1E7CE',
  PAPER:           '#F8F3EB',
  DEEP_FOREST_DK:  '#024442',
  FOREST_SHADOW:   '#013532',
  GOLD_LINE:       '#B5882D',
  SUCCESS:         '#3F7A3B',
  ERROR:           '#95373A',
};

function WaveDivider({ height = 90, palette, flip = false }) {
  const layers = palette || [W.CREAM_SOFT];
  const style = { transform: flip ? 'scaleY(-1)' : 'none', display: 'block', width: '100%', height };
  return (
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true" focusable="false" style={style}>
      <path d="M0,32 C220,4 460,72 720,36 C980,0 1220,60 1440,28 L1440,100 L0,100 Z"
            fill={layers[0]} opacity="0.95"/>
      {layers[1] && (
        <path d="M0,52 C260,28 480,80 780,52 C1060,26 1260,72 1440,48 L1440,100 L0,100 Z"
              fill={layers[1]} opacity="0.65"/>
      )}
      <path d="M0,34 C220,6 460,74 720,38 C980,2 1220,62 1440,30"
            stroke={W.GOLD_LINE} strokeWidth="1.1" fill="none" opacity="0.45"/>
    </svg>
  );
}

const FAQS = [
  {
    q: 'What are your shipping charges?',
    a: 'Shipping charges are calculated based on your location and order weight at checkout.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Currently we only ship within India. International shipping coming soon.',
  },
  {
    q: 'Are your products certified organic?',
    a: 'Yes — all our products are 100% organic and sourced directly from certified Himalayan farms.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept prepaid payments via UPI, cards and net banking, as well as Cash on Delivery (COD).',
  },
];

const SOCIALS = [
  { label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=100085440072433#' },
  { label: 'Instagram', href: 'https://www.instagram.com/orangutan.organics/' },
  { label: 'YouTube',   href: 'https://www.youtube.com/@orangutanorganics3277/videos' },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const loadedAtRef = useRef(Date.now());
  useEffect(() => { loadedAtRef.current = Date.now(); }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.cnt-reveal, .cnt-reveal-group');
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-inview'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (isLikelySpam(honeypot, loadedAtRef.current)) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setHoneypot('');
      setIsSubmitting(false);
      return;
    }

    try {
      const GOOGLE_SCRIPT_URL = process.env.REACT_APP_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwjKA5VJLyfN_HKzAuznTOeT-COY6AmtFqM8PW4zxumEPwJouB0cOlFZqrngqEsy4jP/exec';

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          type: 'contact',
        }),
      });

      setSubmitStatus('success');
      trackLead('contact');

      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scopedStyles = `
    .cnt, .cnt * { box-sizing: border-box; }
    .cnt {
      background: ${W.CREAM};
      color: ${W.INK};
      font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
      overflow-x: hidden;
    }

    /* ---------- HERO ---------- */
    .cnt__hero {
      position: relative; background: ${W.CREAM};
      padding: 96px 28px 40px;
      text-align: center;
      overflow: hidden;
    }
    .cnt__hero-inner { max-width: 780px; margin: 0 auto; }
    .cnt__hero-eyebrow {
      display: inline-block;
      background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM};
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 700; padding: 7px 14px;
    }
    .cnt__title {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(36px, 5vw, 60px);
      line-height: 1.04; margin: 18px 0 12px;
      color: ${W.DEEP_FOREST};
      letter-spacing: -0.01em; font-weight: 700;
    }
    .cnt__title em { font-style: normal; color: ${W.SEAL_TERRACOTTA}; }
    .cnt__rule { display: block; width: 220px; max-width: 60%; height: 8px; margin: 4px auto 18px; }
    .cnt__sub {
      color: ${W.INK};
      font-size: clamp(15px, 1.4vw, 17px);
      line-height: 1.65;
      max-width: 640px;
      margin: 0 auto;
    }

    /* ---------- SECTIONS ---------- */
    .cnt-section { position: relative; padding: 72px 28px 88px; }
    .cnt-section__inner { max-width: 1200px; margin: 0 auto; }
    .cnt-eyebrow {
      display: inline-block;
      background: ${W.DEEP_FOREST}; color: ${W.CREAM};
      font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 700; padding: 6px 12px;
    }
    .cnt-h2 {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(24px, 2.8vw, 34px);
      color: ${W.DEEP_FOREST_DK};
      margin: 14px 0 12px; line-height: 1.15; font-weight: 700;
    }

    /* ---------- MAIN GRID ---------- */
    .cnt-main { background: ${W.CREAM_SOFT}; }
    .cnt-grid {
      display: grid; grid-template-columns: 1fr 1.2fr; gap: 44px;
      align-items: start;
    }

    /* ----- info column ----- */
    .cnt-info { display: flex; flex-direction: column; gap: 26px; }
    .cnt-info-items { display: flex; flex-direction: column; gap: 16px; }
    .cnt-info-card {
      background: ${W.CREAM};
      border: 1px solid rgba(3,96,92,0.12);
      padding: 20px 22px;
      display: flex; align-items: flex-start; gap: 16px;
    }
    .cnt-info-card__icon {
      flex: 0 0 auto;
      width: 44px; height: 44px;
      display: inline-flex; align-items: center; justify-content: center;
      background: ${W.DEEP_FOREST}; color: ${W.CREAM};
      border-radius: 50%;
    }
    .cnt-info-card__body h3 {
      margin: 0 0 4px;
      font-size: 11.5px; letter-spacing: 0.22em; text-transform: uppercase;
      color: ${W.DEEP_FOREST}; font-weight: 800;
    }
    .cnt-info-card__body p {
      margin: 0; font-size: 14.5px; line-height: 1.6; color: ${W.INK};
    }

    .cnt-socials { padding-top: 6px; }
    .cnt-socials h3 {
      margin: 0 0 10px;
      font-size: 11.5px; letter-spacing: 0.22em; text-transform: uppercase;
      font-weight: 800; color: ${W.DEEP_FOREST};
    }
    .cnt-socials__list { display: flex; flex-wrap: wrap; gap: 10px; }
    .cnt-social {
      display: inline-flex;
      background: ${W.CREAM};
      border: 1.5px solid ${W.DEEP_FOREST};
      color: ${W.DEEP_FOREST};
      text-decoration: none;
      padding: 10px 16px;
      font-size: 11.5px; letter-spacing: 0.22em; text-transform: uppercase;
      font-weight: 700;
      transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease;
    }
    .cnt-social:hover {
      background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM};
      border-color: ${W.SEAL_TERRACOTTA};
      transform: translateY(-1px);
    }

    /* ----- form column ----- */
    .cnt-form-card {
      background: ${W.CREAM};
      border: 1px solid rgba(3,96,92,0.14);
      padding: 30px 30px 32px;
    }
    .cnt-form-card h2 {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(22px, 2.4vw, 28px);
      color: ${W.DEEP_FOREST_DK};
      margin: 0 0 20px; line-height: 1.2; font-weight: 700;
    }
    .cnt-alert {
      padding: 12px 16px;
      margin-bottom: 18px;
      font-size: 14px; line-height: 1.5;
      border-left: 3px solid;
    }
    .cnt-alert--success {
      background: rgba(63,122,59,0.10);
      border-color: ${W.SUCCESS};
      color: ${W.SUCCESS};
    }
    .cnt-alert--error {
      background: rgba(149,55,58,0.08);
      border-color: ${W.ERROR};
      color: ${W.ERROR};
    }
    .cnt-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
    .cnt-field label {
      font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
      font-weight: 700; color: ${W.DEEP_FOREST};
    }
    .cnt-field input,
    .cnt-field textarea {
      background: ${W.PAPER};
      color: ${W.DEEP_FOREST_DK};
      border: 1.5px solid rgba(3,96,92,0.20);
      padding: 12px 14px;
      font-size: 15px;
      font-family: inherit;
      outline: none;
      transition: border-color 180ms ease, background 180ms ease;
    }
    .cnt-field textarea { resize: vertical; min-height: 130px; }
    .cnt-field input:focus,
    .cnt-field textarea:focus {
      border-color: ${W.SEAL_TERRACOTTA};
      background: ${W.CREAM};
    }
    .cnt-submit {
      width: 100%;
      background: ${W.DEEP_FOREST}; color: ${W.CREAM};
      border: 1.5px solid ${W.DEEP_FOREST};
      padding: 16px 24px;
      font-size: 13px; letter-spacing: 0.24em; text-transform: uppercase;
      font-weight: 700; cursor: pointer;
      transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease;
      margin-top: 6px;
    }
    .cnt-submit:hover:not(:disabled) {
      background: ${W.SEAL_TERRACOTTA}; border-color: ${W.SEAL_TERRACOTTA};
      transform: translateY(-1px);
    }
    .cnt-submit:disabled { opacity: 0.6; cursor: not-allowed; }

    /* ---------- FAQ ---------- */
    .cnt-faq { background: ${W.PAPER}; }
    .cnt-faq__head { text-align: center; margin-bottom: 32px; }
    .cnt-faq__grid {
      display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px;
    }
    .cnt-faq-item {
      background: ${W.CREAM_SOFT};
      border: 1px solid rgba(3,96,92,0.12);
      padding: 22px 22px 20px;
    }
    .cnt-faq-item h3 {
      margin: 0 0 8px;
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: 17px; color: ${W.DEEP_FOREST_DK}; font-weight: 700;
    }
    .cnt-faq-item p {
      margin: 0; font-size: 14.5px; line-height: 1.65; color: ${W.INK};
    }

    /* ---------- HERO ANIMATIONS ---------- */
    @keyframes cnt-hero-in {
      from { opacity: 0; transform: translate3d(0, 12px, 0); }
      to   { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    .cnt__hero-inner > * { animation: cnt-hero-in 720ms cubic-bezier(0.22, 0.7, 0.2, 1) both; }
    .cnt__hero-inner > *:nth-child(1) { animation-delay: 120ms; }
    .cnt__hero-inner > *:nth-child(2) { animation-delay: 240ms; }
    .cnt__hero-inner > *:nth-child(3) { animation-delay: 360ms; }
    .cnt__hero-inner > *:nth-child(4) { animation-delay: 480ms; }

    @keyframes cnt-rule-draw {
      from { stroke-dashoffset: 1000; }
      to   { stroke-dashoffset: 0; }
    }
    .cnt__rule path {
      stroke-dasharray: 1000; stroke-dashoffset: 1000;
      animation: cnt-rule-draw 1.6s cubic-bezier(0.4, 0.55, 0.2, 1) 800ms both;
    }

    /* ---------- REVEAL ---------- */
    .cnt-reveal {
      opacity: 0; transform: translate3d(0, 28px, 0);
      transition: opacity 900ms cubic-bezier(0.22, 0.7, 0.2, 1),
                  transform 900ms cubic-bezier(0.22, 0.7, 0.2, 1);
    }
    .cnt-reveal.is-inview { opacity: 1; transform: translate3d(0, 0, 0); }
    .cnt-reveal--from-left { transform: translate3d(-40px, 0, 0); }
    .cnt-reveal--from-left.is-inview { transform: translate3d(0, 0, 0); }
    .cnt-reveal--from-right { transform: translate3d(40px, 0, 0); }
    .cnt-reveal--from-right.is-inview { transform: translate3d(0, 0, 0); }
    .cnt-reveal-group > * {
      opacity: 0; transform: translate3d(0, 32px, 0) scale(0.96);
      transition: opacity 850ms cubic-bezier(0.22, 0.7, 0.2, 1),
                  transform 850ms cubic-bezier(0.22, 0.7, 0.2, 1);
    }
    .cnt-reveal-group.is-inview > * { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
    .cnt-reveal-group.is-inview > *:nth-child(1) { transition-delay:  60ms; }
    .cnt-reveal-group.is-inview > *:nth-child(2) { transition-delay: 140ms; }
    .cnt-reveal-group.is-inview > *:nth-child(3) { transition-delay: 220ms; }
    .cnt-reveal-group.is-inview > *:nth-child(4) { transition-delay: 300ms; }

    /* ---------- RESPONSIVE ---------- */
    @media (max-width: 960px) {
      .cnt-grid { grid-template-columns: 1fr; gap: 32px; }
      .cnt-faq__grid { grid-template-columns: 1fr; }
      .cnt-section { padding: 56px 24px 68px; }
    }
    @media (max-width: 560px) {
      .cnt__hero { padding: 64px 20px 28px; }
      .cnt-section { padding: 44px 18px 56px; }
      .cnt-form-card { padding: 24px 22px 26px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .cnt-reveal, .cnt-reveal-group > *,
      .cnt__hero-inner > *, .cnt__rule path {
        opacity: 1 !important; transform: none !important;
        transition: none !important; animation: none !important;
        stroke-dashoffset: 0 !important;
      }
    }
  `;

  return (
    <div className="cnt">
      <style>{scopedStyles}</style>

      {/* ============ HERO ============ */}
      <section className="cnt__hero">
        <div className="cnt__hero-inner">
          <span className="cnt__hero-eyebrow">Contact</span>
          <h1 className="cnt__title">
            Get in <em>touch</em>.
          </h1>
          <svg className="cnt__rule" viewBox="0 0 280 8" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path
              d="M0,4 C40,0 80,8 120,4 C160,0 200,7 240,4 C260,3 270,5 280,4"
              stroke={W.GOLD_LINE} strokeWidth="1.6" fill="none" strokeLinecap="round"
              pathLength="1000"
            />
          </svg>
          <p className="cnt__sub">
            Have questions? We&apos;d love to hear from you — send us a message and we&apos;ll respond as soon as we can.
          </p>
        </div>
      </section>

      <WaveDivider height={70} palette={[W.CREAM_SOFT]} />

      {/* ============ MAIN GRID ============ */}
      <section className="cnt-section cnt-main">
        <div className="cnt-section__inner">
          <div className="cnt-grid">
            {/* ----- info column ----- */}
            <aside className="cnt-info cnt-reveal cnt-reveal--from-left">
              <div>
                <span className="cnt-eyebrow">Reach Us</span>
                <h2 className="cnt-h2">Contact information</h2>
              </div>

              <div className="cnt-info-items">
                <div className="cnt-info-card">
                  <div className="cnt-info-card__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="cnt-info-card__body">
                    <h3>Address</h3>
                    <p>
                      Village - Bhangeli,<br/>
                      Gangnani, Uttarkashi,<br/>
                      Uttarakhand-249135, India.
                    </p>
                  </div>
                </div>

                <div className="cnt-info-card">
                  <div className="cnt-info-card__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="cnt-info-card__body">
                    <h3>Email</h3>
                    <p>share@orangutanorganics.com</p>
                  </div>
                </div>

                <div className="cnt-info-card">
                  <div className="cnt-info-card__icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="cnt-info-card__body">
                    <h3>Phone</h3>
                    <p>+91 9147715577</p>
                    <p>+91 8334980100</p>
                  </div>
                </div>
              </div>

              <div className="cnt-socials">
                <h3>Follow Us</h3>
                <div className="cnt-socials__list">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="cnt-social"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            {/* ----- form column ----- */}
            <form className="cnt-form-card cnt-reveal cnt-reveal--from-right" onSubmit={handleSubmit}>
              {/* Honeypot — hidden from users, catches dumb form-fill bots.
                  Do NOT remove or rename without updating spamGuard.js. */}
              <div style={HONEYPOT_STYLE} aria-hidden="true">
                <label htmlFor={HONEYPOT_FIELD_NAME}>Website</label>
                <input
                  type="text"
                  id={HONEYPOT_FIELD_NAME}
                  name={HONEYPOT_FIELD_NAME}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <h2>Send us a message</h2>

              {submitStatus === 'success' && (
                <div className="cnt-alert cnt-alert--success">
                  Thank you for your message! We&apos;ll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="cnt-alert cnt-alert--error">
                  Sorry, there was an error submitting your message. Please try again or email us directly.
                </div>
              )}

              <div className="cnt-field">
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

              <div className="cnt-field">
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

              <div className="cnt-field">
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

              <div className="cnt-field">
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

              <div className="cnt-field">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="cnt-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <WaveDivider height={80} palette={[W.PAPER, W.CREAM_SOFT]} flip />

      {/* ============ FAQ ============ */}
      <section className="cnt-section cnt-faq">
        <div className="cnt-section__inner">
          <div className="cnt-faq__head">
            <span className="cnt-eyebrow cnt-reveal">FAQ</span>
            <h2 className="cnt-h2 cnt-reveal">Frequently asked questions</h2>
          </div>
          <div className="cnt-faq__grid cnt-reveal-group">
            {FAQS.map((f) => (
              <div key={f.q} className="cnt-faq-item">
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
