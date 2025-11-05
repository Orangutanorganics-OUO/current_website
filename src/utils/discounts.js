// Product Discount Configuration
// Update discount percentages here and they will reflect throughout the site

export const DISCOUNTS = {
  // Format: "Product Name": discount percentage (0-100)
  "Himalayan White Rajma": 0,
  "Himalayan Red Rajma": 0,
  "Badri Cow Ghee": 0,
  "Himalayan Black Soyabean": 0,
  "Himalayan Red Rice": 0,
  "Wild Himalayan Tempering Spice": 0
};

// Discount tag configuration
export const DISCOUNT_CONFIG = {
  tagLabel: "Diwali Discount", // Change this to update the discount tag label
  showTag: true // Set to false to hide discount tags entirely
};

// Helper function to get discount for a product
export const getDiscount = (productName) => {
  return DISCOUNTS[productName] || 0;
};

// Helper function to calculate discounted price
export const getDiscountedPrice = (originalPrice, productName) => {
  const discount = getDiscount(productName);
  if (discount === 0) return originalPrice;

  return Math.round(originalPrice * (1 - discount / 100));
};

// Helper function to check if product has discount
export const hasDiscount = (productName) => {
  return getDiscount(productName) > 0;
};
