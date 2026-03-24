import { PRODUCTS } from './products';

// Helper function to check if a specific variant is available
export const isVariantAvailable = (productId, variantSize) => {
  const product = PRODUCTS.find(p => p.id === parseInt(productId));
  if (!product) return true; // Default to available if product not found

  const variant = product.variants.find(v => v.size === variantSize);
  if (!variant) return true; // Default to available if variant not found

  return variant.available !== false; // Return true unless explicitly set to false
};

// Helper function to check if ALL variants of a product are sold out
export const isProductSoldOut = (productId) => {
  const product = PRODUCTS.find(p => p.id === parseInt(productId));
  if (!product || !product.variants) return false;

  // Product is sold out only if ALL variants are unavailable
  return product.variants.every(variant => variant.available === false);
};

// Helper function to check if SOME (but not all) variants are sold out
export const hasSomeVariantsSoldOut = (productId) => {
  const product = PRODUCTS.find(p => p.id === parseInt(productId));
  if (!product || !product.variants) return false;

  const soldOutVariants = product.variants.filter(v => v.available === false);
  return soldOutVariants.length > 0 && soldOutVariants.length < product.variants.length;
};

// Helper function to get available variants for a product
export const getAvailableVariants = (productId) => {
  const product = PRODUCTS.find(p => p.id === parseInt(productId));
  if (!product || !product.variants) return [];

  return product.variants.filter(v => v.available !== false);
};

// Helper function to get sold out variants for a product
export const getSoldOutVariants = (productId) => {
  const product = PRODUCTS.find(p => p.id === parseInt(productId));
  if (!product || !product.variants) return [];

  return product.variants.filter(v => v.available === false);
};
