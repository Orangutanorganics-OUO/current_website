import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from "../utils/Orang-utan-color-logo-1.png"

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

export default Footer;
