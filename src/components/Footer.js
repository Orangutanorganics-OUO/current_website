import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from "../utils/logo.svg"

/* ===== OLD CODE — ORIGINAL v1 — START (uncomment to restore) =====
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand">
            <img src={logo} alt="Orangutan Organics" style={{width:"50%"}} />
            <p className="footer__tagline" style={{color:"rgba(41,90,51)", fontWeight:"bold"}}>
              Bringing the pure goodness of the Himalayas directly to your kitchen.
              Supporting mountain farmers and sustainable farming practices.
            </p>
          </div>

          <div className="footer__links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/who-are-we">Who Are We</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer__links">
            <h3>Products</h3>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products">Himalayan Rajma</Link></li>
              <li><Link to="/products">Badri Cow Ghee</Link></li>
              <li><Link to="/products">Red Rice</Link></li>
              <li><Link to="/products">Tempering Spice</Link></li>
            </ul>
          </div>

          <div className="footer__links">
            <h3 >Contact Us</h3>
            <ul>
              <li>Village - Bhangeli,</li>
              <li>Gangnani, Uttarkashi,</li>
              <li>Uttarakhand-249135, India.</li>
              <li>share@orangutanorganics.com</li>
              <li>Phone1: +91 9147715577</li>
              <li>Phone2: +91 8617735816</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p style={{color:"rgba(41,90,51)", fontWeight:"bold"}}>&copy; {new Date().getFullYear()} Orang Utan Organics. All rights reserved.</p>
          <div className="footer__social">
  <a href="https://www.facebook.com/profile.php?id=100085440072433#" target='_blank' rel="noreferrer" aria-label="Facebook">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  </a>
  <a href="https://www.instagram.com/orangutan.organics/" target='_blank' rel="noreferrer" aria-label="Instagram">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="white"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="white"/>
    </svg>
  </a>
  <a href="https://www.youtube.com/@orangutanorganics3277/videos" target='_blank' rel="noreferrer" aria-label="Youtube">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
  <path d="M22.54 6.42c-.21-.8-.83-1.42-1.62-1.62C19.92 4.1 12 4.1 12 4.1s-7.92 0-8.92.7c-.8.2-1.42.82-1.62 1.62-.7 2.7-.7 8.28 0 10.98.21.8.83 1.42 1.62 1.62 1 .7 8.92.7 8.92.7s7.92 0 8.92-.7c.8-.2 1.42-.82 1.62-1.62.7-2.7.7-8.28 0-10.98zm-11.54 6.66V8.92l5.47 2.08-5.47 2.08z"/>
</svg>


  </a>

</div>
        </div>
      </div>
    </footer>
  );
}
   ===== OLD CODE — ORIGINAL v1 — END ===== */

// ===== NEW REDESIGN — WAVE THEME — START =====
/* Palette (client-supplied):
   Primary   #826845 #618E69 #5D9C9D #03605C
   Secondary #655F59 #B6787F #95373A #D76427 #F8F3EB #DBD3A8 #B5882D #A56650 */
const FT = {
  CREAM:            '#F8F3EB',
  DEEP_FOREST:      '#03605C',
  DEEP_FOREST_DK:   '#024442',
  FOREST_SHADOW:    '#013532',
  SOIL_OLIVE:       '#618E69',
  SAGE:             '#618E69',
  PALE_SAGE:        '#DBD3A8',
  MEADOW_GOLD:      '#B5882D',
  GOLD_LINE:        '#B5882D',
  SEAL_TERRACOTTA:  '#D76427',
  BURGUNDY:         '#95373A',
  BRAND_BROWN:      '#826845',
  BRAND_GREEN:      '#618E69',
  BRAND_TEAL:       '#5D9C9D',
};

function Footer() {
  const scopedStyles = `
    .wtn-footer, .wtn-footer * { box-sizing: border-box; }
    .wtn-footer {
      position: relative; margin-top: 0;
      background: ${FT.FOREST_SHADOW};
      color: ${FT.CREAM};
      font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
    }
    .wtn-footer__topwave { display: block; width: 100%; height: 300px; }
    .wtn-footer__inner {
      max-width: 1320px; margin: 0 auto;
      padding: 12px 28px 24px;
    }
    .wtn-footer__grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
      gap: 40px;
      padding-top: 8px;
    }
    .wtn-footer__brand img {
      width: auto; height: 160px; max-width: 100%; display: block;
      object-fit: contain;
    }
    .wtn-footer__tagline {
      margin: 18px 0 0; max-width: 340px;
      color: ${FT.CREAM}; opacity: 0.88;
      font-size: 14px; line-height: 1.65;
    }
    .wtn-footer__col h3 {
      margin: 0 0 14px; padding: 0 0 10px;
      font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase;
      font-weight: 700; color: ${FT.MEADOW_GOLD};
      border-bottom: 1px solid rgba(224,178,76,0.28);
      display: inline-block; padding-right: 24px;
    }
    .wtn-footer__col ul { list-style: none; margin: 0; padding: 0; }
    .wtn-footer__col li {
      padding: 5px 0; font-size: 14px; color: ${FT.CREAM}; opacity: 0.9;
    }
    .wtn-footer__col li a {
      color: ${FT.CREAM}; text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: color 180ms ease, border-color 180ms ease;
    }
    .wtn-footer__col li a:hover {
      color: ${FT.MEADOW_GOLD}; border-bottom-color: ${FT.MEADOW_GOLD};
    }
    .wtn-footer__eyebrow {
      display: inline-block; margin-top: 22px;
      background: ${FT.DEEP_FOREST};
      color: ${FT.CREAM};
      font-size: 10.5px; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 600; padding: 6px 14px;
      border: 1px solid rgba(224,178,76,0.35);
    }

    .wtn-footer__ruleWrap {
      margin-top: 34px; padding-top: 18px;
      position: relative;
    }
    .wtn-footer__ruleWave {
      display: block; width: 100%; height: 14px; margin-bottom: 14px;
    }
    .wtn-footer__bottom {
      display: flex; align-items: center; justify-content: space-between;
      gap: 20px; flex-wrap: wrap;
    }
    .wtn-footer__copy {
      margin: 0; font-size: 12.5px; letter-spacing: 0.14em;
      color: ${FT.CREAM}; opacity: 0.75; text-transform: uppercase;
    }
    .wtn-footer__social { display: flex; gap: 14px; align-items: center; }
    .wtn-footer__social a {
      width: 38px; height: 38px; border-radius: 50%;
      display: inline-flex; align-items: center; justify-content: center;
      color: ${FT.CREAM};
      background: rgba(243,234,211,0.06);
      border: 1px solid rgba(224,178,76,0.35);
      transition: background 180ms ease, color 180ms ease, transform 180ms ease;
    }
    .wtn-footer__social a:hover {
      background: ${FT.MEADOW_GOLD}; color: ${FT.FOREST_SHADOW};
      transform: translateY(-2px);
    }

    .wtn-contour-root { animation: wtn-footdrift 11s ease-in-out infinite alternate; transform-origin: center; }
    @keyframes wtn-footdrift {
      0%   { transform: translate3d(0, 0px, 0); }
      100% { transform: translate3d(0, 4px, 0); }
    }

    @media (max-width: 900px) {
      .wtn-footer__grid { grid-template-columns: 1fr 1fr; gap: 32px; }
      .wtn-footer__topwave { height: 200px; }
      .wtn-footer__brand img { height: 130px; }
    }
    @media (max-width: 560px) {
      .wtn-footer__grid { grid-template-columns: 1fr; gap: 28px; }
      .wtn-footer__inner { padding: 8px 20px 22px; }
      .wtn-footer__bottom { justify-content: center; text-align: center; }
      .wtn-footer__topwave { height: 140px; }
      .wtn-footer__brand img { height: 110px; margin: 0 auto; }
      .wtn-footer__brand { text-align: center; }
      .wtn-footer__tagline { margin-left: auto; margin-right: auto; }
    }
    @media (prefers-reduced-motion: reduce) {
      .wtn-contour-root { animation: none; }
    }
  `;

  // Panoramic Himalayan landscape — 12 layered terrain bands with unique
  // asymmetric ridgelines, atmospheric perspective, terraced-field furrows,
  // cypress trees in the foreground, and flowing gold contour linework that
  // weaves across the whole illustration like a topographic hand-drawing.
  const TopWave = () => (
    <svg
      className="wtn-footer__topwave"
      viewBox="0 0 1440 420"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Watercolor-feel gradients on the most prominent bands —
            subtle enough to feel painted, not obviously graduated. */}
        <linearGradient id="wtn-fw-clay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A56F52"/>
          <stop offset="1" stopColor={FT.BRAND_BROWN}/>
        </linearGradient>
        <linearGradient id="wtn-fw-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C99A3E"/>
          <stop offset="1" stopColor={FT.MEADOW_GOLD}/>
        </linearGradient>
        <linearGradient id="wtn-fw-sage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7B9C58"/>
          <stop offset="1" stopColor={FT.SOIL_OLIVE}/>
        </linearGradient>
      </defs>

      {/* ============ LAYER 2 — Second distant range (atmospheric teal)
           Bumped amplitude: deeper valleys, higher shoulders. */}
      <path
        d="M0,238 C70,205 160,250 245,210
           C330,175 415,245 500,210
           C585,178 665,250 750,215
           C840,180 930,248 1030,215
           C1135,182 1250,245 1440,210
           L1440,420 L0,420 Z"
        fill={FT.DEEP_FOREST_DK}
        opacity="0.75"
      />

      {/* ============ LAYER 3 — Deep forest ridge, sharper */}
      <path
        d="M0,268 C95,250 190,280 290,252
           C395,222 480,270 575,250
           C675,225 775,275 875,248
           C975,220 1085,275 1185,248
           C1295,222 1385,258 1440,248
           L1440,420 L0,420 Z"
        fill={FT.DEEP_FOREST}
        opacity="0.9"
      />

      {/* ============ LAYER 4 — Sage forest hills */}
      <path
        d="M0,285 C125,270 245,292 385,258
           C525,232 665,288 805,262
           C945,240 1085,285 1225,262
           C1335,246 1400,272 1440,262
           L1440,420 L0,420 Z"
        fill="#4E7A56"
        opacity="0.95"
      />

      {/* ============ LAYER 5 — Rolling green hills — deep wavy amplitude */}
      <path
        d="M0,300 C130,270 285,320 450,280
           C615,240 775,315 920,280
           C1070,244 1215,308 1360,278
           C1405,270 1425,285 1440,280
           L1440,420 L0,420 Z"
        fill={FT.BRAND_GREEN}
      />

      {/* ============ LAYER 6 — Muted moss band */}
      <path
        d="M0,318 C155,292 335,338 500,300
           C665,268 830,332 995,302
           C1155,272 1305,325 1440,302
           L1440,420 L0,420 Z"
        fill="#6E8D48"
        opacity="0.92"
      />

      {/* ============ LAYER 7 — Clay / warm brown mid-band */}
      <path
        d="M0,336 C175,308 340,352 530,318
           C725,286 880,346 1060,320
           C1225,296 1365,340 1440,322
           L1440,420 L0,420 Z"
        fill="url(#wtn-fw-clay)"
      />

      {/* ============ LAYER 8 — Meadow gold / wheat field */}
      <path
        d="M0,352 C195,326 385,365 560,336
           C745,306 905,360 1085,335
           C1245,314 1365,354 1440,338
           L1440,420 L0,420 Z"
        fill="url(#wtn-fw-gold)"
      />

      {/* ============ LAYER 9 — Sage terraced band */}
      <path
        d="M0,368 C220,348 425,378 620,350
           C825,326 1005,372 1185,350
           C1305,336 1400,360 1440,352
           L1440,420 L0,420 Z"
        fill="url(#wtn-fw-sage)"
      />

      {/* Terrace furrow lines — follow the sage band's deeper wave rhythm */}
      <g stroke="#3F5C2C" strokeWidth="0.8" fill="none"
         opacity="0.35" strokeLinecap="round">
        <path d="M0,372 C215,350 425,382 620,354 C825,332 1005,376 1185,354 C1305,342 1400,362 1440,356"/>
        <path d="M0,380 C215,362 425,388 620,364 C825,346 1005,384 1185,364 C1305,352 1400,370 1440,364"/>
        <path d="M0,388 C215,374 425,394 620,376 C825,362 1005,392 1185,376 C1305,368 1400,378 1440,372"/>
      </g>

      {/* ============ LAYER 10 — Pale sage foreground rise */}
      <path
        d="M0,382 C175,362 380,392 560,368
           C745,344 905,384 1085,364
           C1245,346 1365,376 1440,366
           L1440,420 L0,420 Z"
        fill={FT.PALE_SAGE}
      />

      {/* ============ LAYER 11 — Deeper moss foreground */}
      <path
        d="M0,394 C130,378 260,400 400,384
           C540,368 680,396 830,382
           C990,368 1140,394 1440,380
           L1440,420 L0,420 Z"
        fill="#7C9155"
        opacity="0.9"
      />

      {/* ============ LAYER 12 — Base transition into footer bg */}
      <path
        d="M0,406 C240,394 520,412 780,400
           C1060,388 1280,410 1440,398
           L1440,420 L0,420 Z"
        fill={FT.DEEP_FOREST}
      />
      <path
        d="M0,412 L1440,412 L1440,420 L0,420 Z"
        fill={FT.FOREST_SHADOW}
      />

      {/* ============ CONTOUR LINEWORK
           Eight full-width gold threads. Every line spans M0 → 1440 so
           nothing cuts off mid-canvas. Strokes are thicker (1.2–1.8)
           and opacities richer than before for a bolder, more satisfying
           topographic weave. Each path uses unique control points; no
           line repeats another. */}
      <g className="wtn-contour-root" stroke={FT.GOLD_LINE} fill="none"
         strokeLinecap="round">

        {/* 1. Highest ridgeline sweep — most dramatic amplitude */}
        <path d="M0,190 C120,155 260,215 420,160
                 C580,105 740,200 900,150
                 C1060,100 1220,190 1440,155"
              strokeWidth="1.8" opacity="0.75"/>

        {/* 2. Second high thread, offset from #1, follows a different rhythm */}
        <path d="M0,230 C160,205 320,240 500,215
                 C680,192 860,240 1040,215
                 C1220,192 1360,232 1440,218"
              strokeWidth="1.5" opacity="0.65"/>

        {/* 3. Mid-slope thread across the forest ridges — full width */}
        <path d="M0,268 C170,254 340,282 540,254
                 C740,232 940,278 1140,258
                 C1290,245 1380,264 1440,258"
              strokeWidth="1.4" opacity="0.68"/>

        {/* 4. Long wavy sweep over the green hills — full width */}
        <path d="M0,308 C195,268 400,328 605,286
                 C815,246 1015,320 1220,286
                 C1335,268 1400,300 1440,290"
              strokeWidth="1.35" opacity="0.62"/>

        {/* 5. Rising thread from left to right joining wheat + terrace */}
        <path d="M0,352 C215,318 440,362 660,332
                 C880,302 1080,352 1260,326
                 C1360,314 1410,332 1440,325"
              strokeWidth="1.3" opacity="0.6"/>

        {/* 6. Across the sage terrace — full wavy sweep */}
        <path d="M0,370 C230,344 460,378 680,354
                 C905,332 1105,370 1300,352
                 C1385,346 1420,358 1440,354"
              strokeWidth="1.25" opacity="0.6"/>

        {/* 7. Foreground weave across pale sage — deeper waves */}
        <path d="M0,386 C180,364 385,396 570,368
                 C775,342 980,390 1180,366
                 C1320,354 1400,376 1440,370"
              strokeWidth="1.2" opacity="0.65"/>

        {/* 8. Deep-foreground low sweep — subtle but wavy */}
        <path d="M0,400 C220,382 440,406 660,388
                 C880,370 1080,402 1280,384
                 C1370,378 1420,388 1440,386"
              strokeWidth="1.15" opacity="0.55"/>
      </g>
    </svg>
  );

  // Fine gold contour line above the copyright row
  const RuleWave = () => (
    <svg
      className="wtn-footer__ruleWave"
      viewBox="0 0 1440 14"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0,7 C240,1 500,13 780,6 C1060,-1 1240,12 1440,5"
            stroke={FT.GOLD_LINE} strokeWidth="1.1" fill="none" opacity="0.7"/>
    </svg>
  );

  return (
    <footer className="wtn-footer">
      <style>{scopedStyles}</style>
      <TopWave />

      <div className="wtn-footer__inner">
        <div className="wtn-footer__grid">
          <div className="wtn-footer__brand wtn-footer__col">
            <img src={logo} alt="Orang Utan Organics" />
            <p className="wtn-footer__tagline">
              Bringing the pure goodness of the Himalayas directly to your kitchen.
              Supporting mountain farmers and sustainable farming practices.
            </p>
            <span className="wtn-footer__eyebrow">Hand-picked · Sun-dried · Unpolished</span>
          </div>

          <div className="wtn-footer__col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/who-are-we">Who Are We</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="wtn-footer__col">
            <h3>Products</h3>
            <ul>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products">Himalayan Rajma</Link></li>
              <li><Link to="/products">Badri Cow Ghee</Link></li>
              <li><Link to="/products">Red Rice</Link></li>
              <li><Link to="/products">Tempering Spice</Link></li>
            </ul>
          </div>

          <div className="wtn-footer__col">
            <h3>Contact Us</h3>
            <ul>
              <li>Village - Bhangeli,</li>
              <li>Gangnani, Uttarkashi,</li>
              <li>Uttarakhand-249135, India.</li>
              <li>share@orangutanorganics.com</li>
              <li>Phone1: +91 9147715577</li>
              <li>Phone2: +91 8334980100</li>
            </ul>
          </div>
        </div>

        <div className="wtn-footer__ruleWrap">
          <RuleWave />
          <div className="wtn-footer__bottom">
            <p className="wtn-footer__copy">
              &copy; {new Date().getFullYear()} Orang Utan Organics. All rights reserved.
            </p>
            <div className="wtn-footer__social">
              <a href="https://www.facebook.com/profile.php?id=100085440072433#" target='_blank' rel="noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/orangutan.organics/" target='_blank' rel="noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" focusable="false">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@orangutanorganics3277/videos" target='_blank' rel="noreferrer" aria-label="Youtube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                  <path d="M22.54 6.42c-.21-.8-.83-1.42-1.62-1.62C19.92 4.1 12 4.1 12 4.1s-7.92 0-8.92.7c-.8.2-1.42.82-1.62 1.62-.7 2.7-.7 8.28 0 10.98.21.8.83 1.42 1.62 1.62 1 .7 8.92.7 8.92.7s7.92 0 8.92-.7c.8-.2 1.42-.82 1.62-1.62.7-2.7.7-8.28 0-10.98zm-11.54 6.66V8.92l5.47 2.08-5.47 2.08z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
// ===== NEW REDESIGN — WAVE THEME — END =====

export default Footer;
