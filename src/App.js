import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        {/* <PurchasePopup /> */}
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
