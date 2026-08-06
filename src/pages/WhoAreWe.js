import React, { useEffect } from 'react';
import './WhoAreWe.css';
import { Link } from 'react-router-dom';
import img1001 from '../utils/img1001.webp'
import img1002 from '../utils/img1002.webp'
import img10001 from '../utils/img_10001.webp'

/* ===== OLD CODE — ORIGINAL v1 — START (uncomment to restore) =====
function WhoAreWe() {
  return (
    <div className="who-page">
      <section className="who-hero">
        <div className="who-hero__content">
          <h1 className="who-hero__title">Our Story</h1>
          <p className="who-hero__subtitle">
            Connecting mountain farmers with health-conscious consumers through authentic organic products
          </p>
        </div>
      </section>

      { Quick Links Section }
      <section className="quick-links-section">
        <div className="quick-links-container">
          <h2 className="quick-links-title">Explore More</h2>
          <div className="quick-links-grid">
            <Link to="/who-are-we/traceability" className="quick-link-card">
              <div className="quick-link-icon">🔍</div>
              <h3>Traceability</h3>
              <p>Track your food's journey from farm to table with complete transparency</p>
              <span className="quick-link-arrow">Learn More →</span>
            </Link>
            <Link to="/who-are-we/farmer-impact" className="quick-link-card">
              <div className="quick-link-icon">🌾</div>
              <h3>Farmer Impact</h3>
              <p>Discover how your purchases directly support Himalayan farming communities</p>
              <span className="quick-link-arrow">Learn More →</span>
            </Link>
            <Link to="/who-are-we/recipes" className="quick-link-card">
              <div className="quick-link-icon">👨‍🍳</div>
              <h3>Recipes</h3>
              <p>Explore authentic Himalayan recipes using our organic products</p>
              <span className="quick-link-arrow">Learn More →</span>
            </Link>
            <Link to="/nutrition" className="quick-link-card">
              <div className="quick-link-icon">🍎</div>
              <h3>Nutrition Info</h3>
              <p>Detailed nutritional data and health benefits of all our products</p>
              <span className="quick-link-arrow">Learn More →</span>
            </Link>
            <Link to="/why-it-matters" className="quick-link-card">
              <div className="quick-link-icon">💚</div>
              <h3>Why It Matters</h3>
              <p>See our impact stories, projects, and commitment to sustainable farming</p>
              <span className="quick-link-arrow">Learn More →</span>
            </Link>
            <Link to="/who-are-we/faq" className="quick-link-card">
              <div className="quick-link-icon">ℹ️</div>
              <h3>FAQ</h3>
              <p>See Frequently Asked Quesions</p>
              <span className="quick-link-arrow">Learn More →</span>
            </Link>
          </div>
        </div>
      </section>


      <section className="who-content">
        <div className="who-section">
          <div className="who-section__text">
            <h2>Who We Are</h2>
            <p>
              Orangutan Organics is more than just a brand – we're a bridge between the pristine
              Himalayan mountains and your kitchen. Founded with a mission to bring authentic,
              pure organic products directly from mountain farmers to your table, we ensure
              that every product carries the essence of the Himalayas.
            </p>
            <p>
              Our name, inspired by the orangutan's deep connection with nature, reflects our
              commitment to preserving traditional farming methods while supporting sustainable
              livelihoods for remote mountain communities.
            </p>
          </div>
          <div className="who-section__image">
            <img
              src={img1001}
              alt="Mountain landscape"
            />
          </div>
        </div>

        <div className="who-section who-section--reverse">
          <div className="who-section__text">
            <h2>Our Mission</h2>
            <p>
              We work directly with farmers in remote Himalayan villages, ensuring fair
              compensation and supporting sustainable farming practices. By eliminating
              middlemen, we guarantee authenticity and freshness while empowering local
              communities.
            </p>
            <p>
              Every product we offer is carefully sourced, tested for quality, and processed
              using traditional methods that have been passed down through generations. This
              ensures you get the purest, most nutritious organic products available.
            </p>
          </div>
          <div className="who-section__image">
            <img
              src={img1002}
              alt="Farmers working"
            />
          </div>
        </div>

        <div className="who-values">
          <h2 className="section-title">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>100% Organic</h3>
              <p>
                No chemicals, pesticides, or artificial additives. Just pure, natural goodness
                from the mountains.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Fair Trade</h3>
              <p>
                We ensure farmers receive fair compensation for their hard work, supporting
                sustainable livelihoods.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">🏔️</div>
              <h3>Authenticity</h3>
              <p>
                Direct sourcing from Himalayan farms guarantees the authenticity and quality
                of every product.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">♻️</div>
              <h3>Sustainability</h3>
              <p>
                We promote eco-friendly farming practices that preserve the Himalayan
                ecosystem for future generations.
              </p>
            </div>
          </div>
        </div>

        <div className="who-impact">
          <h2 className="section-title">Our Impact</h2>
          <div className="impact-stats">
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Farmer Families Supported</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Organic Certified Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5+</div>
              <div className="stat-label">Himalayan Villages</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
          </div>
        </div>

        <div className="who-cta">
          <h2>Join Our Journey</h2>
          <p>
            When you choose Orangutan Organics, you're not just buying products – you're
            supporting mountain farmers, preserving traditional farming methods, and investing
            in your health with the purest organic products from the Himalayas.
          </p>
          <a href="/products" className="btn btn--primary btn--large">
            Explore Our Products
          </a>
        </div>
      </section>
    </div>
  );
}
   ===== OLD CODE — ORIGINAL v1 — END ===== */

// ===== NEW REDESIGN — WAVE THEME — START =====
/* Palette mirrors Home.js so both pages share the exact same brand system. */
const W = {
  // Primary
  BRAND_BROWN:  '#826845',
  BRAND_GREEN:  '#618E69',
  BRAND_TEAL:   '#5D9C9D',
  DEEP_FOREST:  '#03605C',
  // Secondary
  INK:              '#655F59',
  ROSE:             '#B6787F',
  BURGUNDY:         '#95373A',
  SEAL_TERRACOTTA:  '#D76427',
  CREAM:            '#F8F3EB',
  PALE_SAGE:        '#DBD3A8',
  MEADOW_GOLD:      '#B5882D',
  OCHRE:            '#A56650',
  // Derived
  CREAM_SOFT:      '#F1E7CE',
  PAPER:           '#F8F3EB',
  DEEP_FOREST_DK:  '#024442',
  FOREST_SHADOW:   '#013532',
  SKY_PALE:        '#B7CFCF',
  GOLD_LINE:       '#B5882D',
  SOIL_OLIVE:      '#618E69',
  SAGE:            '#618E69',
};

/* ------- Icon disc primitive + brand-style line-art icons ------- */

function IconDisc({ tone, size = 62, children }) {
  return (
    <svg viewBox="0 0 68 68" width={size} height={size} aria-hidden="true" focusable="false">
      <circle cx="34" cy="34" r="33" fill={tone}/>
      <g stroke={W.CREAM} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

const IcoWheat = ({ size }) => (
  <IconDisc tone={W.MEADOW_GOLD} size={size}>
    <path d="M34,16 L34,54"/>
    <path d="M34,22 C30,22 28,20 26,18"/>
    <path d="M34,22 C38,22 40,20 42,18"/>
    <path d="M34,30 C30,30 28,28 26,26"/>
    <path d="M34,30 C38,30 40,28 42,26"/>
    <path d="M34,38 C30,38 28,36 26,34"/>
    <path d="M34,38 C38,38 40,36 42,34"/>
    <path d="M34,46 C30,46 28,44 26,42"/>
    <path d="M34,46 C38,46 40,44 42,42"/>
  </IconDisc>
);

const IcoPot = ({ size }) => (
  <IconDisc tone={W.BRAND_BROWN} size={size}>
    <path d="M16,32 L52,32 L48,52 L20,52 Z"/>
    <path d="M13,32 L55,32"/>
    <path d="M12,28 L18,28 M50,28 L56,28"/>
    <path d="M24,22 C24,18 28,18 28,22 M34,22 C34,18 38,18 38,22 M44,22 C44,18 48,18 48,22"/>
  </IconDisc>
);

const IcoApple = ({ size }) => (
  <IconDisc tone={W.SEAL_TERRACOTTA} size={size}>
    <path d="M22,32 C22,20 32,20 34,26 C36,20 46,20 46,32 C46,44 40,52 34,52 C28,52 22,44 22,32 Z"/>
    <path d="M34,22 C34,16 38,14 42,16"/>
  </IconDisc>
);

const IcoHeart = ({ size }) => (
  <IconDisc tone={W.BURGUNDY} size={size}>
    <path d="M34,50 C22,42 16,32 20,24 C24,18 32,20 34,26 C36,20 44,18 48,24 C52,32 46,42 34,50 Z"/>
  </IconDisc>
);

const IcoInfo = ({ size }) => (
  <IconDisc tone={W.DEEP_FOREST} size={size}>
    <circle cx="34" cy="34" r="18"/>
    <circle cx="34" cy="26" r="1.3" fill={W.CREAM} stroke="none"/>
    <path d="M34,32 L34,44"/>
  </IconDisc>
);

const IcoBlog = ({ size }) => (
  <IconDisc tone={W.ROSE} size={size}>
    <path d="M18,18 L46,18 L50,22 L50,50 L22,50 L18,46 Z"/>
    <path d="M18,18 L18,46 L22,50"/>
    <path d="M26,28 L44,28 M26,34 L44,34 M26,40 L38,40"/>
  </IconDisc>
);

const IcoLeafOrganic = ({ size }) => (
  <IconDisc tone={W.BRAND_GREEN} size={size}>
    <path d="M20,46 C18,30 28,18 46,20 C48,38 38,48 20,46 Z"/>
    <path d="M20,46 L46,20"/>
  </IconDisc>
);

const IcoScales = ({ size }) => (
  <IconDisc tone={W.OCHRE} size={size}>
    <path d="M34,18 L34,52"/>
    <path d="M16,22 L52,22"/>
    <path d="M22,22 L16,34 L28,34 Z"/>
    <path d="M46,22 L40,34 L52,34 Z"/>
    <path d="M26,52 L42,52"/>
  </IconDisc>
);

const IcoShieldCheck = ({ size }) => (
  <IconDisc tone={W.BURGUNDY} size={size}>
    <path d="M34,14 L48,20 L48,34 C48,42 42,50 34,54 C26,50 20,42 20,34 L20,20 Z"/>
    <path d="M28,34 L32,38 L40,28"/>
  </IconDisc>
);

const IcoSapling = ({ size }) => (
  <IconDisc tone={W.BRAND_TEAL} size={size}>
    <path d="M34,52 L34,32"/>
    <path d="M34,38 C28,38 22,34 22,26 C30,26 34,32 34,38"/>
    <path d="M34,38 C40,38 46,34 46,26 C38,26 34,32 34,38"/>
    <path d="M16,52 L52,52"/>
  </IconDisc>
);

/* ------- Wave divider — asymmetric ridgelines, matches Home.js ------- */
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
      {layers[2] && (
        <path d="M0,72 C300,54 520,90 800,72 C1080,54 1260,88 1440,72 L1440,100 L0,100 Z"
              fill={layers[2]} opacity="0.4"/>
      )}
      <path d="M0,34 C220,6 460,74 720,38 C980,2 1220,62 1440,30"
            stroke={W.GOLD_LINE} strokeWidth="1.1" fill="none" opacity="0.45"/>
    </svg>
  );
}

/* ------- Quick-link card data — matches original routes 1:1 ------- */
const QUICK_LINKS = [
  { to: '/who-are-we/farmer-impact',  Icon: IcoWheat,       title: 'Farmer Impact',  text: 'Discover how your purchases directly support Himalayan farming communities' },
  { to: '/who-are-we/recipes',        Icon: IcoPot,         title: 'Recipes',        text: 'Explore authentic Himalayan recipes using our organic products' },
  { to: '/nutrition',                 Icon: IcoApple,       title: 'Nutrition Info', text: 'Detailed nutritional data and health benefits of all our products' },
  { to: '/why-it-matters',            Icon: IcoHeart,       title: 'Why It Matters', text: 'See our impact stories, projects, and commitment to sustainable farming' },
  { to: '/who-are-we/faq',            Icon: IcoInfo,        title: 'FAQ',            text: 'See Frequently Asked Questions' },
  { to: '/blog',                      Icon: IcoBlog,        title: 'Blog',           text: 'Stories from the Himalayas, farming journals, and updates from the valley' },
];

function WhoAreWe() {
  // Scroll-reveal identical to Home.js — single IntersectionObserver, one-shot per element
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.wtn-reveal, .wtn-reveal-group');
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
    .wtn-who, .wtn-who * { box-sizing: border-box; }
    .wtn-who {
      background: ${W.CREAM};
      color: ${W.INK};
      font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
      overflow-x: hidden;
    }

    /* ---------- SHARED SECTION SHELL ---------- */
    .wtn-section { position: relative; padding: 72px 28px 88px; }
    .wtn-section__inner { max-width: 1320px; margin: 0 auto; }
    .wtn-section-head { text-align: center; margin-bottom: 40px; }
    .wtn-eyebrow {
      display: inline-block;
      background: ${W.DEEP_FOREST}; color: ${W.CREAM};
      font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 700; padding: 6px 12px;
    }
    .wtn-h2 {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(28px, 3.4vw, 42px);
      color: ${W.DEEP_FOREST_DK};
      margin: 14px 0 10px; line-height: 1.15; font-weight: 700;
    }
    .wtn-sub {
      max-width: 640px; color: ${W.INK}; opacity: 0.78;
      font-size: 15.5px; line-height: 1.6; margin: 0 auto;
    }
    .wtn-btn {
      display: inline-flex; align-items: center; gap: 8px;
      text-decoration: none;
      padding: 14px 26px; font-size: 12.5px; letter-spacing: 0.24em;
      text-transform: uppercase; font-weight: 700;
      border: 1.5px solid transparent;
      transition: transform 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease;
    }
    .wtn-btn--primary { background: ${W.DEEP_FOREST}; color: ${W.CREAM}; border-color: ${W.DEEP_FOREST}; }
    .wtn-btn--primary:hover { background: ${W.SEAL_TERRACOTTA}; border-color: ${W.SEAL_TERRACOTTA}; transform: translateY(-1px); }
    .wtn-btn--large { padding: 16px 32px; font-size: 13px; }

    /* ---------- HERO ---------- */
    .wtn-who__hero {
      position: relative; background: ${W.CREAM};
      padding: 96px 28px 40px;
      text-align: center;
      overflow: hidden;
    }
    .wtn-who__hero-inner { max-width: 780px; margin: 0 auto; }
    .wtn-who__hero-eyebrow {
      display: inline-block;
      background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM};
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 700; padding: 7px 14px;
    }
    .wtn-who__title {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(36px, 5vw, 60px);
      line-height: 1.04; margin: 18px 0 12px;
      color: ${W.DEEP_FOREST};
      letter-spacing: -0.01em; font-weight: 700;
    }
    .wtn-who__title em {
      font-style: normal; color: ${W.SEAL_TERRACOTTA};
    }
    .wtn-who__rule {
      display: block; width: 220px; max-width: 60%; height: 8px;
      margin: 4px auto 18px;
    }
    .wtn-who__sub {
      color: ${W.INK};
      font-size: clamp(15px, 1.4vw, 17px);
      line-height: 1.65;
      max-width: 640px;
      margin: 0 auto;
    }

    /* Hero on-load reveal + rule draw */
    @keyframes wtn-hero-copy-in {
      from { opacity: 0; transform: translate3d(0, 12px, 0); }
      to   { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    .wtn-who__hero-inner > * { animation: wtn-hero-copy-in 720ms cubic-bezier(0.22, 0.7, 0.2, 1) both; }
    .wtn-who__hero-inner > *:nth-child(1) { animation-delay: 120ms; }
    .wtn-who__hero-inner > *:nth-child(2) { animation-delay: 240ms; }
    .wtn-who__hero-inner > *:nth-child(3) { animation-delay: 360ms; }
    .wtn-who__hero-inner > *:nth-child(4) { animation-delay: 480ms; }

    @keyframes wtn-hero-rule-draw {
      from { stroke-dashoffset: 1000; }
      to   { stroke-dashoffset: 0; }
    }
    .wtn-who__rule path {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: wtn-hero-rule-draw 1.6s cubic-bezier(0.4, 0.55, 0.2, 1) 800ms both;
    }

    /* ---------- QUICK LINKS ---------- */
    .wtn-quicklinks { background: ${W.CREAM_SOFT}; }
    .wtn-ql__grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 26px;
    }
    .wtn-ql-card {
      position: relative;
      background: ${W.CREAM};
      text-decoration: none; color: ${W.INK};
      padding: 26px 24px 24px;
      border: 1px solid rgba(3,96,92,0.10);
      display: flex; flex-direction: column; gap: 12px;
      transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
      overflow: hidden;
    }
    .wtn-ql-card:hover {
      transform: translateY(-4px);
      border-color: ${W.MEADOW_GOLD};
      box-shadow: 0 10px 24px rgba(1,53,50,0.10);
    }
    .wtn-ql-card::after {
      content: "";
      position: absolute; left: -10%; right: -10%; bottom: -1px; height: 6px;
      background:
        radial-gradient(120% 100% at 50% 100%, ${W.MEADOW_GOLD} 0%, transparent 55%);
      opacity: 0;
      transition: opacity 220ms ease;
    }
    .wtn-ql-card:hover::after { opacity: 0.55; }
    .wtn-ql-card__icon {
      width: 62px; height: 62px;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .wtn-ql-card h3 {
      margin: 4px 0 0;
      font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase;
      color: ${W.DEEP_FOREST}; font-weight: 800;
    }
    .wtn-ql-card p {
      margin: 0; font-size: 14px; line-height: 1.6;
      color: ${W.INK}; opacity: 0.78;
    }
    .wtn-ql-arrow {
      margin-top: auto; padding-top: 8px;
      font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
      font-weight: 700; color: ${W.SEAL_TERRACOTTA};
      border-top: 1px dashed rgba(3,96,92,0.18);
    }

    /* ---------- TWO-COLUMN STORY / MISSION ---------- */
    .wtn-story  { background: ${W.PAPER}; }
    .wtn-mission { background: ${W.CREAM_SOFT}; }
    .wtn-two-col {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 56px; align-items: center;
    }
    .wtn-two-col--reverse .wtn-two-col__text { order: 2; }
    .wtn-two-col--reverse .wtn-two-col__img  { order: 1; }
    .wtn-two-col__text .wtn-eyebrow { background: ${W.DEEP_FOREST}; color: ${W.CREAM}; }
    .wtn-two-col__text .wtn-h2 { margin-top: 12px; }
    .wtn-two-col__text p {
      color: ${W.INK}; font-size: 15.5px; line-height: 1.75;
      margin: 12px 0 0;
    }
    .wtn-two-col__img {
      position: relative; overflow: hidden;
      border: 1.5px solid rgba(3,96,92,0.18);
      aspect-ratio: 5 / 4;
    }
    .wtn-two-col__img img {
      display: block; width: 100%; height: 100%; object-fit: cover;
    }
    .wtn-two-col__img-wave {
      position: absolute; left: 0; right: 0; bottom: -1px;
      width: 100%; height: 32px; pointer-events: none;
    }

    /* ---------- CORE VALUES (on meadow gold band) ---------- */
    .wtn-values { background: ${W.MEADOW_GOLD}; }
    .wtn-values .wtn-eyebrow { background: ${W.FOREST_SHADOW}; color: ${W.CREAM}; }
    .wtn-values .wtn-h2 { color: ${W.FOREST_SHADOW}; }
    .wtn-values__grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
    }
    .wtn-value-card {
      background: ${W.CREAM};
      padding: 26px 22px 26px;
      border: 1px solid rgba(15,58,54,0.15);
      display: flex; flex-direction: column; gap: 12px;
    }
    .wtn-value-card__icon {
      width: 60px; height: 60px;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .wtn-value-card h3 {
      margin: 0;
      font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase;
      color: ${W.DEEP_FOREST}; font-weight: 800;
    }
    .wtn-value-card p {
      margin: 0; font-size: 14px; line-height: 1.6;
      color: ${W.INK}; opacity: 0.82;
    }

    /* ---------- IMPACT STATS ---------- */
    .wtn-impact { background: ${W.CREAM}; }
    .wtn-stats__grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
    }
    .wtn-stat {
      position: relative;
      text-align: center;
      padding: 32px 20px 30px;
      background: ${W.CREAM_SOFT};
      border: 1px solid rgba(3,96,92,0.12);
    }
    .wtn-stat::before {
      content: "";
      display: block;
      width: 40px; height: 3px;
      background: ${W.MEADOW_GOLD};
      margin: 0 auto 14px;
    }
    .wtn-stat__num {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(34px, 3.6vw, 46px);
      font-weight: 700;
      color: ${W.DEEP_FOREST};
      line-height: 1;
    }
    .wtn-stat__label {
      margin-top: 10px;
      font-size: 11.5px; letter-spacing: 0.22em; text-transform: uppercase;
      font-weight: 700; color: ${W.INK};
    }

    /* ---------- CTA ---------- */
    .wtn-cta {
      background: ${W.DEEP_FOREST_DK};
      color: ${W.CREAM};
      text-align: center;
      padding: 64px 28px 80px;
    }
    .wtn-cta__inner { max-width: 780px; margin: 0 auto; }
    .wtn-cta__eyebrow {
      display: inline-block;
      background: ${W.MEADOW_GOLD}; color: ${W.FOREST_SHADOW};
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 800; padding: 6px 12px;
    }
    .wtn-cta h2 {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(28px, 3.4vw, 42px);
      margin: 14px 0 12px; color: ${W.CREAM}; line-height: 1.15;
    }
    .wtn-cta p {
      font-size: 16px; opacity: 0.9; margin: 0 0 26px; color: ${W.CREAM};
      max-width: 620px; margin-left: auto; margin-right: auto;
    }
    .wtn-cta .wtn-btn--primary {
      background: ${W.MEADOW_GOLD}; color: ${W.FOREST_SHADOW}; border-color: ${W.MEADOW_GOLD};
    }
    .wtn-cta .wtn-btn--primary:hover {
      background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM}; border-color: ${W.SEAL_TERRACOTTA};
    }

    /* ---------- SCROLL REVEAL ---------- */
    .wtn-reveal {
      opacity: 0;
      transform: translate3d(0, 28px, 0);
      transition:
        opacity 900ms cubic-bezier(0.22, 0.7, 0.2, 1),
        transform 900ms cubic-bezier(0.22, 0.7, 0.2, 1);
      will-change: opacity, transform;
    }
    .wtn-reveal.is-inview { opacity: 1; transform: translate3d(0, 0, 0); }
    .wtn-reveal--from-left { transform: translate3d(-40px, 0, 0); }
    .wtn-reveal--from-left.is-inview { transform: translate3d(0, 0, 0); }
    .wtn-reveal--from-right { transform: translate3d(40px, 0, 0); }
    .wtn-reveal--from-right.is-inview { transform: translate3d(0, 0, 0); }
    .wtn-reveal--scale { transform: scale(0.94) translate3d(0, 18px, 0); }
    .wtn-reveal--scale.is-inview { transform: scale(1) translate3d(0, 0, 0); }

    .wtn-reveal-group > * {
      opacity: 0;
      transform: translate3d(0, 32px, 0) scale(0.96);
      transition:
        opacity 850ms cubic-bezier(0.22, 0.7, 0.2, 1),
        transform 850ms cubic-bezier(0.22, 0.7, 0.2, 1);
      will-change: opacity, transform;
    }
    .wtn-reveal-group.is-inview > * {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
    }
    .wtn-reveal-group.is-inview > *:nth-child(1)  { transition-delay:  60ms; }
    .wtn-reveal-group.is-inview > *:nth-child(2)  { transition-delay: 140ms; }
    .wtn-reveal-group.is-inview > *:nth-child(3)  { transition-delay: 220ms; }
    .wtn-reveal-group.is-inview > *:nth-child(4)  { transition-delay: 300ms; }
    .wtn-reveal-group.is-inview > *:nth-child(5)  { transition-delay: 380ms; }
    .wtn-reveal-group.is-inview > *:nth-child(6)  { transition-delay: 460ms; }
    .wtn-reveal-group.is-inview > *:nth-child(7)  { transition-delay: 540ms; }
    .wtn-reveal-group.is-inview > *:nth-child(8)  { transition-delay: 620ms; }

    /* ---------- RESPONSIVE ---------- */
    @media (max-width: 960px) {
      .wtn-section { padding: 56px 24px 68px; }
      .wtn-ql__grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
      .wtn-two-col { grid-template-columns: 1fr; gap: 32px; }
      .wtn-two-col--reverse .wtn-two-col__text { order: 1; }
      .wtn-two-col--reverse .wtn-two-col__img  { order: 2; }
      .wtn-values__grid { grid-template-columns: repeat(2, 1fr); }
      .wtn-stats__grid  { grid-template-columns: repeat(2, 1fr); }
      .wtn-who__hero { padding: 72px 22px 32px; }
    }
    @media (max-width: 560px) {
      .wtn-section { padding: 44px 18px 56px; }
      .wtn-ql__grid { grid-template-columns: 1fr; }
      .wtn-values__grid { grid-template-columns: 1fr; }
      .wtn-stats__grid  { grid-template-columns: 1fr 1fr; }
      .wtn-who__hero { padding: 56px 18px 24px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .wtn-reveal, .wtn-reveal-group > *,
      .wtn-who__hero-inner > *, .wtn-who__rule path {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
        animation: none !important;
        stroke-dashoffset: 0 !important;
      }
      .wtn-ql-card { transition: none; }
    }
  `;

  return (
    <div className="wtn-who">
      <style>{scopedStyles}</style>

      {/* ============ HERO ============ */}
      <section className="wtn-who__hero">
        <div className="wtn-who__hero-inner">
          <span className="wtn-who__hero-eyebrow">Our Story</span>
          <h1 className="wtn-who__title">
            We are the <em>forest people</em>.
          </h1>
          <svg className="wtn-who__rule" viewBox="0 0 280 8" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path
              d="M0,4 C40,0 80,8 120,4 C160,0 200,7 240,4 C260,3 270,5 280,4"
              stroke={W.GOLD_LINE} strokeWidth="1.6" fill="none" strokeLinecap="round"
              pathLength="1000"
            />
          </svg>
          <p className="wtn-who__sub">
            Orang Utan means exactly that — and that is who grows your food.
          </p>
        </div>
      </section>

      <WaveDivider height={70} palette={[W.CREAM_SOFT]} />

      {/* ============ QUICK LINKS ============ */}
      <section className="wtn-section wtn-quicklinks">
        <div className="wtn-section__inner">
          <div className="wtn-section-head">
            <span className="wtn-eyebrow wtn-reveal">Explore</span>
            <h2 className="wtn-h2 wtn-reveal">Explore More</h2>
          </div>
          <div className="wtn-ql__grid wtn-reveal-group">
            {QUICK_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="wtn-ql-card">
                <div className="wtn-ql-card__icon"><l.Icon size={62} /></div>
                <h3>{l.title}</h3>
                <p>{l.text}</p>
                <span className="wtn-ql-arrow">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider height={80} palette={[W.PAPER, W.CREAM_SOFT]} flip />

      {/* ============ WHO WE ARE ============ */}
      <section className="wtn-section wtn-story">
        <div className="wtn-section__inner">
          <div className="wtn-two-col">
            <div className="wtn-two-col__text wtn-reveal wtn-reveal--from-left">
              <span className="wtn-eyebrow">The Valley</span>
              <h2 className="wtn-h2">It begins at 7,500 feet.</h2>
              <p>
                Our home is Bhangeli, a village in the Gangotri Valley of Uttarakhand, perched
                at 7,500 ft where the air is thin and the seasons are long. Around it, our farms
                and foraging grounds rise and fall across the mountains — red rice at 5,000 ft
                in Purola, rajma at 8,500 ft in the Mori valley, wild Jimbu foraged at 11,410 ft,
                above the treeline. Every crop grows at the altitude that suits it best.
              </p>
            </div>
            <div className="wtn-two-col__img wtn-reveal wtn-reveal--from-right">
              <img src={img1001} alt="Mountain landscape" loading="lazy" />
              <svg className="wtn-two-col__img-wave" viewBox="0 0 400 32" preserveAspectRatio="none"
                   aria-hidden="true" focusable="false">
                <path d="M0,16 C80,2 160,26 220,14 C280,2 340,22 400,10 L400,32 L0,32 Z" fill={W.PAPER}/>
                <path d="M0,18 C80,4 160,28 220,16 C280,4 340,24 400,12"
                      stroke={W.GOLD_LINE} strokeWidth="1" fill="none" opacity="0.55"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider height={80} palette={[W.CREAM_SOFT]} />

      {/* ============ MISSION ============ */}
      <section className="wtn-section wtn-mission">
        <div className="wtn-section__inner">
          <div className="wtn-two-col wtn-two-col--reverse">
            <div className="wtn-two-col__text wtn-reveal wtn-reveal--from-right">
              <span className="wtn-eyebrow">The Altitude</span>
              <h2 className="wtn-h2">Altitude changes everything.</h2>
              <p>
                Up here, nothing grows fast. Thin air, fierce sun, cold nights and mineral-rich
                glacial soil force each plant to grow slowly and densely — concentrating flavour
                and nutrition in a way no lowland farm can rush. This isn&apos;t a marketing line.
                It&apos;s the reason our red rice carries the antioxidants it does, and our wild
                spice carries more calcium, gram for gram, than milk.
              </p>
            </div>
            <div className="wtn-two-col__img wtn-reveal wtn-reveal--from-left">
              <img src={img1002} alt="Farmers working" loading="lazy" />
              <svg className="wtn-two-col__img-wave" viewBox="0 0 400 32" preserveAspectRatio="none"
                   aria-hidden="true" focusable="false">
                <path d="M0,16 C80,2 160,26 220,14 C280,2 340,22 400,10 L400,32 L0,32 Z" fill={W.CREAM_SOFT}/>
                <path d="M0,18 C80,4 160,28 220,16 C280,4 340,24 400,12"
                      stroke={W.GOLD_LINE} strokeWidth="1" fill="none" opacity="0.55"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider height={80} palette={[W.PAPER, W.CREAM_SOFT]} flip />

      {/* ============ THE MAKERS ============ */}
      <section className="wtn-section wtn-story">
        <div className="wtn-section__inner">
          <div className="wtn-two-col">
            <div className="wtn-two-col__text wtn-reveal wtn-reveal--from-left">
              <span className="wtn-eyebrow">The Makers</span>
              <h2 className="wtn-h2">Grown by the women of the mountains.</h2>
              <p>
                The people who grow your food are, in the truest sense, its makers. The women
                of Bhangeli and the valleys around it farm the way their mothers and grandmothers
                did — by hand, in small batches, once a year. No middlemen. No anonymous supply
                chain. Their work reaches you exactly as they made it, and their name is on
                every batch.
              </p>
            </div>
            <div className="wtn-two-col__img wtn-reveal wtn-reveal--from-right">
              <img src={img10001} alt="Women farmers of the Gangotri Valley" loading="lazy" />
              <svg className="wtn-two-col__img-wave" viewBox="0 0 400 32" preserveAspectRatio="none"
                   aria-hidden="true" focusable="false">
                <path d="M0,16 C80,2 160,26 220,14 C280,2 340,22 400,10 L400,32 L0,32 Z" fill={W.PAPER}/>
                <path d="M0,18 C80,4 160,28 220,16 C280,4 340,24 400,12"
                      stroke={W.GOLD_LINE} strokeWidth="1" fill="none" opacity="0.55"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider height={90} palette={[W.MEADOW_GOLD, W.OCHRE]} />

      {/* ============ CORE VALUES ============ */}
      <section className="wtn-section wtn-values">
        <div className="wtn-section__inner">
          <div className="wtn-section-head">
            <span className="wtn-eyebrow wtn-reveal">Values</span>
            <h2 className="wtn-h2 wtn-reveal">Our Core Values</h2>
          </div>
          <div className="wtn-values__grid wtn-reveal-group">
            <div className="wtn-value-card">
              <div className="wtn-value-card__icon"><IcoLeafOrganic size={60} /></div>
              <h3>100% Organic</h3>
              <p>No chemicals, pesticides, or artificial additives. Just pure, natural goodness from the mountains.</p>
            </div>
            <div className="wtn-value-card">
              <div className="wtn-value-card__icon"><IcoScales size={60} /></div>
              <h3>Fair Trade</h3>
              <p>We ensure farmers receive fair compensation for their hard work, supporting sustainable livelihoods.</p>
            </div>
            <div className="wtn-value-card">
              <div className="wtn-value-card__icon"><IcoShieldCheck size={60} /></div>
              <h3>Authenticity</h3>
              <p>Direct sourcing from Himalayan farms guarantees the authenticity and quality of every product.</p>
            </div>
            <div className="wtn-value-card">
              <div className="wtn-value-card__icon"><IcoSapling size={60} /></div>
              <h3>Sustainability</h3>
              <p>We promote eco-friendly farming practices that preserve the Himalayan ecosystem for future generations.</p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider height={80} palette={[W.CREAM, W.CREAM_SOFT]} flip />

      {/* ============ IMPACT STATS ============ */}
      <section className="wtn-section wtn-impact">
        <div className="wtn-section__inner">
          <div className="wtn-section-head">
            <span className="wtn-eyebrow wtn-reveal">Impact</span>
            <h2 className="wtn-h2 wtn-reveal">Our Impact</h2>
          </div>
          <div className="wtn-stats__grid wtn-reveal-group">
            <div className="wtn-stat">
              <div className="wtn-stat__num">50+</div>
              <div className="wtn-stat__label">Farmer Families Supported</div>
            </div>
            <div className="wtn-stat">
              <div className="wtn-stat__num">100%</div>
              <div className="wtn-stat__label">Organic Certified Products</div>
            </div>
            <div className="wtn-stat">
              <div className="wtn-stat__num">5+</div>
              <div className="wtn-stat__label">Himalayan Villages</div>
            </div>
            <div className="wtn-stat">
              <div className="wtn-stat__num">1000+</div>
              <div className="wtn-stat__label">Happy Customers</div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider height={90} palette={[W.SOIL_OLIVE, W.DEEP_FOREST, W.DEEP_FOREST_DK]} flip />

      {/* ============ CTA ============ */}
      <section className="wtn-cta">
        <div className="wtn-cta__inner wtn-reveal wtn-reveal--scale">
          <span className="wtn-cta__eyebrow">Join Us</span>
          <h2>Join Our Journey</h2>
          <p>
            When you choose Orangutan Organics, you&apos;re not just buying products — you&apos;re
            supporting mountain farmers, preserving traditional farming methods, and investing
            in your health with the purest organic products from the Himalayas.
          </p>
          <a href="/products" className="wtn-btn wtn-btn--primary wtn-btn--large">
            Explore Our Products
          </a>
        </div>
      </section>
    </div>
  );
}
// ===== NEW REDESIGN — WAVE THEME — END =====

export default WhoAreWe;
