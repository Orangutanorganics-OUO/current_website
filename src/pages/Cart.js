import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

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

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
      <div className="cart-empty">
        <div className="cart-empty__content">
          <div className="cart-empty__icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some amazing organic products to get started!</p>
          <Link to="/products" className="btn btn--primary">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item__image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-item__details">
                  <h3 className="cart-item__name">{item.name}</h3>
                  <p className="cart-item__variant">Size: {item.size}</p>
                  <p className="cart-item__price">₹{item.price}</p>
                </div>

                <div className="cart-item__quantity">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item__total">
                  ₹{item.price * item.quantity}
                </div>
                {/* <h1>TESTING: {item.size}</h1> */}
                

                <button
                  className="cart-item__remove"
                  onClick={() => removeItem(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal ({cart.length} items)</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-row summary-note">
              <span>Shipping charges</span>
              <span>Calculated at checkout</span>
            </div>

            {/* <div className="summary-divider"></div> */}

            <div className="summary-row summary-total">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <button className="btn btn--primary btn--large btn--full" onClick={handleCheckout}>
              Proceed to Checkout
            </button>

            <Link to="/products" className="continue-shopping">
              ← Continue Shopping
            </Link>

            <div className="trust-badges">
              <div className="badge">
                <span className="badge-icon">🔒</span>
                <span className="badge-text">Secure Payment</span>
              </div>
              <div className="badge">
                <span className="badge-icon">📦</span>
                <span className="badge-text">Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
