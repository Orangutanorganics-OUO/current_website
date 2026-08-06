import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

const W = {
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
  SUCCESS:         '#3F7A3B',
  BURGUNDY:        '#95373A',
};

const BULK_THRESHOLD_G = 3000;
const BULK_DISCOUNT_PCT = 0.20;

const scopedStyles = `
  .crt, .crt * { box-sizing: border-box; }
  .crt {
    background: ${W.CREAM};
    color: ${W.INK};
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    overflow-x: hidden;
    min-height: 60vh;
  }

  /* ---------- HERO ---------- */
  .crt__hero {
    position: relative; background: ${W.CREAM};
    padding: 72px 28px 32px;
    text-align: center;
  }
  .crt__hero-inner { max-width: 780px; margin: 0 auto; }
  .crt__eyebrow {
    display: inline-block;
    background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM};
    font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 7px 14px;
  }
  .crt__title {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(30px, 4vw, 46px);
    line-height: 1.08; margin: 16px 0 8px;
    color: ${W.DEEP_FOREST};
    font-weight: 700;
  }
  .crt__title em { font-style: normal; color: ${W.SEAL_TERRACOTTA}; }
  .crt__sub {
    color: ${W.INK}; font-size: 15px;
    max-width: 520px; margin: 0 auto;
  }

  /* ---------- MAIN LAYOUT ---------- */
  .crt-main { background: ${W.CREAM_SOFT}; padding: 44px 28px 88px; }
  .crt-main__inner { max-width: 1240px; margin: 0 auto; }
  .crt-grid {
    display: grid; grid-template-columns: 1.6fr 1fr; gap: 32px;
    align-items: start;
  }

  /* ---------- ITEMS ---------- */
  .crt-items { display: flex; flex-direction: column; gap: 14px; }
  .crt-item {
    background: ${W.CREAM};
    border: 1px solid rgba(3,96,92,0.12);
    padding: 18px 20px;
    display: grid;
    grid-template-columns: 88px 1fr auto auto auto;
    align-items: center;
    gap: 20px;
    transition: border-color 180ms ease, box-shadow 180ms ease;
  }
  .crt-item:hover { border-color: ${W.MEADOW_GOLD}; box-shadow: 0 6px 16px rgba(1,53,50,0.06); }

  .crt-item__image {
    width: 88px; height: 88px;
    overflow: hidden;
    background: ${W.CREAM_SOFT};
    border: 1px solid rgba(3,96,92,0.10);
  }
  .crt-item__image img { display: block; width: 100%; height: 100%; object-fit: cover; }

  .crt-item__details { min-width: 0; }
  .crt-item__name {
    margin: 0 0 4px;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 17px; color: ${W.DEEP_FOREST_DK}; font-weight: 700;
    line-height: 1.3;
  }
  .crt-item__variant {
    margin: 0 0 4px;
    font-size: 11.5px; letter-spacing: 0.16em; text-transform: uppercase;
    font-weight: 700; color: ${W.MEADOW_GOLD};
  }
  .crt-item__price {
    margin: 0; font-size: 14px; color: ${W.INK}; opacity: 0.9;
  }

  .crt-qty {
    display: inline-flex; align-items: center; gap: 0;
    border: 1.5px solid rgba(3,96,92,0.20);
    background: ${W.PAPER};
    overflow: hidden;
  }
  .crt-qty__btn {
    background: transparent; border: none; cursor: pointer;
    width: 32px; height: 34px;
    display: inline-flex; align-items: center; justify-content: center;
    color: ${W.DEEP_FOREST}; font-size: 16px; font-weight: 700;
    transition: background 150ms ease, color 150ms ease;
  }
  .crt-qty__btn:hover { background: ${W.DEEP_FOREST}; color: ${W.CREAM}; }
  .crt-qty__input {
    width: 46px; height: 34px;
    background: transparent; border: none; outline: none;
    text-align: center;
    font-family: inherit; font-size: 14px; font-weight: 700;
    color: ${W.DEEP_FOREST_DK};
    border-left: 1px solid rgba(3,96,92,0.15);
    border-right: 1px solid rgba(3,96,92,0.15);
    -moz-appearance: textfield;
  }
  .crt-qty__input::-webkit-outer-spin-button,
  .crt-qty__input::-webkit-inner-spin-button {
    -webkit-appearance: none; margin: 0;
  }

  .crt-item__total {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 17px; font-weight: 700; color: ${W.DEEP_FOREST_DK};
    min-width: 72px; text-align: right;
  }

  .crt-item__remove {
    background: transparent; border: 1px solid rgba(149,55,58,0.25);
    color: ${W.BURGUNDY};
    width: 30px; height: 30px;
    display: inline-flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 12px; line-height: 1;
    transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
  }
  .crt-item__remove:hover {
    background: ${W.BURGUNDY}; color: ${W.CREAM}; border-color: ${W.BURGUNDY};
  }

  /* ---------- SUMMARY (sticky) ---------- */
  .crt-summary {
    position: sticky; top: 96px;
    background: ${W.CREAM};
    border: 1px solid rgba(3,96,92,0.14);
    padding: 26px 26px 28px;
    display: flex; flex-direction: column; gap: 14px;
  }
  .crt-summary__title {
    margin: 0 0 2px;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 20px; color: ${W.DEEP_FOREST_DK}; font-weight: 700;
  }
  .crt-summary__eyebrow {
    display: inline-block;
    background: ${W.DEEP_FOREST}; color: ${W.CREAM};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 5px 10px;
    align-self: flex-start;
  }

  .crt-row {
    display: flex; justify-content: space-between; align-items: baseline;
    font-size: 14.5px; color: ${W.INK};
  }
  .crt-row--muted { opacity: 0.75; font-size: 13px; }
  .crt-row--discount { color: ${W.SUCCESS}; font-weight: 700; }

  .crt-divider {
    height: 1px; background: rgba(3,96,92,0.15);
    margin: 4px 0;
  }
  .crt-total {
    display: flex; justify-content: space-between; align-items: baseline;
    padding-top: 6px;
  }
  .crt-total__label {
    font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 800; color: ${W.DEEP_FOREST};
  }
  .crt-total__value {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 26px; font-weight: 700; color: ${W.DEEP_FOREST_DK};
  }

  /* Bulk discount progress */
  .crt-bulk {
    background: ${W.CREAM_SOFT};
    border: 1px solid rgba(181,136,45,0.35);
    padding: 12px 14px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .crt-bulk__label {
    font-size: 11.5px; letter-spacing: 0.14em; text-transform: uppercase;
    font-weight: 700; color: ${W.DEEP_FOREST_DK};
    display: flex; justify-content: space-between; gap: 8px;
  }
  .crt-bulk__label span:last-child { color: ${W.MEADOW_GOLD}; }
  .crt-bulk__bar {
    height: 6px; background: rgba(3,96,92,0.12);
    overflow: hidden;
  }
  .crt-bulk__fill {
    height: 100%; background: ${W.MEADOW_GOLD};
    transition: width 400ms cubic-bezier(0.22, 0.7, 0.2, 1);
  }
  .crt-bulk--unlocked .crt-bulk__label { color: ${W.SUCCESS}; }
  .crt-bulk--unlocked .crt-bulk__fill { background: ${W.SUCCESS}; }

  /* CTA */
  .crt-cta {
    background: ${W.DEEP_FOREST}; color: ${W.CREAM};
    border: 1.5px solid ${W.DEEP_FOREST};
    padding: 16px 24px;
    font-size: 13px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 700; cursor: pointer;
    font-family: inherit;
    transition: background 180ms ease, color 180ms ease, border-color 180ms ease, transform 180ms ease;
    margin-top: 4px;
  }
  .crt-cta:hover {
    background: ${W.SEAL_TERRACOTTA}; border-color: ${W.SEAL_TERRACOTTA};
    transform: translateY(-1px);
  }
  .crt-continue {
    display: inline-block;
    text-align: center;
    text-decoration: none;
    color: ${W.DEEP_FOREST};
    font-size: 11.5px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; padding: 4px;
    transition: color 180ms ease;
  }
  .crt-continue:hover { color: ${W.SEAL_TERRACOTTA}; }

  .crt-badges {
    display: flex; gap: 12px; margin-top: 6px;
    padding-top: 14px;
    border-top: 1px dashed rgba(3,96,92,0.20);
  }
  .crt-badge {
    flex: 1;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase;
    font-weight: 700; color: ${W.DEEP_FOREST};
    text-align: center;
  }
  .crt-badge__icon {
    width: 32px; height: 32px;
    display: inline-flex; align-items: center; justify-content: center;
    background: ${W.CREAM_SOFT};
    border-radius: 50%;
    color: ${W.DEEP_FOREST};
  }

  /* ---------- EMPTY ---------- */
  .crt-empty {
    min-height: 65vh;
    background: ${W.CREAM};
    display: flex; align-items: center; justify-content: center;
    padding: 64px 24px;
  }
  .crt-empty__inner {
    max-width: 480px; text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 18px;
  }
  .crt-empty__icon {
    width: 88px; height: 88px;
    display: inline-flex; align-items: center; justify-content: center;
    background: ${W.CREAM_SOFT};
    border: 1.5px solid ${W.MEADOW_GOLD};
    border-radius: 50%;
    color: ${W.DEEP_FOREST};
  }
  .crt-empty h2 {
    margin: 0;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(24px, 3vw, 32px);
    color: ${W.DEEP_FOREST_DK}; font-weight: 700;
  }
  .crt-empty p {
    margin: 0; color: ${W.INK}; font-size: 15px; line-height: 1.6;
  }
  .crt-empty__btn {
    display: inline-flex; align-items: center; gap: 8px;
    text-decoration: none;
    background: ${W.DEEP_FOREST}; color: ${W.CREAM};
    border: 1.5px solid ${W.DEEP_FOREST};
    padding: 14px 26px;
    font-size: 12.5px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 700;
    transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;
    margin-top: 6px;
  }
  .crt-empty__btn:hover {
    background: ${W.SEAL_TERRACOTTA}; border-color: ${W.SEAL_TERRACOTTA};
    transform: translateY(-1px);
  }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 960px) {
    .crt-grid { grid-template-columns: 1fr; }
    .crt-summary { position: static; }
  }
  @media (max-width: 640px) {
    .crt-item {
      grid-template-columns: 72px 1fr auto;
      grid-template-areas:
        "img details remove"
        "img details remove"
        "qty qty total";
      row-gap: 12px;
    }
    .crt-item__image { grid-area: img; width: 72px; height: 72px; }
    .crt-item__details { grid-area: details; }
    .crt-item__remove { grid-area: remove; align-self: start; }
    .crt-qty { grid-area: qty; justify-self: start; }
    .crt-item__total { grid-area: total; justify-self: end; }
    .crt-main { padding: 32px 18px 60px; }
    .crt__hero { padding: 56px 20px 24px; }
  }
`;

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(cartData);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const calculateSubtotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const calculateTotalWeight = () =>
    cart.reduce((sum, item) => sum + item.weight * item.quantity, 0);

  const calculateDiscount = () => {
    const totalWeight = calculateTotalWeight();
    if (totalWeight >= BULK_THRESHOLD_G) {
      return Math.round(calculateSubtotal() * BULK_DISCOUNT_PCT);
    }
    return 0;
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="crt">
        <style>{scopedStyles}</style>
        <div className="crt-empty">
          <div className="crt-empty__inner">
            <div className="crt-empty__icon" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </div>
            <h2>Your cart is empty</h2>
            <p>Add some amazing organic products to get started.</p>
            <Link to="/products" className="crt-empty__btn">Shop Now</Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const finalSubtotal = subtotal - discount;
  const totalWeight = calculateTotalWeight();
  const remainingToBulk = Math.max(0, BULK_THRESHOLD_G - totalWeight);
  const bulkProgress = Math.min(100, Math.round((totalWeight / BULK_THRESHOLD_G) * 100));
  const bulkUnlocked = totalWeight >= BULK_THRESHOLD_G;

  return (
    <div className="crt">
      <style>{scopedStyles}</style>

      {/* ============ HERO ============ */}
      <section className="crt__hero">
        <div className="crt__hero-inner">
          <span className="crt__eyebrow">Cart</span>
          <h1 className="crt__title">
            Your <em>harvest</em>.
          </h1>
          <p className="crt__sub">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} · review before checkout
          </p>
        </div>
      </section>

      {/* ============ MAIN ============ */}
      <section className="crt-main">
        <div className="crt-main__inner">
          <div className="crt-grid">
            {/* ----- items ----- */}
            <div className="crt-items">
              {cart.map((item, index) => (
                <div key={index} className="crt-item">
                  <div className="crt-item__image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="crt-item__details">
                    <h3 className="crt-item__name">{item.name}</h3>
                    <p className="crt-item__variant">Size: {item.size}</p>
                    <p className="crt-item__price">₹{item.price}</p>
                  </div>

                  <div className="crt-qty">
                    <button
                      type="button"
                      className="crt-qty__btn"
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="crt-qty__input"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                      min="1"
                      aria-label="Quantity"
                    />
                    <button
                      type="button"
                      className="crt-qty__btn"
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <div className="crt-item__total">
                    ₹{item.price * item.quantity}
                  </div>

                  <button
                    type="button"
                    className="crt-item__remove"
                    onClick={() => removeItem(index)}
                    aria-label={`Remove ${item.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* ----- summary ----- */}
            <aside className="crt-summary">
              <span className="crt-summary__eyebrow">Order Summary</span>
              <h2 className="crt-summary__title">Review your basket</h2>

              <div className={`crt-bulk ${bulkUnlocked ? 'crt-bulk--unlocked' : ''}`}>
                <div className="crt-bulk__label">
                  <span>
                    {bulkUnlocked
                      ? '20% Bulk Discount unlocked'
                      : `Add ${remainingToBulk}g more for 20% off`}
                  </span>
                  <span>{totalWeight}g / {BULK_THRESHOLD_G}g</span>
                </div>
                <div className="crt-bulk__bar">
                  <div className="crt-bulk__fill" style={{ width: `${bulkProgress}%` }} />
                </div>
              </div>

              <div className="crt-row">
                <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                <span>₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="crt-row crt-row--discount">
                  <span>Bulk Discount (20% OFF)</span>
                  <span>−₹{discount}</span>
                </div>
              )}

              <div className="crt-row crt-row--muted">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="crt-divider" />

              <div className="crt-total">
                <span className="crt-total__label">Subtotal</span>
                <span className="crt-total__value">₹{finalSubtotal}</span>
              </div>

              <button type="button" className="crt-cta" onClick={handleCheckout}>
                Proceed to Checkout
              </button>

              <Link to="/products" className="crt-continue">
                ← Continue Shopping
              </Link>

              <div className="crt-badges">
                <div className="crt-badge">
                  <span className="crt-badge__icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <span>Secure Payment</span>
                </div>
                <div className="crt-badge">
                  <span className="crt-badge__icon" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 3h5v5"/>
                      <path d="M8 3H3v5"/>
                      <path d="M12 22V12"/>
                      <path d="M20 12v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5"/>
                      <path d="M12 12l-4-4"/>
                      <path d="M12 12l4-4"/>
                    </svg>
                  </span>
                  <span>Fast Delivery</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
