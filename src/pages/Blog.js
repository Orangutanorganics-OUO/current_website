import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../utils/blogData';
import './Blog.css';

const W = {
  BRAND_TEAL:   '#5D9C9D',
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

function Blog() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.blg-reveal, .blg-reveal-group');
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
      // threshold: 0 — a tall .wtn-reveal-group (many cards in 1-col
      // mobile) caps its own intersectionRatio below 0.12, so a
      // 0.12 threshold would never fire. Trigger as soon as any
      // part enters the rootMargin-trimmed viewport.
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scopedStyles = `
    .blg, .blg * { box-sizing: border-box; }
    .blg {
      background: ${W.CREAM};
      color: ${W.INK};
      font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
      overflow-x: hidden;
    }

    /* ---------- HERO ---------- */
    .blg__hero {
      position: relative; background: ${W.CREAM};
      padding: 96px 28px 40px;
      text-align: center;
      overflow: hidden;
    }
    .blg__hero-inner { max-width: 780px; margin: 0 auto; }
    .blg__hero-eyebrow {
      display: inline-block;
      background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM};
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 700; padding: 7px 14px;
    }
    .blg__title {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(36px, 5vw, 60px);
      line-height: 1.04; margin: 18px 0 12px;
      color: ${W.DEEP_FOREST};
      letter-spacing: -0.01em; font-weight: 700;
    }
    .blg__title em { font-style: normal; color: ${W.SEAL_TERRACOTTA}; }
    .blg__rule { display: block; width: 220px; max-width: 60%; height: 8px; margin: 4px auto 18px; }
    .blg__sub {
      color: ${W.INK};
      font-size: clamp(15px, 1.4vw, 17px);
      line-height: 1.65;
      max-width: 640px;
      margin: 0 auto;
    }

    /* ---------- GRID ---------- */
    .blg-section { position: relative; padding: 72px 28px 88px; }
    .blg-section__inner { max-width: 1240px; margin: 0 auto; }
    .blg-grid { background: ${W.CREAM_SOFT}; }
    .blg-grid__cards {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px;
    }
    .blg-card {
      background: ${W.CREAM};
      text-decoration: none;
      color: ${W.INK};
      display: flex; flex-direction: column;
      border: 1px solid rgba(3,96,92,0.10);
      overflow: hidden;
      transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
    }
    .blg-card:hover {
      transform: translateY(-4px);
      border-color: ${W.MEADOW_GOLD};
      box-shadow: 0 12px 26px rgba(1,53,50,0.10);
    }
    .blg-card__image {
      position: relative;
      aspect-ratio: 4/3;
      overflow: hidden;
      background: ${W.CREAM_SOFT};
    }
    .blg-card__image img {
      display: block; width: 100%; height: 100%; object-fit: cover;
      transition: transform 500ms cubic-bezier(0.22, 0.7, 0.2, 1);
    }
    .blg-card:hover .blg-card__image img { transform: scale(1.04); }
    .blg-card__category {
      position: absolute; top: 14px; left: 14px;
      background: ${W.DEEP_FOREST}; color: ${W.CREAM};
      font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase;
      font-weight: 700; padding: 5px 10px;
    }
    .blg-card__content {
      padding: 20px 22px 22px;
      display: flex; flex-direction: column; gap: 10px;
      flex: 1;
    }
    .blg-card__meta {
      display: flex; align-items: center; gap: 8px;
      font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase;
      font-weight: 700; color: ${W.MEADOW_GOLD};
    }
    .blg-card__meta span { line-height: 1; }
    .blg-card__title {
      margin: 4px 0 0;
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: 20px; line-height: 1.3; font-weight: 700;
      color: ${W.DEEP_FOREST_DK};
    }
    .blg-card__excerpt {
      margin: 0; font-size: 14.5px; line-height: 1.65;
      color: ${W.INK}; opacity: 0.85;
    }
    .blg-card__link {
      margin-top: auto; padding-top: 10px;
      font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
      font-weight: 700; color: ${W.SEAL_TERRACOTTA};
      border-top: 1px dashed rgba(3,96,92,0.18);
    }

    /* ---------- NEWSLETTER CTA ---------- */
    .blg-cta-band { background: ${W.DEEP_FOREST_DK}; color: ${W.CREAM}; }
    .blg-cta {
      text-align: center;
      padding: 64px 28px 80px;
    }
    .blg-cta__inner { max-width: 640px; margin: 0 auto; }
    .blg-cta__eyebrow {
      display: inline-block;
      background: ${W.MEADOW_GOLD}; color: ${W.FOREST_SHADOW};
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 800; padding: 6px 12px;
    }
    .blg-cta h2 {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(26px, 3vw, 36px);
      margin: 14px 0 12px; color: ${W.CREAM}; line-height: 1.2;
    }
    .blg-cta p {
      font-size: 15.5px; opacity: 0.9; margin: 0 0 26px; color: ${W.CREAM};
    }
    .blg-news-form {
      display: flex; gap: 10px; max-width: 460px; margin: 0 auto;
      flex-wrap: wrap; justify-content: center;
    }
    .blg-news-input {
      flex: 1 1 220px;
      background: ${W.CREAM};
      color: ${W.DEEP_FOREST_DK};
      border: 1.5px solid ${W.MEADOW_GOLD};
      padding: 14px 16px;
      font-size: 14px;
      font-family: inherit;
      outline: none;
    }
    .blg-news-input:focus { border-color: ${W.SEAL_TERRACOTTA}; }
    .blg-news-btn {
      background: ${W.MEADOW_GOLD}; color: ${W.FOREST_SHADOW};
      border: 1.5px solid ${W.MEADOW_GOLD};
      padding: 14px 22px;
      font-size: 12.5px; letter-spacing: 0.24em; text-transform: uppercase;
      font-weight: 700; cursor: pointer;
      transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease;
    }
    .blg-news-btn:hover {
      background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM}; border-color: ${W.SEAL_TERRACOTTA};
      transform: translateY(-1px);
    }

    /* ---------- HERO ANIMATIONS ---------- */
    @keyframes blg-hero-in {
      from { opacity: 0; transform: translate3d(0, 12px, 0); }
      to   { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    .blg__hero-inner > * { animation: blg-hero-in 720ms cubic-bezier(0.22, 0.7, 0.2, 1) both; }
    .blg__hero-inner > *:nth-child(1) { animation-delay: 120ms; }
    .blg__hero-inner > *:nth-child(2) { animation-delay: 240ms; }
    .blg__hero-inner > *:nth-child(3) { animation-delay: 360ms; }
    .blg__hero-inner > *:nth-child(4) { animation-delay: 480ms; }

    @keyframes blg-rule-draw {
      from { stroke-dashoffset: 1000; }
      to   { stroke-dashoffset: 0; }
    }
    .blg__rule path {
      stroke-dasharray: 1000; stroke-dashoffset: 1000;
      animation: blg-rule-draw 1.6s cubic-bezier(0.4, 0.55, 0.2, 1) 800ms both;
    }

    /* ---------- REVEAL ---------- */
    .blg-reveal {
      opacity: 0; transform: translate3d(0, 28px, 0);
      transition: opacity 900ms cubic-bezier(0.22, 0.7, 0.2, 1),
                  transform 900ms cubic-bezier(0.22, 0.7, 0.2, 1);
    }
    .blg-reveal.is-inview { opacity: 1; transform: translate3d(0, 0, 0); }
    .blg-reveal-group > * {
      opacity: 0; transform: translate3d(0, 32px, 0) scale(0.96);
      transition: opacity 850ms cubic-bezier(0.22, 0.7, 0.2, 1),
                  transform 850ms cubic-bezier(0.22, 0.7, 0.2, 1);
    }
    .blg-reveal-group.is-inview > * { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
    .blg-reveal-group.is-inview > *:nth-child(1) { transition-delay:  60ms; }
    .blg-reveal-group.is-inview > *:nth-child(2) { transition-delay: 140ms; }
    .blg-reveal-group.is-inview > *:nth-child(3) { transition-delay: 220ms; }
    .blg-reveal-group.is-inview > *:nth-child(4) { transition-delay: 300ms; }
    .blg-reveal-group.is-inview > *:nth-child(5) { transition-delay: 380ms; }
    .blg-reveal-group.is-inview > *:nth-child(6) { transition-delay: 460ms; }

    /* ---------- RESPONSIVE ---------- */
    @media (max-width: 960px) {
      .blg-grid__cards { grid-template-columns: repeat(2, 1fr); }
      .blg-section { padding: 56px 24px 68px; }
    }
    @media (max-width: 560px) {
      .blg__hero { padding: 64px 20px 28px; }
      .blg-grid__cards { grid-template-columns: 1fr; }
      .blg-section { padding: 44px 18px 56px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .blg-reveal, .blg-reveal-group > *,
      .blg__hero-inner > *, .blg__rule path {
        opacity: 1 !important; transform: none !important;
        transition: none !important; animation: none !important;
        stroke-dashoffset: 0 !important;
      }
    }
  `;

  return (
    <div className="blg">
      <style>{scopedStyles}</style>

      {/* ============ HERO ============ */}
      <section className="blg__hero">
        <div className="blg__hero-inner">
          <span className="blg__hero-eyebrow">Blog</span>
          <h1 className="blg__title">
            Stories from the <em>Himalayas</em>.
          </h1>
          <svg className="blg__rule" viewBox="0 0 280 8" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path
              d="M0,4 C40,0 80,8 120,4 C160,0 200,7 240,4 C260,3 270,5 280,4"
              stroke={W.GOLD_LINE} strokeWidth="1.6" fill="none" strokeLinecap="round"
              pathLength="1000"
            />
          </svg>
          <p className="blg__sub">
            Recipes, farming journals and dispatches from the Gangotri Valley.
          </p>
        </div>
      </section>

      <WaveDivider height={70} palette={[W.CREAM_SOFT]} />

      {/* ============ CARD GRID ============ */}
      <section className="blg-section blg-grid">
        <div className="blg-section__inner">
          <div className="blg-grid__cards blg-reveal-group">
            {BLOG_POSTS.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="blg-card">
                <div className="blg-card__image">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <span className="blg-card__category">{post.category}</span>
                </div>
                <div className="blg-card__content">
                  <div className="blg-card__meta">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="blg-card__title">{post.title}</h3>
                  <p className="blg-card__excerpt">{post.excerpt}</p>
                  <span className="blg-card__link">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider height={90} palette={[W.DEEP_FOREST_DK, W.DEEP_FOREST]} flip />

      {/* ============ NEWSLETTER ============ */}
      <section className="blg-cta-band blg-cta">
        <div className="blg-cta__inner blg-reveal">
          <span className="blg-cta__eyebrow">Newsletter</span>
          <h2>Want to stay updated?</h2>
          <p>Subscribe for the latest posts, seasonal recipes and exclusive offers.</p>
          <form className="blg-news-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="blg-news-input"
              aria-label="Email address"
            />
            <button type="submit" className="blg-news-btn">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Blog;
