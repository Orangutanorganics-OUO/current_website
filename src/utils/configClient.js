import { apiClient } from './apiClient';

const LS_KEY = 'orangutan.config.v1';
const STALE_MS = 60 * 60 * 1000;

// Defaults mirror the backend catalog constants. If /api/config hasn't yet
// been extended to return `pricing`, the frontend falls back to these so
// the checkout math stays consistent with server-side expectations.
// Keep in sync with backend shared/catalog.js.
const PRICING_FALLBACK = Object.freeze({
  bulk_discount_threshold_g: 3000,
  bulk_discount_rate: 0.20,
  free_shipping_threshold_paise: 100000,
  cod_charge_paise: 15000,
  max_shipping_charge_paise: 50000,
});

let inMemory = null;
let inflight = null;
const subscribers = new Set();

function emit() {
  for (const fn of subscribers) {
    try { fn(inMemory); } catch (e) { console.error('[configClient] subscriber threw:', e); }
  }
}

/**
 * Subscribe to config updates. Returns an unsubscribe function.
 * Fires whenever inMemory changes (initial load, revalidation).
 * Use inside a useEffect + useState pattern to trigger re-render.
 */
export function subscribeConfig(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.version || !Array.isArray(parsed?.coupons)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveToStorage(state) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {}
}

export async function initConfig({ force = false } = {}) {
  if (inflight) return inflight;
  if (!inMemory) inMemory = loadFromStorage();

  const stale = !inMemory || Date.now() - inMemory.cachedAt > STALE_MS;
  if (!force && inMemory && !stale) return inMemory;

  inflight = (async () => {
    try {
      const headers = inMemory?.version
        ? { 'If-None-Match': `"${inMemory.version}"` }
        : {};
      const res = await apiClient.get('/config', {
        headers,
        validateStatus: (s) => s === 200 || s === 304,
      });
      if (res.status === 304) {
        inMemory = { ...inMemory, cachedAt: Date.now() };
        saveToStorage(inMemory);
        emit();
        return inMemory;
      }
      const data = res.data?.data || {};
      inMemory = {
        version: data.version,
        coupons: Array.isArray(data.coupons) ? data.coupons : [],
        products: Array.isArray(data.products) ? data.products : [],
        pricing: data.pricing && typeof data.pricing === 'object' ? data.pricing : null,
        cachedAt: Date.now(),
      };
      saveToStorage(inMemory);
      emit();
      return inMemory;
    } catch (err) {
      console.error('[configClient] fetch failed:', err?.message || err);
      if (!inMemory) {
        inMemory = { version: null, coupons: [], products: [], pricing: null, cachedAt: Date.now() };
      }
      return inMemory;
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}

function normalize(code) {
  return typeof code === 'string' ? code.trim().toUpperCase() : '';
}

function findCoupon(code) {
  const n = normalize(code);
  if (!n || !inMemory) return null;
  return inMemory.coupons.find((c) => c.code === n) || null;
}

export function validateCoupon(code) {
  return !!findCoupon(code);
}

export function getCouponDiscount(code) {
  const raw = findCoupon(code)?.percent_off || 0;
  // Clamp defensively — a rogue backend returning 200 must not create negative totals.
  return Math.max(0, Math.min(100, raw));
}

export function calculateCouponDiscount(subtotal, code) {
  const percent = getCouponDiscount(code);
  return percent === 0 ? 0 : Math.round(subtotal * (percent / 100));
}

export function getActiveCoupons() {
  return inMemory?.coupons ? [...inMemory.coupons] : [];
}

// ============================================================================
// PRODUCTS (server-authoritative price + weight)
// ============================================================================
// Returns the catalog snapshot fetched from /api/config. Empty until the
// backend endpoint is extended to include products — callers should overlay
// these on top of local display metadata, not treat them as the sole source.

export function getProducts() {
  return inMemory?.products ? [...inMemory.products] : [];
}

/**
 * Look up a backend catalog entry by SKU (WhatsApp retailer_id).
 * Returns { sku, name, size, weight_g, price_paise, verified } or null.
 */
export function getProductBySku(sku) {
  if (!sku || !inMemory?.products?.length) return null;
  return inMemory.products.find((p) => p.sku === sku) || null;
}

/**
 * Look up by (name, size) — used when a variant has no SKU wired in yet.
 * Normalization mirrors backend shared/catalog.js#normalizeName/normalizeSize
 * so a match here means the backend will also match at server-pricing time.
 */
function normalizeName(name) {
  return String(name ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.,;:!?]/g, '')
    .trim()
    .replace(/^himalayan\s+/, '');
}
function normalizeSize(size) {
  return String(size ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.,;:!?]/g, '')
    .trim()
    .replace(/\bkilograms?\b|\bkgs?\b/g, 'kg')
    .replace(/\bgrams?\b|\bgms?\b|\bg\b/g, 'gm')
    .replace(/\s+/g, '');
}
export function getProductByNameSize(name, size) {
  const products = inMemory?.products;
  if (!products?.length) return null;
  const nk = normalizeName(name);
  const sk = normalizeSize(size);
  return products.find((p) => normalizeName(p.name) === nk && normalizeSize(p.size) === sk) || null;
}

// ============================================================================
// PRICING CONSTANTS (server-authoritative discount / shipping / COD)
// ============================================================================

export function getPricingConstants() {
  const backend = inMemory?.pricing;
  if (!backend) return PRICING_FALLBACK;
  return {
    bulk_discount_threshold_g: Number.isFinite(backend.bulk_discount_threshold_g)
      ? backend.bulk_discount_threshold_g : PRICING_FALLBACK.bulk_discount_threshold_g,
    bulk_discount_rate: Number.isFinite(backend.bulk_discount_rate)
      ? Math.max(0, Math.min(1, backend.bulk_discount_rate)) : PRICING_FALLBACK.bulk_discount_rate,
    free_shipping_threshold_paise: Number.isFinite(backend.free_shipping_threshold_paise)
      ? backend.free_shipping_threshold_paise : PRICING_FALLBACK.free_shipping_threshold_paise,
    cod_charge_paise: Number.isFinite(backend.cod_charge_paise)
      ? Math.max(0, backend.cod_charge_paise) : PRICING_FALLBACK.cod_charge_paise,
    max_shipping_charge_paise: Number.isFinite(backend.max_shipping_charge_paise)
      ? backend.max_shipping_charge_paise : PRICING_FALLBACK.max_shipping_charge_paise,
  };
}
