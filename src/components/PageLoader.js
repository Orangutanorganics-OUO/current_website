import React, { useEffect, useState } from 'react';

/*
 * PageLoader — full-viewport brand loader shown until the page's initial
 * assets are ready (window `load` event, or a hard 3.5s max fallback).
 * Enforces a 700ms minimum so it doesn't visibly flash on fast connections.
 * Follows the site's wave theme: cream background, OUO tri-circle mark,
 * animated gold ridgeline, gentle waves at the bottom.
 */

const W = {
  BRAND_BROWN:    '#826845',
  BRAND_GREEN:    '#618E69',
  BRAND_TEAL:     '#5D9C9D',
  DEEP_FOREST:    '#03605C',
  DEEP_FOREST_DK: '#024442',
  FOREST_SHADOW:  '#013532',
  INK:            '#655F59',
  CREAM:          '#F8F3EB',
  CREAM_SOFT:     '#F1E7CE',
  MEADOW_GOLD:    '#B5882D',
  GOLD_LINE:      '#B5882D',
};

const MIN_DURATION = 700;   // don't flash — always show for at least this long
const MAX_DURATION = 3500;  // never trap the user — always dismiss after this

const scopedStyles = `
  .plr {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${W.CREAM};
    font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    color: ${W.DEEP_FOREST_DK};
    overflow: hidden;
    opacity: 1;
    transition: opacity 520ms cubic-bezier(0.4, 0, 0.2, 1),
                visibility 0s linear 0s;
  }
  .plr.is-done {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 520ms cubic-bezier(0.4, 0, 0.2, 1),
                visibility 0s linear 520ms;
  }

  .plr__inner {
    display: flex; flex-direction: column; align-items: center; gap: 20px;
    padding: 0 24px;
    max-width: 420px;
    text-align: center;
  }

  /* ---------- Tri-circle brand mark ---------- */
  .plr__mark { display: block; }
  .plr__mark circle {
    transform-origin: center;
    animation: plr-mark-rise 900ms cubic-bezier(0.22, 0.7, 0.2, 1) both;
  }
  .plr__mark circle:nth-of-type(1) { animation-delay: 60ms; }
  .plr__mark circle:nth-of-type(2) { animation-delay: 180ms; }
  .plr__mark circle:nth-of-type(3) { animation-delay: 300ms; }
  @keyframes plr-mark-rise {
    from { opacity: 0; transform: translate3d(0, 12px, 0) scale(0.85); }
    to   { opacity: 1; transform: translate3d(0, 0, 0)  scale(1); }
  }

  /* ---------- Wordmark ---------- */
  .plr__word {
    font-family: Georgia, "Iowan Old Style", serif;
    font-size: 18px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    font-weight: 700;
    color: ${W.DEEP_FOREST_DK};
    margin-top: 4px;
    opacity: 0;
    animation: plr-fade-up 700ms cubic-bezier(0.22, 0.7, 0.2, 1) 380ms both;
  }
  .plr__tag {
    font-size: 10.5px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    font-weight: 700;
    color: ${W.MEADOW_GOLD};
    margin-top: 2px;
    opacity: 0;
    animation: plr-fade-up 700ms cubic-bezier(0.22, 0.7, 0.2, 1) 520ms both;
  }
  @keyframes plr-fade-up {
    from { opacity: 0; transform: translate3d(0, 8px, 0); }
    to   { opacity: 1; transform: translate3d(0, 0, 0); }
  }

  /* ---------- Loading ridgeline (gold sine that pulses) ---------- */
  .plr__ridge {
    display: block;
    width: 200px; height: 10px;
    margin-top: 6px;
    opacity: 0;
    animation: plr-fade-up 700ms cubic-bezier(0.22, 0.7, 0.2, 1) 680ms both;
  }
  .plr__ridge path {
    stroke-dasharray: 240;
    stroke-dashoffset: 240;
    animation: plr-ridge-draw 1600ms cubic-bezier(0.4, 0, 0.2, 1) 700ms infinite;
  }
  @keyframes plr-ridge-draw {
    0%   { stroke-dashoffset: 240; }
    50%  { stroke-dashoffset: 0;   }
    100% { stroke-dashoffset: -240; }
  }

  /* ---------- Bottom decorative waves ---------- */
  .plr__waves {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    width: 100%; height: 120px;
    pointer-events: none;
  }
  .plr__waves svg {
    display: block; width: 100%; height: 100%;
  }
  .plr__waves .plr-wave-drift {
    animation: plr-wave-drift 4s ease-in-out infinite alternate;
    transform-origin: center;
  }
  @keyframes plr-wave-drift {
    from { transform: translate3d(0, 0px, 0); }
    to   { transform: translate3d(0, 4px, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .plr__mark circle,
    .plr__word,
    .plr__tag,
    .plr__ridge,
    .plr__ridge path,
    .plr__waves .plr-wave-drift {
      animation: none !important;
      opacity: 1 !important;
      transform: none !important;
      stroke-dashoffset: 0 !important;
    }
  }
`;

function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();

    const hide = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      setTimeout(() => setVisible(false), wait);
    };

    // If everything is already loaded (fast reload, cached), still respect
    // MIN_DURATION so the animation gets to play, but dismiss soon.
    if (typeof document !== 'undefined' && document.readyState === 'complete') {
      hide();
      return;
    }

    const onLoad = () => hide();
    window.addEventListener('load', onLoad, { once: true });
    const failsafe = setTimeout(hide, MAX_DURATION);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(failsafe);
    };
  }, []);

  // Lock scroll while loader is visible so user can't peek under it.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (visible) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [visible]);

  return (
    <div
      className={`plr ${visible ? '' : 'is-done'}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Orang Utan Organics"
    >
      <style>{scopedStyles}</style>

      <div className="plr__inner">
        {/* Tri-circle brand mark */}
        <svg
          className="plr__mark"
          viewBox="0 0 130 90"
          width="140"
          height="97"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="30"  cy="45" r="28" fill={W.BRAND_BROWN}/>
          <circle cx="65"  cy="45" r="28" fill={W.BRAND_GREEN}/>
          <circle cx="100" cy="45" r="28" fill={W.BRAND_TEAL}/>
          {/* Cream ridgeline flowing across all three */}
          <path d="M4,44 C22,26 40,60 66,36 C92,14 108,60 128,38"
                stroke={W.CREAM} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
          <path d="M4,52 C24,38 44,64 68,46 C94,28 110,64 128,50"
                stroke={W.CREAM} strokeWidth="1" fill="none" opacity="0.7" strokeLinecap="round"/>
        </svg>

        <div className="plr__word">Orang Utan Organics</div>
        <div className="plr__tag">From the lap of the Himalayas</div>

        {/* Animated gold ridgeline (the "loading" indicator) */}
        <svg
          className="plr__ridge"
          viewBox="0 0 240 12"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M0,6 C40,1 80,11 120,6 C160,1 200,10 240,6"
            stroke={W.GOLD_LINE}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Decorative wave at the bottom — matches the site's wave dividers */}
      <div className="plr__waves" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <g className="plr-wave-drift">
            <path
              d="M0,60 C220,20 460,90 720,50 C980,10 1220,80 1440,44 L1440,120 L0,120 Z"
              fill={W.DEEP_FOREST} opacity="0.90"
            />
            <path
              d="M0,80 C260,44 480,100 780,68 C1060,40 1260,90 1440,64 L1440,120 L0,120 Z"
              fill={W.DEEP_FOREST_DK} opacity="0.55"
            />
            <path
              d="M0,100 C300,72 520,108 800,90 C1080,72 1260,104 1440,88 L1440,120 L0,120 Z"
              fill={W.FOREST_SHADOW} opacity="0.35"
            />
            <path
              d="M0,58 C220,18 460,88 720,48 C980,8 1220,78 1440,42"
              stroke={W.GOLD_LINE} strokeWidth="1.2" fill="none" opacity="0.75"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default PageLoader;
