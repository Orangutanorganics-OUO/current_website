// Bestseller Products Configuration
// Add or remove product names to control which products show the bestseller ribbon

export const BESTSELLERS = [
  "Himalayan White Rajma",
  "Badri Cow Ghee",
  "Wild Himalayan Tempering Spice"
];

// Helper function to check if product is a bestseller
export const isBestseller = (productName) => {
  return BESTSELLERS.includes(productName);
};
