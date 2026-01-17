import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { trackInitiateCheckout, trackPurchase } from '../utils/metaPixel';
import Toast from '../components/Toast';
import './Checkout.css';

// Configuration - Update with your backend API URL after deployment
const CONFIG = {
  // Backend API URL - Update after deploying to Render.com
  // For local development: http://localhost:5000/api
  // For production: https://your-app.onrender.com/api
  API_BASE_URL: 'https://new-whatsapp-shopping.onrender.com/api'
};

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    pincode: '',
    city: '',
    state: ''
  });
  const [paymentMode, setPaymentMode] = useState('prepaid');
  const [shippingCharge, setShippingCharge] = useState(0);
  const [codCharge, setCodCharge] = useState(0);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cartData.length === 0) {
      navigate('/cart');
    }
    setCart(cartData);

    // Track InitiateCheckout event in Meta Pixel
    if (cartData.length > 0) {
      const subtotal = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      trackInitiateCheckout(cartData, subtotal);
    }
  }, [navigate]);

  useEffect(() => {
    if (customerData.pincode && customerData.pincode.length === 6) {
      calculateShippingCharges();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerData.pincode, paymentMode]);

  const handleInputChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    const totalWeight = calculateTotalWeight();
    if (totalWeight >= 3000) {
      return Math.round(calculateSubtotal() * 0.20); // 20% discount for 3kg or more
    }
    return 0;
  };

  const calculateTotalWeight = () => {
    return cart.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
  };

  const calculateShippingCharges = async () => {
    if (customerData.pincode.length !== 6) return;

    setIsCalculatingShipping(true);

    try {
      const subtotal = calculateSubtotal();

      // Free shipping for orders above ₹1000
      if (subtotal >= 1000) {
        setShippingCharge(0);

        if (paymentMode === 'cod') {
          setCodCharge(150);
        } else {
          setCodCharge(0);
        }

        setIsCalculatingShipping(false);
        return;
      }

      const totalWeight = calculateTotalWeight();

      // Call backend API to calculate shipping
      const response = await axios.post(`${CONFIG.API_BASE_URL}/delhivery/calculate-shipping`, {
        pincode: customerData.pincode,
        weight: totalWeight,
        paymentMode: paymentMode
      });

      if (response.data.success) {
        setShippingCharge(response.data.shippingCharge);
      } else {
        // Fallback calculation
        const fallbackCharge = Math.round((totalWeight / 1000) * 50 + 40);
        setShippingCharge(fallbackCharge);
      }

      if (paymentMode === 'cod') {
        setCodCharge(150);
      } else {
        setCodCharge(0);
      }

    } catch (error) {
      console.error('Error calculating shipping charges:', error);
      // Fallback to basic calculation on error
      const totalWeight = calculateTotalWeight();
      const fallbackCharge = Math.round((totalWeight / 1000) * 50 + 40);
      setShippingCharge(fallbackCharge);

      if (paymentMode === 'cod') {
        setCodCharge(150);
      } else {
        setCodCharge(0);
      }
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return subtotal - discount + shippingCharge + codCharge;
  };

  const validateForm = () => {
    if (!customerData.name || !customerData.email || !customerData.phone ||
        !customerData.address1 || !customerData.pincode) {
      setToast({ message: 'Please fill in all required fields', type: 'error' });
      return false;
    }

    if (customerData.pincode.length !== 6) {
      setToast({ message: 'Please enter a valid 6-digit pincode', type: 'error' });
      return false;
    }

    if (!/^\d{10}$/.test(customerData.phone.replace(/[^0-9]/g, ''))) {
      setToast({ message: 'Please enter a valid 10-digit phone number', type: 'error' });
      return false;
    }

    return true;
  };

  const handleCODOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      const orderId = `OUO_${Date.now()}`;
      const totalWeight = calculateTotalWeight();
      const subtotal = calculateSubtotal();
      const discount = calculateDiscount();
      const totalAmount = calculateTotal();

      // Prepare product description for Delhivery
      let productsDesc = '';
      cart.forEach(item => {
        productsDesc += `${item.name}-${item.size}(${item.quantity}) `;
      });
      productsDesc += `+ COD charge ${codCharge}`;
      if (shippingCharge > 0) {
        productsDesc += ` + shipping charge ${shippingCharge}`;
      }

      // Create Delhivery shipment
      const shipmentData = {
        name: customerData.name,
        add: `${customerData.address1} ${customerData.address2}`.trim(),
        pin: customerData.pincode,
        city: customerData.city || '',
        state: customerData.state || '',
        country: 'India',
        phone: customerData.phone,
        order: orderId,
        payment_mode: 'COD',
        return_pin: '',
        return_city: '',
        return_phone: '',
        return_add: '',
        return_state: '',
        return_country: '',
        products_desc: productsDesc,
        hsn_code: '',
        cod_amount: String(totalAmount),
        order_date: null,
        total_amount: String(totalAmount),
        seller_add: '',
        seller_name: '',
        seller_inv: '',
        quantity: '',
        waybill: '',
        shipment_width: '',
        shipment_height: '',
        weight: totalWeight,
        shipping_mode: 'Surface',
        address_type: ''
      };

      const pickupLocation = {
        name: 'Delhivery Uttarkashi',
        add: '',
        city: '',
        pin: '249135',
        phone: ''
      };

      // Prepare order data
      const orderDataForSheet = {
        type: 'checkout',
        orderId,
        timestamp: new Date().toISOString(),
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: `${customerData.address1} ${customerData.address2}`.trim(),
        pincode: customerData.pincode,
        city: customerData.city,
        state: customerData.state,
        products: cart.map(item => ({
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price
        })),
        paymentMode: 'COD',
        paymentStatus: 'Pending',
        subtotal,
        discount,
        shippingCharge,
        codCharge,
        total: totalAmount
      };

      // Call backend API to process COD order (creates shipment + saves to sheets)
      try {
        console.log('Processing COD order via backend...');

        const response = await axios.post(`${CONFIG.API_BASE_URL}/checkout/process-cod`, {
          orderData: orderDataForSheet,
          shipmentData: shipmentData,
          pickupLocation: pickupLocation
        });

        console.log('✅ COD order processed successfully:', response.data);
      } catch (backendError) {
        console.error('❌ Backend API error:', backendError.response?.data || backendError.message);
        setToast({
          message: `⚠️ Order may not be fully processed. Please contact support with Order ID: ${orderId}`,
          type: 'warning'
        });
      }

      // Track purchase event in Meta Pixel
      trackPurchase({
        orderId,
        products: cart,
        total: totalAmount
      });

      // Clear cart
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));

      // Success message
      setToast({
        message: `Order placed successfully!\n\nOrder ID: ${orderId}\nTotal: ₹${totalAmount}\n\nYou will receive a confirmation email shortly.\nPay ₹${totalAmount} on delivery.`,
        type: 'success',
        duration: 5000
      });

      // Navigate after a short delay to allow user to see the message
      setTimeout(() => navigate('/'), 2000);

    } catch (error) {
      console.error('Error placing COD order:', error);
      setToast({
        message: 'Error placing order. Please try again or contact support.',
        type: 'error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrepaidOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      const orderId = `OUO_${Date.now()}`;
      const totalAmount = calculateTotal();
      const subtotal = calculateSubtotal();
      const discount = calculateDiscount();
      const totalWeight = calculateTotalWeight();

      // Step 1: Create Razorpay order via backend
      console.log('Creating Razorpay order via backend...');

      const orderResponse = await axios.post(`${CONFIG.API_BASE_URL}/razorpay/create-order`, {
        amount: totalAmount * 100,
        currency: 'INR',
        receipt: orderId
      });

      if (!orderResponse.data.success) {
        throw new Error('Failed to create Razorpay order');
      }

      const razorpayOrder = orderResponse.data.order;
      const razorpayKeyId = orderResponse.data.key_id;

      console.log('✅ Razorpay order created:', razorpayOrder.id);

      // Step 2: Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: razorpayKeyId,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          order_id: razorpayOrder.id,
          name: 'Orangutan Organics',
          description: 'Order Payment',
          handler: async function (response) {
            // Payment successful - now verify and process through backend
            console.log('✅ Payment successful, verifying...');

            try {
              // Step 1: Verify payment through backend
              const verifyResponse = await axios.post(`${CONFIG.API_BASE_URL}/razorpay/verify-payment`, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });

              if (!verifyResponse.data.verified) {
                throw new Error('Payment verification failed');
              }

              console.log('✅ Payment verified successfully');

              // Step 2: Prepare data for backend processing
              let productsDesc = '';
              cart.forEach(item => {
                productsDesc += `${item.name}-${item.size}(${item.quantity}) `;
              });
              if (shippingCharge > 0) {
                productsDesc += `+ shipping charge ${shippingCharge}`;
              }

              const shipmentData = {
                name: customerData.name,
                add: `${customerData.address1} ${customerData.address2}`.trim(),
                pin: customerData.pincode,
                city: customerData.city || '',
                state: customerData.state || '',
                country: 'India',
                phone: customerData.phone,
                order: orderId,
                payment_mode: 'Prepaid',
                products_desc: productsDesc,
                cod_amount: '0',
                total_amount: String(totalAmount),
                weight: totalWeight,
                shipping_mode: 'Surface'
              };

              const pickupLocation = {
                name: 'Delhivery Uttarkashi',
                pin: '249135'
              };

              const orderDataForSheet = {
                type: 'checkout',
                orderId,
                timestamp: new Date().toISOString(),
                name: customerData.name,
                email: customerData.email,
                phone: customerData.phone,
                address: `${customerData.address1} ${customerData.address2}`.trim(),
                pincode: customerData.pincode,
                city: customerData.city,
                state: customerData.state,
                products: cart.map(item => ({
                  name: item.name,
                  size: item.size,
                  quantity: item.quantity,
                  price: item.price
                })),
                paymentMode: 'Prepaid',
                paymentStatus: 'Completed',
                subtotal,
                discount,
                shippingCharge,
                codCharge: 0,
                total: totalAmount
              };

              // Step 3: Process order through backend (creates shipment + saves to sheets)
              const processResponse = await axios.post(`${CONFIG.API_BASE_URL}/checkout/process-prepaid`, {
                orderData: orderDataForSheet,
                shipmentData: shipmentData,
                pickupLocation: pickupLocation,
                paymentDetails: {
                  payment_id: response.razorpay_payment_id,
                  order_id: response.razorpay_order_id
                }
              });

              console.log('✅ Order processed successfully:', processResponse.data);

              // Track purchase event in Meta Pixel
              trackPurchase({
                orderId,
                products: cart,
                total: totalAmount
              });

              // Clear cart
              localStorage.removeItem('cart');
              window.dispatchEvent(new Event('cartUpdated'));

              setToast({
                message: `Payment successful!\n\nOrder ID: ${orderId}\nTotal: ₹${totalAmount}\n\nYou will receive a confirmation email shortly.`,
                type: 'success',
                duration: 5000
              });

              // Navigate after a short delay
              setTimeout(() => navigate('/'), 2000);

            } catch (error) {
              console.error('❌ Error processing payment:', error);
              setToast({
                message: `Payment successful but order processing failed.\n\nPlease contact support with:\nOrder ID: ${orderId}\nPayment ID: ${response.razorpay_payment_id}`,
                type: 'error',
                duration: 0 // Don't auto-dismiss error messages
              });
            }
          },
          prefill: {
            name: customerData.name,
            email: customerData.email,
            contact: customerData.phone
          },
          theme: {
            color: '#0F5B2F'
          },
          modal: {
            ondismiss: function() {
              setIsProcessing(false);
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function (response) {
          console.error('Payment failed:', response.error);
          setToast({
            message: `Payment failed: ${response.error.description}\n\nPlease try again.`,
            type: 'error'
          });
          setIsProcessing(false);
        });

        razorpay.open();
        setIsProcessing(false);
      };

    } catch (error) {
      console.error('Error initiating payment:', error);
      setToast({
        message: 'Error initiating payment. Please try again.',
        type: 'error'
      });
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMode === 'cod') {
      handleCODOrder();
    } else {
      handlePrepaidOrder();
    }
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const total = calculateTotal();

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-layout">
          <div className="checkout-form">
            <section className="form-section">
              <h2>Delivery Information</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={customerData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address1">Address Line 1 *</label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  value={customerData.address1}
                  onChange={handleInputChange}
                  placeholder="House no., Street name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address2">Address Line 2</label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={customerData.address2}
                  onChange={handleInputChange}
                  placeholder="Landmark, Area"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pincode">Pincode *</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={customerData.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    maxLength="6"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={customerData.city}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={customerData.state}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Payment Method</h2>

              <div className="payment-methods">
                <label className={`payment-option ${paymentMode === 'prepaid' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMode"
                    value="prepaid"
                    checked={paymentMode === 'prepaid'}
                    onChange={(e) => setPaymentMode(e.target.value)}
                  />
                  <div className="payment-info">
                    <strong>Prepaid (Online Payment)</strong>
                    <p>Pay securely using UPI, Cards, Net Banking</p>
                  </div>
                </label>

                <label className={`payment-option ${paymentMode === 'cod' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMode"
                    value="cod"
                    checked={paymentMode === 'cod'}
                    onChange={(e) => setPaymentMode(e.target.value)}
                  />
                  <div className="payment-info">
                    <strong>Cash on Delivery</strong>
                    <p>Pay when you receive your order (₹150 COD charge applies)</p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="summary-items">
              {cart.map((item, index) => (
                <div key={index} className="summary-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-variant">{item.size} × {item.quantity}</p>
                  </div>
                  <p className="item-price">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="summary-calculations">
              <div className="calc-row">
                <span>Subtotal (GST included)</span>
                <span>₹{subtotal}</span>
              </div>

              {discount > 0 && (
                <div className="calc-row" style={{ color: '#28a745', fontWeight: '600' }}>
                  <span>Bulk Discount (20% OFF)</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              {isCalculatingShipping ? (
                <div className="calc-row">
                  <span>Shipping</span>
                  <span>Calculating...</span>
                </div>
              ) : (
                <div className="calc-row">
                  <span>Shipping</span>
                  <span>₹{shippingCharge}</span>
                </div>
              )}

              {paymentMode === 'cod' && (
                <div className="calc-row">
                  <span>COD Charges</span>
                  <span>₹{codCharge}</span>
                </div>
              )}

              <div className="calc-row total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              className="btn btn--primary btn--large btn--full"
              onClick={handlePlaceOrder}
              disabled={isProcessing || isCalculatingShipping}
            >
              {isProcessing ? 'Processing...' : `Place Order (₹${total})`}
            </button>

            <div className="trust-info">
              <p><b>📦 Free shipping on orders above ₹1000</b></p>
              <p><b>🛒 You can also buy through WhatsApp</b></p>
              <p><b>🛒 You can also buy through Amazon</b></p>
              {paymentMode === 'cod' && <p><b>💵 ₹150 COD charge applies</b></p>}
              <p><b>🔒 Your payment information is secure</b></p>
              
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default Checkout;
