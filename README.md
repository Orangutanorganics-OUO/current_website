# Orangutan Organics E-Commerce Website

A modern, fully-featured e-commerce website for Orangutan Organics - connecting Himalayan mountain farmers with health-conscious consumers through authentic organic products.

## Features

### 🛍️ E-Commerce Functionality
- **Product Catalog**: 6 organic products with multiple size variants
- **Shopping Cart**: Add, update, remove items with real-time updates
- **Checkout Flow**: Complete checkout with customer information collection
- **Payment Options**:
  - Prepaid (Razorpay integration - UPI, Cards, Net Banking)
  - Cash on Delivery (COD with ₹150 charge)
- **Shipping Integration**: Delhivery API for shipping charge calculation and shipment creation

### 📄 Pages
1. **Home**: Hero section, featured products, company values, CTA sections
2. **Products**: Filterable product catalog with detailed product pages
3. **Who Are We**: Company story, mission, values, and impact
4. **Blog**: Blog posts about products, recipes, and sustainability
5. **Contact**: Contact form with Google Sheets integration and email notifications
6. **Cart**: Shopping cart with quantity management
7. **Checkout**: Complete checkout flow with payment processing

### 🎨 Design
- Clean, modern UI with Orangutan Organics brand colors:
  - Green (#0F5B2F) - Primary brand color
  - Orange (#F46A1F) - Accent color
  - Cream (#F5F2EB) - Background accents
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Accessibility-friendly

### ⚡ Technical Features
- Built with React 19
- React Router for navigation
- Local storage for cart persistence
- Google Sheets integration for form submissions
- Razorpay payment gateway integration
- Delhivery shipping API integration

## Products

1. **Himalayan White Rajma** - 500gm / 1kg
2. **Himalayan Red Rajma** - 500gm / 1kg
3. **Badri Cow Ghee** - 120gm / 295gm / 495gm
4. **Himalayan Black Soyabean** - 500gm / 1kg
5. **Himalayan Red Rice** - 1kg
6. **Wild Himalayan Tempering Spice** - 100gm

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd test_website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your API keys:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   REACT_APP_GOOGLE_SHEET_ID=YOUR_GOOGLE_SHEET_ID
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Backend API URL
REACT_APP_API_URL=https://your-backend-url.com/api

# Google Apps Script URL for Contact Form and Reviews
REACT_APP_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Google Sheets ID for Reviews
REACT_APP_GOOGLE_SHEET_ID=YOUR_SHEET_ID_HERE
```

### 1. Google Sheets Integration

**Setup Google Apps Script:**
1. Create a Google Sheet for storing contact form submissions and reviews
2. Go to Extensions > Apps Script
3. Create a web app that handles POST requests
4. Deploy the script and copy the web app URL
5. Add the URL to your `.env` file as `REACT_APP_GOOGLE_SCRIPT_URL`
6. Add your Google Sheet ID to `.env` as `REACT_APP_GOOGLE_SHEET_ID`

### 2. Backend API

The application requires a backend API for:
- Payment processing (Razorpay)
- Shipping calculations (Delhivery)
- Order management

Deploy your backend and add the URL to `.env` as `REACT_APP_API_URL`.

## Project Structure

```
test_website/
├── public/
├── src/
│   ├── components/
│   │   ├── Navigation.js
│   │   ├── Navigation.css
│   │   ├── Footer.js
│   │   ├── Footer.css
│   │   ├── StarRating.js
│   │   ├── ReviewForm.js
│   │   ├── ImageCarousel.js
│   │   └── Toast.js
│   ├── pages/
│   │   ├── Home.js & Home.css
│   │   ├── Products.js & Products.css
│   │   ├── Cart.js & Cart.css
│   │   ├── Checkout.js & Checkout.css
│   │   ├── WhoAreWe.js & WhoAreWe.css
│   │   ├── Blog.js & Blog.css
│   │   └── Contact.js & Contact.css
│   ├── utils/
│   │   ├── products.js
│   │   ├── discounts.js
│   │   ├── bestsellers.js
│   │   ├── blogData.js
│   │   └── fetchReviews.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .env
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

## Backend Requirements

This is a frontend React application. For full functionality, you'll need a backend API with the following endpoints:

1. `/api/calculate-shipping` - Calculate shipping charges
2. `/api/create-razorpay-order` - Create payment order
3. `/api/verify-payment` - Verify payment signature
4. `/api/place-cod-order` - Process COD orders
5. `/api/place-prepaid-order` - Process prepaid orders

**Note:** Make sure to set `REACT_APP_API_URL` in your `.env` file to your backend URL.

## Payment Flow

### Prepaid Orders:
1. Customer fills checkout form
2. Selects "Prepaid" payment method
3. Shipping charges calculated via Delhivery API
4. Razorpay payment modal opens
5. Customer completes payment
6. Payment verified on backend
7. Delhivery shipment created
8. Order saved to Google Sheets
9. Confirmation email sent

### COD Orders:
1. Customer fills checkout form
2. Selects "Cash on Delivery"
3. Shipping charges + COD charge (₹150) calculated
4. Order placed immediately
5. Delhivery shipment created with COD amount
6. Order saved to Google Sheets
7. Confirmation email sent

## Testing

### Local Testing
```bash
npm start
```

### Build for Production
```bash
npm run build
```

### Test Payments (Razorpay Test Mode)
- Card Number: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date
- OTP: 000000

## Deployment

### Frontend Deployment
Can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting

### Backend Deployment
Can be deployed to:
- Heroku
- AWS EC2/ECS
- DigitalOcean
- Google Cloud Platform

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Support

For questions or issues:
- Email: support@orangutanorganics.com
- Website: https://orangutanorganics.com

## License

Copyright © 2024 Orangutan Organics. All rights reserved.

---

**Built with ❤️ for Himalayan Mountain Farmers**
