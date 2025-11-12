import React from 'react';
import './WhoAreWe.css';
import { Link } from 'react-router-dom';
import img1001 from '../utils/img1001.jpeg'
import img1002 from '../utils/img1002.jpeg'

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

      {/* Quick Links Section */}
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

export default WhoAreWe;
