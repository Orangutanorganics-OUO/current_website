// Coupon Configuration
// Add or update coupons here and they will be automatically available at checkout

export const COUPONS = {
  // Format: "COUPON_CODE": discount percentage (0-100)
  "OUO10": 10,       // 10% discount
  "HER11": 11,       // 11% WOMENS DAY DISCOUNT
};

// Helper function to validate coupon code
export const validateCoupon = (couponCode) => {
  const upperCode = couponCode.toUpperCase().trim();
  return COUPONS[upperCode] !== undefined;
};

// Helper function to get discount percentage for a coupon
export const getCouponDiscount = (couponCode) => {
  const upperCode = couponCode.toUpperCase().trim();
  return COUPONS[upperCode] || 0;
};

// Helper function to calculate discount amount
export const calculateCouponDiscount = (subtotal, couponCode) => {
  const discountPercent = getCouponDiscount(couponCode);
  if (discountPercent === 0) return 0;

  return Math.round(subtotal * (discountPercent / 100));
};

// Helper function to get all active coupons
export const getActiveCoupons = () => {
  return Object.keys(COUPONS);
};
