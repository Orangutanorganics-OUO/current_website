# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start              # Dev server on http://localhost:3000 (react-scripts)
npm run build          # Production build to build/
npm test               # CRA test runner (watch mode)
npm test -- --watchAll=false <FileName>   # Run a single test file, non-watch

# Image asset pipeline (run when adding/replacing assets):
node scripts/convert-images.js   # PNG/JPEG in src/utils/ → WebP (+AVIF for >200KB)
node scripts/generate-icons.js   # Rebuild all public/ favicon/logo/PWA/OG images from public/OUO_Logo.jpg

# Occasional maintenance:
npx update-browserslist-db@latest   # Refresh browser targeting data
```

Required environment variables (see README for full context): `REACT_APP_API_URL`, `REACT_APP_GOOGLE_SCRIPT_URL`, `REACT_APP_GOOGLE_SHEET_ID`.

## Architecture

### Design system — scoped inline styles, no shared CSS framework

Every page and most components define styles inside a JS template literal and inject them via `<style>{scopedStyles}</style>` at the top of their returned JSX. This is deliberate — it isolates each page's look, lets styles interpolate brand-palette constants, and avoids CSS-file collisions during redesigns.

- **Palette constants** are declared per-file at the top as `const W = { ... }` (some older files use `H`, `P`, `T`, `FT` — same shape, same colors). Do **not** try to consolidate them into one shared module without discussion; the per-file locality is intentional.
- **Class-name prefixes** are per-component (`.wtn-`, `.pdt-`, `.cnt-`, `.crt-`, `.cko-`, `.rvf-`, `.blg-`, `.bd-`, `.plr-`, etc.). Keep the prefix consistent when editing.
- Most `.css` files under `src/pages/` and `src/components/` are legacy — imported but no longer target rendered elements. Empty them cautiously; a few (`App.css`, `index.css`, `Home.css`, `Products.css`, `Navigation.css`, `Footer.css`, `ImageCarousel.css`) are still active.

### Scroll-reveal — one known trap

Every redesigned page runs the same IntersectionObserver pattern: observe elements marked `.<prefix>-reveal` / `.<prefix>-reveal-group`, add `is-inview` on entry, unobserve. The CSS starts them at `opacity: 0`.

**Gotcha (fixed on 6+ pages already, worth remembering):** `intersectionRatio` = *visible area / target area*. A tall `.wtn-reveal-group` wrapper (e.g. 20 product cards in a 1-column mobile grid) can be 10× viewport height, capping its own ratio around 0.10. **Use `threshold: 0`, not `0.12`,** so it fires the moment the wrapper enters view — otherwise cards never appear. Traceability.js sometimes still ships with `0.12`; watch for regressions on new pages.

### Routing and page layout

All routes are declared synchronously in [src/App.js](src/App.js). Pages are **not** code-split yet — `React.lazy` would drop the initial JS bundle by ~40–60% but hasn't been introduced. **[src/pages/Products.js](src/pages/Products.js)** intentionally serves two views from one file — it inspects `useParams().id` and renders `<ProductDetail>` when present, `<ProductList>` otherwise.

### Cart state

- Persisted in `localStorage` under key `'cart'`.
- Every mutation (add / update qty / remove / clear) must call `window.dispatchEvent(new Event('cartUpdated'))` so [Navigation.js](src/components/Navigation.js) badge count refreshes. This is a lightweight cross-component event bus — no context/store.
- Item shape: `{ product_retailer_id, productId, name, size, price, weight, quantity, image }`. `product_retailer_id` = `${productId}_${size}` and is the merge key for duplicates.
- Bulk discount: 20% off when total weight ≥ 3000g. Applied in both Cart and Checkout — keep the constants aligned.

### Two backend surfaces

1. **Google Apps Script** (`REACT_APP_GOOGLE_SCRIPT_URL`) — one endpoint, uses `type` field to route: `type: 'contact'` (Contact.js), `type: 'review'` (ReviewForm.js), `type: 'checkout'` (Checkout.js order records). Sent with `mode: 'no-cors'` (response is unreadable — assume success on non-throw).
2. **Custom Node API** (`REACT_APP_API_URL`) — Razorpay create-order + verify-payment, Delhivery calculate-shipping + create-shipment, checkout process-cod / process-prepaid. Only used by [Checkout.js](src/pages/Checkout.js). Uses axios.

Reviews are read from a **public Google Sheet** via [src/utils/fetchReviews.js](src/utils/fetchReviews.js). The parser slices from first `{` to last `}` to handle any Google JSONP wrapper variant — do not "simplify" back to fixed `substring(47).slice(0,-2)`, that broke previously. The sheet must be shared as "Anyone with the link — Viewer" or fetch returns HTML instead of JSON.

### Anti-spam on forms

Both Contact and ReviewForm use [src/utils/spamGuard.js](src/utils/spamGuard.js):
- A hidden honeypot field (`HONEYPOT_FIELD_NAME` + `HONEYPOT_STYLE`) kept in local state, never merged into `formData` so it can't leak into the payload.
- A `loadedAtRef` timestamp — submissions under ~2.5s are treated as bots.
- Both branches **fail silently with a fake success message** to keep bots from learning the form is filtered.

### Image assets

- `src/utils/*.webp` and `*.avif` are the production formats. Do not import `.png` or `.jpeg` from `src/utils/` — the originals were deleted during production prep.
- Heroes (`mountain_1`, `mountain_2`) ship both AVIF and WebP; a `<picture>` element in Home.js picks the smallest format the browser supports.
- **Product photos and blog images are NOT local** — they're remote URLs pointing at `raw.githubusercontent.com/Orangutanorganics-OUO/image_repo/`. See [src/utils/products.js](src/utils/products.js) and [src/utils/blogData.js](src/utils/blogData.js). Don't try to bundle them.
- If you add new photos to `src/utils/`, run `node scripts/convert-images.js`, update imports to `.webp`, then delete the originals.
- If the logo changes, drop the new file at `public/OUO_Logo.jpg` (2:1 aspect, mark centered in top ~48%, white background) and run `node scripts/generate-icons.js`. It regenerates favicon.ico (multi-size), logo192/512.png, newicon.png (apple-touch), and newlogo.png (1200×630 OG).

### `ImageCarousel` — do not rename its public classes

[src/components/ImageCarousel.js](src/components/ImageCarousel.js) exposes `.carousel`, `.carousel__container`, `.carousel__image-container`, `.carousel__image`, etc. **Products.js SHOP_STYLES and PDT_STYLES override these** to make the carousel fill 100% of the parent card / gallery. Renaming or removing these class names silently breaks product images. All theming lives in [src/components/ImageCarousel.css](src/components/ImageCarousel.css), not scoped inline.

### `PageLoader` — landing page overlay

[src/components/PageLoader.js](src/components/PageLoader.js) covers Home during initial load. It dismisses on `window.load` (all assets fetched) with a 700ms minimum and 3.5s max failsafe, locks body scroll while visible, then fades out. If you add long-loading assets to Home, expect the loader to stay up until they resolve.

### `Toast` — `duration=0` semantics

[src/components/Toast.js](src/components/Toast.js) auto-dismisses after `duration` ms. **`duration=0` means "never auto-dismiss"** — used in Checkout for the "payment succeeded but order processing failed" error so the user can copy the payment ID. Don't collapse that to `undefined`.

### Third-party analytics / tracking

- **Meta Pixel** ([src/utils/metaPixel.js](src/utils/metaPixel.js)) — `trackViewContent`, `trackAddToCart`, `trackInitiateCheckout`, `trackPurchase`, `trackLead`. Called from Products, Cart, Checkout, and Contact.
- **Google Analytics (gtag)** — inline in [public/index.html](public/index.html).
- **Razorpay checkout.js** — loaded on-demand by Checkout inside `handlePrepaidOrder`, not bundled.

### Smooth scroll

[src/App.js](src/App.js) initializes Lenis for smooth wheel/touch scroll. Skipped under `prefers-reduced-motion`. If you add anything relying on native scroll events (position:fixed pinning, `IntersectionObserver` root, per-frame `getBoundingClientRect`), it still works — Lenis preserves native semantics.

### OG / social meta

`og:image` and `twitter:image` in [public/index.html](public/index.html) must be **absolute URLs** (`https://orangutanorganics.com/newlogo.png?v=N`). Facebook's crawler rejects relative paths. When updating `newlogo.png`, bump the `?v=` suffix — it's the cache-buster that forces WhatsApp / Facebook to re-scrape.
