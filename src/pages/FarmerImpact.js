import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VALUE_CHAIN } from '../utils/traceabilityData';
import './FarmerImpact.css';
import img_10001 from "../utils/img_10001.webp";
import img_10002 from "../utils/img_10002.webp";

/* ===== OLD CODE — ORIGINAL v1 — START (uncomment to restore) =====
function FarmerImpact() {
  const totalShare = VALUE_CHAIN.reduce((sum, item) => sum + item.share, 0);
  return (
    <div className="farmer-impact-page">
      <div className="impact-container">
        <div className="page-header">
          <h1>Farmer Impact & Fair Trade</h1>
          <p>Where every rupee goes - complete transparency in our value chain</p>
        </div>
        ... (see git history for full original) ...
      </div>
    </div>
  );
}
   ===== OLD CODE — ORIGINAL v1 — END ===== */

// ===== NEW REDESIGN — WAVE THEME — START =====
// Palette mirrors Home.js (H) / Products.js (P) — keep in sync if the
// master palette in Home ever changes.
const FI = {
  BRAND_BROWN:      '#826845',
  BRAND_GREEN:      '#618E69',
  BRAND_TEAL:       '#5D9C9D',
  DEEP_FOREST:      '#03605C',
  DEEP_FOREST_DK:   '#024442',
  FOREST_SHADOW:    '#013532',
  INK:              '#655F59',
  SEAL_TERRACOTTA:  '#D76427',
  CREAM:            '#F8F3EB',
  CREAM_SOFT:       '#F1E7CE',
  PAPER:            '#F8F3EB',
  PALE_SAGE:        '#DBD3A8',
  MEADOW_GOLD:      '#B5882D',
  GOLD_LINE:        '#B5882D',
  OCHRE:            '#A56650',
  SOIL_OLIVE:       '#618E69',
  BURGUNDY:         '#95373A',
};

function WaveDivider({ height = 90, palette, flip = false }) {
  const layers = palette || [FI.CREAM, FI.CREAM_SOFT];
  const style = { transform: flip ? 'scaleY(-1)' : 'none', display: 'block', width: '100%', height };
  return (
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true" focusable="false" style={style}>
      <path d="M0,32 C220,4 460,72 720,36 C980,0 1220,60 1440,28 L1440,100 L0,100 Z"
            fill={layers[0]} opacity="0.95"/>
      {layers[1] && (
        <path d="M0,52 C260,28 480,80 780,52 C1060,26 1260,72 1440,48 L1440,100 L0,100 Z"
              fill={layers[1]} opacity="0.65"/>
      )}
      {layers[2] && (
        <path d="M0,72 C300,54 520,90 800,72 C1080,54 1260,88 1440,72 L1440,100 L0,100 Z"
              fill={layers[2]} opacity="0.4"/>
      )}
      <path d="M0,34 C220,6 460,74 720,38 C980,2 1220,62 1440,30"
            stroke={FI.GOLD_LINE} strokeWidth="1.1" fill="none" opacity="0.45"/>
    </svg>
  );
}

/* Simple icon disc (matches WhoAreWe pattern). */
function IconDisc({ tone, size = 62, children }) {
  return (
    <svg viewBox="0 0 68 68" width={size} height={size} aria-hidden="true">
      <circle cx="34" cy="34" r="33" fill={tone}/>
      <g stroke={FI.CREAM} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}
const IcoHandshake = () => (
  <IconDisc tone={FI.BRAND_BROWN}>
    <path d="M20 34 L28 26 L34 32 L42 24 L48 30"/>
    <path d="M22 40 L28 46 L34 42 L40 46 L46 40"/>
    <path d="M28 46 L28 52 M40 46 L40 52"/>
  </IconDisc>
);
const IcoCoins = () => (
  <IconDisc tone={FI.MEADOW_GOLD}>
    <ellipse cx="34" cy="24" rx="14" ry="4"/>
    <path d="M20 24 L20 32 C20 34 26 36 34 36 C42 36 48 34 48 32 L48 24"/>
    <path d="M20 32 L20 40 C20 42 26 44 34 44 C42 44 48 42 48 40 L48 32"/>
    <path d="M20 40 L20 48 C20 50 26 52 34 52 C42 52 48 50 48 48 L48 40"/>
  </IconDisc>
);
const IcoDoc = () => (
  <IconDisc tone={FI.DEEP_FOREST}>
    <path d="M24 18 L42 18 L48 24 L48 52 L24 52 Z"/>
    <path d="M42 18 L42 24 L48 24"/>
    <path d="M28 32 L44 32 M28 38 L44 38 M28 44 L38 44"/>
  </IconDisc>
);
const IcoGraduation = () => (
  <IconDisc tone={FI.BRAND_TEAL}>
    <path d="M12 30 L34 20 L56 30 L34 40 Z"/>
    <path d="M22 34 L22 44 C22 46 28 48 34 48 C40 48 46 46 46 44 L46 34"/>
    <path d="M52 32 L52 44"/>
  </IconDisc>
);
const IcoWomen = () => (
  <IconDisc tone={FI.SEAL_TERRACOTTA}>
    <circle cx="34" cy="22" r="6"/>
    <path d="M24 42 L28 30 L40 30 L44 42 Z"/>
    <path d="M34 42 L34 52 M28 48 L40 48"/>
  </IconDisc>
);
const IcoLeaf = () => (
  <IconDisc tone={FI.BRAND_GREEN}>
    <path d="M20 44 C20 30 30 20 48 20 C48 38 38 48 20 48 Z"/>
    <path d="M20 48 L38 30"/>
  </IconDisc>
);

// Icon rotation for stat cards — cycles through the three brand tones.
const STAT_TONES = [FI.BRAND_BROWN, FI.BRAND_GREEN, FI.BRAND_TEAL, FI.MEADOW_GOLD];

function FarmerImpact() {
  const totalShare = VALUE_CHAIN.reduce((sum, item) => sum + item.share, 0);

  // Scroll-reveal — identical pattern to Home / Valley / Shop.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.wtn-fi .wtn-reveal, .wtn-fi .wtn-reveal-group');
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-inview'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-inview'); io.unobserve(e.target); }
      }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const STATS = [
    { n: '55%', label: 'Goes to Mountain Farmers', text: 'Compared to 20–30% in conventional supply chains' },
    { n: '50+', label: 'Farmer Families Supported', text: 'Direct partnerships in 5+ Himalayan villages' },
    { n: '3×',  label: 'Income Increase',           text: 'Average farmer income vs. conventional farming' },
    { n: '60%', label: 'Women Entrepreneurs',       text: 'Women-led enterprises in our network' },
  ];

  const COMMITMENTS = [
    { Icon: IcoHandshake,  title: 'Fair Pricing',        text: 'Farmers receive 55% of final product price — double the industry standard.' },
    { Icon: IcoCoins,      title: 'Advance Payments',    text: 'Pre-harvest payments so farmers aren’t forced to borrow from moneylenders.' },
    { Icon: IcoDoc,        title: 'Long-term Contracts', text: 'Multi-year agreements provide income security and planning capability.' },
    { Icon: IcoGraduation, title: 'Skill Development',   text: 'Training in organic certification, food safety, and value-added processing.' },
    { Icon: IcoWomen,      title: 'Women’s Empowerment', text: '60% of our partners are women, many are primary decision-makers.' },
    { Icon: IcoLeaf,       title: 'Environmental Care',  text: 'Organic farming practices preserve mountain ecosystems for future generations.' },
  ];

  return (
    <div className="wtn-fi">
      <style>{FI_STYLES}</style>

      {/* ============ HERO ============ */}
      <section className="wtn-fi-hero">
        <div className="wtn-section__inner" style={{ textAlign: 'center' }}>
          <span className="wtn-eyebrow wtn-reveal">Farmer Impact</span>
          <h1 className="wtn-h2 wtn-h1 wtn-reveal">Farmer Impact &amp; Fair Trade</h1>
          <svg className="wtn-h2-rule wtn-reveal" viewBox="0 0 84 6" preserveAspectRatio="none"
               aria-hidden="true" style={{ margin: '10px auto 18px' }}>
            <path d="M0,3 C18,0 38,6 56,3 C72,0 80,4 84,3"
                  stroke={FI.MEADOW_GOLD} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          </svg>
          <p className="wtn-sub wtn-reveal" style={{ margin: '0 auto' }}>
            Where every rupee goes — complete transparency across our value chain,
            from the terraced farms above 2,000 m to your kitchen.
          </p>
        </div>
      </section>

      <WaveDivider height={70} palette={[FI.CREAM_SOFT]} />

      {/* ============ VALUE CHAIN ============ */}
      <section className="wtn-section wtn-fi-chain">
        <div className="wtn-section__inner">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span className="wtn-eyebrow wtn-reveal">Where the Rupee Goes</span>
            <h2 className="wtn-h2 wtn-reveal">Value Chain Breakdown</h2>
            <p className="wtn-sub wtn-reveal" style={{ margin: '10px auto 0' }}>
              For every ₹100 you spend, here&rsquo;s how it&rsquo;s distributed across our value chain.
            </p>
          </div>

          <div className="wtn-fi-chain__list wtn-reveal-group">
            {VALUE_CHAIN.map((item, index) => {
              const pct = (item.share / totalShare) * 100;
              return (
                <div key={index} className="wtn-fi-chainrow">
                  <div className="wtn-fi-chainrow__head">
                    <h3 className="wtn-fi-chainrow__name">{item.node}</h3>
                    <span className="wtn-fi-chainrow__pct">{item.share}%</span>
                  </div>
                  <div className="wtn-fi-chainrow__track">
                    <div className="wtn-fi-chainrow__bar" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="wtn-fi-chainrow__note">{item.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <WaveDivider height={80} palette={[FI.MEADOW_GOLD, FI.OCHRE]} />

      {/* ============ IMPACT STATS ============ */}
      <section className="wtn-section wtn-fi-stats">
        <div className="wtn-section__inner">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span className="wtn-eyebrow wtn-reveal" style={{ background: FI.FOREST_SHADOW }}>Our Impact</span>
            <h2 className="wtn-h2 wtn-reveal" style={{ color: FI.FOREST_SHADOW }}>The numbers behind the promise</h2>
          </div>

          <div className="wtn-fi-stats__grid wtn-reveal-group">
            {STATS.map((s, i) => (
              <div key={i} className="wtn-fi-stat">
                <div className="wtn-fi-stat__disc" style={{ background: STAT_TONES[i % STAT_TONES.length] }}>
                  <span>{s.n}</span>
                </div>
                <h3 className="wtn-fi-stat__label">{s.label}</h3>
                <p className="wtn-fi-stat__text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider height={80} palette={[FI.CREAM_SOFT, FI.PAPER]} flip />

      {/* ============ FARMER STORIES ============ */}
      <section className="wtn-section wtn-fi-stories">
        <div className="wtn-section__inner">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span className="wtn-eyebrow wtn-reveal">Farmer Stories</span>
            <h2 className="wtn-h2 wtn-reveal">Names, faces, and villages behind the food</h2>
          </div>

          <div className="wtn-fi-story wtn-reveal">
            <div className="wtn-fi-story__img">
              <img src={img_10001} alt="Nirmala Devi" loading="lazy" />
            </div>
            <div className="wtn-fi-story__body">
              <span className="wtn-fi-story__eyebrow">Ghee Maker</span>
              <h3 className="wtn-fi-story__name">Nirmala Devi</h3>
              <p className="wtn-fi-story__loc">Bhangeli Village, Gangotri Valley</p>
              <p className="wtn-fi-story__quote">
                &ldquo;Five years ago, I started making ghee using my grandmother&rsquo;s bilona method.
                Through Orang Utan Organics, I now employ three other women, my children study in good
                schools, and I&rsquo;ve become a source of pride in my community. The fair prices mean
                we can live with dignity in our ancestral village.&rdquo;
              </p>
            </div>
          </div>

          <div className="wtn-fi-story wtn-fi-story--flip wtn-reveal">
            <div className="wtn-fi-story__img">
              <img src={img_10002} alt="Bhangeli Cooperative" loading="lazy" />
            </div>
            <div className="wtn-fi-story__body">
              <span className="wtn-fi-story__eyebrow">Cooperative</span>
              <h3 className="wtn-fi-story__name">Orang Utan Farmers Consortium</h3>
              <p className="wtn-fi-story__loc">25 Farming Families</p>
              <p className="wtn-fi-story__quote">
                Our cooperative grows Himalayan rajma and red rice. Partnership with OUO has brought
                40% higher income, young farmers are returning from cities, and we&rsquo;ve built a
                community centre and library. Traditional farming is now economically viable again.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider height={70} palette={[FI.CREAM_SOFT]} />

      {/* ============ COMMITMENTS ============ */}
      <section className="wtn-section wtn-fi-commit">
        <div className="wtn-section__inner">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span className="wtn-eyebrow wtn-reveal">Our Commitments</span>
            <h2 className="wtn-h2 wtn-reveal">Six promises we keep to every farmer</h2>
          </div>

          <div className="wtn-fi-commit__grid wtn-reveal-group">
            {COMMITMENTS.map(({ Icon, title, text }, i) => (
              <div key={i} className="wtn-fi-commit__card">
                <div className="wtn-fi-commit__icon"><Icon /></div>
                <h3 className="wtn-fi-commit__title">{title}</h3>
                <p className="wtn-fi-commit__text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider height={80} palette={[FI.DEEP_FOREST, FI.DEEP_FOREST_DK, FI.FOREST_SHADOW]} />

      {/* ============ CTA ============ */}
      <section className="wtn-fi-cta">
        <div className="wtn-cta__inner wtn-reveal">
          <span className="wtn-cta__eyebrow">Every purchase counts</span>
          <h2>Buy direct. Change a village.</h2>
          <p>Your order sends a bigger share back to the farmer than any conventional store.</p>
          <Link to="/products" className="wtn-btn wtn-btn--primary wtn-btn--large">Shop the Harvest</Link>
        </div>
      </section>
    </div>
  );
}

const FI_STYLES = `
  .wtn-fi, .wtn-fi * { box-sizing: border-box; }
  .wtn-fi {
    background: ${FI.CREAM};
    color: ${FI.INK};
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    overflow-x: hidden;
  }

  /* Reveal — same timings as Home / Valley */
  .wtn-fi .wtn-reveal, .wtn-fi .wtn-reveal-group > * {
    opacity: 0; transform: translateY(18px);
    transition: opacity 520ms ease, transform 520ms ease;
  }
  .wtn-fi .wtn-reveal.is-inview,
  .wtn-fi .wtn-reveal-group.is-inview > * { opacity: 1; transform: none; }
  .wtn-fi .wtn-reveal-group > *:nth-child(2) { transition-delay: 60ms; }
  .wtn-fi .wtn-reveal-group > *:nth-child(3) { transition-delay: 120ms; }
  .wtn-fi .wtn-reveal-group > *:nth-child(4) { transition-delay: 180ms; }
  .wtn-fi .wtn-reveal-group > *:nth-child(5) { transition-delay: 240ms; }
  .wtn-fi .wtn-reveal-group > *:nth-child(6) { transition-delay: 300ms; }

  /* Section shell (matches Home) */
  .wtn-section { position: relative; padding: 64px 28px 80px; }
  .wtn-section__inner { max-width: 1320px; margin: 0 auto; }
  .wtn-eyebrow {
    display: inline-block;
    background: ${FI.DEEP_FOREST}; color: ${FI.CREAM};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 6px 12px;
  }
  .wtn-h2 {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(28px, 3.4vw, 42px);
    color: ${FI.DEEP_FOREST_DK};
    margin: 14px 0 10px; line-height: 1.15;
  }
  .wtn-h1 { font-size: clamp(34px, 4vw, 54px); }
  .wtn-h2-rule { display: block; width: 84px; height: 6px; }
  .wtn-sub {
    max-width: 640px; color: ${FI.INK}; opacity: 0.78;
    font-size: 15.5px; line-height: 1.6; margin: 0 0 32px;
  }

  /* Buttons */
  .wtn-btn {
    display: inline-block; padding: 12px 26px;
    font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 700; text-decoration: none;
    border: 1.5px solid transparent; cursor: pointer;
    transition: transform 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease;
  }
  .wtn-btn--primary { background: ${FI.MEADOW_GOLD}; color: ${FI.FOREST_SHADOW}; border-color: ${FI.MEADOW_GOLD}; }
  .wtn-btn--primary:hover { background: ${FI.SEAL_TERRACOTTA}; color: ${FI.CREAM}; border-color: ${FI.SEAL_TERRACOTTA}; transform: translateY(-1px); }
  .wtn-btn--large { padding: 16px 32px; font-size: 13px; }

  /* Hero */
  .wtn-fi-hero { background: ${FI.CREAM}; padding: 80px 28px 40px; text-align: center; }

  /* Value Chain */
  .wtn-fi-chain { background: ${FI.PAPER}; }
  .wtn-fi-chain__list { display: flex; flex-direction: column; gap: 24px; max-width: 900px; margin: 0 auto; }
  .wtn-fi-chainrow {
    background: ${FI.CREAM_SOFT};
    border: 1px solid rgba(30,90,85,0.10);
    padding: 20px 24px;
  }
  .wtn-fi-chainrow__head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
  .wtn-fi-chainrow__name { font-family: Georgia, serif; font-size: 18px; color: ${FI.DEEP_FOREST_DK}; margin: 0; }
  .wtn-fi-chainrow__pct { font-weight: 800; color: ${FI.SEAL_TERRACOTTA}; font-size: 16px; }
  .wtn-fi-chainrow__track {
    height: 12px; width: 100%;
    background: rgba(3,96,92,0.08);
    overflow: hidden; margin-bottom: 12px;
  }
  .wtn-fi-chainrow__bar {
    height: 100%;
    background: linear-gradient(90deg, ${FI.MEADOW_GOLD}, ${FI.SEAL_TERRACOTTA});
    transition: width 800ms ease;
  }
  .wtn-fi-chainrow__note { margin: 0; font-size: 14px; color: ${FI.INK}; opacity: 0.82; line-height: 1.55; }

  /* Impact Stats — on gold bg */
  .wtn-fi-stats { background: ${FI.MEADOW_GOLD}; }
  .wtn-fi-stats__grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
  }
  .wtn-fi-stat { text-align: center; }
  .wtn-fi-stat__disc {
    width: 100px; height: 100px; border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    color: ${FI.CREAM}; font-family: Georgia, serif;
    font-size: 26px; font-weight: 800; letter-spacing: -0.02em;
    margin-bottom: 16px;
    border: 3px solid ${FI.FOREST_SHADOW};
  }
  .wtn-fi-stat__label {
    font-family: Georgia, serif; font-size: 18px;
    color: ${FI.FOREST_SHADOW}; margin: 0 0 6px; line-height: 1.2;
  }
  .wtn-fi-stat__text { font-size: 13.5px; color: ${FI.FOREST_SHADOW}; opacity: 0.82; margin: 0; line-height: 1.55; }

  /* Stories */
  .wtn-fi-stories { background: ${FI.PAPER}; }
  .wtn-fi-story {
    display: grid; grid-template-columns: 1.1fr 1.4fr; gap: 40px;
    align-items: center;
    background: ${FI.CREAM_SOFT};
    border: 1px solid rgba(30,90,85,0.10);
    margin-bottom: 32px;
    overflow: hidden;
  }
  .wtn-fi-story--flip { grid-template-columns: 1.4fr 1.1fr; }
  .wtn-fi-story--flip .wtn-fi-story__img { order: 2; }
  .wtn-fi-story--flip .wtn-fi-story__body { order: 1; }
  .wtn-fi-story__img { position: relative; height: 100%; min-height: 320px; overflow: hidden; }
  .wtn-fi-story__img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .wtn-fi-story__body { padding: 32px 36px; }
  .wtn-fi-story__eyebrow {
    display: inline-block;
    background: ${FI.MEADOW_GOLD}; color: ${FI.FOREST_SHADOW};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 800; padding: 5px 10px; margin-bottom: 12px;
  }
  .wtn-fi-story__name {
    font-family: Georgia, serif; font-size: clamp(22px, 2.4vw, 30px);
    color: ${FI.DEEP_FOREST_DK}; margin: 0 0 4px; line-height: 1.2;
  }
  .wtn-fi-story__loc {
    font-size: 12.5px; letter-spacing: 0.14em; text-transform: uppercase;
    font-weight: 700; color: ${FI.SOIL_OLIVE}; margin: 0 0 14px;
  }
  .wtn-fi-story__quote {
    font-family: Georgia, serif; font-size: 15.5px;
    color: ${FI.INK}; line-height: 1.65; margin: 0;
    padding-left: 16px; border-left: 3px solid ${FI.MEADOW_GOLD};
  }

  /* Commitments */
  .wtn-fi-commit { background: ${FI.CREAM_SOFT}; }
  .wtn-fi-commit__grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px;
  }
  .wtn-fi-commit__card {
    background: ${FI.CREAM};
    border: 1px solid rgba(30,90,85,0.10);
    padding: 26px 24px;
    display: flex; flex-direction: column;
    transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
  }
  .wtn-fi-commit__card:hover {
    transform: translateY(-4px);
    border-color: ${FI.MEADOW_GOLD};
    box-shadow: 0 10px 24px rgba(15,58,54,0.10);
  }
  .wtn-fi-commit__icon { margin-bottom: 14px; }
  .wtn-fi-commit__title {
    font-family: Georgia, serif; font-size: 20px;
    color: ${FI.DEEP_FOREST_DK}; margin: 0 0 8px; line-height: 1.2;
  }
  .wtn-fi-commit__text { font-size: 14px; color: ${FI.INK}; opacity: 0.82; margin: 0; line-height: 1.55; }

  /* CTA */
  .wtn-fi-cta {
    background: ${FI.FOREST_SHADOW}; color: ${FI.CREAM};
    padding: 80px 28px; text-align: center;
  }
  .wtn-cta__inner { max-width: 780px; margin: 0 auto; }
  .wtn-cta__eyebrow {
    display: inline-block;
    background: ${FI.MEADOW_GOLD}; color: ${FI.FOREST_SHADOW};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 800; padding: 6px 12px; margin-bottom: 18px;
  }
  .wtn-fi-cta h2 {
    font-family: Georgia, serif; font-size: clamp(28px, 3.6vw, 44px);
    color: ${FI.CREAM}; margin: 0 0 12px; line-height: 1.15;
  }
  .wtn-fi-cta p { color: ${FI.CREAM}; opacity: 0.82; font-size: 15.5px; line-height: 1.6; margin: 0 0 26px; }

  /* Responsive */
  @media (max-width: 900px) {
    .wtn-section { padding: 48px 20px 60px; }
    .wtn-fi-hero { padding: 60px 20px 28px; }
    .wtn-fi-cta { padding: 60px 20px; }
    .wtn-fi-stats__grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .wtn-fi-commit__grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
    .wtn-fi-story, .wtn-fi-story--flip {
      grid-template-columns: 1fr; gap: 0;
    }
    .wtn-fi-story--flip .wtn-fi-story__img { order: 0; }
    .wtn-fi-story--flip .wtn-fi-story__body { order: 0; }
    .wtn-fi-story__img { min-height: 240px; }
    .wtn-fi-story__body { padding: 24px; }
  }
  @media (max-width: 560px) {
    .wtn-fi-stats__grid { grid-template-columns: 1fr; }
    .wtn-fi-commit__grid { grid-template-columns: 1fr; }
    .wtn-fi-chainrow { padding: 16px 18px; }
    .wtn-fi-stat__disc { width: 84px; height: 84px; font-size: 22px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .wtn-fi .wtn-reveal, .wtn-fi .wtn-reveal-group > * { transition: none; }
    .wtn-fi-chainrow__bar { transition: none; }
  }
`;
// ===== NEW REDESIGN — WAVE THEME — END =====

export default FarmerImpact;
