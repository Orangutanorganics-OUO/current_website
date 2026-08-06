import React from 'react';
import './StarRating.css';

const W = {
  DEEP_FOREST_DK:  '#024442',
  INK:             '#655F59',
  MEADOW_GOLD:     '#B5882D',
  GOLD_FILL:       '#D6A21F',
  MUTED:           'rgba(3,96,92,0.20)',
};

const SIZE_MAP = {
  small:  { star: 14, gap: 6,  count: 11.5 },
  medium: { star: 18, gap: 6,  count: 13 },
  large:  { star: 22, gap: 8,  count: 14 },
};

function StarRating({ rating, totalReviews, showCount = true, size = 'medium' }) {
  const s = SIZE_MAP[size] || SIZE_MAP.medium;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  const scopedStyles = `
    .sr {
      display: inline-flex; align-items: center; gap: 8px;
      font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
      line-height: 1;
    }
    .sr__stars { display: inline-flex; align-items: center; gap: ${s.gap}px; }
    .sr__star {
      display: inline-block;
      font-size: ${s.star}px;
      line-height: 1;
      color: ${W.MUTED};
    }
    .sr__star--full { color: ${W.GOLD_FILL}; }
    .sr__star--half {
      background: linear-gradient(90deg, ${W.GOLD_FILL} 50%, ${W.MUTED} 50%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      color: transparent;
    }
    .sr__count {
      font-size: ${s.count}px;
      color: ${W.INK};
      opacity: 0.85;
      letter-spacing: 0.02em;
    }
    .sr__count b {
      color: ${W.DEEP_FOREST_DK};
      font-weight: 700;
      margin-right: 4px;
    }
  `;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let cls = 'sr__star';
    if (i <= fullStars) cls += ' sr__star--full';
    else if (i === fullStars + 1 && hasHalfStar) cls += ' sr__star--half';
    stars.push(<span key={i} className={cls}>★</span>);
  }

  return (
    <div className="sr">
      <style>{scopedStyles}</style>
      <div className="sr__stars" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
        {stars}
      </div>
      {showCount && totalReviews > 0 && (
        <span className="sr__count">
          <b>{rating.toFixed(1)}</b>
          ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  );
}

export default StarRating;
