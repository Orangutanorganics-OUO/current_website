import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import WhoAreWe from './pages/WhoAreWe';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import BlogDetail from './pages/BlogDetail';
import Traceability from './pages/Traceability';
import FarmerImpact from './pages/FarmerImpact';
import Recipes from './pages/Recipes';
import Nutrition from './pages/Nutrition';
import Matters from './pages/Matters';
import Faq from './pages/Faq';
import RuralReaps from './pages/RuralReaps';
import { initConfig } from './utils/configClient';
import './App.css';

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    updateCartCount();

    // Listen for cart updates
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    initConfig();
    const onVisibility = () => {
      if (document.visibilityState === 'visible') initConfig();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // ---- Smooth scroll (Lenis) ------------------------------------------
  // Intercepts wheel/keyboard/touch scroll and interpolates it — fast
  // flings no longer teleport to the end of the page. Native scroll
  // semantics are preserved, so position:fixed, IntersectionObserver,
  // and per-frame getBoundingClientRect() (used by HorizontalProducts and
  // the WhyItMatters transition) all continue to work correctly.
  //
  // Enabled on both desktop and touch devices. Only skipped when the user
  // has prefers-reduced-motion set (accessibility).
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      // Duration is how long the eased catch-up takes. Default 1.2s feels
      // premium without being sluggish. Tune here if it needs more/less.
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      // Touch smoothing on. Multiplier tuned down slightly so a swipe
      // doesn't over-shoot compared to native inertial scroll.
      smoothTouch: true,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(count);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navigation cartCount={cartCount} />
        <WhatsAppButton />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/who-are-we" element={<WhoAreWe />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/who-are-we/traceability" element={<Traceability />} />
            <Route path="/who-are-we/farmer-impact" element={<FarmerImpact />} />
            <Route path="/who-are-we/recipes" element={<Recipes />} />
            <Route path="/who-are-we/faq" element={<Faq />} />
            <Route path="/traceability" element={<Traceability />} />
            <Route path="/rural-reaps" element={<RuralReaps />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/why-it-matters" element={<Matters />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
