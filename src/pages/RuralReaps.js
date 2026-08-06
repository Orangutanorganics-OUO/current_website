import React, { useEffect } from 'react';
import './RuralReaps.css';
import rrLogo from '../utils/RR_logo.svg';

const W = {
  BRAND_BROWN:  '#826845',
  BRAND_GREEN:  '#618E69',
  BRAND_TEAL:   '#5D9C9D',
  DEEP_FOREST:  '#03605C',
  INK:              '#655F59',
  BURGUNDY:         '#95373A',
  SEAL_TERRACOTTA:  '#D76427',
  CREAM:            '#F8F3EB',
  MEADOW_GOLD:      '#B5882D',
  OCHRE:            '#A56650',
  CREAM_SOFT:      '#F1E7CE',
  PAPER:           '#F8F3EB',
  DEEP_FOREST_DK:  '#024442',
  FOREST_SHADOW:   '#013532',
  GOLD_LINE:       '#B5882D',
};

const ENQUIRY_EMAIL = 'share@orangutanorganics.com';

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

const CREDIBILITY = [
  { tag: 'Certified',   text: 'APEDA registered' },
  { tag: 'Trusted by',  text: 'Tata Consumer Products' },
  { tag: 'Exhibited',   text: 'BioFach 2025 & 2026' },
  { tag: 'Traceable',   text: 'To the farm via TraceRoot' },
  { tag: 'Proven',      text: "Supplying India's leading FMCG brands" },
];

const PRODUCTS = [
  'Himalayan Red Rajma',
  'White Rajma',
  'Red Rice',
  'Black Soybean (Kala Bhat)',
  'Badri Cow Ghee',
  'Forest Honey',
  'Wild Tempering Spice',
];

const BUYERS = [
  'Exporters & importers',
  'Distributors & wholesalers',
  'FMCG & food manufacturers',
  'Private-label brands',
  'Retail chains',
  'Foodservice & HoReCa',
];

const WHY = [
  {
    title: 'Single-origin, high-altitude',
    text: 'Organic product — not commodity blends. Every crop grown at the altitude that suits it best.',
  },
  {
    title: 'Direct from women-led collectives',
    text: 'No middlemen. Ethically sourced from farmer collectives in the Gangotri Valley.',
  },
  {
    title: 'Batch-level traceability',
    text: 'Verifiable origin via TraceRoot — evidence, not claims. Every batch is auditable.',
  },
  {
    title: 'Certified for India & export',
    text: 'Compliant paperwork, lab reports and certifications ready for domestic and overseas markets.',
  },
  {
    title: 'Commercial scale, season-planned',
    text: 'Proven volume with consistent, season-planned supply — no surprises on your order book.',
  },
];

function RuralReaps() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.rr-reveal, .rr-reveal-group');
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

  const scopedStyles = `
    .rr, .rr * { box-sizing: border-box; }
    .rr {
      background: ${W.CREAM};
      color: ${W.INK};
      font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
      overflow-x: hidden;
    }

    /* ---------- HERO ---------- */
    .rr__hero {
      position: relative; background: ${W.CREAM};
      padding: 96px 28px 40px;
      text-align: center;
      overflow: hidden;
    }
    .rr__hero-inner { max-width: 860px; margin: 0 auto; }
    .rr__logo {
      display: block;
      max-width: 240px;
      width: 40%;
      height: auto;
      margin: 0 auto 22px;
    }
    .rr__hero-eyebrow {
      display: inline-block;
      background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM};
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 700; padding: 7px 14px;
    }
    .rr__title {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(34px, 4.6vw, 54px);
      line-height: 1.08; margin: 18px 0 14px;
      color: ${W.DEEP_FOREST};
      letter-spacing: -0.01em; font-weight: 700;
    }
    .rr__title em { font-style: normal; color: ${W.SEAL_TERRACOTTA}; }
    .rr__rule { display: block; width: 220px; max-width: 60%; height: 8px; margin: 4px auto 18px; }
    .rr__sub {
      color: ${W.INK};
      font-size: clamp(15px, 1.35vw, 17px);
      line-height: 1.65;
      max-width: 720px;
      margin: 0 auto;
    }

    /* ---------- CREDIBILITY STRIP ---------- */
    .rr-cred-band { background: ${W.DEEP_FOREST_DK}; color: ${W.CREAM}; }
    .rr-cred {
      padding: 34px 28px;
      max-width: 1240px; margin: 0 auto;
    }
    .rr-cred__head {
      text-align: center;
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 700; color: ${W.MEADOW_GOLD};
      margin-bottom: 22px;
    }
    .rr-cred__grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 0;
      border-top: 1px solid rgba(248,243,235,0.15);
      border-bottom: 1px solid rgba(248,243,235,0.15);
    }
    .rr-cred__item {
      text-align: center;
      padding: 22px 16px;
      border-left: 1px solid rgba(248,243,235,0.12);
    }
    .rr-cred__item:first-child { border-left: none; }
    .rr-cred__tag {
      display: block;
      font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase;
      font-weight: 800; color: ${W.MEADOW_GOLD};
      margin-bottom: 6px;
    }
    .rr-cred__text {
      display: block;
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: 15px; line-height: 1.4; color: ${W.CREAM};
    }

    /* ---------- SECTIONS ---------- */
    .rr-section { position: relative; padding: 72px 28px 88px; }
    .rr-section__inner { max-width: 1200px; margin: 0 auto; }
    .rr-section-head { text-align: center; margin-bottom: 36px; }
    .rr-eyebrow {
      display: inline-block;
      background: ${W.DEEP_FOREST}; color: ${W.CREAM};
      font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 700; padding: 6px 12px;
    }
    .rr-h2 {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(28px, 3.4vw, 40px);
      color: ${W.DEEP_FOREST_DK};
      margin: 14px 0 12px; line-height: 1.15; font-weight: 700;
    }
    .rr-lead {
      max-width: 780px; margin: 0 auto;
      font-size: 16px; line-height: 1.75; color: ${W.INK};
    }
    .rr-lead strong { color: ${W.DEEP_FOREST_DK}; }

    /* ---------- SUPPLY ---------- */
    .rr-supply { background: ${W.CREAM_SOFT}; }
    .rr-chips {
      display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;
      margin: 26px auto 22px; max-width: 900px;
    }
    .rr-chip {
      background: ${W.CREAM};
      border: 1.5px solid ${W.MEADOW_GOLD};
      color: ${W.DEEP_FOREST_DK};
      padding: 10px 18px;
      font-size: 13.5px; font-weight: 600;
      letter-spacing: 0.02em;
    }
    .rr-supply__foot {
      text-align: center; margin: 6px auto 0; max-width: 720px;
      font-size: 14.5px; line-height: 1.65; color: ${W.INK}; opacity: 0.85;
    }

    /* ---------- BUYERS ---------- */
    .rr-buyers { background: ${W.PAPER}; }
    .rr-buyers__grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
      margin-top: 28px;
    }
    .rr-buyer {
      background: ${W.CREAM};
      border: 1px solid rgba(3,96,92,0.14);
      padding: 22px 20px;
      display: flex; align-items: center; gap: 14px;
    }
    .rr-buyer__dot {
      width: 10px; height: 10px; background: ${W.SEAL_TERRACOTTA};
      border-radius: 50%; flex: 0 0 auto;
    }
    .rr-buyer__label {
      font-size: 15px; font-weight: 600; color: ${W.DEEP_FOREST_DK};
      letter-spacing: 0.01em;
    }

    /* ---------- WHY ---------- */
    .rr-why { background: ${W.MEADOW_GOLD}; }
    .rr-why .rr-eyebrow { background: ${W.FOREST_SHADOW}; color: ${W.CREAM}; }
    .rr-why .rr-h2 { color: ${W.FOREST_SHADOW}; }
    .rr-why__grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;
      margin-top: 32px;
    }
    .rr-why-card {
      background: ${W.CREAM};
      border: 1px solid rgba(15,58,54,0.15);
      padding: 24px 22px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .rr-why-card__num {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: 22px; font-weight: 700; color: ${W.SEAL_TERRACOTTA};
      border-bottom: 1.5px solid ${W.MEADOW_GOLD};
      padding-bottom: 6px; margin-bottom: 2px;
      width: fit-content;
    }
    .rr-why-card h3 {
      margin: 0;
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: 17px; color: ${W.DEEP_FOREST_DK}; font-weight: 700;
      line-height: 1.3;
    }
    .rr-why-card p {
      margin: 0; font-size: 14.5px; line-height: 1.65;
      color: ${W.INK}; opacity: 0.88;
    }

    /* ---------- CTA ---------- */
    .rr-cta-band { background: ${W.DEEP_FOREST_DK}; color: ${W.CREAM}; }
    .rr-cta {
      text-align: center;
      padding: 64px 28px 80px;
    }
    .rr-cta__inner { max-width: 720px; margin: 0 auto; }
    .rr-cta__eyebrow {
      display: inline-block;
      background: ${W.MEADOW_GOLD}; color: ${W.FOREST_SHADOW};
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 800; padding: 6px 12px;
    }
    .rr-cta h2 {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(24px, 3vw, 34px);
      margin: 14px 0 12px; color: ${W.CREAM}; line-height: 1.2;
    }
    .rr-cta p {
      font-size: 16px; opacity: 0.9; margin: 0 0 26px; color: ${W.CREAM};
      max-width: 560px; margin-left: auto; margin-right: auto;
    }
    .rr-btn {
      display: inline-flex; align-items: center; gap: 10px;
      text-decoration: none;
      padding: 16px 32px; font-size: 13px; letter-spacing: 0.24em;
      text-transform: uppercase; font-weight: 700;
      background: ${W.MEADOW_GOLD}; color: ${W.FOREST_SHADOW};
      border: 1.5px solid ${W.MEADOW_GOLD};
      transition: transform 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease;
    }
    .rr-btn:hover {
      background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM}; border-color: ${W.SEAL_TERRACOTTA};
      transform: translateY(-1px);
    }
    .rr-btn__arrow { font-size: 16px; letter-spacing: 0; }
    .rr-cta__email {
      display: block; margin-top: 18px;
      font-size: 13px; letter-spacing: 0.14em;
      color: ${W.CREAM}; opacity: 0.85;
    }
    .rr-cta__email a { color: ${W.MEADOW_GOLD}; text-decoration: none; font-weight: 700; }
    .rr-cta__email a:hover { color: ${W.SEAL_TERRACOTTA}; }

    /* ---------- HERO ANIMATIONS ---------- */
    @keyframes rr-hero-copy-in {
      from { opacity: 0; transform: translate3d(0, 12px, 0); }
      to   { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    .rr__hero-inner > * { animation: rr-hero-copy-in 720ms cubic-bezier(0.22, 0.7, 0.2, 1) both; }
    .rr__hero-inner > *:nth-child(1) { animation-delay: 100ms; }
    .rr__hero-inner > *:nth-child(2) { animation-delay: 200ms; }
    .rr__hero-inner > *:nth-child(3) { animation-delay: 320ms; }
    .rr__hero-inner > *:nth-child(4) { animation-delay: 440ms; }
    .rr__hero-inner > *:nth-child(5) { animation-delay: 560ms; }

    @keyframes rr-hero-rule-draw {
      from { stroke-dashoffset: 1000; }
      to   { stroke-dashoffset: 0; }
    }
    .rr__rule path {
      stroke-dasharray: 1000; stroke-dashoffset: 1000;
      animation: rr-hero-rule-draw 1.6s cubic-bezier(0.4, 0.55, 0.2, 1) 800ms both;
    }

    /* ---------- REVEAL ---------- */
    .rr-reveal {
      opacity: 0; transform: translate3d(0, 28px, 0);
      transition: opacity 900ms cubic-bezier(0.22, 0.7, 0.2, 1),
                  transform 900ms cubic-bezier(0.22, 0.7, 0.2, 1);
    }
    .rr-reveal.is-inview { opacity: 1; transform: translate3d(0, 0, 0); }
    .rr-reveal-group > * {
      opacity: 0; transform: translate3d(0, 32px, 0) scale(0.96);
      transition: opacity 850ms cubic-bezier(0.22, 0.7, 0.2, 1),
                  transform 850ms cubic-bezier(0.22, 0.7, 0.2, 1);
    }
    .rr-reveal-group.is-inview > * { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
    .rr-reveal-group.is-inview > *:nth-child(1) { transition-delay:  60ms; }
    .rr-reveal-group.is-inview > *:nth-child(2) { transition-delay: 140ms; }
    .rr-reveal-group.is-inview > *:nth-child(3) { transition-delay: 220ms; }
    .rr-reveal-group.is-inview > *:nth-child(4) { transition-delay: 300ms; }
    .rr-reveal-group.is-inview > *:nth-child(5) { transition-delay: 380ms; }
    .rr-reveal-group.is-inview > *:nth-child(6) { transition-delay: 460ms; }
    .rr-reveal-group.is-inview > *:nth-child(7) { transition-delay: 540ms; }

    /* ---------- RESPONSIVE ---------- */
    @media (max-width: 960px) {
      .rr-section { padding: 56px 24px 68px; }
      .rr-cred__grid { grid-template-columns: repeat(2, 1fr); }
      .rr-cred__item { border-left: none; border-top: 1px solid rgba(248,243,235,0.12); }
      .rr-cred__item:first-child,
      .rr-cred__item:nth-child(2) { border-top: none; }
      .rr-buyers__grid { grid-template-columns: repeat(2, 1fr); }
      .rr-why__grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 560px) {
      .rr__hero { padding: 64px 20px 28px; }
      .rr-section { padding: 44px 18px 56px; }
      .rr-cred__grid { grid-template-columns: 1fr; }
      .rr-cred__item { border-top: 1px solid rgba(248,243,235,0.12); }
      .rr-cred__item:first-child { border-top: none; }
      .rr-buyers__grid { grid-template-columns: 1fr; }
      .rr-why__grid { grid-template-columns: 1fr; }
    }

    @media (prefers-reduced-motion: reduce) {
      .rr-reveal, .rr-reveal-group > *,
      .rr__hero-inner > *, .rr__rule path {
        opacity: 1 !important; transform: none !important;
        transition: none !important; animation: none !important;
        stroke-dashoffset: 0 !important;
      }
    }
  `;

  return (
    <div className="rr">
      <style>{scopedStyles}</style>

      {/* ============ HERO ============ */}
      <section className="rr__hero">
        <div className="rr__hero-inner">
          <img src={rrLogo} alt="Rural Reaps" className="rr__logo" />
          <span className="rr__hero-eyebrow">Rural Reaps · B2B</span>
          <h1 className="rr__title">
            Bulk, export-ready <em>Himalayan organics</em>.
          </h1>
          <svg className="rr__rule" viewBox="0 0 280 8" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path
              d="M0,4 C40,0 80,8 120,4 C160,0 200,7 240,4 C260,3 270,5 280,4"
              stroke={W.GOLD_LINE} strokeWidth="1.6" fill="none" strokeLinecap="round"
              pathLength="1000"
            />
          </svg>
          <p className="rr__sub">
            The wholesale and export arm of Orang Utan Organics — single-origin organic grains,
            pulses and more from the high Himalayas, supplied at commercial scale and traceable
            to the farm.
          </p>
        </div>
      </section>

      {/* ============ CREDIBILITY STRIP ============ */}
      <section className="rr-cred-band">
        <div className="rr-cred">
          <div className="rr-cred__head">Trusted · Certified · Traceable · Proven</div>
          <div className="rr-cred__grid rr-reveal-group">
            {CREDIBILITY.map((c) => (
              <div key={c.tag} className="rr-cred__item">
                <span className="rr-cred__tag">{c.tag}</span>
                <span className="rr-cred__text">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider height={70} palette={[W.CREAM_SOFT]} />

      {/* ============ WHAT WE SUPPLY ============ */}
      <section className="rr-section rr-supply">
        <div className="rr-section__inner">
          <div className="rr-section-head">
            <span className="rr-eyebrow rr-reveal">What We Supply</span>
            <h2 className="rr-h2 rr-reveal">Single-origin Himalayan grains, pulses & more.</h2>
            <p className="rr-lead rr-reveal">
              Himalayan Red Rajma, White Rajma, Red Rice, Black Soybean (Kala Bhat), Badri Cow
              Ghee, Forest Honey and Wild Tempering Spice — in bulk and export packaging.
            </p>
          </div>
          <div className="rr-chips rr-reveal-group">
            {PRODUCTS.map((p) => (
              <span key={p} className="rr-chip">{p}</span>
            ))}
          </div>
          <p className="rr-supply__foot rr-reveal">
            <strong>Private-label and custom packing available.</strong> MOQs, specs and lab
            reports shared on enquiry.
          </p>
        </div>
      </section>

      <WaveDivider height={80} palette={[W.PAPER, W.CREAM_SOFT]} flip />

      {/* ============ WHO WE WORK WITH ============ */}
      <section className="rr-section rr-buyers">
        <div className="rr-section__inner">
          <div className="rr-section-head">
            <span className="rr-eyebrow rr-reveal">Who We Work With</span>
            <h2 className="rr-h2 rr-reveal">Built for serious commercial buyers.</h2>
          </div>
          <div className="rr-buyers__grid rr-reveal-group">
            {BUYERS.map((b) => (
              <div key={b} className="rr-buyer">
                <span className="rr-buyer__dot" aria-hidden="true"></span>
                <span className="rr-buyer__label">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider height={90} palette={[W.MEADOW_GOLD, W.OCHRE]} />

      {/* ============ WHY RURAL REAPS ============ */}
      <section className="rr-section rr-why">
        <div className="rr-section__inner">
          <div className="rr-section-head">
            <span className="rr-eyebrow rr-reveal">Why Rural Reaps</span>
            <h2 className="rr-h2 rr-reveal">Five reasons buyers choose us.</h2>
          </div>
          <div className="rr-why__grid rr-reveal-group">
            {WHY.map((w, i) => (
              <div key={w.title} className="rr-why-card">
                <span className="rr-why-card__num">0{i + 1}</span>
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider height={90} palette={[W.DEEP_FOREST_DK, W.DEEP_FOREST]} flip />

      {/* ============ ENQUIRY CTA ============ */}
      <section className="rr-cta-band rr-cta">
        <div className="rr-cta__inner rr-reveal">
          <span className="rr-cta__eyebrow">Enquire</span>
          <h2>Ready to stock, private-label or export?</h2>
          <p>
            Share your requirement — product, quantity, destination market — and our team will
            revert with MOQs, specs and lab reports.
          </p>
          <a
            href={`mailto:${ENQUIRY_EMAIL}?subject=Rural%20Reaps%20B2B%20Enquiry`}
            className="rr-btn"
          >
            Enquire Now <span className="rr-btn__arrow">→</span>
          </a>
          <span className="rr-cta__email">
            or write to us at <a href={`mailto:${ENQUIRY_EMAIL}`}>{ENQUIRY_EMAIL}</a>
          </span>
        </div>
      </section>
    </div>
  );
}

export default RuralReaps;
