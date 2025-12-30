import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import logo from "../utils/Orang-utan-color-logo-1.png"

function Navigation({ cartCount }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Generate subtle snowflakes
    const flakes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 5 + Math.random() * 7,
      animationDelay: Math.random() * 5,
      fontSize: 8 + Math.random() * 6,
      opacity: 0.3 + Math.random() * 0.4
    }));
    setSnowflakes(flakes);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const snowfallKeyframes = `
    @keyframes snowfall {
      0% {
        transform: translateY(-10px) translateX(0);
      }
      100% {
        transform: translateY(100vh) translateX(20px);
      }
    }

    @media (max-width: 768px) {
      .new-year-banner-text {
        font-size: 11px !important;
        padding: 0 15px !important;
      }
    }

    @media (max-width: 480px) {
      .new-year-banner-text {
        font-size: 9px !important;
        padding: 0 10px !important;
      }
    }
  `;

  return (
    <header className="header">
      <style>{snowfallKeyframes}</style>

      {/* New Year Sale Banner with subtle Snowfall */}
      <div
  style={{
    height: "4vh",
    background: "linear-gradient(135deg, #2d5aa0 0%, #1e3a5f 100%)",
    fontStyle:"normal",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    color: "#fff",
    position: "relative",
    overflow: "hidden",
    padding: "0 20px"
  }}
>
  {/* Subtle Snowflakes */}
  {snowflakes.map(flake => (
    <div
      key={flake.id}
      style={{
        position: "absolute",
        left: `${flake.left}%`,
        top: "-10px",
        color: "#fff",
        fontSize: `${flake.fontSize}px`,
        opacity: flake.opacity,
        animation: `snowfall ${flake.animationDuration}s linear ${flake.animationDelay}s infinite`,
        pointerEvents: "none",
        userSelect: "none"
      }}
    >
      ❄
    </div>
  ))}

  {/* Banner Text */}
  <span className="new-year-banner-text" style={{ position: "relative", zIndex: 2 }}>
    ❄️ NEW YEAR SALE - 10% OFF on 2+ Items | FREE DELIVERY ABOVE ₹1000
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

export default Navigation;
