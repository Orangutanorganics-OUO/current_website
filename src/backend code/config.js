// website/config.js
// -----------------------------------------------------------------------------
// Frontend-facing config projection.
//
// GET /api/config returns the whitelisted view of coupons (and eventually
// products + discount_config in Phase 2). Frontend fetches once on app mount,
// caches by version, revalidates cheaply via ETag / If-None-Match.
//
// SECURITY
//   Uses getPublicCouponConfig() from shared/catalog.js — a whitelisted
//   projection that excludes enforcement-side fields (expires_at,
//   min_order_paise, per_user_limit). Never leak the full COUPONS map.
//
//   Rate-limited per-IP via the existing makeKeyedRateLimiter factory.
//   30 requests/min/IP is a page-reload burst budget; the response is <2KB
//   and cached client-side for 5 min, so a real user rarely hits the origin.
// -----------------------------------------------------------------------------

import express from 'express';
import {
  getPublicCouponConfig,
  CATALOG_CONFIG_VERSION,
} from '../shared/catalog.js';
import { makeKeyedRateLimiter, keyByIp } from '../shared/rate-limit.js';
import { respond } from '../shared/response.js';

const router = express.Router();

const configIpLimiter = makeKeyedRateLimiter({
  routeName: '/api/config[ip]',
  maxRequests: 30,
  windowMs: 60_000,
  keyExtractor: keyByIp,
});

// Precompute the payload + ETag once at boot. Both are immutable per deploy
// (COUPONS is Object.freeze'd, CATALOG_CONFIG_VERSION is hash-derived at
// module load), so there's no benefit to rebuilding per request.
const CONFIG_PAYLOAD = Object.freeze({
  version: CATALOG_CONFIG_VERSION,
  coupons: getPublicCouponConfig(),
});
const ETAG_VALUE = `"${CATALOG_CONFIG_VERSION}"`;

router.get('/', configIpLimiter, (req, res) => {
  res.setHeader('ETag', ETAG_VALUE);
  // 5 min fresh, 1 h stale-while-revalidate — one real fetch per browser
  // session in the common path; page reloads hit 304 or the disk cache.
  res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=3600');

  // Support If-None-Match for cheap revalidation. Both quoted and unquoted
  // forms in the wild — accept either.
  const inm = req.headers['if-none-match'];
  if (typeof inm === 'string') {
    const normalized = inm.trim().replace(/^W\//, '').replace(/^"|"$/g, '');
    if (normalized === CATALOG_CONFIG_VERSION) {
      return res.status(304).end();
    }
  }

  return respond(res, {
    status: 200,
    ok: true,
    data: CONFIG_PAYLOAD,
  });
});

export default router;
