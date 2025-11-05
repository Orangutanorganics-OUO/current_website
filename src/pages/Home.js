import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../utils/products';
import { getDiscountedPrice, hasDiscount, getDiscount, DISCOUNT_CONFIG } from '../utils/discounts';
import { isBestseller } from '../utils/bestsellers';
import ImageCarousel from '../components/ImageCarousel';
import heroVideo from '../utils/home_vid.mp4';
import img1 from '../utils/1.png';
import img2 from '../utils/2.png';
import img3 from '../utils/3.png';
import img4 from '../utils/4.png';
import img11 from "../utils/img_11.jpeg";
import img12 from "../utils/img_12.jpeg";
import img13 from "../utils/img_13.jpeg";
import './Home.css';

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

      {/* Features */}
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

      {/* Featured Products */}
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

      {/* Why Choose Us */}
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
              From compost-back initiatives to low-water farming, we grow in ways that heal soil and protect the Himalayas. Sustainability isn’t a buzzword here — it’s survival.
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

      {/* CTA Section */}
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

  // Calculate discounted prices
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

  // Use product images array, fallback to single image if images array doesn't exist
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

export default Home;
