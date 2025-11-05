import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, getProductById } from '../utils/products';
import { fetchReviewsWithCache, getReviewsByProduct, getAverageRating, getReviewCount } from '../utils/fetchReviews';
import { getDiscountedPrice, hasDiscount, getDiscount, DISCOUNT_CONFIG } from '../utils/discounts';
import { isBestseller } from '../utils/bestsellers';
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

function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [reviews, setReviews] = useState([]);
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))];

  useEffect(() => {
    // Fetch reviews on component mount
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
  const avgRating = getAverageRating(product.name, reviews);
  const reviewCount = getReviewCount(product.name, reviews);

  // Use product images array, fallback to single image if images array doesn't exist
  const carouselImages = product.images || [product.image];

  return (
    <Link to={`/products/${product.id}`} className="product-card">
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

function ProductDetail({ productId }) {
  const product = getProductById(productId);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const REVIEWS_PER_PAGE = 3;

  useEffect(() => {
    // Fetch reviews when component mounts
    fetchReviewsWithCache().then(setReviews).catch(console.error);

    // Track product view in Meta Pixel
    if (product) {
      const currentVariant = product.variants[selectedVariant];
      trackViewContent(product, currentVariant.price);
    }
  }, []);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn--primary">Back to Products</Link>
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
      image: product.image
    };

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if item already exists
    const existingIndex = existingCart.findIndex(
      item => item.product_retailer_id === cartItem.product_retailer_id
    );

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));

    // Trigger custom event for cart update
    window.dispatchEvent(new Event('cartUpdated'));

    // Track add to cart event in Meta Pixel
    trackAddToCart(cartItem);

    // Show success toast
    setToast({
      message: `${product.name} (${product.variants[selectedVariant].size}) added to cart!`,
      type: 'success'
    });
  };

  const variant = product.variants[selectedVariant];

  // Use product images array, fallback to single image if images array doesn't exist
  const carouselImages = product.images || [product.image];

  return (
    <div className="product-detail">
      <div className="product-detail__container">
        <Link to="/products" className="back-link">← Back to Products</Link>

        <div className="product-detail__grid">
          <div className="product-detail__image">
            <ImageCarousel images={carouselImages} alt={product.name} />
          </div>

          <div className="product-detail__info">
            <span className="product-category">{product.category}</span>
            <h1 className="product-name">{product.name}</h1>
            <StarRating
              rating={getAverageRating(product.name)}
              totalReviews={getReviewCount(product.name)}
              size="medium"
            />
            <p className="product-description">{product.description}</p>

            <div className="product-benefits">
              <h3>Benefits:</h3>
              <div className="benefits-list">
                {product.benefits.map((benefit, idx) => (
                  <span key={idx} className="benefit-pill">{benefit}</span>
                ))}
              </div>
            </div>

            <div className="product-variants">
              <h3>Select Size:</h3>
              <div className="variants-grid">
                {product.variants.map((v, idx) => (
                  <button
                    key={idx}
                    className={`variant-btn ${selectedVariant === idx ? 'active' : ''}`}
                    onClick={() => setSelectedVariant(idx)}
                  >
                    <span className="variant-size">{v.size}</span>
                    <span className="variant-price">₹{v.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="product-price">
              <span className="price-label">Price:</span>
              <span className="price-value">₹{variant.price}</span>
            </div>

            <div className="product-quantity">
              <h3>Quantity:</h3>
              <div className="quantity-control">
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
                <button
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button className="btn btn--primary btn--large btn--full" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <div className="product-meta">
              <div className="meta-item">
                <span className="meta-label">Stock:</span>
                <span className="meta-value stock-available">In Stock</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Weight:</span>
                <span className="meta-value">{variant.weight}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Product Information */}
        {product.heroLine && (
          <div className="product-detailed-info">
            <div className="product-hero-line">
              <h2>{product.heroLine}</h2>
            </div>

            {product.story && (
              <div className="product-story">
                <h3>Our Story</h3>
                <p>{product.story}</p>
              </div>
            )}

            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div className="product-key-features">
                <h3>Key Features</h3>
                <ul className="features-list">
                  {product.keyFeatures.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.nutritionHighlights && product.nutritionHighlights.length > 0 && (
              <div className="product-nutrition">
                <h3>Nutrition Highlights</h3>
                <div className="nutrition-chips">
                  {product.nutritionHighlights.map((nutrient, idx) => (
                    <span key={idx} className="nutrition-chip">{nutrient}</span>
                  ))}
                </div>
                {product.nutritionBenefits && product.nutritionBenefits.length > 0 && (
                  <>
                    <h4>Health Benefits</h4>
                    <ul className="benefits-nutrition-list">
                      {product.nutritionBenefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </>
                )}
                <Link to="/nutrition" className="nutrition-link">
                  View Complete Nutrition Info →
                </Link>
              </div>
            )}

            {product.cta && (
              <div className="product-cta-banner">
                <p>{product.cta}</p>
              </div>
            )}
          </div>
        )}

        {/* Customer Reviews Section */}
        <div className="product-reviews">
          <h2 className="reviews-title">Customer Reviews</h2>

          {(() => {
            const productReviews = getReviewsByProduct(product.name, reviews);
            const totalReviews = productReviews.length;
            const totalPages = Math.ceil(totalReviews / REVIEWS_PER_PAGE);
            const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
            const paginatedReviews = productReviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

            return totalReviews > 0 ? (
              <>
                <div className="reviews-list">
                  {paginatedReviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="review-author">
                          <div className="author-avatar">
                            {review.customer.charAt(0).toUpperCase()}
                          </div>
                          <div className="author-info">
                            <h4 className="author-name">{review.customer}</h4>
                            {review.location && (
                              <span className="author-location">{review.location}</span>
                            )}
                          </div>
                        </div>
                        <div className="review-rating">
                          <StarRating rating={review.rating} showCount={false} size="small" />
                          <span className="review-date">{review.date}</span>
                        </div>
                      </div>
                      <p className="review-text">{review.review}</p>
                      {review.source && (
                        <span className="review-source">Verified purchase - {review.source}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="reviews-pagination">
                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <div className="pagination-info">
                      <span>Page {currentPage} of {totalPages}</span>
                      <span className="pagination-count">({totalReviews} reviews)</span>
                    </div>
                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
            );
          })()}

          <ReviewForm
            productName={product.name}
            onSubmitSuccess={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      </div>

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
