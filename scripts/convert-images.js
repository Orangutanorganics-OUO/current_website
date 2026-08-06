#!/usr/bin/env node
/*
 * convert-images.js
 *
 * Batch-converts every PNG/JPEG under src/utils/ to WebP (and AVIF for big
 * hero images) using sharp. Preserves the original filename with a new
 * extension. Originals are left in place — delete them after switching
 * imports and verifying visually.
 *
 * Presets:
 *   - `.webp` q78 for photos, near-lossless for icons (small PNGs with alpha)
 *   - `.avif` q55 only for the biggest hero images (mountain_*, img_1*)
 *
 * Run:  node scripts/convert-images.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC_DIR = path.join(__dirname, '..', 'src', 'utils');

// Threshold above which we also generate AVIF (bigger encode cost).
const AVIF_BYTES_THRESHOLD = 200 * 1024; // 200 KB

const RESULTS = [];

async function convertOne(file) {
  const full = path.join(SRC_DIR, file);
  const ext = path.extname(file).toLowerCase();
  const base = file.slice(0, -ext.length);
  const stat = fs.statSync(full);
  const before = stat.size;

  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return null;

  const img = sharp(full, { unlimited: true });
  const meta = await img.metadata();

  // Photos → q78 WebP; icons (small PNGs with alpha) → higher-quality WebP.
  const isPhoto = ext === '.jpg' || ext === '.jpeg' || meta.width > 800;
  const webpQuality = isPhoto ? 78 : 88;

  const webpOut = path.join(SRC_DIR, `${base}.webp`);
  await sharp(full, { unlimited: true })
    .webp({ quality: webpQuality, effort: 5 })
    .toFile(webpOut);
  const webpSize = fs.statSync(webpOut).size;

  let avifOut = null;
  let avifSize = null;
  if (before > AVIF_BYTES_THRESHOLD) {
    avifOut = path.join(SRC_DIR, `${base}.avif`);
    await sharp(full, { unlimited: true })
      .avif({ quality: 55, effort: 4 })
      .toFile(avifOut);
    avifSize = fs.statSync(avifOut).size;
  }

  RESULTS.push({
    file,
    before,
    webpSize,
    avifSize,
    saved: before - webpSize,
  });

  return { file, before, webpSize, avifSize };
}

function fmt(bytes) {
  if (bytes == null) return '—';
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return bytes + ' B';
}

async function main() {
  const files = fs.readdirSync(SRC_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext);
  });

  console.log(`Converting ${files.length} images from ${SRC_DIR}\n`);

  for (const f of files) {
    process.stdout.write(`  ${f} … `);
    try {
      await convertOne(f);
      process.stdout.write('OK\n');
    } catch (err) {
      process.stdout.write(`FAILED (${err.message})\n`);
    }
  }

  console.log('\n──────────── Results ────────────');
  console.log(
    'FILE'.padEnd(30),
    'BEFORE'.padStart(10),
    'WEBP'.padStart(10),
    'AVIF'.padStart(10),
    'SAVED (webp)'.padStart(14)
  );
  let totalBefore = 0, totalWebp = 0, totalAvif = 0;
  for (const r of RESULTS) {
    totalBefore += r.before;
    totalWebp += r.webpSize;
    if (r.avifSize) totalAvif += r.avifSize;
    console.log(
      r.file.padEnd(30),
      fmt(r.before).padStart(10),
      fmt(r.webpSize).padStart(10),
      fmt(r.avifSize).padStart(10),
      fmt(r.saved).padStart(14)
    );
  }
  console.log(''.padEnd(30, '-'));
  console.log(
    'TOTAL'.padEnd(30),
    fmt(totalBefore).padStart(10),
    fmt(totalWebp).padStart(10),
    fmt(totalAvif).padStart(10),
    fmt(totalBefore - totalWebp).padStart(14)
  );
  console.log('\n✅ Done. Originals kept — switch imports to .webp then rm the originals.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
