import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import logo from "../utils/logo.svg"

/* ===== OLD CODE — ORIGINAL v1 — START (uncomment to restore) =====
function Navigation({ cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const bannerStyles = `
    @media (max-width: 768px) {
      .banner-text {
        font-size: 11px !important;
        padding: 0 15px !important;
      }
    }

    @media (max-width: 480px) {
      .banner-text {
        font-size: 9px !important;
        padding: 0 10px !important;
      }
    }
  `;

  return (
    <header className="header">
      <style>{bannerStyles}</style>

      { Promotional Banner }
      <div
  style={{
    height: "4vh",
    background: "#5ba3f8",
    fontStyle:"normal",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500"
  }}
>
  { Banner Text }
  <span className="banner-text">
    Discount of 20% on purchase of 3kgs | FREE DELIVERY ABOVE ₹1000
  </span>
</div>

      <div className="header__inner">
        <Link className="header__brand" to="/" onClick={closeMenu}>
          <img className="header__logo" src={logo} alt="Orangutan Organics logo" />
          <div className="header__title">
            <span className="header__name">Orang Utan Organics</span>
            <span className="header__tag">Powered by Mountain Farmers</span>
          </div>
        </Link>



        <nav className={`nav ${isMenuOpen ? 'nav--open' : ''}`}>
          <Link className={`nav__link ${location.pathname === '/' ? 'active' : ''}`} to="/" onClick={closeMenu}>Home</Link>
          <Link className={`nav__link ${location.pathname.startsWith('/who-are-we') ? 'active' : ''}`} to="/who-are-we" onClick={closeMenu}>Who Are We</Link>
          <Link className={`nav__link ${location.pathname.startsWith('/products') ? 'active' : ''}`} to="/products" onClick={closeMenu}>Organic Products</Link>
          <Link className={`nav__link ${location.pathname.startsWith('/blog') ? 'active' : ''}`} to="/blog" onClick={closeMenu}>Blog</Link>
          <Link className={`nav__link ${location.pathname === '/contact' ? 'active' : ''}`} to="/contact" onClick={closeMenu}>Contact</Link>
        </nav>
        <div className="header__actions">
          <Link className="nav__link nav__link--cart header__cart" to="/cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 2L7.17 4H3c-.55 0-1 .45-1 1 0 .55.45 1 1 1l1.8 9c.13.65.69 1 1.4 1h8.6c.71 0 1.27-.35 1.4-1L18 6c.55 0 1-.45 1-1 0-.55-.45-1-1-1h-4.17L11 2H9zm0 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                    stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          <button
            className={`burger-menu ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="burger-line"></span>
            <span className="burger-line"></span>
            <span className="burger-line"></span>
          </button>
        </div>
      </div>

      {isMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </header>
  );
}
   ===== OLD CODE — ORIGINAL v1 — END ===== */

// ===== NEW REDESIGN — WAVE THEME — START =====
/* Palette (client-supplied):
   Primary   #826845 #618E69 #5D9C9D #03605C
   Secondary #655F59 #B6787F #95373A #D76427 #F8F3EB #DBD3A8 #B5882D #A56650 */
const T = {
  CREAM:            '#F8F3EB',
  CREAM_SOFT:       '#F1E7CE',
  DEEP_FOREST:      '#03605C',
  DEEP_FOREST_DK:   '#024442',
  FOREST_SHADOW:    '#013532',
  INK:              '#655F59',
  GOLD_LINE:        '#B5882D',
  MEADOW_GOLD:      '#B5882D',
  SEAL_TERRACOTTA:  '#D76427',
  SAGE:             '#618E69',
  BRAND_BROWN:      '#826845',
  BRAND_GREEN:      '#618E69',
  BRAND_TEAL:       '#5D9C9D',
};

const NAV_LINKS = [
  { to: '/products',    label: 'Shop',         match: (p) => p.startsWith('/products') },
  { to: '/who-are-we',  label: 'Valley',       match: (p) => p.startsWith('/who-are-we') },
  { to: '/traceability', label: 'Traceability', match: (p) => p.startsWith('/traceability') },
  { to: '/rural-reaps', label: 'Rural Reaps',  match: (p) => p.startsWith('/rural-reaps') },
  { to: '/contact',     label: 'Contact',      match: (p) => p === '/contact' },
];

function Navigation({ cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  const scopedStyles = `
    .wtn-header, .wtn-header * { box-sizing: border-box; }
    .wtn-header {
      position: sticky; top: 0; z-index: 1000;
      font-family: -apple-system, "Segoe UI", system-ui, sans-serif;
      color: ${T.INK};
    }
    .wtn-banner {
      background: ${T.DEEP_FOREST};
      color: ${T.CREAM};
      text-align: center;
      font-size: 13px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      padding: 8px 16px;
      font-weight: 500;
    }
    .wtn-banner b { color: ${T.MEADOW_GOLD}; font-weight: 600; }
    .wtn-navwrap {
      position: relative;
      background: ${T.CREAM};
      transition: padding 220ms ease;
      padding: 0;
    }
    .wtn-navwrap::after {
      content: ""; display: block; height: 1px; background: rgba(30,90,85,0.08);
    }
    .wtn-navrow {
      max-width: 1320px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
      gap: 16px; padding: 0 28px;
      transition: padding 220ms ease;
    }
    .wtn-brand {
      display: flex; align-items: center; gap: 12px;
      text-decoration: none; color: ${T.DEEP_FOREST};
      min-width: 0;
    }
    .wtn-brand svg {
      height: ${scrolled ? '34px' : '42px'};
      width: auto; transition: height 220ms ease;
      display: block;
    }
    /* ============================================================
       LOGO SIZE — DESKTOP
       Change these two heights to scale the desktop logo.
       Margin values crop the top/bottom of the logo's transparent
       padding so the header stays compact. Keep margin ≈ -0.28 × height.
       ============================================================ */
    .wtn-brand__logo {
      height: ${scrolled ? '68px' : '110px'};
      width: auto;
      display: block;
      margin: ${scrolled ? '-18px 0' : '-30px 0'};
      transition: height 220ms ease, margin 220ms ease;
      object-fit: contain;
    }
    .wtn-brand__text { display: none; }
    .wtn-nav {
      display: flex; align-items: center; gap: 28px;
    }
    .wtn-nav a {
      position: relative; text-decoration: none;
      color: ${T.DEEP_FOREST_DK};
      font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase;
      font-weight: 600; padding: 6px 0;
      transition: color 180ms ease;
    }
    .wtn-nav a:hover { color: ${T.SEAL_TERRACOTTA}; }
    /* label span carries the underline so its width == text width, not padding-box width */
    .wtn-lbl {
      position: relative;
      display: inline-block;
      line-height: 1;
    }
    .wtn-nav a .wtn-underline {
      position: absolute; left: 0; right: 0; bottom: -8px;
      width: 100%; height: 6px; pointer-events: none;
      opacity: 0; transform: translateY(2px);
      transition: opacity 220ms ease, transform 220ms ease;
    }
    .wtn-nav a:hover .wtn-underline,
    .wtn-nav a.is-active .wtn-underline { opacity: 1; transform: translateY(0); }
    .wtn-nav a.is-active { color: ${T.DEEP_FOREST}; }
    .wtn-actions { display: flex; align-items: center; gap: 14px; }
    .wtn-cart {
      position: relative; display: inline-flex; align-items: center; justify-content: center;
      width: 40px; height: 40px; border-radius: 50%;
      color: ${T.DEEP_FOREST}; text-decoration: none;
      border: 1px solid rgba(30,90,85,0.18);
      background: ${T.CREAM_SOFT};
      transition: background 180ms ease, border-color 180ms ease;
    }
    .wtn-cart:hover { background: #fff; border-color: ${T.MEADOW_GOLD}; }
    .wtn-cart-badge {
      position: absolute; top: -4px; right: -4px;
      background: ${T.SEAL_TERRACOTTA}; color: ${T.CREAM};
      font-size: 11px; font-weight: 700; min-width: 18px; height: 18px;
      border-radius: 9px; display: inline-flex; align-items: center; justify-content: center;
      padding: 0 5px; border: 2px solid ${T.CREAM};
    }
    .wtn-burger {
      display: none;
      width: 42px; height: 42px; border-radius: 50%;
      background: ${T.CREAM_SOFT}; border: 1px solid rgba(3,96,92,0.22);
      cursor: pointer; padding: 0;
      /* three bars must stack vertically — flex-direction:column is the fix */
      flex-direction: column;
      align-items: center; justify-content: center;
      gap: 4px;
    }
    .wtn-burger span {
      display: block;
      width: 20px; height: 2px;
      background: ${T.DEEP_FOREST};
      border-radius: 1px;
      transition: transform 260ms cubic-bezier(0.4, 0, 0.2, 1),
                  opacity 180ms ease;
      transform-origin: center;
    }
    /* Open → morph into an ✕ close icon. gap:4px + 2px bars means each outer
       bar is 6px away from centre; translate by 6px so they meet in the middle. */
    .wtn-burger.is-open span:nth-child(1) { transform: translateY(6px)  rotate(45deg); }
    .wtn-burger.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .wtn-burger.is-open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

    .wtn-wave { display: block; width: 100%; height: ${scrolled ? '20px' : '32px'};
      transition: height 260ms ease; margin-top: -1px; }

    .wtn-contour { animation: wtn-drift 9s ease-in-out infinite alternate; transform-origin: center; }
    @keyframes wtn-drift {
      0%   { transform: translate3d(0, 0px, 0); }
      100% { transform: translate3d(0, 3px, 0); }
    }

    .wtn-drawer {
      position: absolute; top: 100%; left: 0; right: 0;
      background: ${T.CREAM}; overflow: hidden;
      max-height: 0; transition: max-height 320ms ease;
      z-index: 999;
    }
    .wtn-drawer.is-open { max-height: 480px; box-shadow: 0 10px 30px rgba(15,58,54,0.10); }
    .wtn-drawer ul { list-style: none; margin: 0; padding: 8px 24px 0; }
    .wtn-drawer li a {
      display: block; padding: 14px 4px; text-decoration: none;
      color: ${T.DEEP_FOREST_DK};
      font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 600;
      border-bottom: 1px dashed rgba(30,90,85,0.15);
    }
    .wtn-drawer li:last-child a { border-bottom: 0; }
    .wtn-drawer-wave { display: block; width: 100%; height: 32px; }

    .wtn-overlay {
      position: fixed; inset: 0; background: rgba(15,58,54,0.35);
      z-index: 990;
    }

    @media (max-width: 900px) {
      .wtn-brand__tag { display: none; }
      .wtn-brand__name { font-size: 15px; }
      .wtn-nav { display: none; }
      .wtn-burger { display: inline-flex; }
      .wtn-brand__logo {
        height: ${scrolled ? '60px' : '92px'};
        margin: ${scrolled ? '-16px 0' : '-24px 0'};
      }
    }
    /* ============================================================
       LOGO SIZE — MOBILE (≤480px)
       Change these two heights to scale the mobile logo.
       The navrow padding below gives the row breathing room so the
       logo/cart/burger sit visually centered — not hugging the top.
       Keep margin ≈ -0.20 × height for a tight header.
       ============================================================ */
    @media (max-width: 480px) {
      .wtn-banner { font-size: 10.5px; letter-spacing: 0.1em; padding: 7px 10px; }
      .wtn-navrow { padding-left: 16px; padding-right: 16px; }
      .wtn-brand__name { font-size: 14px; }
      .wtn-brand__logo {
        height: ${scrolled ? '72px' : '96px'};
        margin: ${scrolled ? '-14px 0' : '-18px 0'};
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .wtn-contour { animation: none; }
      .wtn-navwrap, .wtn-brand img, .wtn-wave, .wtn-drawer { transition: none; }
    }
  `;

  const NavWave = () => (
    <svg
      className="wtn-wave"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Asymmetric ridgeline — deep valleys, uneven shoulders. Same curvy path
         at every scroll state; only the SVG height changes, so the wave stays
         genuinely curvy whether the header is tall or condensed. */}
      <path
        d="M0,44 C120,4 280,72 440,28 C600,4 780,68 940,26 C1120,4 1260,60 1440,22 L1440,80 L0,80 Z"
        fill={T.DEEP_FOREST}
        opacity="0.95"
      />
      <path
        d="M0,54 C180,18 360,74 560,36 C720,8 920,70 1080,30 C1260,8 1360,52 1440,38 L1440,80 L0,80 Z"
        fill={T.DEEP_FOREST_DK}
        opacity="0.55"
      />
      <path
        d="M0,64 C220,44 420,72 640,54 C860,38 1080,66 1300,50 C1380,44 1420,54 1440,50 L1440,80 L0,80 Z"
        fill={T.FOREST_SHADOW}
        opacity="0.35"
      />
      <g className="wtn-contour">
        <path
          d="M0,42 C120,2 280,70 440,26 C600,2 780,66 940,24 C1120,2 1260,58 1440,20"
          stroke={T.GOLD_LINE}
          strokeWidth="1.2"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M0,52 C180,16 360,72 560,34 C720,6 920,68 1080,28 C1260,6 1360,50 1440,36"
          stroke={T.GOLD_LINE}
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      </g>
    </svg>
  );

  const DrawerWave = () => (
    <svg
      className="wtn-drawer-wave"
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0,10 C240,26 500,0 780,14 C1060,28 1240,4 1440,16 L1440,40 L0,40 Z"
            fill={T.DEEP_FOREST} opacity="0.9"/>
      <path d="M0,18 C280,30 520,8 800,20 C1080,32 1260,10 1440,22 L1440,40 L0,40 Z"
            fill={T.DEEP_FOREST_DK} opacity="0.4"/>
      <path d="M0,12 C240,28 500,2 780,16 C1060,30 1240,6 1440,18"
            stroke={T.GOLD_LINE} strokeWidth="1.1" fill="none" opacity="0.7"/>
    </svg>
  );

  const HoverWave = () => (
    <svg
      className="wtn-underline"
      viewBox="0 0 100 6"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0,3 C20,0 40,6 60,3 C80,0 90,5 100,3"
            stroke={T.MEADOW_GOLD} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
    </svg>
  );

  return (
    <header className="wtn-header">
      <style>{scopedStyles}</style>

      {/* Promotional Banner — preserved copy, restyled */}
      <div className="wtn-banner" role="status">
        <span className="banner-text">
          Discount of <b>20%</b> on purchase of 3kgs&nbsp;·&nbsp;Free delivery above <b>₹1000</b>
        </span>
      </div>

      <div className="wtn-navwrap">
        <div className="wtn-navrow">
          <Link className="wtn-brand" to="/" onClick={closeMenu} aria-label="Orang Utan Organics — home">
            <img src={logo} alt="Orang Utan Organics" className="wtn-brand__logo" />
          </Link>

          <nav className="wtn-nav" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={l.match(location.pathname) ? 'is-active' : ''}
                onClick={closeMenu}
              >
                <span className="wtn-lbl">
                  {l.label}
                  <HoverWave />
                </span>
              </Link>
            ))}
          </nav>

          <div className="wtn-actions">
            <Link className="wtn-cart" to="/cart" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                <path d="M9 2L7.17 4H3c-.55 0-1 .45-1 1 0 .55.45 1 1 1l1.8 9c.13.65.69 1 1.4 1h8.6c.71 0 1.27-.35 1.4-1L18 6c.55 0 1-.45 1-1 0-.55-.45-1-1-1h-4.17L11 2H9zm0 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
                      stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
              {cartCount > 0 && <span className="wtn-cart-badge">{cartCount}</span>}
            </Link>

            <button
              className={`wtn-burger ${isMenuOpen ? 'is-open' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        {/* Wave edge under the nav */}
        <NavWave />

        {/* Mobile drawer with its own wave edge */}
        <div className={`wtn-drawer ${isMenuOpen ? 'is-open' : ''}`} role="navigation" aria-hidden={!isMenuOpen}>
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={closeMenu}
                  className={l.match(location.pathname) ? 'is-active' : ''}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <DrawerWave />
        </div>
      </div>

      {isMenuOpen && <div className="wtn-overlay" onClick={closeMenu}></div>}
    </header>
  );
}
// ===== NEW REDESIGN — WAVE THEME — END =====

export default Navigation;
