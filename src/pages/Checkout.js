import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { trackInitiateCheckout, trackPurchase } from '../utils/metaPixel';
import { validateCoupon, calculateCouponDiscount, getCouponDiscount } from '../utils/coupons';
import Toast from '../components/Toast';
import './Checkout.css';

const CONFIG = {
  API_BASE_URL: 'https://api.orangutanorganics.com/api',
};

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

const scopedStyles = `
  .cko, .cko * { box-sizing: border-box; }
  .cko {
    background: ${W.CREAM};
    color: ${W.INK};
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    overflow-x: hidden;
    min-height: 60vh;
  }

  /* ---------- HERO ---------- */
  .cko__hero {
    position: relative; background: ${W.CREAM};
    padding: 72px 28px 32px;
    text-align: center;
  }
  .cko__hero-inner { max-width: 780px; margin: 0 auto; }
  .cko__eyebrow {
    display: inline-block;
    background: ${W.SEAL_TERRACOTTA}; color: ${W.CREAM};
    font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 7px 14px;
  }
  .cko__title {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: clamp(30px, 4vw, 46px);
    line-height: 1.08; margin: 16px 0 8px;
    color: ${W.DEEP_FOREST};
    font-weight: 700;
  }
  .cko__title em { font-style: normal; color: ${W.SEAL_TERRACOTTA}; }
  .cko__sub {
    color: ${W.INK}; font-size: 15px;
    max-width: 520px; margin: 0 auto;
  }

  /* ---------- MAIN ---------- */
  .cko-main { background: ${W.CREAM_SOFT}; padding: 44px 28px 88px; }
  .cko-main__inner { max-width: 1240px; margin: 0 auto; }
  .cko-grid {
    display: grid; grid-template-columns: 1.4fr 1fr; gap: 32px;
    align-items: start;
  }

  /* ---------- FORM SECTIONS ---------- */
  .cko-form { display: flex; flex-direction: column; gap: 18px; }
  .cko-section {
    background: ${W.CREAM};
    border: 1px solid rgba(3,96,92,0.12);
    padding: 26px 28px 28px;
  }
  .cko-section__head {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 18px;
  }
  .cko-section__num {
    width: 26px; height: 26px;
    display: inline-flex; align-items: center; justify-content: center;
    background: ${W.DEEP_FOREST}; color: ${W.CREAM};
    border-radius: 50%;
    font-size: 12px; font-weight: 800;
  }
  .cko-section__title {
    margin: 0;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 20px; color: ${W.DEEP_FOREST_DK}; font-weight: 700;
  }

  .cko-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    margin-bottom: 14px;
  }
  .cko-row--three { grid-template-columns: 1fr 1fr 1fr; }
  .cko-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
  .cko-row .cko-field { margin-bottom: 0; }
  .cko-field label {
    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
    font-weight: 700; color: ${W.DEEP_FOREST};
  }
  .cko-field input,
  .cko-field textarea {
    background: ${W.PAPER};
    color: ${W.DEEP_FOREST_DK};
    border: 1.5px solid rgba(3,96,92,0.20);
    padding: 11px 13px;
    font-size: 15px;
    font-family: inherit;
    outline: none;
    transition: border-color 180ms ease, background 180ms ease;
  }
  .cko-field input:focus,
  .cko-field textarea:focus {
    border-color: ${W.SEAL_TERRACOTTA};
    background: ${W.CREAM};
  }

  /* ---------- PAYMENT OPTIONS ---------- */
  .cko-pay { display: flex; flex-direction: column; gap: 12px; }
  .cko-pay-option {
    display: flex; align-items: flex-start; gap: 14px;
    background: ${W.PAPER};
    border: 1.5px solid rgba(3,96,92,0.18);
    padding: 16px 18px;
    cursor: pointer;
    transition: border-color 180ms ease, background 180ms ease;
  }
  .cko-pay-option:hover { border-color: ${W.MEADOW_GOLD}; }
  .cko-pay-option.is-active {
    border-color: ${W.DEEP_FOREST};
    background: ${W.CREAM};
    box-shadow: 0 0 0 3px rgba(3,96,92,0.08);
  }
  .cko-pay-option input[type="radio"] {
    margin-top: 4px;
    accent-color: ${W.DEEP_FOREST};
  }
  .cko-pay-option__body strong {
    display: block;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 16px; color: ${W.DEEP_FOREST_DK}; font-weight: 700;
    margin-bottom: 2px;
  }
  .cko-pay-option__body p {
    margin: 0; font-size: 13.5px; color: ${W.INK}; line-height: 1.5;
  }

  /* ---------- SUMMARY (sticky) ---------- */
  .cko-summary {
    position: sticky; top: 96px;
    background: ${W.CREAM};
    border: 1px solid rgba(3,96,92,0.14);
    padding: 26px 26px 28px;
    display: flex; flex-direction: column; gap: 14px;
  }
  .cko-summary__eyebrow {
    display: inline-block;
    background: ${W.DEEP_FOREST}; color: ${W.CREAM};
    font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
    font-weight: 700; padding: 5px 10px;
    align-self: flex-start;
  }
  .cko-summary__title {
    margin: 0 0 2px;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 20px; color: ${W.DEEP_FOREST_DK}; font-weight: 700;
  }

  .cko-items {
    max-height: 320px; overflow-y: auto;
    display: flex; flex-direction: column; gap: 10px;
    padding-right: 4px;
    border-bottom: 1px dashed rgba(3,96,92,0.20);
    padding-bottom: 12px;
  }
  .cko-item {
    display: grid; grid-template-columns: 52px 1fr auto;
    gap: 12px; align-items: center;
  }
  .cko-item img {
    width: 52px; height: 52px; object-fit: cover;
    background: ${W.CREAM_SOFT};
    border: 1px solid rgba(3,96,92,0.10);
  }
  .cko-item__name {
    margin: 0 0 2px;
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 14.5px; color: ${W.DEEP_FOREST_DK}; font-weight: 700;
    line-height: 1.3;
  }
  .cko-item__variant {
    margin: 0;
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    font-weight: 700; color: ${W.MEADOW_GOLD};
  }
  .cko-item__price {
    margin: 0; font-size: 14px; font-weight: 700; color: ${W.DEEP_FOREST_DK};
    font-family: Georgia, "Iowan Old Style", serif;
  }

  /* Coupon */
  .cko-coupon { display: flex; flex-direction: column; gap: 10px; }
  .cko-coupon__row { display: flex; gap: 8px; }
  .cko-coupon__input {
    flex: 1;
    background: ${W.PAPER};
    color: ${W.DEEP_FOREST_DK};
    border: 1.5px solid rgba(3,96,92,0.20);
    padding: 10px 12px;
    font-size: 13.5px;
    font-family: inherit;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    outline: none;
    transition: border-color 180ms ease;
  }
  .cko-coupon__input:focus { border-color: ${W.SEAL_TERRACOTTA}; }
  .cko-coupon__btn {
    background: ${W.DEEP_FOREST}; color: ${W.CREAM};
    border: 1.5px solid ${W.DEEP_FOREST};
    padding: 0 18px;
    font-size: 11.5px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; cursor: pointer;
    font-family: inherit;
    transition: background 180ms ease, border-color 180ms ease;
  }
  .cko-coupon__btn:hover { background: ${W.SEAL_TERRACOTTA}; border-color: ${W.SEAL_TERRACOTTA}; }

  .cko-coupon__list { display: flex; flex-direction: column; gap: 6px; }
  .cko-coupon-chip {
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    background: ${W.CREAM_SOFT};
    border: 1px solid ${W.MEADOW_GOLD};
    padding: 8px 12px;
    font-size: 12.5px;
  }
  .cko-coupon-chip__code {
    font-weight: 800; letter-spacing: 0.14em;
    color: ${W.DEEP_FOREST_DK};
  }
  .cko-coupon-chip__save { color: ${W.SUCCESS}; font-weight: 700; }
  .cko-coupon-chip__rm {
    background: transparent; border: none; cursor: pointer;
    color: ${W.BURGUNDY}; font-size: 18px; line-height: 1;
    padding: 0 4px;
  }
  .cko-coupon-chip__rm:hover { color: ${W.SEAL_TERRACOTTA}; }

  /* Calc rows */
  .cko-calc { display: flex; flex-direction: column; gap: 8px; padding-top: 4px; }
  .cko-calc__row {
    display: flex; justify-content: space-between; align-items: baseline;
    font-size: 14px; color: ${W.INK};
  }
  .cko-calc__row--muted { opacity: 0.75; font-size: 13px; }
  .cko-calc__row--save { color: ${W.SUCCESS}; font-weight: 700; }

  .cko-divider {
    height: 1px; background: rgba(3,96,92,0.15);
    margin: 4px 0;
  }
  .cko-total {
    display: flex; justify-content: space-between; align-items: baseline;
    padding-top: 6px;
  }
  .cko-total__label {
    font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;
    font-weight: 800; color: ${W.DEEP_FOREST};
  }
  .cko-total__value {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 26px; font-weight: 700; color: ${W.DEEP_FOREST_DK};
  }

  .cko-place {
    background: ${W.DEEP_FOREST}; color: ${W.CREAM};
    border: 1.5px solid ${W.DEEP_FOREST};
    padding: 16px 24px;
    font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase;
    font-weight: 700; cursor: pointer;
    font-family: inherit;
    transition: background 180ms ease, border-color 180ms ease, transform 180ms ease;
    margin-top: 4px;
  }
  .cko-place:hover:not(:disabled) {
    background: ${W.SEAL_TERRACOTTA}; border-color: ${W.SEAL_TERRACOTTA};
    transform: translateY(-1px);
  }
  .cko-place:disabled { opacity: 0.6; cursor: not-allowed; }

  .cko-trust {
    margin-top: 10px;
    padding-top: 14px;
    border-top: 1px dashed rgba(3,96,92,0.20);
    display: flex; flex-direction: column; gap: 6px;
  }
  .cko-trust p {
    margin: 0; font-size: 12.5px; line-height: 1.5;
    color: ${W.INK};
    display: flex; align-items: center; gap: 8px;
  }
  .cko-trust b { color: ${W.DEEP_FOREST_DK}; font-weight: 700; }

  /* ---------- RESPONSIVE ---------- */
  @media (max-width: 960px) {
    .cko-grid { grid-template-columns: 1fr; }
    .cko-summary { position: static; }
    .cko-row, .cko-row--three { grid-template-columns: 1fr; }
  }
  @media (max-width: 560px) {
    .cko__hero { padding: 56px 20px 24px; }
    .cko-main { padding: 32px 18px 60px; }
    .cko-section { padding: 22px 20px 24px; }
  }
`;

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
    state: '',
  });
  const [paymentMode, setPaymentMode] = useState('prepaid');
  const [shippingCharge, setShippingCharge] = useState(0);
  const [codCharge, setCodCharge] = useState(0);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupons, setAppliedCoupons] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cartData.length === 0) {
      navigate('/cart');
    }
    setCart(cartData);

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

  const cleanPhoneNumber = (phone) => {
    return phone.trim().replace(/\s+/g, '').replace(/[^\d+]/g, '');
  };

  const handleInputChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateCouponTotalDiscount = () => {
    const subtotal = calculateSubtotal();
    return appliedCoupons.reduce((total, coupon) => {
      return total + calculateCouponDiscount(subtotal, coupon.code);
    }, 0);
  };

  const calculateDiscount = () => {
    const totalWeight = calculateTotalWeight();
    const bulkDiscount = totalWeight >= 3000 ? Math.round(calculateSubtotal() * 0.20) : 0;
    return bulkDiscount + calculateCouponTotalDiscount();
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setToast({ message: 'Please enter a coupon code', type: 'error' });
      return;
    }

    if (appliedCoupons.some(c => c.code === couponCode.toUpperCase())) {
      setToast({ message: 'This coupon is already applied', type: 'error' });
      return;
    }

    if (validateCoupon(couponCode)) {
      const subtotal = calculateSubtotal();
      const discountAmount = calculateCouponDiscount(subtotal, couponCode);
      const discountPercent = getCouponDiscount(couponCode);

      setAppliedCoupons([...appliedCoupons, {
        code: couponCode.toUpperCase(),
        amount: discountAmount,
        percent: discountPercent,
      }]);
      setCouponCode('');
      setToast({
        message: `Coupon applied! You saved ₹${discountAmount} (${discountPercent}% off)`,
        type: 'success',
      });
    } else {
      setToast({ message: 'Invalid coupon code', type: 'error' });
    }
  };

  const handleRemoveCoupon = (couponToRemove) => {
    setAppliedCoupons(appliedCoupons.filter(c => c.code !== couponToRemove));
    setToast({ message: 'Coupon removed', type: 'success' });
  };

  const calculateTotalWeight = () => {
    return cart.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
  };

  const calculateShippingCharges = async () => {
    if (customerData.pincode.length !== 6) return;

    setIsCalculatingShipping(true);

    try {
      const subtotal = calculateSubtotal();

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

      const response = await axios.post(`${CONFIG.API_BASE_URL}/delhivery/calculate-shipping`, {
        pincode: customerData.pincode,
        weight: totalWeight,
        paymentMode: paymentMode,
      });

      if (response.data.success) {
        setShippingCharge(response.data.shippingCharge);
      } else {
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

    const cleanedPhone = cleanPhoneNumber(customerData.phone).replace(/[^0-9]/g, '');
    if (!/^\d{10}$/.test(cleanedPhone)) {
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

      let productsDesc = '';
      cart.forEach(item => {
        productsDesc += `${item.name}-${item.size}(${item.quantity}) `;
      });
      productsDesc += `+ COD charge ${codCharge}`;
      if (shippingCharge > 0) {
        productsDesc += ` + shipping charge ${shippingCharge}`;
      }

      const cleanedPhone = cleanPhoneNumber(customerData.phone);
      const shipmentData = {
        name: customerData.name,
        add: `${customerData.address1} ${customerData.address2}`.trim(),
        pin: customerData.pincode,
        city: customerData.city || '',
        state: customerData.state || '',
        country: 'India',
        phone: cleanedPhone,
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
        address_type: '',
      };

      const pickupLocation = {
        name: 'Delhivery Uttarkashi',
        add: '',
        city: '',
        pin: '249135',
        phone: '',
      };

      const orderDataForSheet = {
        type: 'checkout',
        orderId,
        timestamp: new Date().toISOString(),
        name: customerData.name,
        email: customerData.email,
        phone: cleanedPhone,
        address: `${customerData.address1} ${customerData.address2}`.trim(),
        pincode: customerData.pincode,
        city: customerData.city,
        state: customerData.state,
        products: cart.map(item => ({
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
        paymentMode: 'COD',
        paymentStatus: 'Pending',
        subtotal,
        shippingCharge,
        discountAmount: discount,
        codCharge,
        total: totalAmount,
      };

      try {
        console.log('Processing COD order via backend...');

        const response = await axios.post(`${CONFIG.API_BASE_URL}/checkout/process-cod`, {
          orderData: orderDataForSheet,
          shipmentData: shipmentData,
          pickupLocation: pickupLocation,
        });

        console.log('✅ COD order processed successfully:', response.data);
      } catch (backendError) {
        console.error('❌ Backend API error:', backendError.response?.data || backendError.message);
        setToast({
          message: `⚠️ Order may not be fully processed. Please contact support with Order ID: ${orderId}`,
          type: 'warning',
        });
      }

      trackPurchase({
        orderId,
        products: cart,
        total: totalAmount,
      });

      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));

      setToast({
        message: `Order placed successfully!\n\nOrder ID: ${orderId}\nTotal: ₹${totalAmount}\n\nYou will receive a confirmation email shortly.\nPay ₹${totalAmount} on delivery.`,
        type: 'success',
        duration: 5000,
      });

      setTimeout(() => navigate('/'), 2000);

    } catch (error) {
      console.error('Error placing COD order:', error);
      setToast({
        message: 'Error placing order. Please try again or contact support.',
        type: 'error',
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

      console.log('Creating Razorpay order via backend...');

      const orderResponse = await axios.post(`${CONFIG.API_BASE_URL}/razorpay/create-order`, {
        amount: totalAmount * 100,
        currency: 'INR',
        receipt: orderId,
      });

      if (!orderResponse.data.success) {
        throw new Error('Failed to create Razorpay order');
      }

      const razorpayOrder = orderResponse.data.order;
      const razorpayKeyId = orderResponse.data.key_id;

      console.log('✅ Razorpay order created:', razorpayOrder.id);

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
            console.log('✅ Payment successful, verifying...');

            try {
              const verifyResponse = await axios.post(`${CONFIG.API_BASE_URL}/razorpay/verify-payment`, {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (!verifyResponse.data.verified) {
                throw new Error('Payment verification failed');
              }

              console.log('✅ Payment verified successfully');

              let productsDesc = '';
              cart.forEach(item => {
                productsDesc += `${item.name}-${item.size}(${item.quantity}) `;
              });
              if (shippingCharge > 0) {
                productsDesc += `+ shipping charge ${shippingCharge}`;
              }

              const cleanedPhone = cleanPhoneNumber(customerData.phone);
              const shipmentData = {
                name: customerData.name,
                add: `${customerData.address1} ${customerData.address2}`.trim(),
                pin: customerData.pincode,
                city: customerData.city || '',
                state: customerData.state || '',
                country: 'India',
                phone: cleanedPhone,
                order: orderId,
                payment_mode: 'Prepaid',
                products_desc: productsDesc,
                cod_amount: '0',
                total_amount: String(totalAmount),
                weight: totalWeight,
                shipping_mode: 'Surface',
              };

              const pickupLocation = {
                name: 'Delhivery Uttarkashi',
                pin: '249135',
              };

              const orderDataForSheet = {
                type: 'checkout',
                orderId,
                timestamp: new Date().toISOString(),
                name: customerData.name,
                email: customerData.email,
                phone: cleanedPhone,
                address: `${customerData.address1} ${customerData.address2}`.trim(),
                pincode: customerData.pincode,
                city: customerData.city,
                state: customerData.state,
                products: cart.map(item => ({
                  name: item.name,
                  size: item.size,
                  quantity: item.quantity,
                  price: item.price,
                })),
                paymentMode: 'Prepaid',
                paymentStatus: 'Completed',
                subtotal,
                shippingCharge,
                discountAmount: discount,
                codCharge: 0,
                total: totalAmount,
              };

              const processResponse = await axios.post(`${CONFIG.API_BASE_URL}/checkout/process-prepaid`, {
                orderData: orderDataForSheet,
                shipmentData: shipmentData,
                pickupLocation: pickupLocation,
                paymentDetails: {
                  payment_id: response.razorpay_payment_id,
                  order_id: response.razorpay_order_id,
                },
              });

              console.log('✅ Order processed successfully:', processResponse.data);

              trackPurchase({
                orderId,
                products: cart,
                total: totalAmount,
              });

              localStorage.removeItem('cart');
              window.dispatchEvent(new Event('cartUpdated'));

              setToast({
                message: `Payment successful!\n\nOrder ID: ${orderId}\nTotal: ₹${totalAmount}\n\nYou will receive a confirmation email shortly.`,
                type: 'success',
                duration: 5000,
              });

              setTimeout(() => navigate('/'), 2000);

            } catch (error) {
              console.error('❌ Error processing payment:', error);
              setToast({
                message: `Payment successful but order processing failed.\n\nPlease contact support with:\nOrder ID: ${orderId}\nPayment ID: ${response.razorpay_payment_id}`,
                type: 'error',
                duration: 0,
              });
            }
          },
          prefill: {
            name: customerData.name,
            email: customerData.email,
            contact: cleanPhoneNumber(customerData.phone),
          },
          theme: {
            color: '#0F5B2F',
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function (response) {
          console.error('Payment failed:', response.error);
          setToast({
            message: `Payment failed: ${response.error.description}\n\nPlease try again.`,
            type: 'error',
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
        type: 'error',
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
  const total = calculateTotal();
  const bulkQualifies = calculateTotalWeight() >= 3000;
  const bulkDiscountAmount = bulkQualifies ? Math.round(subtotal * 0.20) : 0;

  return (
    <div className="cko">
      <style>{scopedStyles}</style>

      {/* ============ HERO ============ */}
      <section className="cko__hero">
        <div className="cko__hero-inner">
          <span className="cko__eyebrow">Checkout</span>
          <h1 className="cko__title">
            Almost <em>there</em>.
          </h1>
          <p className="cko__sub">
            Delivery details, payment method, and we&apos;ll pack your harvest.
          </p>
        </div>
      </section>

      {/* ============ MAIN ============ */}
      <section className="cko-main">
        <div className="cko-main__inner">
          <div className="cko-grid">
            {/* ----- form column ----- */}
            <div className="cko-form">
              <section className="cko-section">
                <div className="cko-section__head">
                  <span className="cko-section__num">1</span>
                  <h2 className="cko-section__title">Delivery information</h2>
                </div>

                <div className="cko-row">
                  <div className="cko-field">
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
                  <div className="cko-field">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXXXXXXX"
                      required
                    />
                  </div>
                </div>

                <div className="cko-field">
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

                <div className="cko-field">
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

                <div className="cko-field">
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

                <div className="cko-row cko-row--three">
                  <div className="cko-field">
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
                  <div className="cko-field">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={customerData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="cko-field">
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

              <section className="cko-section">
                <div className="cko-section__head">
                  <span className="cko-section__num">2</span>
                  <h2 className="cko-section__title">Payment method</h2>
                </div>

                <div className="cko-pay">
                  <label className={`cko-pay-option ${paymentMode === 'prepaid' ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMode"
                      value="prepaid"
                      checked={paymentMode === 'prepaid'}
                      onChange={(e) => setPaymentMode(e.target.value)}
                    />
                    <div className="cko-pay-option__body">
                      <strong>Prepaid (Online Payment)</strong>
                      <p>Pay securely using UPI, cards, or net banking.</p>
                    </div>
                  </label>

                  <label className={`cko-pay-option ${paymentMode === 'cod' ? 'is-active' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMode"
                      value="cod"
                      checked={paymentMode === 'cod'}
                      onChange={(e) => setPaymentMode(e.target.value)}
                    />
                    <div className="cko-pay-option__body">
                      <strong>Cash on Delivery</strong>
                      <p>Pay when you receive your order (₹150 COD charge applies).</p>
                    </div>
                  </label>
                </div>
              </section>
            </div>

            {/* ----- summary column ----- */}
            <aside className="cko-summary">
              <span className="cko-summary__eyebrow">Order Summary</span>
              <h2 className="cko-summary__title">Your order</h2>

              <div className="cko-items">
                {cart.map((item, index) => (
                  <div key={index} className="cko-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p className="cko-item__name">{item.name}</p>
                      <p className="cko-item__variant">{item.size} × {item.quantity}</p>
                    </div>
                    <p className="cko-item__price">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="cko-coupon">
                <div className="cko-coupon__row">
                  <input
                    type="text"
                    className="cko-coupon__input"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                  />
                  <button type="button" className="cko-coupon__btn" onClick={handleApplyCoupon}>
                    Apply
                  </button>
                </div>

                {appliedCoupons.length > 0 && (
                  <div className="cko-coupon__list">
                    {appliedCoupons.map((coupon, index) => (
                      <div key={index} className="cko-coupon-chip">
                        <span className="cko-coupon-chip__code">🎉 {coupon.code}</span>
                        <span className="cko-coupon-chip__save">−₹{coupon.amount}</span>
                        <button
                          type="button"
                          className="cko-coupon-chip__rm"
                          onClick={() => handleRemoveCoupon(coupon.code)}
                          aria-label={`Remove ${coupon.code}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="cko-calc">
                <div className="cko-calc__row">
                  <span>Subtotal (GST included)</span>
                  <span>₹{subtotal}</span>
                </div>

                {bulkQualifies && (
                  <div className="cko-calc__row cko-calc__row--save">
                    <span>Bulk Discount (20% OFF)</span>
                    <span>−₹{bulkDiscountAmount}</span>
                  </div>
                )}

                {appliedCoupons.map((coupon, index) => (
                  <div key={index} className="cko-calc__row cko-calc__row--save">
                    <span>Coupon ({coupon.code})</span>
                    <span>−₹{coupon.amount}</span>
                  </div>
                ))}

                {isCalculatingShipping ? (
                  <div className="cko-calc__row cko-calc__row--muted">
                    <span>Shipping</span>
                    <span>Calculating…</span>
                  </div>
                ) : (
                  <div className="cko-calc__row">
                    <span>Shipping</span>
                    <span>₹{shippingCharge}</span>
                  </div>
                )}

                {paymentMode === 'cod' && (
                  <div className="cko-calc__row">
                    <span>COD Charges</span>
                    <span>₹{codCharge}</span>
                  </div>
                )}
              </div>

              <div className="cko-divider" />

              <div className="cko-total">
                <span className="cko-total__label">Total</span>
                <span className="cko-total__value">₹{total}</span>
              </div>

              <button
                type="button"
                className="cko-place"
                onClick={handlePlaceOrder}
                disabled={isProcessing || isCalculatingShipping}
              >
                {isProcessing ? 'Processing…' : `Place Order (₹${total})`}
              </button>

              <div className="cko-trust">
                <p><b>📦 Free shipping on orders above ₹1000</b></p>
                <p><b>🛒 You can also buy through WhatsApp</b></p>
                <p><b>🛒 You can also buy through Amazon</b></p>
                {paymentMode === 'cod' && <p><b>💵 ₹150 COD charge applies</b></p>}
                <p><b>🔒 Your payment information is secure</b></p>
              </div>
            </aside>
          </div>
        </div>
      </section>

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
