// Product catalog — display metadata (name, description, images, features)
// lives here; server-authoritative price + weight come from /api/config via
// configClient.getProductBySku(). Every variant carries a `sku` field that
// matches the WhatsApp retailer_id used in the backend catalog (shared/catalog.js).
//
// Hydration precedence:
//   - price_paise: backend if verified && >0, else local `price` (₹).
//   - weight_g:    backend if present, else local `weight`.
//   - `verified`:  backend flag, propagated so the UI can hide unverified SKUs
//                  when PRICING_ENFORCEMENT_MODE goes strict.
//
// Local `price` / `weight` remain the fallback so the site works before the
// /api/config response lands (first-paint, offline reload) and for variants
// the backend doesn't yet know about (e.g. Spice 23gm).

import { getProductBySku, getProductByNameSize } from './configClient';

export const PRODUCTS = [
  {
    id: 1,
    name: "Himalayan White Rajma",
    category: "Pulses",
    description: "Premium quality white kidney beans sourced from the pristine Himalayan valleys. Rich in protein and fiber, perfect for traditional recipes.",
    heroLine: "Protein-rich pulses grown at 7,500 ft.",
    story: "Our White Rajma is sourced from Harshil Valley — where glacier-fed streams and clean mountain air nurture the most delicate, creamy beans. Sown and harvested by smallholder farmers without synthetic inputs, these beans cook faster and taste softer, naturally reflecting the purity of Himalayan farming.",
    keyFeatures: [
      "🌱 Grown at 7,500 ft in Harshil Valley, Uttarkashi",
      "🍛 Naturally creamy and quick-cooking texture",
      "💪 High in plant protein, fiber, and essential minerals",
      "🚫 No polishing, no preservatives",
      "🏔️ Cultivated with snowmelt irrigation and organic compost",
      "🔍 Traceable via OUO's farmer-QR initiative (coming soon)"
    ],
    cta: "Cook purity. Taste the Himalayas.",
    nutritionHighlights: ["Protein", "Complex Carbohydrates", "Iron", "Magnesium", "Folate"],
    nutritionBenefits: ["Boosts energy", "Supports red blood cell production", "Aids digestion", "Regulates blood sugar"],
    image: "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/White_Rajma/wr_1.png",
    images: [
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/White_Rajma/wr_1.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/White_Rajma/wr_2.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/White_Rajma/wr_3.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/White_Rajma/wr_4.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/White_Rajma/wr_5.png"
    ],
    variants: [
      { sku: "m519x5gv9s", size: "500gm", price: 347, stock: 100, weight: 500, available: true },
      { sku: "294l11gpcm", size: "1kg",   price: 691, stock: 100, weight: 1000, available: true }
    ],
    benefits: ["High Protein", "Rich in Fiber", "Organic", "Himalayan Sourced"]
  },
  {
    id: 2,
    name: "Himalayan Red Rajma",
    category: "Pulses",
    description: "Premium red kidney beans from the Himalayan mountains. Perfect for making the classic rajma masala and other traditional dishes.",
    heroLine: "Bold, earthy, and naturally rich in iron.",
    story: "Our Chakrata Red Rajma carries the legacy of Himalayan mountain farming — deep red in color, rich in flavor, and packed with nutrition. Sourced from organic terraces near Chakrata, this variety thrives on natural rainfall and compost-fed soils, giving it a creamy bite and earthy aroma.",
    keyFeatures: [
      "🌾 Heirloom Himalayan red bean variety",
      "🍲 Creamy, soft texture ideal for slow-cooked curries",
      "💪 Iron-dense and high-protein",
      "🌿 Organically grown, naturally sun-dried",
      "🏔️ Cultivated at 6,000 ft by mountain farmer clusters",
      "🔍 Traceable to individual farmer groups (Work in Progress)"
    ],
    cta: "Bring home the taste of Himalayan kitchens.",
    nutritionHighlights: ["Protein", "Complex Carbohydrates", "Antioxidants (Anthocyanins)", "Iron", "Magnesium", "Folate"],
    nutritionBenefits: ["Rich in antioxidants for anti-aging and heart health", "Supports energy release", "Enhances muscle and bone health", "Prevents anemia"],
    image: "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Red_Rajma/rrj_1.png",
    images: [
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Red_Rajma/rrj_1.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Red_Rajma/rrj_2.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Red_Rajma/rrj_3.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Red_Rajma/rrj_4.png"
    ],
    variants: [
      { sku: "ezg1lu6edm", size: "500gm", price: 347, stock: 100, weight: 500, available: true },
      { sku: "tzz72lpzz2", size: "1kg",   price: 691, stock: 100, weight: 1000, available: true }
    ],
    benefits: ["High Protein", "Rich in Iron", "Organic", "Traditional Taste"]
  },
  {
    id: 3,
    name: "Badri Cow Ghee",
    category: "Dairy",
    description: "Pure A2 cow ghee from Badri cows grazing in the Himalayan meadows. Made using traditional bilona method for maximum nutrition and taste.",
    heroLine: "Pure. Powerful. Born in the Himalayas.",
    story: "Our OUO Himalayan Badri Cow Ghee is made from the milk of free-grazing Badri cows, native to the high-altitude valleys of Uttarkashi. Hand-churned in small batches through the traditional bilona process, it retains its golden richness, nutty aroma, and warmth that only pure A2 milk can offer. Crafted at 2,300 m in the Gangotri Valley, this ghee directly supports local farmers who nurture indigenous Badri cows grazing on wild Himalayan herbs and spring water.",
    keyFeatures: [
      "🌿 100% A2-rich ghee from indigenous Badri cows",
      "🔥 Hand-churned, small-batch bilona process",
      "🥥 Natural nutty aroma & golden hue from ghee residue",
      "💪 Nutrient-dense, loaded with Omega-3s and antioxidants",
      "🙌 Supports Himalayan farmer livelihoods",
      "♻️ Sustainable and compost-back by-product use",
      "🔍 Traceable via OUO QR system (Work in Progress)"
    ],
    cta: "Experience the purity of the Himalayas — one spoonful at a time.",
    nutritionHighlights: ["Healthy fats", "Omega-3", "Omega-6", "Vitamin A", "CLA (Conjugated Linoleic Acid)"],
    nutritionBenefits: ["Improves digestion", "Strengthens immunity", "Supports heart health", "Good for joint lubrication", "Enhances nutrient absorption"],
    image: "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Ghee/g_1.png",
    images: [
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Ghee/g_1.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Ghee/g_2.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Ghee/g_3.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Ghee/g_4.png",
    ],
    variants: [
      { sku: "43mypu8dye", size: "120gm", price: 450,  stock: 50, weight: 120, available: true },
      { sku: "l722c63kq9", size: "295gm", price: 1067, stock: 50, weight: 295, available: true },
      { sku: "kkii6r9uvh", size: "495gm", price: 1795, stock: 50, weight: 495, available: true }
    ],
    benefits: ["A2 Ghee", "Bilona Method", "Pure & Natural", "Himalayan"]
  },
  {
    id: 4,
    name: "Himalayan Black Soyabean",
    category: "Pulses",
    description: "Rare black soyabeans from high-altitude Himalayan farms. Packed with protein, antioxidants, and essential nutrients.",
    heroLine: "The forgotten protein of the Himalayas.",
    story: "OUO's Black Soybean, locally called Bhat, is a powerhouse legume cultivated in the upper Himalayan valleys. Grown without any chemicals, it's rich in protein, antioxidants, and fiber. Traditionally used in mountain homes during winters, this pulse offers both taste and nourishment in one bowl.",
    keyFeatures: [
      "💪 40% plant protein & high antioxidants",
      "🌿 Naturally grown, chemical-free",
      "🔥 Excellent for soups, curries, or roasting",
      "🏔️ Cultivated in cold altitudes by OUO farmer clusters",
      "♻️ Promotes biodiversity and traditional seed revival",
      "🔍 Traceable via OUO QR initiative (WIP)"
    ],
    cta: "Rediscover a mountain superfood.",
    nutritionHighlights: ["Protein", "Iron", "Calcium", "Folate", "Isoflavones", "Fiber"],
    nutritionBenefits: ["Supports muscle growth", "Maintains heart health", "Aids in anemia prevention", "Supports bone health", "Helps regulate hormones"],
    image: "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Black_Soybean/bs_1.png",
    images: [
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Black_Soybean/bs_1.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Black_Soybean/bs_2.png"
    ],
    variants: [
      { sku: "5diu7mcmbf", size: "500gm", price: 347, stock: 100, weight: 500, available: true },
      { sku: "324pmzr4c9", size: "1kg",   price: 691, stock: 100, weight: 1000, available: true }
    ],
    benefits: ["High Protein", "Antioxidants", "Organic", "Rare Variety"]
  },
  {
    id: 5,
    name: "Himalayan Red Rice",
    category: "Grains",
    description: "Nutrient-rich red rice cultivated in the Himalayan foothills. High in fiber and antioxidants with a nutty flavor.",
    heroLine: "Whole-grain wellness from Himalayan terraces.",
    story: "Hand-grown on the ancient terraces of Uttarakhand's mid-Himalayan slopes, OUO Red Rice embodies mountain purity. Its reddish hue comes from natural anthocyanins — powerful antioxidants that aid heart health and digestion. The mild nutty flavor and soft texture make it perfect for daily meals with added wellness.",
    keyFeatures: [
      "🌾 Indigenous red rice from organic mountain farms",
      "💪 Rich in iron, magnesium & natural antioxidants",
      "🍛 Slightly nutty, aromatic flavor",
      "🌿 Pesticide-free, hand-pounded, naturally dried",
      "🌍 Supports water-efficient and regenerative farming",
      "🔍 Traceable via OUO farmer network (coming soon)"
    ],
    cta: "Add a Himalayan grain of goodness to your plate.",
    nutritionHighlights: ["Iron", "Zinc", "Magnesium", "Fiber", "Antioxidants (Anthocyanins)", "Slow-digesting Carbs"],
    nutritionBenefits: ["Supports digestive health", "Regulates blood sugar", "Boosts energy", "Promotes heart health"],
    image: "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Red_Rice/rr_1.png",
    images: [
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Red_Rice/rr_1.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Red_Rice/rr_2.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Red_Rice/rr_3.png"
    ],
    variants: [
      { sku: "obdqyehm1w", size: "1kg", price: 347, stock: 100, weight: 1000, available: true }
    ],
    benefits: ["High Fiber", "Antioxidants", "Organic", "Nutty Flavor"]
  },
  {
    id: 6,
    name: "Wild Himalayan Tempering Spice",
    category: "Spices",
    description: "Authentic wild-harvested Himalayan tempering spice mix (Jimbu). Adds unique flavor to dal, curries, and traditional dishes.",
    heroLine: "The mountain herb that awakens Himalayan kitchens.",
    story: "Our Himalayan Tempering Spice — known locally as Jimbu or Laadu — is a rare wild herb hand-harvested above 2,500 m in Uttarkashi and Chamoli. Naturally dried and preserved, it bursts into a roasted garlic-onion aroma when tempered in ghee — a defining flavor of Himalayan dals and soups. This wild herb is more than a spice — it's a preserved piece of mountain biodiversity and culinary heritage.",
    keyFeatures: [
      "🌿 Wild-harvested Himalayan herb (Jimbu / Laadu)",
      "🔥 Adds intense aroma when fried in ghee or oil",
      "🍛 Traditional tempering herb for dals and soups",
      "🧺 Handpicked and sun-dried by mountain women farmers",
      "🏔️ Collected from above 2,500 m altitude",
      "♻️ Zero pesticide, zero processing — 100% natural",
      "🔍 Traceable to foraging clusters (Work in Progress)"
    ],
    cta: "The mountain herb that awakens Himalayan kitchens.",
    nutritionHighlights: ["Vitamin A (131.38 IU)", "Vitamin C (2.23 mg)", "Folic Acid (16.53 mg)", "Calcium (642.30 mg)", "Potassium (2253 mg)"],
    nutritionBenefits: ["Boosts immunity", "Supports vision and skin health", "Aids in bone strength", "Enhances brain function", "Regulates blood pressure"],
    image: "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Laadu/ts_1.png",
    images: [
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Laadu/ts_1.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Laadu/ts_2.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Laadu/ts_3.png",
      "https://raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/refs/heads/main/Laadu/ts_4.png"
    ],
    variants: [
      // Backend catalog has this SKU as 100gm; the 23gm variant sold here is
      // NOT in the backend. Backend must be updated (see suggestions).
      { sku: null, size: "23gm", price: 347, stock: 60, weight: 23, available: true }
    ],
    benefits: ["Wild Harvested", "Unique Flavor", "Traditional", "Premium Quality"]
  }
];

// ============================================================================
// HYDRATION — overlay backend catalog price + weight onto a local variant
// ============================================================================

/**
 * Merge backend catalog data (from configClient) onto a local variant.
 * Precedence: backend wins for price if verified && price_paise > 0; otherwise
 * local price is kept. Weight follows the same "backend if present" rule.
 * Always returns a shape usable by Cart / Checkout / Products UI.
 *
 * @returns {{
 *   sku: string|null,
 *   size: string,
 *   price: number,       // rupees, integer
 *   weight: number,      // grams, integer
 *   available: boolean,
 *   verified: boolean,   // backend-verified price?
 *   catalogHit: boolean, // did we find the SKU in the backend catalog?
 *   stock: number,
 * }}
 */
export function hydrateVariant(product, variant) {
  const catalog =
    (variant.sku && getProductBySku(variant.sku)) ||
    getProductByNameSize(product.name, variant.size);

  let price = variant.price;
  let weight = variant.weight;
  let verified = false;
  let catalogHit = false;
  let sku = variant.sku || null;

  if (catalog) {
    catalogHit = true;
    verified = catalog.verified === true;
    if (!sku && catalog.sku) sku = catalog.sku;

    if (Number.isFinite(catalog.weight_g) && catalog.weight_g > 0) {
      weight = catalog.weight_g;
    }
    // Only trust backend price when the entry is verified AND non-zero. An
    // unverified/zero backend row is a placeholder — fall through to local.
    if (verified && Number.isFinite(catalog.price_paise) && catalog.price_paise > 0) {
      price = Math.round(catalog.price_paise / 100);
    }
  }

  return {
    sku,
    size: variant.size,
    price,
    weight,
    available: variant.available !== false,
    verified,
    catalogHit,
    stock: variant.stock,
  };
}

export function hydrateProduct(product) {
  return {
    ...product,
    variants: product.variants.map((v) => hydrateVariant(product, v)),
  };
}

// ============================================================================
// LEGACY LOOKUP HELPERS
// ============================================================================
// These use local `variant.price` / `variant.weight` — kept for backwards
// compatibility with any code path that hasn't migrated to hydrateVariant().
// Prefer hydrateVariant() for anything price/weight-sensitive.

export const getProductById = (id) => {
  return PRODUCTS.find(p => p.id === parseInt(id));
};

export const getProductName = PRODUCTS.reduce((acc, product) => {
  product.variants.forEach(variant => {
    const key = `${product.id}_${variant.size}`;
    acc[key] = `${product.name} - ${variant.size}`;
  });
  return acc;
}, {});

export const getProductWeight = PRODUCTS.reduce((acc, product) => {
  product.variants.forEach(variant => {
    const key = `${product.id}_${variant.size}`;
    acc[key] = variant.weight;
  });
  return acc;
}, {});

export const getProductPrice = PRODUCTS.reduce((acc, product) => {
  product.variants.forEach(variant => {
    const key = `${product.id}_${variant.size}`;
    acc[key] = variant.price;
  });
  return acc;
}, {});
