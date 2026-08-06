import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, getProductById } from '../utils/products';
import { fetchReviewsWithCache, getReviewsByProduct, getAverageRating, getReviewCount } from '../utils/fetchReviews';
import { getDiscountedPrice, hasDiscount, getDiscount, DISCOUNT_CONFIG } from '../utils/discounts';
import { isBestseller } from '../utils/bestsellers';
import { isProductSoldOut } from '../utils/availability';
import { trackViewContent, trackAddToCart } from '../utils/metaPixel';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';
import Toast from '../components/Toast';
import ImageCarousel from '../components/ImageCarousel';
import './Products.css';

function Products() {
  const { id } = useParams();

  if (id) {
    return <ProductDetail productId={id} />;
  }

  return <ProductList />;
}

/* ===== OLD CODE — ORIGINAL v1 — START (uncomment to restore) =====
function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [reviews, setReviews] = useState([]);
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

  useEffect(() => {
    fetchReviewsWithCache().then(setReviews).catch(console.error);
  }, []);

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="products-title">Our Organic Products</h1>
        <p className="products-subtitle">
          Premium quality organic products sourced directly from Himalayan farmers
        </p>
      </div>

      <div className="products-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} reviews={reviews} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, reviews = [] }) {
  const minPrice = Math.min(...product.variants.map(v => v.price));
  const maxPrice = Math.max(...product.variants.map(v => v.price));

  const hasProductDiscount = hasDiscount(product.name);
  const discountPercent = getDiscount(product.name);
  const minDiscountedPrice = getDiscountedPrice(minPrice, product.name);
  const maxDiscountedPrice = getDiscountedPrice(maxPrice, product.name);

  const priceDisplay = minPrice === maxPrice
    ? `INR{minPrice}`
    : `INR{minPrice} - INR{maxPrice}`;

  const discountedPriceDisplay = minDiscountedPrice === maxDiscountedPrice
    ? `INR{minDiscountedPrice}`
    : `INR{minDiscountedPrice} - INR{maxDiscountedPrice}`;

  const isProductBestseller = isBestseller(product.name);
  const avgRating = getAverageRating(product.name, reviews);
  const reviewCount = getReviewCount(product.name, reviews);
  const productSoldOut = isProductSoldOut(product.id);

  const carouselImages = product.images || [product.image];

  return (
    <Link to={`/products/INR{product.id}`} className="product-card">
      <div className="product-card__image">
        <ImageCarousel images={carouselImages} alt={product.name} loading="lazy" />
        <span className="product-card__badge">{product.category}</span>
        {isProductBestseller && (
          <span className="product-card__bestseller">Bestseller</span>
        )}
        {hasProductDiscount && DISCOUNT_CONFIG.showTag && (
          <span className="product-card__discount-tag">
            {DISCOUNT_CONFIG.tagLabel} {discountPercent}%
          </span>
        )}
        {productSoldOut && (
          <span className="product-card__soldout-tag">Sold Out</span>
        )}
      </div>
      <div className="product-card__content">
        <h3 className="product-card__name">{product.name}</h3>
        {reviewCount > 0 && (
          <StarRating rating={avgRating} totalReviews={reviewCount} size="small" />
        )}
        <div className="product-card__benefits">
          {product.benefits.map((benefit, idx) => (
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
/* Palette mirrors the Home / Valley design system so the shop feels
   like one continuous world. Keep this in sync if the master palette
   in Home.js (H) is ever edited. */
const P = {
  BRAND_BROWN:      '#826845',
  BRAND_GREEN:      '#618E69',
  BRAND_TEAL:       '#5D9C9D',
  DEEP_FOREST:      '#03605C',
  DEEP_FOREST_DK:   '#024442',
  FOREST_SHADOW:    '#013532',
  INK:              '#655F59',
  ROSE:             '#B6787F',
  BURGUNDY:         '#95373A',
  SEAL_TERRACOTTA:  '#D76427',
  CREAM:            '#F8F3EB',
  CREAM_SOFT:       '#F1E7CE',
  PAPER:            '#F8F3EB',
  PALE_SAGE:        '#DBD3A8',
  MEADOW_GOLD:      '#B5882D',
  GOLD_LINE:        '#B5882D',
  OCHRE:            '#A56650',
  SOIL_OLIVE:       '#618E69',
  SAGE:             '#618E69',
};

/* Same wave divider used across Home / Valley — layered curves + gold
   contour line — accepts an arbitrary palette so the divider can bridge
   any two section colors. */
function WaveDivider({ height = 90, palette, flip = false }) {
  const layers = palette || [P.CREAM, P.CREAM_SOFT];
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
            stroke={P.GOLD_LINE} strokeWidth="1.1" fill="none" opacity="0.45"/>
    </svg>
  );
}

/* Card-bottom wave — matches Home so product cards look identical
   regardless of which page they render on. */
function CardWaveCut({ fill = P.CREAM_SOFT }) {
  return (
    <svg className="wtn-pcard__wavecut" viewBox="0 0 400 40" preserveAspectRatio="none"
         aria-hidden="true" focusable="false">
      <path d="M0,20 C80,4 160,32 220,18 C280,4 340,28 400,14 L400,40 L0,40 Z" fill={fill}/>
      <path d="M0,22 C80,6 160,34 220,20 C280,6 340,30 400,16"
            stroke={P.GOLD_LINE} strokeWidth="1" fill="none" opacity="0.55"/>
    </svg>
  );
}

function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [reviews, setReviews] = useState([]);
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

  useEffect(() => {
    fetchReviewsWithCache().then(setReviews).catch(console.error);
  }, []);

  // Scroll-reveal — identical pattern to Home.js / WhoAreWe.js.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = document.querySelectorAll('.wtn-shop .wtn-reveal, .wtn-shop .wtn-reveal-group');
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
      // threshold: 0 — a tall .wtn-reveal-group (many product cards, esp.
      // 1-col mobile) caps its own intersectionRatio below 0.12, so a
      // 0.12 threshold would never fire and cards would stay invisible.
      // Trigger as soon as any part enters the rootMargin-trimmed viewport.
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selectedCategory]);

  const filteredProducts = selectedCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="wtn-shop">
      <style>{SHOP_STYLES}</style>

      {/* ============ HERO ============ */}
      <section className="wtn-shop-hero">
        <div className="wtn-section__inner" style={{ textAlign: 'center' }}>
          <span className="wtn-eyebrow wtn-reveal">The Harvest</span>
          <h1 className="wtn-h2 wtn-h1 wtn-reveal">Shop the Himalayas</h1>
          <svg className="wtn-h2-rule wtn-reveal" viewBox="0 0 84 6" preserveAspectRatio="none"
               aria-hidden="true" focusable="false"
               style={{ margin: '10px auto 18px' }}>
            <path d="M0,3 C18,0 38,6 56,3 C72,0 80,4 84,3"
                  stroke={P.MEADOW_GOLD} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          </svg>
          <p className="wtn-sub wtn-reveal" style={{ margin: '0 auto' }}>
            Premium organic products walked down from Himalayan farms — hand-picked,
            sun-dried, and unpolished, exactly the way the land gave them.
          </p>
        </div>
      </section>

      <WaveDivider height={70} palette={[P.CREAM_SOFT]} />

      {/* ============ PRODUCTS ============ */}
      <section className="wtn-section wtn-products">
        <div className="wtn-section__inner">
          {/* Category filter chips */}
          <div className="wtn-filters wtn-reveal" role="tablist" aria-label="Filter by category">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`wtn-filter ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="wtn-products__grid wtn-reveal-group">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} reviews={reviews} />
              ))}
            </div>
          ) : (
            <p className="wtn-shop-empty">Nothing here yet — try another category.</p>
          )}
        </div>
      </section>

      <WaveDivider height={80} palette={[P.DEEP_FOREST, P.DEEP_FOREST_DK, P.FOREST_SHADOW]} />

      {/* ============ CTA ============ */}
      <section className="wtn-shop-cta">
        <div className="wtn-cta__inner wtn-reveal">
          <span className="wtn-cta__eyebrow">Need a Hand?</span>
          <h2>Not sure what to try first?</h2>
          <p>Reach out — we&rsquo;ll help you build a starter box from the valley.</p>
          <Link to="/contact" className="wtn-btn wtn-btn--primary wtn-btn--large">
            Talk to us
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, reviews = [] }) {
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
  const avgRating = getAverageRating(product.name, reviews);
  const reviewCount = getReviewCount(product.name, reviews);
  const productSoldOut = isProductSoldOut(product.id);

  const carouselImages = product.images || [product.image];

  return (
    <Link to={`/products/${product.id}`} className={`wtn-pcard ${productSoldOut ? 'is-soldout' : ''}`}>
      <div className="wtn-pcard__imgwrap">
        <ImageCarousel images={carouselImages} alt={product.name} loading="lazy" />
        <span className="wtn-pcard__badge">{product.category}</span>
        {isProductBestseller && !productSoldOut && (
          <span className="wtn-pcard__best">Bestseller</span>
        )}
        {productSoldOut && (
          <span className="wtn-pcard__sold">Sold Out</span>
        )}
        {hasProductDiscount && DISCOUNT_CONFIG.showTag && !productSoldOut && (
          <span className="wtn-pcard__disc">
            {DISCOUNT_CONFIG.tagLabel} {discountPercent}%
          </span>
        )}
        <CardWaveCut />
      </div>
      <div className="wtn-pcard__body">
        <h3 className="wtn-pcard__name">{product.name}</h3>
        {reviewCount > 0 && (
          <StarRating rating={avgRating} totalReviews={reviewCount} size="small" />
        )}
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

const SHOP_STYLES = `
  .wtn-shop, .wtn-shop * { box-sizing: border-box; }
  .wtn-shop {
    background: ${P.CREAM};
    color: ${P.INK};
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    overflow-x: hidden;
  }

  /* Scroll-reveal — identical timings to Home / Valley */
  .wtn-shop .wtn-reveal, .wtn-shop .wtn-reveal-group > * {
    opacity: 0; transform: translateY(18px);
    transition: opacity 520ms ease, transform 520ms ease;
  }
  .wtn-shop .wtn-reveal.is-inview,
  .wtn-shop .wtn-reveal-group.is-inview > * { opacity: 1; transform: none; }
  .wtn-shop .wtn-reveal-group > *:nth-child(2) { transition-delay: 60ms; }
  .wtn-shop .wtn-reveal-group > *:nth-child(3) { transition-delay: 120ms; }
  .wtn-shop .wtn-reveal-group > *:nth-child(4) { transition-delay: 180ms; }
  .wtn-shop .wtn-reveal-group > *:nth-child(5) { transition-delay: 240ms; }
  .wtn-shop .wtn-reveal-group > *:nth-child(6) { transition-delay: 300ms; }
  .wtn-shop .wtn-reveal-group > *:nth-child(7) { transition-delay: 360ms; }
  .wtn-shop .wtn-reveal-group > *:nth-child(8) { transition-delay: 420ms; }

  /* ---------- SECTION SHELL (matches Home) ---------- */
  .wtn-section { position: relative; padding: 64px 28px 80px; }
  .wtn-section__inner { max-width: 1320px; margin: 0 auto; }
  .wtn-eyebrow {
    display: inline-block;
    background: ${P.DEEP_FOREST}; color: ${P.CREAM};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 6px 12px;
  }
  .wtn-h2 {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(28px, 3.4vw, 42px);
    color: ${P.DEEP_FOREST_DK};
    margin: 14px 0 10px; line-height: 1.15;
  }
  .wtn-h1 { font-size: clamp(34px, 4vw, 54px); }
  .wtn-sub {
    max-width: 640px; color: ${P.INK}; opacity: 0.78;
    font-size: 15.5px; line-height: 1.6; margin: 0 0 32px;
  }
  .wtn-h2-rule { display: block; width: 84px; height: 6px; }

  /* ---------- HERO ---------- */
  .wtn-shop-hero {
    background: ${P.CREAM};
    padding: 80px 28px 40px;
    text-align: center;
  }

  /* ---------- CATEGORY FILTERS ---------- */
  .wtn-filters {
    display: flex; flex-wrap: wrap;
    gap: 10px; justify-content: center;
    margin: 0 auto 40px; padding: 4px 0;
  }
  .wtn-filter {
    appearance: none; cursor: pointer;
    background: ${P.CREAM};
    color: ${P.DEEP_FOREST_DK};
    border: 1.5px solid rgba(3,96,92,0.22);
    padding: 9px 18px;
    font-size: 11.5px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700;
    transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease;
  }
  .wtn-filter:hover {
    background: ${P.CREAM_SOFT};
    border-color: ${P.MEADOW_GOLD};
    color: ${P.DEEP_FOREST};
    transform: translateY(-1px);
  }
  .wtn-filter.is-active {
    background: ${P.DEEP_FOREST};
    color: ${P.CREAM};
    border-color: ${P.DEEP_FOREST};
  }

  /* ---------- PRODUCTS GRID (mirrors Home) ---------- */
  .wtn-products { background: ${P.PAPER}; }
  .wtn-products__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 28px;
  }
  .wtn-pcard {
    position: relative;
    background: ${P.CREAM_SOFT};
    text-decoration: none; color: ${P.INK};
    display: flex; flex-direction: column;
    border: 1px solid rgba(30,90,85,0.10);
    transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
    overflow: hidden;
  }
  .wtn-pcard:hover {
    transform: translateY(-4px);
    border-color: ${P.MEADOW_GOLD};
    box-shadow: 0 10px 24px rgba(15,58,54,0.10);
  }
  .wtn-pcard.is-soldout .wtn-pcard__imgwrap { opacity: 0.72; }
  .wtn-pcard__imgwrap {
    position: relative; overflow: hidden;
    background: ${P.CREAM};
    height: 240px;
    transition: opacity 200ms ease;
  }
  .wtn-pcard__imgwrap .carousel,
  .wtn-pcard__imgwrap .carousel__container,
  .wtn-pcard__imgwrap .carousel__image-container {
    height: 100%; width: 100%;
  }
  .wtn-pcard__imgwrap .carousel__image {
    width: 100%; height: 100%; object-fit: cover; border-radius: 0;
  }
  .wtn-pcard__wavecut {
    position: absolute; left: 0; right: 0; bottom: -1px;
    width: 100%; height: 32px; pointer-events: none;
    z-index: 3;
  }
  .wtn-pcard__badge {
    position: absolute; top: 12px; left: 12px; z-index: 4;
    background: ${P.DEEP_FOREST}; color: ${P.CREAM};
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    font-weight: 700; padding: 5px 10px;
  }
  .wtn-pcard__best {
    position: absolute; top: 12px; right: 12px; z-index: 4;
    background: ${P.MEADOW_GOLD}; color: ${P.FOREST_SHADOW};
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    font-weight: 800; padding: 5px 10px;
  }
  .wtn-pcard__sold {
    position: absolute; top: 12px; right: 12px; z-index: 4;
    background: ${P.BURGUNDY}; color: ${P.CREAM};
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    font-weight: 800; padding: 5px 10px;
  }
  .wtn-pcard__disc {
    position: absolute; bottom: 44px; right: 12px; z-index: 4;
    background: ${P.SEAL_TERRACOTTA}; color: ${P.CREAM};
    font-size: 11px; font-weight: 800; padding: 6px 10px;
    letter-spacing: 0.05em;
  }
  .wtn-pcard__body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 10px; }
  .wtn-pcard__name {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 20px; color: ${P.DEEP_FOREST_DK}; margin: 0;
    letter-spacing: -0.005em; line-height: 1.2;
  }
  .wtn-pcard__benefits { display: flex; flex-wrap: wrap; gap: 6px; }
  .wtn-btag {
    font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase;
    font-weight: 600; color: ${P.SOIL_OLIVE};
    background: rgba(168,185,117,0.18);
    padding: 4px 8px; border: 1px solid rgba(111,131,64,0.28);
  }
  .wtn-pcard__foot {
    display: flex; align-items: center; justify-content: space-between;
    margin-top: 6px; padding-top: 12px;
    border-top: 1px dashed rgba(30,90,85,0.18);
  }
  .wtn-pcard__price { font-weight: 700; color: ${P.DEEP_FOREST_DK}; font-size: 15px; }
  .wtn-pcard__price--strike {
    text-decoration: line-through; color: ${P.INK}; opacity: 0.5;
    font-size: 13px; font-weight: 500; margin-right: 6px;
  }
  .wtn-pcard__price--now { color: ${P.SEAL_TERRACOTTA}; font-weight: 800; font-size: 15px; }
  .wtn-pcard__go {
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; color: ${P.DEEP_FOREST};
  }

  .wtn-shop-empty {
    text-align: center; color: ${P.INK}; opacity: 0.7;
    padding: 48px 0; font-size: 15px;
  }

  /* ---------- BUTTONS (mirror Home) ---------- */
  .wtn-btn {
    display: inline-block;
    padding: 12px 26px;
    font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 700; text-decoration: none;
    border: 1.5px solid transparent;
    cursor: pointer;
    transition: transform 180ms ease, background 180ms ease, color 180ms ease, border-color 180ms ease;
  }
  .wtn-btn--primary { background: ${P.MEADOW_GOLD}; color: ${P.FOREST_SHADOW}; border-color: ${P.MEADOW_GOLD}; }
  .wtn-btn--primary:hover { background: ${P.SEAL_TERRACOTTA}; color: ${P.CREAM}; border-color: ${P.SEAL_TERRACOTTA}; transform: translateY(-1px); }
  .wtn-btn--large { padding: 16px 32px; font-size: 13px; }

  /* ---------- CTA ---------- */
  .wtn-shop-cta {
    background: ${P.FOREST_SHADOW};
    color: ${P.CREAM};
    padding: 80px 28px;
    text-align: center;
  }
  .wtn-cta__inner { max-width: 780px; margin: 0 auto; }
  .wtn-cta__eyebrow {
    display: inline-block;
    background: ${P.MEADOW_GOLD}; color: ${P.FOREST_SHADOW};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 800; padding: 6px 12px; margin-bottom: 18px;
  }
  .wtn-shop-cta h2 {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(28px, 3.6vw, 44px);
    color: ${P.CREAM};
    margin: 0 0 12px; line-height: 1.15;
  }
  .wtn-shop-cta p {
    color: ${P.CREAM}; opacity: 0.82;
    font-size: 15.5px; line-height: 1.6;
    margin: 0 0 26px;
  }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 900px) {
    .wtn-section { padding: 48px 20px 60px; }
    .wtn-shop-hero { padding: 60px 20px 28px; }
    .wtn-shop-cta { padding: 60px 20px; }
    .wtn-products__grid {
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 20px;
    }
  }
  @media (max-width: 560px) {
    .wtn-products__grid {
      grid-template-columns: 1fr;
      gap: 18px;
    }
    .wtn-pcard__imgwrap { height: 280px; }
    .wtn-pcard__body { padding: 18px 20px 20px; gap: 10px; }
    .wtn-pcard__name { font-size: 20px; }
    .wtn-pcard__foot { padding-top: 14px; }
    .wtn-pcard__price,
    .wtn-pcard__price--now { font-size: 16px; }
    .wtn-pcard__price--strike { font-size: 13.5px; }
    .wtn-pcard__go { font-size: 11.5px; }
    .wtn-filter { padding: 8px 14px; font-size: 10.5px; letter-spacing: 0.18em; }
  }
  @media (prefers-reduced-motion: reduce) {
    .wtn-shop .wtn-reveal, .wtn-shop .wtn-reveal-group > * { transition: none; }
  }
`;
// ===== NEW REDESIGN — WAVE THEME — END =====

const PDT_STYLES = `
  .pdt, .pdt * { box-sizing: border-box; }
  .pdt {
    background: ${P.CREAM};
    color: ${P.INK};
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    overflow-x: hidden;
  }

  /* ---------- NOT FOUND ---------- */
  .pdt-nf {
    min-height: 60vh;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
    background: ${P.CREAM};
    padding: 80px 24px;
    gap: 20px;
  }
  .pdt-nf h2 {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(26px, 3vw, 34px);
    color: ${P.DEEP_FOREST_DK}; margin: 0;
  }

  /* ---------- TOP BAR ---------- */
  .pdt__topbar {
    background: ${P.CREAM};
    padding: 22px 28px 0;
  }
  .pdt__topbar-inner { max-width: 1240px; margin: 0 auto; }
  .pdt__back {
    display: inline-flex; align-items: center; gap: 6px;
    text-decoration: none;
    color: ${P.DEEP_FOREST};
    font-size: 11.5px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700;
    transition: color 180ms ease;
  }
  .pdt__back:hover { color: ${P.SEAL_TERRACOTTA}; }

  /* ---------- HERO GRID ---------- */
  .pdt-hero { background: ${P.CREAM}; padding: 26px 28px 64px; }
  .pdt-hero__inner { max-width: 1240px; margin: 0 auto; }
  .pdt-grid {
    display: grid; grid-template-columns: 1.05fr 1fr; gap: 44px;
    align-items: start;
  }

  /* Gallery */
  .pdt-gallery {
    position: relative;
    background: ${P.CREAM_SOFT};
    border: 1px solid rgba(3,96,92,0.14);
    overflow: hidden;
    aspect-ratio: 1 / 1;
  }
  .pdt-gallery .carousel,
  .pdt-gallery .carousel__container,
  .pdt-gallery .carousel__image-container { height: 100%; width: 100%; }
  .pdt-gallery .carousel__image {
    width: 100%; height: 100%; object-fit: cover; border-radius: 0;
  }

  /* Info column */
  .pdt-info { display: flex; flex-direction: column; gap: 18px; }
  .pdt-info__cat {
    display: inline-block; align-self: flex-start;
    background: ${P.DEEP_FOREST}; color: ${P.CREAM};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 6px 12px;
  }
  .pdt-info__name {
    margin: 0;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(28px, 3.6vw, 40px);
    color: ${P.DEEP_FOREST_DK}; font-weight: 700;
    line-height: 1.1;
  }
  .pdt-info__desc {
    margin: 0; font-size: 15.5px; line-height: 1.7; color: ${P.INK};
  }

  .pdt-block h3 {
    margin: 0 0 10px;
    font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase;
    color: ${P.DEEP_FOREST}; font-weight: 800;
  }
  .pdt-benefits { display: flex; flex-wrap: wrap; gap: 8px; }
  .pdt-benefit {
    font-size: 11.5px; letter-spacing: 0.12em; text-transform: uppercase;
    font-weight: 600; color: ${P.SOIL_OLIVE};
    background: rgba(168,185,117,0.18);
    padding: 6px 10px; border: 1px solid rgba(111,131,64,0.28);
  }

  /* Variants */
  .pdt-variants { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; }
  .pdt-variant {
    background: ${P.PAPER};
    border: 1.5px solid rgba(3,96,92,0.20);
    padding: 12px 14px;
    display: flex; flex-direction: column; gap: 4px;
    cursor: pointer;
    font-family: inherit;
    transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;
    text-align: left;
  }
  .pdt-variant:hover:not(:disabled) {
    border-color: ${P.MEADOW_GOLD};
    transform: translateY(-1px);
  }
  .pdt-variant.is-active {
    background: ${P.DEEP_FOREST}; color: ${P.CREAM};
    border-color: ${P.DEEP_FOREST};
  }
  .pdt-variant.is-active .pdt-variant__price { color: ${P.CREAM}; }
  .pdt-variant.is-active .pdt-variant__size { color: ${P.CREAM}; }
  .pdt-variant__size {
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    font-weight: 700; color: ${P.DEEP_FOREST};
  }
  .pdt-variant__price {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 16px; font-weight: 700; color: ${P.DEEP_FOREST_DK};
  }
  .pdt-variant.is-soldout {
    opacity: 0.55; cursor: not-allowed;
    background: repeating-linear-gradient(45deg, ${P.PAPER}, ${P.PAPER} 6px, ${P.CREAM_SOFT} 6px, ${P.CREAM_SOFT} 12px);
  }

  /* Price */
  .pdt-price {
    display: flex; align-items: baseline; gap: 10px;
    padding: 14px 0 0;
    border-top: 1px dashed rgba(3,96,92,0.20);
  }
  .pdt-price__label {
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; color: ${P.DEEP_FOREST};
  }
  .pdt-price__value {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 28px; font-weight: 700; color: ${P.DEEP_FOREST_DK};
  }

  /* Quantity */
  .pdt-qty-row {
    display: flex; align-items: center; gap: 14px;
    flex-wrap: wrap;
  }
  .pdt-qty-row h3 { margin: 0; }
  .pdt-qty {
    display: inline-flex; align-items: center;
    border: 1.5px solid rgba(3,96,92,0.20);
    background: ${P.PAPER};
    overflow: hidden;
  }
  .pdt-qty__btn {
    background: transparent; border: none; cursor: pointer;
    width: 34px; height: 36px;
    display: inline-flex; align-items: center; justify-content: center;
    color: ${P.DEEP_FOREST}; font-size: 16px; font-weight: 700;
    transition: background 150ms ease, color 150ms ease;
  }
  .pdt-qty__btn:hover { background: ${P.DEEP_FOREST}; color: ${P.CREAM}; }
  .pdt-qty__input {
    width: 50px; height: 36px;
    background: transparent; border: none; outline: none;
    text-align: center;
    font-family: inherit; font-size: 14px; font-weight: 700;
    color: ${P.DEEP_FOREST_DK};
    border-left: 1px solid rgba(3,96,92,0.15);
    border-right: 1px solid rgba(3,96,92,0.15);
    -moz-appearance: textfield;
  }
  .pdt-qty__input::-webkit-outer-spin-button,
  .pdt-qty__input::-webkit-inner-spin-button {
    -webkit-appearance: none; margin: 0;
  }

  /* Add-to-cart */
  .pdt-atc {
    background: ${P.DEEP_FOREST}; color: ${P.CREAM};
    border: 1.5px solid ${P.DEEP_FOREST};
    padding: 16px 24px;
    font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; cursor: pointer;
    font-family: inherit;
    transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;
  }
  .pdt-atc:hover:not(:disabled) {
    background: ${P.SEAL_TERRACOTTA}; border-color: ${P.SEAL_TERRACOTTA};
    transform: translateY(-1px);
  }
  .pdt-atc:disabled {
    background: ${P.BURGUNDY}; border-color: ${P.BURGUNDY};
    cursor: not-allowed; opacity: 0.85;
  }

  /* Meta */
  .pdt-meta {
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
    padding-top: 12px; border-top: 1px dashed rgba(3,96,92,0.20);
  }
  .pdt-meta__cell {
    background: ${P.CREAM_SOFT};
    border: 1px solid rgba(3,96,92,0.12);
    padding: 12px 14px;
    display: flex; flex-direction: column; gap: 2px;
  }
  .pdt-meta__label {
    font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; color: ${P.DEEP_FOREST};
  }
  .pdt-meta__value {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 15px; color: ${P.DEEP_FOREST_DK}; font-weight: 700;
  }
  .pdt-meta__value--available { color: ${P.SOIL_OLIVE}; }
  .pdt-meta__value--soldout { color: ${P.BURGUNDY}; }

  /* ---------- STORY BAND ---------- */
  .pdt-story-band { background: ${P.CREAM_SOFT}; padding: 72px 28px 88px; }
  .pdt-story-inner { max-width: 900px; margin: 0 auto; }
  .pdt-story__hero {
    text-align: center; margin-bottom: 36px;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(24px, 3vw, 34px);
    color: ${P.DEEP_FOREST_DK};
    line-height: 1.25; font-weight: 700;
  }
  .pdt-story__block { margin-bottom: 34px; }
  .pdt-story__block h3 {
    display: inline-block;
    margin: 0 0 12px;
    background: ${P.DEEP_FOREST}; color: ${P.CREAM};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 6px 12px;
  }
  .pdt-story__block p {
    margin: 0; font-size: 16px; line-height: 1.75; color: ${P.INK};
  }
  .pdt-story__list { margin: 8px 0 0 20px; padding: 0; }
  .pdt-story__list li {
    margin-bottom: 8px; font-size: 15.5px; line-height: 1.65; color: ${P.INK};
  }
  .pdt-story__chips { display: flex; flex-wrap: wrap; gap: 8px; margin: 4px 0 14px; }
  .pdt-story__chip {
    background: ${P.CREAM};
    border: 1.5px solid ${P.MEADOW_GOLD};
    color: ${P.DEEP_FOREST_DK};
    padding: 8px 14px;
    font-size: 12.5px; font-weight: 600;
  }
  .pdt-story__block h4 {
    margin: 20px 0 10px;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 17px; color: ${P.DEEP_FOREST_DK}; font-weight: 700;
  }
  .pdt-nutrition-link {
    display: inline-flex; align-items: center; gap: 6px;
    margin-top: 14px;
    text-decoration: none;
    color: ${P.SEAL_TERRACOTTA};
    font-size: 11.5px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700;
    transition: color 180ms ease;
  }
  .pdt-nutrition-link:hover { color: ${P.DEEP_FOREST}; }
  .pdt-story__cta {
    margin-top: 28px;
    background: ${P.DEEP_FOREST_DK}; color: ${P.CREAM};
    padding: 20px 22px;
    border-left: 3px solid ${P.MEADOW_GOLD};
  }
  .pdt-story__cta p {
    margin: 0; font-family: Georgia, "Iowan Old Style", serif;
    font-size: 16.5px; line-height: 1.55; color: ${P.CREAM};
    font-style: italic;
  }

  /* ---------- REVIEWS ---------- */
  .pdt-reviews-band { background: ${P.PAPER}; padding: 72px 28px 88px; }
  .pdt-reviews-inner { max-width: 900px; margin: 0 auto; }
  .pdt-reviews__title {
    text-align: center;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(24px, 3vw, 34px);
    color: ${P.DEEP_FOREST_DK};
    margin: 0 0 32px; font-weight: 700;
  }
  .pdt-review-list { display: flex; flex-direction: column; gap: 16px; }
  .pdt-review {
    background: ${P.CREAM};
    border: 1px solid rgba(3,96,92,0.12);
    padding: 22px 24px;
  }
  .pdt-review__head {
    display: flex; align-items: flex-start; justify-content: space-between;
    gap: 12px; margin-bottom: 12px;
    flex-wrap: wrap;
  }
  .pdt-review__author {
    display: flex; align-items: center; gap: 12px;
  }
  .pdt-review__avatar {
    width: 40px; height: 40px;
    background: ${P.DEEP_FOREST}; color: ${P.CREAM};
    border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 15px;
  }
  .pdt-review__name {
    margin: 0;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 15px; color: ${P.DEEP_FOREST_DK}; font-weight: 700;
    line-height: 1.2;
  }
  .pdt-review__loc {
    display: block;
    font-size: 11.5px; letter-spacing: 0.12em; text-transform: uppercase;
    color: ${P.MEADOW_GOLD}; font-weight: 700;
    margin-top: 3px;
  }
  .pdt-review__rating { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
  .pdt-review__date {
    font-size: 11.5px; letter-spacing: 0.12em; text-transform: uppercase;
    color: ${P.INK}; opacity: 0.75; font-weight: 600;
  }
  .pdt-review__text {
    margin: 0 0 8px; font-size: 15px; line-height: 1.7; color: ${P.INK};
  }
  .pdt-review__source {
    font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase;
    font-weight: 700; color: ${P.SOIL_OLIVE};
  }
  .pdt-no-reviews {
    text-align: center; color: ${P.INK}; opacity: 0.75;
    padding: 24px 0; font-size: 15px;
  }

  .pdt-pager {
    display: flex; align-items: center; justify-content: space-between;
    gap: 12px; margin-top: 20px;
    padding: 14px 0;
    border-top: 1px dashed rgba(3,96,92,0.20);
    flex-wrap: wrap;
  }
  .pdt-pager__btn {
    background: ${P.CREAM}; color: ${P.DEEP_FOREST};
    border: 1.5px solid rgba(3,96,92,0.22);
    padding: 10px 18px;
    font-size: 11.5px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; cursor: pointer;
    font-family: inherit;
    transition: background 180ms ease, color 180ms ease, border-color 180ms ease;
  }
  .pdt-pager__btn:hover:not(:disabled) {
    background: ${P.DEEP_FOREST}; color: ${P.CREAM}; border-color: ${P.DEEP_FOREST};
  }
  .pdt-pager__btn:disabled { opacity: 0.4; cursor: not-allowed; }
  .pdt-pager__info {
    display: flex; flex-direction: column; align-items: center; gap: 2px;
    font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase;
    font-weight: 700; color: ${P.DEEP_FOREST_DK};
  }
  .pdt-pager__count { color: ${P.MEADOW_GOLD}; font-size: 10.5px; }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 900px) {
    .pdt-grid { grid-template-columns: 1fr; gap: 28px; }
    .pdt-story-band { padding: 56px 22px 68px; }
    .pdt-reviews-band { padding: 56px 22px 68px; }
  }
  @media (max-width: 560px) {
    .pdt-hero { padding: 18px 18px 44px; }
    .pdt__topbar { padding: 18px 18px 0; }
    .pdt-meta { grid-template-columns: 1fr; }
  }
`;

function ProductDetail({ productId }) {
  const product = getProductById(productId);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const REVIEWS_PER_PAGE = 3;

  useEffect(() => {
    fetchReviewsWithCache().then(setReviews).catch(console.error);

    if (product) {
      const currentVariant = product.variants[selectedVariant];
      trackViewContent(product, currentVariant.price);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!product) {
    return (
      <div className="pdt">
        <style>{PDT_STYLES}</style>
        <div className="pdt-nf">
          <h2>Product not found</h2>
          <Link to="/products" className="pdt__back" style={{ color: P.SEAL_TERRACOTTA }}>← Back to Products</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      product_retailer_id: `${product.id}_${product.variants[selectedVariant].size}`,
      productId: product.id,
      name: product.name,
      size: product.variants[selectedVariant].size,
      price: product.variants[selectedVariant].price,
      weight: product.variants[selectedVariant].weight,
      quantity: quantity,
      image: product.image,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    const existingIndex = existingCart.findIndex(
      item => item.product_retailer_id === cartItem.product_retailer_id
    );

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    window.dispatchEvent(new Event('cartUpdated'));

    trackAddToCart(cartItem);

    setToast({
      message: `${product.name} (${product.variants[selectedVariant].size}) added to cart!`,
      type: 'success',
    });
  };

  const variant = product.variants[selectedVariant];
  const isCurrentVariantAvailable = variant.available !== false;
  const carouselImages = product.images || [product.image];

  return (
    <div className="pdt">
      <style>{PDT_STYLES}</style>

      {/* ============ TOP BAR ============ */}
      <div className="pdt__topbar">
        <div className="pdt__topbar-inner">
          <Link to="/products" className="pdt__back">← Back to Products</Link>
        </div>
      </div>

      {/* ============ HERO ============ */}
      <section className="pdt-hero">
        <div className="pdt-hero__inner">
          <div className="pdt-grid">
            {/* ----- gallery ----- */}
            <div className="pdt-gallery">
              <ImageCarousel images={carouselImages} alt={product.name} />
            </div>

            {/* ----- info ----- */}
            <div className="pdt-info">
              <span className="pdt-info__cat">{product.category}</span>
              <h1 className="pdt-info__name">{product.name}</h1>
              <StarRating
                rating={getAverageRating(product.name, reviews)}
                totalReviews={getReviewCount(product.name, reviews)}
                size="medium"
              />
              <p className="pdt-info__desc">{product.description}</p>

              <div className="pdt-block">
                <h3>Benefits</h3>
                <div className="pdt-benefits">
                  {product.benefits.map((benefit, idx) => (
                    <span key={idx} className="pdt-benefit">{benefit}</span>
                  ))}
                </div>
              </div>

              <div className="pdt-block">
                <h3>Select Size</h3>
                <div className="pdt-variants">
                  {product.variants.map((v, idx) => {
                    const variantAvailable = v.available !== false;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`pdt-variant ${selectedVariant === idx ? 'is-active' : ''} ${!variantAvailable ? 'is-soldout' : ''}`}
                        onClick={() => setSelectedVariant(idx)}
                        disabled={!variantAvailable}
                      >
                        <span className="pdt-variant__size">{v.size}</span>
                        <span className="pdt-variant__price">
                          {variantAvailable ? `₹${v.price}` : 'Sold Out'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pdt-price">
                <span className="pdt-price__label">Price</span>
                <span className="pdt-price__value">₹{variant.price}</span>
              </div>

              <div className="pdt-qty-row pdt-block">
                <h3>Quantity</h3>
                <div className="pdt-qty">
                  <button
                    type="button"
                    className="pdt-qty__btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    className="pdt-qty__input"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    aria-label="Quantity"
                  />
                  <button
                    type="button"
                    className="pdt-qty__btn"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="pdt-atc"
                onClick={handleAddToCart}
                disabled={!isCurrentVariantAvailable}
              >
                {isCurrentVariantAvailable ? 'Add to Cart' : 'Sold Out'}
              </button>

              <div className="pdt-meta">
                <div className="pdt-meta__cell">
                  <span className="pdt-meta__label">Stock</span>
                  <span className={`pdt-meta__value ${isCurrentVariantAvailable ? 'pdt-meta__value--available' : 'pdt-meta__value--soldout'}`}>
                    {isCurrentVariantAvailable ? 'In Stock' : 'Sold Out'}
                  </span>
                </div>
                <div className="pdt-meta__cell">
                  <span className="pdt-meta__label">Weight</span>
                  <span className="pdt-meta__value">{variant.weight}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DETAILED STORY ============ */}
      {product.heroLine && (
        <section className="pdt-story-band">
          <div className="pdt-story-inner">
            <h2 className="pdt-story__hero">{product.heroLine}</h2>

            {product.story && (
              <div className="pdt-story__block">
                <h3>Our Story</h3>
                <p>{product.story}</p>
              </div>
            )}

            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div className="pdt-story__block">
                <h3>Key Features</h3>
                <ul className="pdt-story__list">
                  {product.keyFeatures.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.nutritionHighlights && product.nutritionHighlights.length > 0 && (
              <div className="pdt-story__block">
                <h3>Nutrition Highlights</h3>
                <div className="pdt-story__chips">
                  {product.nutritionHighlights.map((nutrient, idx) => (
                    <span key={idx} className="pdt-story__chip">{nutrient}</span>
                  ))}
                </div>
                {product.nutritionBenefits && product.nutritionBenefits.length > 0 && (
                  <>
                    <h4>Health Benefits</h4>
                    <ul className="pdt-story__list">
                      {product.nutritionBenefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </>
                )}
                <Link to="/nutrition" className="pdt-nutrition-link">
                  View Complete Nutrition Info →
                </Link>
              </div>
            )}

            {product.cta && (
              <div className="pdt-story__cta">
                <p>{product.cta}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============ REVIEWS ============ */}
      <section className="pdt-reviews-band">
        <div className="pdt-reviews-inner">
          <h2 className="pdt-reviews__title">Customer Reviews</h2>

          {(() => {
            const productReviews = getReviewsByProduct(product.name, reviews);
            const totalReviews = productReviews.length;
            const totalPages = Math.ceil(totalReviews / REVIEWS_PER_PAGE);
            const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
            const paginatedReviews = productReviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

            return totalReviews > 0 ? (
              <>
                <div className="pdt-review-list">
                  {paginatedReviews.map(review => (
                    <div key={review.id} className="pdt-review">
                      <div className="pdt-review__head">
                        <div className="pdt-review__author">
                          <div className="pdt-review__avatar">
                            {review.customer.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="pdt-review__name">{review.customer}</h4>
                            {review.location && (
                              <span className="pdt-review__loc">{review.location}</span>
                            )}
                          </div>
                        </div>
                        <div className="pdt-review__rating">
                          <StarRating rating={review.rating} showCount={false} size="small" />
                          <span className="pdt-review__date">{review.date}</span>
                        </div>
                      </div>
                      <p className="pdt-review__text">{review.review}</p>
                      {review.source && (
                        <span className="pdt-review__source">Verified purchase — {review.source}</span>
                      )}
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="pdt-pager">
                    <button
                      type="button"
                      className="pdt-pager__btn"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <div className="pdt-pager__info">
                      <span>Page {currentPage} of {totalPages}</span>
                      <span className="pdt-pager__count">({totalReviews} reviews)</span>
                    </div>
                    <button
                      type="button"
                      className="pdt-pager__btn"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="pdt-no-reviews">No reviews yet. Be the first to review this product!</p>
            );
          })()}

          <ReviewForm
            productName={product.name}
            onSubmitSuccess={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      </section>

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Products;
