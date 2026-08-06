import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../utils/products';
import { getDiscountedPrice, hasDiscount, getDiscount, DISCOUNT_CONFIG } from '../utils/discounts';
import { isBestseller } from '../utils/bestsellers';
import ImageCarousel from '../components/ImageCarousel';
import PageLoader from '../components/PageLoader';
import heroVideo from '../utils/home_vid.mp4';
import img11 from "../utils/img_11.webp";
import img12 from "../utils/img_12.webp";
import img13 from "../utils/img_13.webp";
import mountainMobileAvif from '../utils/mountain_1.avif';
import mountainMobileWebp from '../utils/mountain_1.webp';   // 2880 × 1889 — tall aspect for phones/tablets
import mountainDesktopAvif from '../utils/mountain_2.avif';
import mountainDesktopWebp from '../utils/mountain_2.webp';  // 16035 × 5534 — wide letterbox for desktop
import whyImg from '../utils/img1001.webp';
import trustFarmAltitude from '../utils/base_altitude.webp';
import trustWomenFarmer from '../utils/women_farmer.webp';
import trustPlantProtein from '../utils/platnt_protein.webp';
// import trustHowToCook from '../utils/how_to_cook.webp';
import trustGiTag from '../utils/gi_tag.webp';
import trustAltChange from '../utils/alt_change.webp';
import './Home.css';

/* ===== OLD CODE — ORIGINAL v1 — START (uncomment to restore) =====
function Home() {
  return (
    <div className="home">
      <section className="hero">
        <video
          className="hero__video"
          autoPlay
          controls
          muted
          loop
          playsInline
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      { Features }
      <section className="features">
        <div className="feature">
          <div className="feature__icon">
            <img src={img1} alt="Himalayan Sourced" loading="lazy" />
          </div>
          <h3 className="feature__title">Himalayan Sourced</h3>
          <p className="feature__text">Directly from pristine mountain farms</p>
        </div>
        <div className="feature">
          <div className="feature__icon">
            <img src={img2} alt="100% Organic" loading="lazy" />
          </div>
          <h3 className="feature__title">100% Organic</h3>
          <p className="feature__text">No chemicals or pesticides</p>
        </div>
        <div className="feature">
          <div className="feature__icon">
            <img src={img3} alt="Traceability" loading="lazy" />
          </div>
          <h3 className="feature__title">Traceability</h3>
          <p className="feature__text">Track your food from farm to table</p>
        </div>
        <div className="feature">
          <div className="feature__icon">
            <img src={img4} alt="Support Farmers" loading="lazy" />
          </div>
          <h3 className="feature__title">Support Farmers</h3>
          <p className="feature__text">Fair prices for mountain communities</p>
        </div>
      </section>

      { Featured Products }
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">Our Products</h2>
          <p className="section-subtitle">
            Discover our range of authentic Himalayan organic products
          </p>
        </div>

        <div className="products-grid">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="section-cta">
          <Link to="/products" className="btn btn--primary">
            View All Products
          </Link>
        </div>
      </section>

      { Why Choose Us }
      <section className="why-section">
        <h2 className="section-title">Why Choose Orang Utan Organics?</h2>
        <div className="why-images-container">
          <img
            src={img11}
            alt="Himalayan farming"
            className="why-image"
            loading="lazy"
          />
          <img
            src={img12}
            alt="Organic products"
            className="why-image"
            loading="lazy"
          />
          <img
            src={img13}
            alt="Traditional methods"
            className="why-image"
            loading="lazy"
          />
        </div>

        <div className="why-grid">
          <div className="why-card">
            <h3>Rooted in the Himalayas</h3>
            <p>
              Every grain and drop comes from our mountain farms above 2,000 m — pure soil,
              glacier water, and clean air. We grow slow, so your food can stay real.
            </p>
          </div>
          <div className="why-card">
            <h3>Farmer-First Promise</h3>
            <p>
              We work shoulder-to-shoulder with Himalayan farmers — not middlemen. Every purchase sustains rural families, revives native seeds, and keeps mountain livelihoods alive.
            </p>
          </div>
          <div className="why-card">
            <h3>Traceable & Transparent</h3>
            <p>
              Scan a QR on your pack to trace your food back to its village, harvest batch, and farmer story. No hidden supply chain, no marketing fluff — just the truth behind your food.
            </p>
          </div>
          <div className="why-card">
            <h3>Crafted the Traditional Way</h3>
            <p>
              Bilona-churned ghee, hand-cleaned pulses, sun-dried grains — our methods are timeless because they work. We preserve nutrition and heritage in every batch.
            </p>
          </div>
          <div className="why-card">
            <h3>Regenerative by Design</h3>
            <p>
              From compost-back initiatives to low-water farming, we grow in ways that heal soil and protect the Himalayas. Sustainability isn't a buzzword here — it's survival.
            </p>
          </div>
          <div className="why-card">
            <h3>Pure Nutrition, No Pretence</h3>
            <p>
              No refined oils. No preservatives. No shortcuts. Just small-batch Himalayan food, rich in native nutrients and natural taste — the way nature intended.
            </p>
          </div>
        </div>
      </section>

      { CTA Section }
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience Pure Himalayan Goodness?</h2>
          <p>Start your journey to healthier living with our organic products</p>
          <Link to="/products" className="btn btn--primary btn--large">
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }) {
  const minPrice = Math.min(...product.variants.map(v => v.price));
  const maxPrice = Math.max(...product.variants.map(v => v.price));

  const hasProductDiscount = hasDiscount(product.name);
  const discountPercent = getDiscount(product.name);
  const minDiscountedPrice = getDiscountedPrice(minPrice, product.name);
  const maxDiscountedPrice = getDiscountedPrice(maxPrice, product.name);

  const priceDisplay = minPrice === maxPrice
    ? `₹${minPrice}`
    : `₹${minPrice} - ₹${maxPrice}`;

  const discountedPriceDisplay = minDiscountedPrice === maxDiscountedPrice
    ? `₹${minDiscountedPrice}`
    : `₹${minDiscountedPrice} - ₹${maxDiscountedPrice}`;

  const isProductBestseller = isBestseller(product.name);

  const carouselImages = product.images || [product.image];

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-card__image">
        <ImageCarousel images={carouselImages} alt={product.name} />
        <span className="product-card__badge">{product.category}</span>
        {isProductBestseller && (
          <span className="product-card__bestseller">Bestseller</span>
        )}
        {hasProductDiscount && DISCOUNT_CONFIG.showTag && (
          <span className="product-card__discount-tag">
            {DISCOUNT_CONFIG.tagLabel} {discountPercent}%
          </span>
        )}
      </div>
      <div className="product-card__content">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description.substring(0, 80)}...</p>
        <div className="product-card__benefits">
          {product.benefits.slice(0, 3).map((benefit, idx) => (
            <span key={idx} className="benefit-tag">{benefit}</span>
          ))}
        </div>
        <div className="product-card__footer">
          <div className="product-card__prices">
            {hasProductDiscount ? (
              <>
                <span className="product-card__price--original">{priceDisplay}</span>
                <span className="product-card__price--discounted">{discountedPriceDisplay}</span>
              </>
            ) : (
              <span className="product-card__price">{priceDisplay}</span>
            )}
          </div>
          <span className="product-card__link">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
   ===== OLD CODE — ORIGINAL v1 — END ===== */

// ===== NEW REDESIGN — WAVE THEME — START =====
/* Palette (client-supplied):
   Primary   #826845 #618E69 #5D9C9D #03605C
   Secondary #655F59 #B6787F #95373A #D76427 #F8F3EB #DBD3A8 #B5882D #A56650 */
const H = {
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

  // Derived tones (kept within family of the supplied palette)
  CREAM_SOFT:      '#F1E7CE',
  PAPER:           '#F8F3EB',
  DEEP_FOREST_DK:  '#024442',
  FOREST_SHADOW:   '#013532',
  SKY:             '#5D9C9D',
  SKY_PALE:        '#B7CFCF',
  PEAK_BLUE:       '#03605C',
  PEAK_BLUE_DK:    '#024442',
  MUSTARD:         '#B5882D',
  GOLD_LINE:       '#B5882D',
  SOIL_OLIVE:      '#618E69',
  SAGE:            '#618E69',
};

/* ------- Brand icon medallions — line-art on tinted disc, mirroring the OUO icon system ------- */

function IconDisc({ tone, children, size = 68 }) {
  return (
    <svg viewBox="0 0 68 68" width={size} height={size} aria-hidden="true" focusable="false">
      <circle cx="34" cy="34" r="33" fill={tone}/>
      <g stroke={H.CREAM} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

const IcoFarmAltitude = ({ size }) => (
  <IconDisc tone={H.BRAND_TEAL} size={size}>
    <path d="M12,42 L22,26 L28,34 L34,24 L42,38 L48,30 L56,42"/>
    <path d="M14,50 C22,44 30,52 40,46 C48,42 52,50 56,48" opacity="0.85"/>
  </IconDisc>
);

const IcoWomenFarmers = ({ size }) => (
  <IconDisc tone={H.BRAND_BROWN} size={size}>
    <circle cx="26" cy="24" r="4"/>
    <path d="M20,44 C22,34 30,34 32,44"/>
    <circle cx="42" cy="24" r="4"/>
    <path d="M36,44 C38,34 46,34 48,44"/>
    <path d="M12,52 C22,46 46,46 56,52"/>
  </IconDisc>
);

const IcoPlantProtein = ({ size }) => (
  <IconDisc tone={H.BRAND_GREEN} size={size}>
    <ellipse cx="34" cy="26" rx="7" ry="9"/>
    <path d="M26,36 C22,44 28,50 34,48 C40,50 46,44 42,36"/>
    <path d="M34,20 L34,50"/>
  </IconDisc>
);

const IcoHowToCook = ({ size }) => (
  <IconDisc tone={H.MEADOW_GOLD} size={size}>
    <path d="M14,30 L54,30 L50,50 L18,50 Z"/>
    <path d="M14,30 L12,26 M54,30 L56,26"/>
    <path d="M22,22 C22,18 26,18 26,22 M32,22 C32,18 36,18 36,22 M42,22 C42,18 46,18 46,22"/>
  </IconDisc>
);

/* ------- Hero landscape — now a photograph-style artwork (mountain_1.png) ------- */
function HeroLandscape() {
  return (
    /* <picture> lets the browser pick the right art-directed image for the viewport:
         - >= 900px: the wide letterbox (2.9:1) — short enough to fit above-the-fold on desktop
         - default : the tall aspect (1.52:1) — fills phone/tablet screens comfortably
       Only one image is downloaded per client. Alt lives on the fallback <img>. */
    <picture>
      {/* Desktop breakpoint — AVIF first, WebP fallback for older Safari */}
      <source media="(min-width: 900px)" srcSet={mountainDesktopAvif} type="image/avif" />
      <source media="(min-width: 900px)" srcSet={mountainDesktopWebp} type="image/webp" />
      {/* Mobile / default — AVIF first, WebP fallback */}
      <source srcSet={mountainMobileAvif} type="image/avif" />
      <source srcSet={mountainMobileWebp} type="image/webp" />
      <img
        className="wtn-hero__landscape"
        src={mountainMobileWebp}
        alt=""
        aria-hidden="true"
        width="2880"
        height="1889"
        decoding="async"
        loading="eager"
      />
    </picture>
  );
}

/* Generic asymmetric wave divider */
function WaveDivider({ height = 90, palette, flip = false }) {
  const layers = palette || [H.CREAM, H.CREAM_SOFT];
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
            stroke={H.GOLD_LINE} strokeWidth="1.1" fill="none" opacity="0.45"/>
    </svg>
  );
}

/* Wave-cut card image bottom */
function CardWaveCut({ fill = H.CREAM_SOFT }) {
  return (
    <svg className="wtn-pcard__wavecut" viewBox="0 0 400 40" preserveAspectRatio="none"
         aria-hidden="true" focusable="false">
      <path d="M0,20 C80,4 160,32 220,18 C280,4 340,28 400,14 L400,40 L0,40 Z" fill={fill}/>
      <path d="M0,22 C80,6 160,34 220,20 C280,6 340,30 400,16"
            stroke={H.GOLD_LINE} strokeWidth="1" fill="none" opacity="0.55"/>
    </svg>
  );
}

/* Trust medallion — brand PNG logo + label pair */
function Medallion({ title, sub, img, alt }) {
  return (
    <div className="wtn-medal">
      <img src={img} alt={alt || `${title} ${sub}`} className="wtn-medal__img" />
      <div className="wtn-medal__text">
        <div className="wtn-medal__title">{title}</div>
        <div className="wtn-medal__sub">{sub}</div>
      </div>
    </div>
  );
}

function Home() {
  // Scroll-reveal: single IntersectionObserver marks tagged elements when they
  // cross into view. One-shot per element (unobserve after firing). Skipped
  // entirely under prefers-reduced-motion — elements paint instantly.
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
    .wtn-home, .wtn-home * { box-sizing: border-box; }
    .wtn-home {
      background: ${H.CREAM};
      color: ${H.INK};
      font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
      overflow-x: hidden;
    }

    /* ---------- HERO ---------- */
    /* Hero is a two-stack: copy on top, artwork below in normal flow at its
       natural aspect ratio, so the image is never cropped. */
    .wtn-hero {
      position: relative;
      background: ${H.CREAM};
      overflow: hidden;
    }
    .wtn-hero__inner {
      position: relative;
      max-width: 1320px; margin: 0 auto;
      padding: 72px 28px 32px;
      z-index: 2;
    }
    .wtn-hero__copy { max-width: 720px; }
    .wtn-hero__eyebrow {
      display: inline-block;
      background: ${H.SEAL_TERRACOTTA}; color: ${H.CREAM};
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 700; padding: 7px 14px;
    }
    .wtn-hero__title {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(36px, 5.6vw, 66px);
      line-height: 1.02; margin: 18px 0 12px;
      color: ${H.DEEP_FOREST};
      letter-spacing: -0.01em; font-weight: 700;
    }
    .wtn-hero__title em {
      font-style: normal; color: ${H.SEAL_TERRACOTTA};
    }
    .wtn-hero__rule {
      display: block;
      width: 100%; max-width: 280px; height: 8px;
      margin: 6px 0 18px;
    }
    .wtn-hero__sub {
      font-size: clamp(15px, 1.6vw, 18px);
      color: ${H.INK};
      max-width: 620px; line-height: 1.65;
      margin: 0 0 26px;
    }
    .wtn-hero__ctas { display: flex; gap: 14px; flex-wrap: wrap; }

    .wtn-btn {
      display: inline-flex; align-items: center; gap: 8px;
      text-decoration: none;
      padding: 14px 26px; font-size: 12.5px; letter-spacing: 0.24em;
      text-transform: uppercase; font-weight: 700;
      border: 1.5px solid transparent;
      transition: transform 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease;
    }
    .wtn-btn--primary { background: ${H.DEEP_FOREST}; color: ${H.CREAM}; border-color: ${H.DEEP_FOREST}; }
    .wtn-btn--primary:hover { background: ${H.SEAL_TERRACOTTA}; border-color: ${H.SEAL_TERRACOTTA}; transform: translateY(-1px); }
    .wtn-btn--ghost { background: ${H.CREAM}; color: ${H.DEEP_FOREST}; border-color: ${H.DEEP_FOREST}; }
    .wtn-btn--ghost:hover { background: ${H.DEEP_FOREST}; color: ${H.CREAM}; border-color: ${H.DEEP_FOREST}; transform: translateY(-1px); }
    .wtn-btn--large { padding: 16px 32px; font-size: 13px; }

    /* Landscape wrap keeps the image tight to the bottom of the hero with no
       trailing whitespace. line-height:0 kills inline-baseline gap under img. */
    .wtn-hero__landscape-wrap {
      position: relative;
      // top:0.1px;
      width: 100%;
      line-height: 0;
      overflow: hidden;
    }
    .wtn-hero__landscape {
      display: block;
      width: 100%;
      height: auto;              /* natural aspect */
      vertical-align: bottom;
      user-select: none;
      pointer-events: none;
    }

    /* ---------- ONE on-load hero reveal ---------- */
    /* Image simply fades up — no scale (which was reading as a hazy vignette). */
    @keyframes wtn-hero-img-in {
      from { opacity: 0; transform: translate3d(0, 24px, 0); }
      to   { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    .wtn-hero__landscape {
      animation: wtn-hero-img-in 1.2s cubic-bezier(0.2, 0.75, 0.2, 1) 250ms both;
      will-change: transform, opacity;
    }

    /* Gold ridgeline under the title — the small line animation drawing itself
       in left → right after the title lands. Uses pathLength=1000 so timing is
       independent of viewport width. */
    @keyframes wtn-hero-rule-draw {
      from { stroke-dashoffset: 1000; }
      to   { stroke-dashoffset: 0; }
    }
    .wtn-hero__rule path {
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: wtn-hero-rule-draw 1.6s cubic-bezier(0.4, 0.55, 0.2, 1) 900ms both;
    }

    /* Copy gently fades up */
    @keyframes wtn-copy-in {
      from { opacity: 0; transform: translate3d(0, 10px, 0); }
      to   { opacity: 1; transform: translate3d(0, 0, 0); }
    }
    .wtn-hero__copy > * { animation: wtn-copy-in 720ms cubic-bezier(0.2, 0.7, 0.2, 1) both; }
    .wtn-hero__copy > *:nth-child(1) { animation-delay: 140ms; }
    .wtn-hero__copy > *:nth-child(2) { animation-delay: 260ms; }
    .wtn-hero__copy > *:nth-child(3) { animation-delay: 380ms; }
    .wtn-hero__copy > *:nth-child(4) { animation-delay: 500ms; }
    .wtn-hero__copy > *:nth-child(5) { animation-delay: 620ms; }

    /* ---------- WATCH SECTION (video moved here) ---------- */
    .wtn-watch {
      background: ${H.CREAM};
      padding: 72px 28px 80px;
    }
    .wtn-watch__inner {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1.15fr;
      gap: 44px; align-items: center;
    }
    .wtn-watch__copy .wtn-eyebrow { background: ${H.DEEP_FOREST}; color: ${H.CREAM}; }
    .wtn-watch__title {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(26px, 3vw, 40px);
      color: ${H.DEEP_FOREST_DK};
      margin: 14px 0 10px; line-height: 1.15;
    }
    .wtn-watch__sub {
      color: ${H.INK}; opacity: 0.8; font-size: 15.5px;
      line-height: 1.65; margin: 0 0 20px; max-width: 480px;
    }
    .wtn-watch__quote {
      border-left: 2px solid ${H.MEADOW_GOLD};
      padding: 4px 0 4px 14px;
      font-family: Georgia, serif;
      font-style: italic;
      color: ${H.DEEP_FOREST_DK};
      max-width: 460px;
      font-size: 15px;
    }
    .wtn-watch__frame {
      position: relative;
      background: ${H.CREAM_SOFT};
      border: 1.5px solid ${H.DEEP_FOREST};
      padding: 10px 10px 0;
      /* no overflow:hidden — the ticker chip needs to sit visibly on the frame edge */
    }
    .wtn-watch__frame video {
      display: block; width: 100%; height: auto;
      background: #000;
    }
    .wtn-watch__frame-wave {
      display: block; width: 100%; height: 42px; margin-top: -2px;
    }
    .wtn-watch__ticker {
      /* Sits inside the frame, top-left corner, always visible over the video */
      position: absolute;
      top: 22px; left: 22px;
      background: ${H.MEADOW_GOLD}; color: ${H.DEEP_FOREST_DK};
      font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 800; padding: 6px 12px;
      box-shadow: 0 2px 6px rgba(1, 53, 50, 0.35);
      z-index: 2;
      pointer-events: none;
    }

    /* ---------- TRUST STRIP ---------- */
    .wtn-trust { background: ${H.CREAM}; padding: 36px 28px 24px; }
    .wtn-trust__inner {
      max-width: 1200px; margin: 0 auto;
      display: flex; gap: 28px; align-items: center; justify-content: center;
      flex-wrap: wrap;
    }
    .wtn-medal { display: flex; align-items: center; gap: 12px; }
    .wtn-medal__img {
      width: 62px; height: 62px;
      object-fit: contain; display: block;
      flex: 0 0 auto;
    }
    .wtn-trust__badge {
      object-fit: contain; display: block;
      flex: 0 0 auto;
    }
    .wtn-medal__title {
      font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase;
      font-weight: 700; color: ${H.DEEP_FOREST_DK};
    }
    .wtn-medal__sub {
      font-size: 13.5px; font-weight: 800; color: ${H.DEEP_FOREST};
      margin-top: 2px;
    }

    /* ---------- SECTION SHELL ---------- */
    .wtn-section { position: relative; padding: 64px 28px 80px; }
    .wtn-section__inner { max-width: 1320px; margin: 0 auto; }
    .wtn-eyebrow {
      display: inline-block;
      background: ${H.DEEP_FOREST}; color: ${H.CREAM};
      font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 700; padding: 6px 12px;
    }
    .wtn-h2 {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(28px, 3.4vw, 42px);
      color: ${H.DEEP_FOREST_DK};
      margin: 14px 0 10px; line-height: 1.15;
    }
    .wtn-sub {
      max-width: 640px; color: ${H.INK}; opacity: 0.78;
      font-size: 15.5px; line-height: 1.6; margin: 0 0 32px;
    }
    .wtn-h2-rule { display: block; width: 84px; height: 6px; margin: 0 0 16px; }

    /* ---------- FEATURES ---------- */
    .wtn-features { background: ${H.CREAM_SOFT}; }
    .wtn-features__grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px;
    }
    .wtn-feature { text-align: center; padding: 24px 16px; }
    .wtn-feature__icon {
      width: 78px; height: 78px; margin: 0 auto 14px;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .wtn-feature__title {
      font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;
      color: ${H.DEEP_FOREST}; font-weight: 700; margin: 0 0 6px;
    }
    .wtn-feature__text {
      font-size: 14px; color: ${H.INK}; opacity: 0.78; margin: 0;
    }

    /* ---------- PRODUCTS ---------- */
    .wtn-products { background: ${H.PAPER}; }
    .wtn-products__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 28px;
    }
    .wtn-pcard {
      position: relative;
      background: ${H.CREAM_SOFT};
      text-decoration: none; color: ${H.INK};
      display: flex; flex-direction: column;
      border: 1px solid rgba(30,90,85,0.10);
      transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
      overflow: hidden;
    }
    .wtn-pcard:hover {
      transform: translateY(-4px);
      border-color: ${H.MEADOW_GOLD};
      box-shadow: 0 10px 24px rgba(15,58,54,0.10);
    }
    .wtn-pcard__imgwrap {
      position: relative; overflow: hidden;
      background: ${H.CREAM};
      height: 240px;
    }
    /* Force the internal carousel + image to fill the wrap.
       .carousel is 100% wide but has no height by default. */
    .wtn-pcard__imgwrap .carousel,
    .wtn-pcard__imgwrap .carousel__container,
    .wtn-pcard__imgwrap .carousel__image-container {
      height: 100%; width: 100%;
    }
    .wtn-pcard__imgwrap .carousel__image {
      width: 100%; height: 100%; object-fit: cover;
      border-radius: 0;
    }
    .wtn-pcard__wavecut {
      position: absolute; left: 0; right: 0; bottom: -1px;
      width: 100%; height: 32px; pointer-events: none;
      z-index: 3;
    }
    .wtn-pcard__badge {
      position: absolute; top: 12px; left: 12px; z-index: 4;
      background: ${H.DEEP_FOREST}; color: ${H.CREAM};
      font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
      font-weight: 700; padding: 5px 10px;
    }
    .wtn-pcard__best {
      position: absolute; top: 12px; right: 12px; z-index: 4;
      background: ${H.MEADOW_GOLD}; color: ${H.FOREST_SHADOW};
      font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
      font-weight: 800; padding: 5px 10px;
    }
    .wtn-pcard__disc {
      position: absolute; bottom: 44px; right: 12px; z-index: 4;
      background: ${H.SEAL_TERRACOTTA}; color: ${H.CREAM};
      font-size: 11px; font-weight: 800; padding: 6px 10px;
      letter-spacing: 0.05em;
    }
    .wtn-pcard__body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 10px; }
    .wtn-pcard__name {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: 20px; color: ${H.DEEP_FOREST_DK}; margin: 0;
      letter-spacing: -0.005em; line-height: 1.2;
    }
    .wtn-pcard__desc {
      font-size: 13.5px; color: ${H.INK}; opacity: 0.75;
      margin: 0; line-height: 1.55;
    }
    .wtn-pcard__benefits { display: flex; flex-wrap: wrap; gap: 6px; }
    .wtn-btag {
      font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
      font-weight: 600; color: ${H.SOIL_OLIVE};
      background: rgba(168,185,117,0.18);
      padding: 4px 8px; border: 1px solid rgba(111,131,64,0.28);
    }
    .wtn-pcard__foot {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: 6px; padding-top: 12px;
      border-top: 1px dashed rgba(30,90,85,0.18);
    }
    .wtn-pcard__price { font-weight: 700; color: ${H.DEEP_FOREST_DK}; font-size: 15px; }
    .wtn-pcard__price--strike {
      text-decoration: line-through; color: ${H.INK}; opacity: 0.5;
      font-size: 13px; font-weight: 500; margin-right: 6px;
    }
    .wtn-pcard__price--now { color: ${H.SEAL_TERRACOTTA}; font-weight: 800; font-size: 15px; }
    .wtn-pcard__go {
      font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
      font-weight: 700; color: ${H.DEEP_FOREST};
    }
    .wtn-products__cta { text-align: center; margin-top: 40px; }

    /* ---------- WHY ---------- */
    .wtn-why { background: ${H.MEADOW_GOLD}; }
    .wtn-why .wtn-h2 { color: ${H.FOREST_SHADOW}; }
    .wtn-why .wtn-sub { color: ${H.FOREST_SHADOW}; opacity: 0.85; }
    .wtn-why .wtn-eyebrow { background: ${H.FOREST_SHADOW}; color: ${H.CREAM}; }
    .wtn-why__images {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 18px; margin-bottom: 40px;
    }
    .wtn-why__img {
      width: 100%; aspect-ratio: 4 / 3; object-fit: cover;
      border: 1.5px solid ${H.FOREST_SHADOW};
    }
    .wtn-why__grid {
      display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;
    }
    .wtn-wcard {
      background: ${H.CREAM};
      padding: 24px 22px 26px;
      border: 1px solid rgba(15,58,54,0.15);
    }
    .wtn-wcard h3 {
      margin: 0 0 10px;
      font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase;
      color: ${H.DEEP_FOREST}; font-weight: 800;
    }
    .wtn-wcard p {
      margin: 0; font-size: 14px; line-height: 1.6;
      color: ${H.INK}; opacity: 0.8;
    }

    /* ---------- CTA ---------- */
    .wtn-cta {
      background: ${H.DEEP_FOREST_DK};
      color: ${H.CREAM};
      text-align: center;
    }
    .wtn-cta__inner { max-width: 800px; margin: 0 auto; padding: 20px 28px 40px; }
    .wtn-cta h2 {
      font-family: Georgia, "Iowan Old Style", serif;
      font-size: clamp(26px, 3.2vw, 40px);
      margin: 8px 0 12px; color: ${H.CREAM};
    }
    .wtn-cta p { font-size: 16px; opacity: 0.85; margin: 0 0 24px; color: ${H.CREAM}; }
    .wtn-cta .wtn-btn--primary {
      background: ${H.MEADOW_GOLD}; color: ${H.FOREST_SHADOW}; border-color: ${H.MEADOW_GOLD};
    }
    .wtn-cta .wtn-btn--primary:hover {
      background: ${H.SEAL_TERRACOTTA}; color: ${H.CREAM}; border-color: ${H.SEAL_TERRACOTTA};
    }
    .wtn-cta__eyebrow {
      display: inline-block;
      background: ${H.MEADOW_GOLD}; color: ${H.FOREST_SHADOW};
      font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 800; padding: 6px 12px;
    }

    /* ---------- SCROLL-REVEAL SYSTEM ----------
       Slow, curvy, organic. Signature move: eyebrow chips slide in from the
       left (like a stamp being placed), while headings and cards "settle" from
       scale(0.96) + translateY — the "grains falling into place" feel. */
    .wtn-reveal {
      opacity: 0;
      transform: translate3d(0, 28px, 0);
      transition:
        opacity 900ms cubic-bezier(0.22, 0.7, 0.2, 1),
        transform 900ms cubic-bezier(0.22, 0.7, 0.2, 1);
      will-change: opacity, transform;
    }
    .wtn-reveal.is-inview {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
    .wtn-reveal--from-left {
      transform: translate3d(-40px, 0, 0);
    }
    .wtn-reveal--from-left.is-inview {
      transform: translate3d(0, 0, 0);
    }
    .wtn-reveal--from-right {
      transform: translate3d(40px, 0, 0);
    }
    .wtn-reveal--from-right.is-inview {
      transform: translate3d(0, 0, 0);
    }
    .wtn-reveal--scale {
      transform: scale(0.94) translate3d(0, 18px, 0);
    }
    .wtn-reveal--scale.is-inview {
      transform: scale(1) translate3d(0, 0, 0);
    }

    /* Staggered container — children reveal one after another */
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

    /* Medallions "settle" — slight rotation as they arrive, like they're
       being pressed into place */
    .wtn-reveal-group--medallions > * {
      transform: translate3d(0, 22px, 0) scale(0.7) rotate(-10deg);
      transform-origin: center;
    }
    .wtn-reveal-group--medallions.is-inview > * {
      transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
    }

    @media (prefers-reduced-motion: reduce) {
      .wtn-reveal, .wtn-reveal-group > * {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
    }

    /* ---------- RESPONSIVE ---------- */

    /* Desktop (>= 900px): three linked things happen ---------------------
       (a) <picture> serves the wide letterbox mountain_2 (short height)
       (b) Copy typography compressed so it fits in the space above the image
       (c) Hero becomes a flex-column pinned to the viewport height minus the
           sticky nav — copy vertically centres in the top space, image is
           auto-margined to the bottom so its bottom edge ALWAYS meets the
           viewport bottom on load. */
    @media (min-width: 900px) {
      /* (b) — typography compression */
      .wtn-hero__inner  { padding: 40px 28px 20px; }
      .wtn-hero__title  { font-size: clamp(34px, 4vw, 52px); line-height: 0.98; margin: 12px 0 8px; letter-spacing: -0.02em; }
      .wtn-hero__rule   { max-width: 240px; height: 7px; margin: 4px 0 12px; }
      .wtn-hero__sub    { font-size: clamp(14px, 1.2vw, 16px); margin: 0 0 20px; max-width: 560px; line-height: 1.55; }
      .wtn-hero__eyebrow{ font-size: 10.5px; padding: 6px 12px; }
      .wtn-hero .wtn-btn{ padding: 12px 22px; font-size: 11.5px; min-width: 220px; justify-content: center; }

      /* CTAs stay in normal flow — stacked vertically, just below the sub. */
      .wtn-hero__ctas {
        flex-direction: column;
        align-items: flex-start;
        gap: 12px;
      }

      /* (c) — image becomes an absolute backdrop pinned to the bottom of the
         hero at its natural aspect. Copy stays in normal flow at the top and
         sits on top via z-index. Where they overlap visually, text wins. */
      .wtn-hero {
        min-height: calc(100vh - 120px);
        min-height: calc(100dvh - 120px);
        /* position:relative already set in the base rule — kept for clarity */
      }
      .wtn-hero__inner {
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: 1320px;
        margin: 0 auto;
      }
      .wtn-hero__landscape-wrap {
        position: absolute;
        left: 0;
        right: 0;
        /* Negative bottom nudges the image DOWN a bit so its top edge sits
           lower on the hero. hero has overflow:hidden so the tiny sliver
           that extends below the hero baseline is safely clipped. */
        bottom: -40px;
        z-index: 1;
        line-height: 0;
        pointer-events: none;
      }
      .wtn-hero__landscape {
        display: block;
        width: 100%;
        height: auto;
        vertical-align: bottom;
      }
    }

    @media (max-width: 960px) {
      .wtn-watch__inner { grid-template-columns: 1fr; gap: 28px; }
      .wtn-features__grid { grid-template-columns: repeat(2, 1fr); }
      .wtn-why__images { grid-template-columns: repeat(2, 1fr); }
      .wtn-why__grid { grid-template-columns: repeat(2, 1fr); }
      .wtn-hero__inner { padding: 52px 20px 28px; }
    }
    @media (max-width: 560px) {
      .wtn-features__grid { grid-template-columns: 1fr 1fr; gap: 16px; }
      .wtn-why__images { grid-template-columns: 1fr; }
      .wtn-why__grid { grid-template-columns: 1fr; }
      .wtn-section { padding: 44px 18px 60px; }
      .wtn-trust__inner { gap: 18px; }
      .wtn-hero__inner { padding: 36px 18px 24px; }
      .wtn-pcard__imgwrap { height: 220px; }
      .wtn-watch { padding: 52px 20px 60px; }
    }

    @media (prefers-reduced-motion: reduce) {
      .wtn-hero__landscape,
      .wtn-hero__copy > * {
        animation: none !important;
        opacity: 1 !important;
        transform: none !important;
      }
      .wtn-hero__rule path {
        animation: none !important;
        stroke-dashoffset: 0 !important;
      }
      .wtn-pcard { transition: none; }
    }
  `;

  return (
    <div className="wtn-home">
      <style>{scopedStyles}</style>

      {/* Landing-page loader — self-dismisses on window.load (max 3.5s fallback) */}
      <PageLoader />

      {/* ============ HERO ============ */}
      <section className="wtn-hero">
        <div className="wtn-hero__inner">
          <div className="wtn-hero__copy">
            {/* <span className="wtn-hero__eyebrow">Hand-picked · Sun-dried · Unpolished</span> */}
            <h1 className="wtn-hero__title">
              From the lap of the Himalayas, <em>to your kitchen.</em>
            </h1>
            {/* Gold ridgeline rule — draws itself in from left to right on load */}
            <svg className="wtn-hero__rule" viewBox="0 0 280 8" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path
                d="M0,4 C40,0 80,8 120,4 C160,0 200,7 240,4 C260,3 270,5 280,4"
                stroke={H.GOLD_LINE} strokeWidth="1.6" fill="none" strokeLinecap="round"
                pathLength="1000"
              />
            </svg>
            <p className="wtn-hero__sub">
              Grains, pulses, ghee and wild honey - grown by mountain farmers in the Gangotri Valley, and traceable to the very hands that harvested them.
            </p>
            <div className="wtn-hero__ctas">
              <Link to="/products" className="wtn-btn wtn-btn--primary">Shop the Harvest</Link>
              <a href="https://orangutanorganics.net/farmers" className="wtn-btn wtn-btn--ghost" target="_blank" rel="noreferrer">Meet the Farmers</a>
            </div>
          </div>
        </div>
        <div className="wtn-hero__landscape-wrap">
          <HeroLandscape />
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="wtn-trust" aria-label="Trust markers">
        <div className="wtn-trust__inner wtn-reveal-group wtn-reveal-group--medallions">
          <Medallion title="Base Altitude" sub="7,500 FT"      img={trustFarmAltitude} />
          <Medallion title="Grown By"      sub="Women Farmers" img={trustWomenFarmer} />
          <Medallion title="Complete"      sub="Plant Protein" img={trustPlantProtein} />
          {/* <Medallion title="Traditional"   sub="How to Cook"   img={trustHowToCook} /> */}
          <img src={trustGiTag}     alt="GI Tag Uttarakhand"        className="wtn-trust__badge" style={{ width: 72, height: 72 }} />
          <img src={trustAltChange} alt="Altitude changes everything" className="wtn-trust__badge" style={{ width: 82, height: 82 }} />
        </div>
      </section>

      {/* ============ WATCH — video moved here, side-by-side with copy ============ */}
      <section className="wtn-watch" aria-label="Our story">
        <div className="wtn-watch__inner">
          <div className="wtn-watch__copy wtn-reveal wtn-reveal--from-left">
            <span className="wtn-eyebrow">Our Story</span>
            <h2 className="wtn-watch__title">Walked down from 7,500 feet.</h2>
            <p className="wtn-watch__sub">
              Bhangeli, our home in the Gangotri Valley, sits at 7,500 ft. Around it - some farms highter, some lower - the women who grew up on these slopes still farm the way the mountains taught them: by hand, once a year, sun dried and carried down exactly as the land gave it.
            </p>
            <p className="wtn-watch__quote">
              &ldquo;Nothing added, nothing removed. Just the land, and the hands that worked it.&rdquo;
            </p>
          </div>
          <div className="wtn-watch__frame wtn-reveal wtn-reveal--from-right">
            <span className="wtn-watch__ticker">Watch · 90s</span>
            <video autoPlay muted loop playsInline controls>
              <source src={heroVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <svg className="wtn-watch__frame-wave" viewBox="0 0 400 42" preserveAspectRatio="none"
                 aria-hidden="true" focusable="false">
              <path d="M0,20 C80,4 160,32 220,18 C280,4 340,28 400,14 L400,42 L0,42 Z"
                    fill={H.CREAM_SOFT}/>
              <path d="M0,22 C80,6 160,34 220,20 C280,6 340,30 400,16"
                    stroke={H.GOLD_LINE} strokeWidth="1" fill="none" opacity="0.7"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ============ WHY IT MATTERS — shared-element scroll transition ============ */}
      <WhyItMattersTransition />

      {/* wave into products (flipped so it feels like a descent) */}
      <WaveDivider height={80} palette={[H.PAPER, H.CREAM_SOFT]} flip />

      {/* ============ PRODUCTS ============ */}
      {/* NEW: horizontal pinned scroll. First 3 cards visible; strip
          scrolls left as the user scrolls the page down. Falls back to a
          vertical grid on mobile (see .wtn-hscroll media query).
          The previous vertical grid lives commented-out inside
          <HorizontalProducts /> for easy restore. */}
      <HorizontalProducts />

      {/* wave into why (descending into meadow gold) */}
      <WaveDivider height={90} palette={[H.MEADOW_GOLD, H.OCHRE]} />

      {/* ============ WHY ============ */}
      <section className="wtn-section wtn-why">
        <div className="wtn-section__inner">
          <div style={{ marginBottom: 30 }}>
            <span className="wtn-eyebrow wtn-reveal wtn-reveal--from-left">Why Us</span>
            <h2 className="wtn-h2 wtn-reveal" style={{ marginBottom: 6 }}>Why Choose Orang Utan Organics?</h2>
            <svg className="wtn-h2-rule" viewBox="0 0 84 6" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d="M0,3 C18,0 38,6 56,3 C72,0 80,4 84,3" stroke={H.FOREST_SHADOW} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="wtn-why__images wtn-reveal-group">
            <img src={img11} alt="Himalayan farming" className="wtn-why__img" loading="lazy" />
            <img src={img12} alt="Organic products" className="wtn-why__img" loading="lazy" />
            <img src={img13} alt="Traditional methods" className="wtn-why__img" loading="lazy" />
          </div>

          <div className="wtn-why__grid wtn-reveal-group">
            <div className="wtn-wcard">
              <h3>Rooted in the Himalayas</h3>
              <p>Every grain and drop comes from our mountain farms above 2,000 m — pure soil, glacier water, and clean air. We grow slow, so your food can stay real.</p>
            </div>
            <div className="wtn-wcard">
              <h3>Farmer-First Promise</h3>
              <p>We work shoulder-to-shoulder with Himalayan farmers — not middlemen. Every purchase sustains rural families, revives native seeds, and keeps mountain livelihoods alive.</p>
            </div>
            <div className="wtn-wcard">
              <h3>Traceable &amp; Transparent</h3>
              <p>Scan a QR on your pack to trace your food back to its village, harvest batch, and farmer story. No hidden supply chain, no marketing fluff — just the truth behind your food.</p>
            </div>
            <div className="wtn-wcard">
              <h3>Crafted the Traditional Way</h3>
              <p>Bilona-churned ghee, hand-cleaned pulses, sun-dried grains — our methods are timeless because they work. We preserve nutrition and heritage in every batch.</p>
            </div>
            <div className="wtn-wcard">
              <h3>Regenerative by Design</h3>
              <p>From compost-back initiatives to low-water farming, we grow in ways that heal soil and protect the Himalayas. Sustainability isn't a buzzword here — it's survival.</p>
            </div>
            <div className="wtn-wcard">
              <h3>Pure Nutrition, No Pretence</h3>
              <p>No refined oils. No preservatives. No shortcuts. Just small-batch Himalayan food, rich in native nutrients and natural taste — the way nature intended.</p>
            </div>
          </div>
        </div>
      </section>

      {/* wave into CTA (descending into deep forest) */}
      <WaveDivider height={90} palette={[H.SOIL_OLIVE, H.DEEP_FOREST, H.DEEP_FOREST_DK]} flip />

      {/* ============ CTA ============ */}
      <section className="wtn-section wtn-cta">
        <div className="wtn-cta__inner wtn-reveal wtn-reveal--scale">
          <span className="wtn-cta__eyebrow">Get Started</span>
          <h2>Ready to Experience Pure Himalayan Goodness?</h2>
          <p>Start your journey to healthier living with our organic products.</p>
          <Link to="/products" className="wtn-btn wtn-btn--primary wtn-btn--large">
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }) {
  const minPrice = Math.min(...product.variants.map(v => v.price));
  const maxPrice = Math.max(...product.variants.map(v => v.price));

  const hasProductDiscount = hasDiscount(product.name);
  const discountPercent = getDiscount(product.name);
  const minDiscountedPrice = getDiscountedPrice(minPrice, product.name);
  const maxDiscountedPrice = getDiscountedPrice(maxPrice, product.name);

  const priceDisplay = minPrice === maxPrice
    ? `₹${minPrice}`
    : `₹${minPrice} - ₹${maxPrice}`;

  const discountedPriceDisplay = minDiscountedPrice === maxDiscountedPrice
    ? `₹${minDiscountedPrice}`
    : `₹${minDiscountedPrice} - ₹${maxDiscountedPrice}`;

  const isProductBestseller = isBestseller(product.name);
  const carouselImages = product.images || [product.image];

  return (
    <Link to={`/products/${product.id}`} className="wtn-pcard">
      <div className="wtn-pcard__imgwrap">
        <ImageCarousel images={carouselImages} alt={product.name} />
        <span className="wtn-pcard__badge">{product.category}</span>
        {isProductBestseller && (
          <span className="wtn-pcard__best">Bestseller</span>
        )}
        {hasProductDiscount && DISCOUNT_CONFIG.showTag && (
          <span className="wtn-pcard__disc">
            {DISCOUNT_CONFIG.tagLabel} {discountPercent}%
          </span>
        )}
        <CardWaveCut />
      </div>
      <div className="wtn-pcard__body">
        <h3 className="wtn-pcard__name">{product.name}</h3>
        <p className="wtn-pcard__desc">{product.description.substring(0, 80)}...</p>
        <div className="wtn-pcard__benefits">
          {product.benefits.slice(0, 3).map((benefit, idx) => (
            <span key={idx} className="wtn-btag">{benefit}</span>
          ))}
        </div>
        <div className="wtn-pcard__foot">
          <div>
            {hasProductDiscount ? (
              <>
                <span className="wtn-pcard__price--strike">{priceDisplay}</span>
                <span className="wtn-pcard__price--now">{discountedPriceDisplay}</span>
              </>
            ) : (
              <span className="wtn-pcard__price">{priceDisplay}</span>
            )}
          </div>
          <span className="wtn-pcard__go">View →</span>
        </div>
      </div>
    </Link>
  );
}
// ===== NEW REDESIGN — WAVE THEME — END =====

/* ===================================================================
   HorizontalProducts
   Pinned horizontal scroll. The section is tall enough to provide
   scroll runway equal to the overflow width of the card strip. As
   the user scrolls vertically through the section, the strip is
   translated horizontally by the same amount — so it feels like the
   page scroll is driving the horizontal reveal.

   No GSAP dependency. Uses the same rAF-throttled scroll listener
   pattern as WhyItMattersTransition. On mobile (≤900px) the pinning
   is dropped and cards fall back to a horizontal-swipe strip so
   phone users still get a working experience.
================================================================== */
function HorizontalProducts() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const strip = stripRef.current;
    if (!section || !pin || !strip) return;

    let rafId = 0;
    let horizontalScrollLength = 0;

    // Measure the sticky nav so the pin's content starts BELOW it. Without
    // this the nav overlays the pinned header (only the sub-copy peeks out).
    // Falls back to 100px if the nav isn't found.
    const measureNav = () => {
      const navEl =
        document.querySelector('.wtn-header') ||
        document.querySelector('header');
      const h = navEl ? navEl.getBoundingClientRect().height : 100;
      pin.style.setProperty('--nav-h', `${h}px`);
    };

    // Recompute the horizontal runway + total section height on mount and
    // on resize. Section height = 100vh (pin window) + horizontal overflow.
    // That gives a natural 1:1 scrub between page scroll and strip travel.
    // Applies at ALL viewport sizes — mobile uses the same pin + transform
    // as desktop, just with wider slides (per media queries in CSS).
    const refresh = () => {
      measureNav();
      horizontalScrollLength = Math.max(0, strip.scrollWidth - window.innerWidth);
      section.style.height = `calc(100vh + ${horizontalScrollLength}px)`;
      compute();
    };

    // JS-driven pinning: we don't use position:sticky because .wtn-home
    // has overflow-x:hidden which breaks sticky on descendants. Instead
    // we toggle the pin between position:absolute (before/after) and
    // position:fixed (during) based on the section's viewport position.
    // The three states are continuous — the pin is visually anchored at
    // the same on-screen y-coordinate across the boundary, so there is
    // no jump when it switches modes.
    const compute = () => {
      rafId = 0;
      if (horizontalScrollLength <= 0) return;
      const rect = section.getBoundingClientRect();

      if (rect.top >= 0) {
        // Before pin — section hasn't reached the top of the viewport yet.
        pin.style.position = 'absolute';
        pin.style.top = '0';
        pin.style.left = '0';
        pin.style.right = '0';
        strip.style.transform = 'translate3d(0, 0, 0)';
      } else if (-rect.top < horizontalScrollLength) {
        // Pinned — while scrolling within the runway, freeze pin at
        // viewport top and translate the strip by the same delta as the
        // page has scrolled past the section top.
        pin.style.position = 'fixed';
        pin.style.top = '0';
        pin.style.left = '0';
        pin.style.right = '0';
        const p = -rect.top / horizontalScrollLength;
        strip.style.transform = `translate3d(${-horizontalScrollLength * p}px, 0, 0)`;
      } else {
        // After pin — anchor pin at the bottom of the section so the next
        // section can flow naturally underneath.
        pin.style.position = 'absolute';
        pin.style.top = `${horizontalScrollLength}px`;
        pin.style.left = '0';
        pin.style.right = '0';
        strip.style.transform = `translate3d(${-horizontalScrollLength}px, 0, 0)`;
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(compute);
    };

    refresh();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', refresh);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', refresh);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="wtn-hscroll" aria-label="Our Products">
      <style>{HSCROLL_STYLES}</style>

      <div ref={pinRef} className="wtn-hscroll__pin">
        <div className="wtn-hscroll__head">
          <span className="wtn-eyebrow">The Harvest</span>
          <h2 className="wtn-hscroll__h2">Our Products</h2>
          <p className="wtn-hscroll__sub">
            Discover our range of authentic Himalayan organic products.
          </p>
        </div>

        <div className="wtn-hscroll__viewport">
          <div ref={stripRef} className="wtn-hscroll__strip">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="wtn-hscroll__slide">
                <ProductCard product={product} />
              </div>
            ))}
            {/* Trailing CTA tile — terminator at end of strip */}
            <div className="wtn-hscroll__slide wtn-hscroll__slide--cta">
              <Link to="/products" className="wtn-hscroll__ctacard">
                <span className="wtn-hscroll__ctaEyebrow">Full Harvest</span>
                <h3 className="wtn-hscroll__ctaTitle">See every product from the valley</h3>
                <span className="wtn-btn wtn-btn--primary">View All Products →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const HSCROLL_STYLES = `
  /* Section is a positioning context for the JS-driven pin.
     Height is set dynamically in JS to 100vh + strip overflow. */
  .wtn-hscroll {
    position: relative;
    background: ${H.PAPER};
  }
  /* Pin fills exactly one viewport. Position is toggled by JS between
     absolute/fixed/absolute so it stays anchored during horizontal scroll.
     padding-top uses --nav-h (set in JS from the real nav bar height) so
     the pinned header sits BELOW the sticky nav instead of behind it. */
  .wtn-hscroll__pin {
    position: absolute; top: 0; left: 0; right: 0;
    height: 100vh;
    display: flex; flex-direction: column;
    overflow: hidden;
    padding: calc(var(--nav-h, 100px) + 20px) 0 24px;
    box-sizing: border-box;
    background: ${H.PAPER};
  }
  /* Compact header — kept tight so header + one row of cards fits inside 100vh. */
  .wtn-hscroll__head {
    text-align: center;
    padding: 0 28px 16px;
    max-width: 1320px; margin: 0 auto;
    flex: 0 0 auto;
  }
  .wtn-hscroll__h2 {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(24px, 2.8vw, 34px);
    color: ${H.DEEP_FOREST_DK};
    margin: 10px 0 6px; line-height: 1.15;
  }
  .wtn-hscroll__sub {
    max-width: 560px; margin: 0 auto;
    color: ${H.INK}; opacity: 0.78;
    font-size: 14.5px; line-height: 1.55;
  }
  /* Strip viewport takes remaining vertical space and centers the cards. */
  .wtn-hscroll__viewport {
    flex: 1 1 auto;
    display: flex; align-items: center;
    overflow: hidden;
    width: 100%;
    min-height: 0;
  }
  .wtn-hscroll__strip {
    display: flex; flex-wrap: nowrap;
    align-items: stretch;
    padding-left: 4vw; padding-right: 4vw;
    will-change: transform;
  }
  /* ~3 cards visible on a typical desktop (30vw × 3 = 90vw, plus edge padding). */
  .wtn-hscroll__slide {
    flex: 0 0 30vw;
    max-width: 440px; min-width: 280px;
    padding: 0 12px;
    box-sizing: border-box;
    display: flex;
  }
  .wtn-hscroll__slide .wtn-pcard { width: 100%; }
  /* Image height derived from viewport so the whole card fits inside the
     remaining vertical space, regardless of screen height. */
  .wtn-hscroll__slide .wtn-pcard__imgwrap { height: clamp(180px, 30vh, 260px); }

  /* Trailing CTA card — same visual weight as a product card. */
  .wtn-hscroll__slide--cta { align-items: stretch; }
  .wtn-hscroll__ctacard {
    display: flex; flex-direction: column; justify-content: center;
    text-align: center; text-decoration: none;
    background: ${H.DEEP_FOREST}; color: ${H.CREAM};
    padding: 28px 24px;
    border: 1px solid ${H.DEEP_FOREST_DK};
    transition: transform 220ms ease, background 220ms ease;
    width: 100%;
  }
  .wtn-hscroll__ctacard:hover { transform: translateY(-4px); background: ${H.DEEP_FOREST_DK}; }
  .wtn-hscroll__ctaEyebrow {
    display: inline-block; align-self: center;
    background: ${H.MEADOW_GOLD}; color: ${H.FOREST_SHADOW};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 800; padding: 6px 12px; margin-bottom: 16px;
  }
  .wtn-hscroll__ctaTitle {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(20px, 2vw, 26px);
    color: ${H.CREAM}; line-height: 1.2;
    margin: 0 0 20px;
  }
  .wtn-hscroll__ctacard .wtn-btn { align-self: center; }

  /* -------- MOBILE / TABLET --------
     Same pin + JS-driven horizontal scroll as desktop. We only tune slide
     width and image height so the cards read well on smaller screens. */
  @media (max-width: 900px) {
    .wtn-hscroll__pin { padding-top: calc(var(--nav-h, 100px) + 14px); }
    .wtn-hscroll__head { padding: 0 20px 12px; }
    .wtn-hscroll__h2 { font-size: clamp(22px, 4.4vw, 28px); margin: 6px 0 4px; }
    .wtn-hscroll__sub { font-size: 13.5px; }
    .wtn-hscroll__strip {
      padding-left: 6vw; padding-right: 6vw;
    }
    .wtn-hscroll__slide {
      flex: 0 0 62vw;
      max-width: none; min-width: 0;
      padding: 0 8px;
    }
    .wtn-hscroll__slide .wtn-pcard__imgwrap { height: clamp(160px, 22vh, 220px); }
  }
  @media (max-width: 560px) {
    .wtn-hscroll__slide { flex: 0 0 76vw; padding: 0 6px; }
    .wtn-hscroll__slide .wtn-pcard__imgwrap { height: clamp(150px, 20vh, 200px); }
  }
`;

/* ===================================================================
   WhyItMattersTransition
   Two sections, one shared <img> (position:fixed) that:
     1) RISES up from below the fold as the hero scrolls into view
        (image top follows heroRect.top from vh → 0)
     2) SHRINKS + slides into an invisible target rect in the next
        section (visible on screen the whole time)
     3) After landing, keeps tracking the target's live rect so it
        scrolls naturally with the page.
================================================================== */
function WhyItMattersTransition() {
  const heroRef = useRef(null);
  const targetRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    const easeInOutCubic = (x) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

    let rafId = 0;
    const compute = () => {
      rafId = 0;
      const hero = heroRef.current;
      const target = targetRef.current;
      const img = imgRef.current;
      if (!hero || !target || !img) return;

      const heroRect = hero.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const heroH = hero.offsetHeight;

      let top, left, w, h, radius, opacity, overlayOp, textOp;

      if (heroRect.top >= vh) {
        // Pre-rise: hero fully below the fold — image off-screen at bottom
        top = vh; left = 0; w = vw; h = vh;
        radius = 0; opacity = 0; overlayOp = 0; textOp = 0;
      } else if (heroRect.top > 0) {
        // RISE — image slides up from below with the hero itself
        const p = 1 - heroRect.top / vh; // 0 → 1
        top = heroRect.top;
        left = 0; w = vw; h = vh;
        radius = 0;
        opacity = 1;
        overlayOp = 0.45 * p;
        textOp = p; // heading fades in as the image rises
      } else if (heroRect.top > -heroH) {
        // SHRINK — hero scrolls out; image morphs toward the live target
        const p = -heroRect.top / heroH; // 0 → 1
        const t = easeInOutCubic(p);
        // Predict target position at p=1 (scroll runway remaining)
        const scrollRemaining = (1 - p) * heroH;
        const endTop  = targetRect.top - scrollRemaining;
        const endLeft = targetRect.left;
        const endW    = targetRect.width;
        const endH    = targetRect.height;
        top  = 0 + endTop  * t;
        left = 0 + endLeft * t;
        w    = vw + (endW - vw) * t;
        h    = vh + (endH - vh) * t;
        radius = 16 * t;
        opacity = 1;
        overlayOp = 0.45 * (1 - t);
        textOp = Math.max(0, 1 - t * 2.4);
      } else {
        // POST-shrink: image locked to the live target rect (scrolls with page)
        top = targetRect.top;
        left = targetRect.left;
        w = targetRect.width;
        h = targetRect.height;
        radius = 16;
        opacity = 1; overlayOp = 0; textOp = 0;
        // Graceful fade-out once the target scrolls above the viewport
        if (targetRect.bottom < 120) {
          opacity = Math.max(0, targetRect.bottom / 120);
        }
      }

      img.style.opacity = String(opacity);
      img.style.top    = `${top}px`;
      img.style.left   = `${left}px`;
      img.style.width  = `${w}px`;
      img.style.height = `${h}px`;
      img.style.borderRadius = `${radius}px`;

      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.opacity = String(opacity * overlayOp);
        overlay.style.top    = `${top}px`;
        overlay.style.left   = `${left}px`;
        overlay.style.width  = `${w}px`;
        overlay.style.height = `${h}px`;
        overlay.style.borderRadius = `${radius}px`;
      }

      const heroText = heroTextRef.current;
      if (heroText) {
        const finalTextOp = opacity * textOp;
        heroText.style.opacity = String(finalTextOp);
        heroText.style.top    = `${top}px`;
        heroText.style.left   = `${left}px`;
        heroText.style.width  = `${w}px`;
        heroText.style.height = `${h}px`;
        heroText.style.visibility = finalTextOp < 0.01 ? 'hidden' : 'visible';
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{WIM_STYLES}</style>

      {/* Section 1 — hero. 100vh, empty; the shared image (below) rises
          up to fill it as the user scrolls in. */}
      <section ref={heroRef} className="wim-hero" aria-label="Why it matters" />

      {/* Section 2 — split layout. Text on the left, invisible target
          rect on the right marks where the shared image lands. */}
      <section className="wim-next" aria-label="Why it matters — detail">
        <div className="wim-next__inner">
          <div className="wim-next__text">
            <span className="wim-next__eyebrow">Why It Matters</span>
            <h2 className="wim-next__title">Real food, walked down from the mountains</h2>
            <p className="wim-next__body">
              Every grain, every pulse, every drop of ghee is grown above 2,000 m in
              the pristine Himalayas — by farmers we know by name. What lands in your
              kitchen is exactly what the land gave us: whole, seasonal, unpolished.
            </p>
          </div>
          <div ref={targetRef} className="wim-next__target" aria-hidden="true" />
        </div>

        <div className="wim-next__features">
          <div className="wtn-feature">
            <div className="wtn-feature__icon"><IcoFarmAltitude size={70}/></div>
            <h3 className="wtn-feature__title">Himalayan Sourced</h3>
            <p className="wtn-feature__text">Directly from pristine mountain farms</p>
          </div>
          <div className="wtn-feature">
            <div className="wtn-feature__icon"><IcoPlantProtein size={70}/></div>
            <h3 className="wtn-feature__title">100% Organic</h3>
            <p className="wtn-feature__text">No chemicals or pesticides</p>
          </div>
          <div className="wtn-feature">
            <div className="wtn-feature__icon"><IcoHowToCook size={70}/></div>
            <h3 className="wtn-feature__title">Traceability</h3>
            <p className="wtn-feature__text">Track your food from farm to table</p>
          </div>
          <div className="wtn-feature">
            <div className="wtn-feature__icon"><IcoWomenFarmers size={70}/></div>
            <h3 className="wtn-feature__title">Support Farmers</h3>
            <p className="wtn-feature__text">Fair prices for mountain communities</p>
          </div>
        </div>
      </section>

      {/* Shared fixed image — the single element that travels */}
      <img
        ref={imgRef}
        src={whyImg}
        alt="Himalayan farmland"
        className="wim-shared"
        loading="eager"
        decoding="async"
      />
      <div ref={overlayRef} className="wim-shared__overlay" aria-hidden="true" />
      <div ref={heroTextRef} className="wim-shared__text" aria-hidden="true">
        <span className="wim-shared__eyebrow">Why It Matters</span>
        <h2 className="wim-shared__title">Real food, walked down from the mountains</h2>
      </div>
    </>
  );
}

const WIM_STYLES = `
  .wim-hero {
    position: relative;
    height: 100vh;
    background: ${H.CREAM};
  }

  .wim-next {
    position: relative;
    background: ${H.CREAM_SOFT};
    padding: 0 6vw;
    box-sizing: border-box;
    display: flex; flex-direction: column;
    z-index: 1;
  }
  /* The split view fills the first viewport of wim-next so the target
     rect (right column) sits at true vertical center of the screen when
     the user lands here. */
  .wim-next__inner {
    display: flex; align-items: center; gap: 60px;
    max-width: 1320px; margin: 0 auto; width: 100%;
    min-height: 100vh;
  }
  .wim-next__text {
    flex: 1 1 55%;
    max-width: 620px;
  }
  .wim-next__eyebrow {
    display: inline-block;
    font-size: 13px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; color: ${H.MEADOW_GOLD};
    margin-bottom: 18px;
  }
  .wim-next__title {
    font-family: Georgia, "Playfair Display", serif;
    font-size: clamp(30px, 3.4vw, 52px);
    line-height: 1.08; font-weight: 700;
    color: ${H.DEEP_FOREST};
    margin: 0 0 22px;
  }
  .wim-next__body {
    font-size: clamp(15px, 1.05vw, 17px);
    line-height: 1.7;
    color: ${H.INK};
    margin: 0;
  }
  /* Invisible landing rect — sets where the shared image ends up. */
  .wim-next__target {
    flex: 0 0 clamp(280px, 38vw, 560px);
    aspect-ratio: 4 / 3;
    /* Kept invisible; its box defines the final position of the shared image. */
    visibility: hidden;
  }

  .wim-next__features {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px;
    max-width: 1320px; margin: 0 auto; width: 100%;
    padding: 40px 0 100px;
  }
  .wim-next__features .wtn-feature { text-align: center; }

  /* Shared elements — all position: fixed, animated by JS via top/left/w/h */
  .wim-shared,
  .wim-shared__overlay,
  .wim-shared__text {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none;
    will-change: top, left, width, height, opacity, border-radius;
    contain: layout paint;
  }
  .wim-shared {
    object-fit: cover;
    z-index: 40;
    display: block;
    opacity: 0;
    backface-visibility: hidden;
    overflow: hidden;
  }
  .wim-shared__overlay {
    z-index: 41;
    background: linear-gradient(180deg, rgba(1,53,50,0.30) 0%, rgba(1,53,50,0.55) 100%);
    opacity: 0;
  }
  .wim-shared__text {
    z-index: 42;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 0 6vw;
    color: ${H.CREAM};
    opacity: 0; visibility: hidden;
  }
  .wim-shared__eyebrow {
    display: inline-block;
    font-size: 14px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; color: ${H.MEADOW_GOLD};
    margin-bottom: 20px;
    text-shadow: 0 2px 10px rgba(0,0,0,0.35);
  }
  .wim-shared__title {
    font-family: Georgia, "Playfair Display", serif;
    font-size: clamp(38px, 6.2vw, 88px);
    line-height: 1.05; font-weight: 700;
    color: ${H.CREAM};
    margin: 0; max-width: 1100px;
    text-shadow: 0 4px 24px rgba(0,0,0,0.45);
  }

  @media (max-width: 900px) {
    /* Fill the viewport and center the text+image group so the shrunk
       image lands at the vertical middle of the section (mirrors desktop). */
    .wim-next { padding: 0 6vw; }
    .wim-next__inner {
      flex-direction: column; align-items: stretch;
      justify-content: center;
      gap: 24px;
      min-height: 100vh;
    }
    /* Override desktop's flex: 1 1 55% (which in column mode would make
       the text take 55% of the container HEIGHT, opening a huge gap). */
    .wim-next__text { max-width: 100%; flex: 0 0 auto; }
    .wim-next__target {
      flex: 0 0 auto; align-self: center;
      width: 82vw; aspect-ratio: 4/3;
    }
    .wim-next__features {
      grid-template-columns: repeat(2, 1fr);
      gap: 22px;
      padding: 32px 0 60px;
    }
  }
  @media (max-width: 560px) {
    .wim-next { padding: 0 5vw; }
    .wim-next__inner { gap: 20px; }
    .wim-next__target { width: 88vw; }
    .wim-next__features { grid-template-columns: 1fr; padding: 24px 0 56px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .wim-shared, .wim-shared__overlay, .wim-shared__text {
      transition: none;
    }
  }
`;

export default Home;
