import React, { useEffect } from 'react';
import './Traceability.css';

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

const BATCH_URL = 'https://orangutanorganics.net/batch/OUO_RC_37_92';

function Traceability() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.trc-reveal, .trc-reveal-group');
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
    .trc, .trc * { box-sizing: border-box; }
    .trc {
      background: ${W.CREAM};
      color: ${W.INK};
      font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
      overflow-x: hidden;
    }

    /* ---------- HERO ---------- */
    .trc__hero {
      position: relative; background: ${W.CREAM};
      padding: 96px 28px 40px;
      text-align: center;
      overflow: hidden;
    }
    .trc__hero-inner { max-width: 780px; margin: 0 auto; }
    .trc__hero-eyebrow {
      display: inline-block;
      background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM};
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 700; padding: 7px 14px;
    }
    .trc__title {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(36px, 5vw, 60px);
      line-height: 1.04; margin: 18px 0 12px;
      color: ${W.DEEP_FOREST};
      letter-spacing: -0.01em; font-weight: 700;
    }
    .trc__title em { font-style: normal; color: ${W.SEAL_TERRACOTTA}; }
    .trc__rule { display: block; width: 220px; max-width: 60%; height: 8px; margin: 4px auto 18px; }
    .trc__sub {
      color: ${W.INK};
      font-size: clamp(15px, 1.4vw, 17px);
      line-height: 1.65;
      max-width: 640px;
      margin: 0 auto;
    }

    /* ---------- SECTIONS ---------- */
    .trc-section { position: relative; padding: 72px 28px 88px; }
    .trc-section__inner { max-width: 900px; margin: 0 auto; }
    .trc-eyebrow {
      display: inline-block;
      background: ${W.DEEP_FOREST}; color: ${W.CREAM};
      font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 700; padding: 6px 12px;
    }
    .trc-h2 {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(28px, 3.4vw, 42px);
      color: ${W.DEEP_FOREST_DK};
      margin: 14px 0 18px; line-height: 1.15; font-weight: 700;
    }
    .trc-body {
      font-size: 16.5px; line-height: 1.75; color: ${W.INK};
      margin: 0 0 18px;
    }
    .trc-body strong { color: ${W.DEEP_FOREST_DK}; }
    .trc-body em { color: ${W.BURGUNDY}; font-style: italic; }

    /* ---------- PROOF PILLARS ---------- */
    .trc-pillars {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
      margin: 32px 0 8px;
    }
    .trc-pillar {
      background: ${W.CREAM_SOFT};
      border: 1px solid rgba(3,96,92,0.12);
      padding: 22px 20px;
    }
    .trc-pillar__tag {
      display: inline-block;
      font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase;
      font-weight: 800; color: ${W.SEAL_TERRACOTTA};
      border-bottom: 1.5px solid ${W.MEADOW_GOLD};
      padding-bottom: 4px; margin-bottom: 10px;
    }
    .trc-pillar h3 {
      margin: 0 0 8px;
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: 18px; color: ${W.DEEP_FOREST_DK}; font-weight: 700;
    }
    .trc-pillar p { margin: 0; font-size: 14.5px; line-height: 1.6; color: ${W.INK}; }

    /* ---------- CTA CARD ---------- */
    .trc-cta-band { background: ${W.DEEP_FOREST_DK}; color: ${W.CREAM}; }
    .trc-cta {
      text-align: center;
      padding: 64px 28px 80px;
    }
    .trc-cta__inner { max-width: 720px; margin: 0 auto; }
    .trc-cta__eyebrow {
      display: inline-block;
      background: ${W.MEADOW_GOLD}; color: ${W.FOREST_SHADOW};
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 800; padding: 6px 12px;
    }
    .trc-cta h2 {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(24px, 3vw, 34px);
      margin: 14px 0 12px; color: ${W.CREAM}; line-height: 1.2;
    }
    .trc-cta p {
      font-size: 16px; opacity: 0.9; margin: 0 0 26px; color: ${W.CREAM};
      max-width: 560px; margin-left: auto; margin-right: auto;
    }
    .trc-btn {
      display: inline-flex; align-items: center; gap: 10px;
      text-decoration: none;
      padding: 16px 32px; font-size: 13px; letter-spacing: 0.24em;
      text-transform: uppercase; font-weight: 700;
      background: ${W.MEADOW_GOLD}; color: ${W.FOREST_SHADOW};
      border: 1.5px solid ${W.MEADOW_GOLD};
      transition: transform 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease;
    }
    .trc-btn:hover {
      background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM}; border-color: ${W.SEAL_TERRACOTTA};
      transform: translateY(-1px);
    }
    .trc-btn__arrow { font-size: 16px; letter-spacing: 0; }

    .trc-batch-note {
      margin-top: 18px;
      font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
      color: ${W.CREAM}; opacity: 0.7;
    }

    /* ---------- HERO ANIMATIONS ---------- */
    @keyframes trc-hero-copy-in {
      from { opacity: 0; transform: translate3d(0, 12px, 0); }
      to   { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    .trc__hero-inner > * { animation: trc-hero-copy-in 720ms cubic-bezier(0.22, 0.7, 0.2, 1) both; }
    .trc__hero-inner > *:nth-child(1) { animation-delay: 120ms; }
    .trc__hero-inner > *:nth-child(2) { animation-delay: 240ms; }
    .trc__hero-inner > *:nth-child(3) { animation-delay: 360ms; }
    .trc__hero-inner > *:nth-child(4) { animation-delay: 480ms; }

    @keyframes trc-hero-rule-draw {
      from { stroke-dashoffset: 1000; }
      to   { stroke-dashoffset: 0; }
    }
    .trc__rule path {
      stroke-dasharray: 1000; stroke-dashoffset: 1000;
      animation: trc-hero-rule-draw 1.6s cubic-bezier(0.4, 0.55, 0.2, 1) 800ms both;
    }

    /* ---------- REVEAL ---------- */
    .trc-reveal {
      opacity: 0; transform: translate3d(0, 28px, 0);
      transition: opacity 900ms cubic-bezier(0.22, 0.7, 0.2, 1),
                  transform 900ms cubic-bezier(0.22, 0.7, 0.2, 1);
    }
    .trc-reveal.is-inview { opacity: 1; transform: translate3d(0, 0, 0); }
    .trc-reveal-group > * {
      opacity: 0; transform: translate3d(0, 32px, 0) scale(0.96);
      transition: opacity 850ms cubic-bezier(0.22, 0.7, 0.2, 1),
                  transform 850ms cubic-bezier(0.22, 0.7, 0.2, 1);
    }
    .trc-reveal-group.is-inview > * { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
    .trc-reveal-group.is-inview > *:nth-child(1) { transition-delay:  60ms; }
    .trc-reveal-group.is-inview > *:nth-child(2) { transition-delay: 180ms; }
    .trc-reveal-group.is-inview > *:nth-child(3) { transition-delay: 300ms; }

    /* ---------- RESPONSIVE ---------- */
    @media (max-width: 900px) {
      .trc-pillars { grid-template-columns: 1fr; }
      .trc-section { padding: 56px 22px 68px; }
      .trc__hero { padding: 72px 22px 32px; }
    }
    @media (max-width: 560px) {
      .trc-section { padding: 44px 18px 56px; }
      .trc__hero { padding: 56px 18px 24px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .trc-reveal, .trc-reveal-group > *,
      .trc__hero-inner > *, .trc__rule path {
        opacity: 1 !important; transform: none !important;
        transition: none !important; animation: none !important;
        stroke-dashoffset: 0 !important;
      }
    }
  `;

  return (
    <div className="trc">
      <style>{scopedStyles}</style>

      {/* ============ HERO ============ */}
      <section className="trc__hero">
        <div className="trc__hero-inner">
          <span className="trc__hero-eyebrow">Traceability</span>
          <h1 className="trc__title">
            Why <em>Traceability</em>?
          </h1>
          <svg className="trc__rule" viewBox="0 0 280 8" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path
              d="M0,4 C40,0 80,8 120,4 C160,0 200,7 240,4 C260,3 270,5 280,4"
              stroke={W.GOLD_LINE} strokeWidth="1.6" fill="none" strokeLinecap="round"
              pathLength="1000"
            />
          </svg>
          <p className="trc__sub">
            We don&apos;t ask you to trust a label. We let you check it.
          </p>
        </div>
      </section>

      <WaveDivider height={70} palette={[W.CREAM_SOFT]} />

      {/* ============ WHY ============ */}
      <section className="trc-section" style={{ background: W.CREAM_SOFT }}>
        <div className="trc-section__inner">
          <span className="trc-eyebrow trc-reveal">The Problem</span>
          <h2 className="trc-h2 trc-reveal">Most food reaches you through a long, anonymous chain.</h2>
          <p className="trc-body trc-reveal">
            You rarely know who grew it, where, or whether it&apos;s even what the label claims.
            And food fraud is real: honey, oils and spices are among the most adulterated foods
            on the shelf.
          </p>
          <p className="trc-body trc-reveal">
            So we don&apos;t ask you to trust a label. <strong>We let you check it.</strong>
          </p>

          <div className="trc-pillars trc-reveal-group">
            <div className="trc-pillar">
              <span className="trc-pillar__tag">See the source</span>
              <h3>Farm, farmer, harvest</h3>
              <p>The farm, the farmer, the harvest data behind your jar — visible, not implied.</p>
            </div>
            <div className="trc-pillar">
              <span className="trc-pillar__tag">Proof, not promises</span>
              <h3>Evidence over stickers</h3>
              <p>&ldquo;Organic&rdquo; is a sticker anyone can print. A traceable batch is evidence.</p>
            </div>
            <div className="trc-pillar">
              <span className="trc-pillar__tag">Real, pure, honest</span>
              <h3>Exactly what it says</h3>
              <p>Know your food is exactly what it says it is — no gaps, no guesswork.</p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider height={90} palette={[W.DEEP_FOREST_DK, W.DEEP_FOREST]} flip />

      {/* ============ CTA ============ */}
      <section className="trc-cta-band trc-cta">
        <div className="trc-cta__inner trc-reveal">
          <span className="trc-cta__eyebrow">TraceRoot</span>
          <h2>Every Orang Utan Organics pack traces back to its batch.</h2>
          <p>Powered by TraceRoot — scan, tap, or click through to the very hands that harvested it.</p>
          <a
            href={BATCH_URL}
            className="trc-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trace Your Batch <span className="trc-btn__arrow">→</span>
          </a>
          <div className="trc-batch-note">Sample batch: OUO_RC_37_92</div>
        </div>
      </section>
    </div>
  );
}

export default Traceability;
