/**
 * Meta Pixel Tracking Utility
 *
 * This tracks customer events on your website and sends them to Meta (Facebook) Pixel.
 * All logging is disabled for production.
 */

/**
 * Safely call fbq
 */
const callFbq = (method, eventName, parameters = {}) => {
  try {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
      return false;
    }

    window.fbq(method, eventName, parameters);
    return true;

  } catch (error) {
    return false;
  }
};

/**
 * Track when a user views a product detail page
 */
export const trackViewContent = (product, price) => {
  callFbq('track', 'ViewContent', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    content_category: product.category,
    value: price,
    currency: 'INR'
  });
};

/**
 * Track when a user adds a product to cart
 */
export const trackAddToCart = (cartItem) => {
  callFbq('track', 'AddToCart', {
    content_ids: [cartItem.productId],
    content_name: cartItem.name,
    content_type: 'product',
    value: cartItem.price * cartItem.quantity,
    currency: 'INR'
  });
};

/**
 * Track when a user goes to checkout page
 */
export const trackInitiateCheckout = (cart, totalValue) => {
  const contentIds = cart.map(item => item.productId);

  callFbq('track', 'InitiateCheckout', {
    content_ids: contentIds,
    content_type: 'product',
    value: totalValue,
    currency: 'INR',
    num_items: cart.reduce((sum, item) => sum + item.quantity, 0)
  });
};

/**
 * Track when a purchase is completed
 */
export const trackPurchase = ({
  orderId,
  products,
  total
}) => {
  const contentIds = products.map(item => item.productId || item.name);

  callFbq('track', 'Purchase', {
    content_ids: contentIds,
    content_type: 'product',
    value: total,
    currency: 'INR',
    num_items: products.reduce((sum, item) => sum + item.quantity, 0)
  });
};

/**
 * Track contact form submission
 */
export const trackLead = (formType) => {
  callFbq('track', 'Lead', {
    content_name: formType
  });
};
