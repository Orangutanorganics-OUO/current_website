// Google Sheets API configuration
const SHEET_ID = process.env.REACT_APP_GOOGLE_SHEET_ID || '1lFlOV7SN_N3URnaUOt4d8imxK2UhyrTb1lfquivadQI';
const SHEET_NAME = 'Reviews';
// Note: This requires the Google Sheet to be publicly accessible (Link sharing: Anyone with the link can view)

/**
 * Fetches reviews from Google Sheets
 * @returns {Promise<Array>} Array of review objects
 */
export const fetchReviewsFromSheet = async () => {
  try {
    // Using the Google Sheets public CSV export
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`;

    const response = await fetch(url);
    const text = await response.text();

    // Google Sheets wraps the JSON in a function call, we need to extract it
    const jsonString = text.substring(47).slice(0, -2); // Remove "/*O_o*/google.visualization.Query.setResponse(" and ");"
    const data = JSON.parse(jsonString);

    // Extract rows
    const rows = data.table.rows;
    const headers = data.table.cols.map(col => col.label);

    // Map rows to review objects
    const reviews = rows.map((row, index) => {
      const review = {};
      headers.forEach((header, i) => {
        const cell = row.c[i];
        // Use formatted value (f) for dates, otherwise use value (v)
        if (cell) {
          review[header.toLowerCase()] = cell.f !== undefined ? cell.f : cell.v;
        } else {
          review[header.toLowerCase()] = '';
        }
      });

      // Only return reviews where display is "Yes"
      if (review.display && review.display.toLowerCase() === 'yes') {
        return {
          id: review.id || `review-${index}`,
          product: review.product || '',
          customer: review.name || '',  // Column is "Name" not "Customer"
          location: review.location || '',
          rating: parseInt(review.rating) || 5,
          source: review.source || 'Website',
          date: review.date || new Date().toISOString().split('T')[0],
          review: review.review || ''
        };
      }
      return null;
    }).filter(Boolean); // Remove null entries

    return reviews;
  } catch (error) {
    console.error('Error fetching reviews from Google Sheets:', error);
    // Return empty array on error
    return [];
  }
};

/**
 * Gets reviews for a specific product
 * @param {string} productName - Name of the product
 * @param {Array} allReviews - Array of all reviews
 * @returns {Array} Filtered reviews for the product
 */
export const getReviewsByProduct = (productName, allReviews) => {
  if (!allReviews || allReviews.length === 0) return [];

  return allReviews.filter(review =>
    review.product.toLowerCase().includes(productName.toLowerCase()) ||
    productName.toLowerCase().includes(review.product.toLowerCase())
  );
};

/**
 * Calculates average rating for a product
 * @param {string} productName - Name of the product
 * @param {Array} allReviews - Array of all reviews
 * @returns {number} Average rating (0-5)
 */
export const getAverageRating = (productName, allReviews) => {
  const productReviews = getReviewsByProduct(productName, allReviews);

  if (productReviews.length === 0) return 0;

  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return Number((sum / productReviews.length).toFixed(1));
};

/**
 * Gets review count for a product
 * @param {string} productName - Name of the product
 * @param {Array} allReviews - Array of all reviews
 * @returns {number} Number of reviews
 */
export const getReviewCount = (productName, allReviews) => {
  return getReviewsByProduct(productName, allReviews).length;
};

// Cache reviews for 5 minutes to reduce API calls
let cachedReviews = null;
let cacheTime = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches reviews with caching
 * @returns {Promise<Array>} Array of review objects
 */
export const fetchReviewsWithCache = async () => {
  const now = Date.now();

  if (cachedReviews && cacheTime && (now - cacheTime < CACHE_DURATION)) {
    return cachedReviews;
  }

  const reviews = await fetchReviewsFromSheet();
  cachedReviews = reviews;
  cacheTime = now;

  return reviews;
};

/**
 * Gets a random review from all reviews
 * @param {Array} allReviews - Array of all reviews
 * @returns {Object|null} Random review object
 */
export const getRandomReview = (allReviews) => {
  if (!allReviews || allReviews.length === 0) return null;
  return allReviews[Math.floor(Math.random() * allReviews.length)];
};
