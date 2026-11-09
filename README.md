# Ideal Pack Store Clone (idealpackstore.com)

A full-stack, production-ready clone of [idealpackstore.com](https://idealpackstore.com/) with **377 products**, **12 categories**, complete shopping cart, wishlist, multi-step checkout flow, and backend integration configured for Firebase project **`idealpack-store`**.

---

## 🚀 Features

- **Real Scraped Catalog**:
  - **377 live products** scraped directly from `https://idealpackstore.com/` across all 16 pages.
  - **12 packaging categories** with official icons (Aluminium Containers, Black Base Containers, Clear Containers, Eco-Friendly Tableware, Foam, Kraft, Paper, Plastic, Tissue, etc.).
  - Real high-definition images, AED prices, descriptions, and SKU details.
- **Brand Matching UI**:
  - Exact brand colors: Navy (`#162232`), Golden Amber (`#d4a359`), and crisp accents.
  - Interactive hero banner slider using official high-res promotional banners.
  - Value propositions & trust badges (UAE-Wide 24-48h Delivery, Direct Manufacturer Pricing, 100% Food-Grade Certified, Custom Printing).
- **Navigation & Search**:
  - Live auto-complete search bar with instant product thumbnails and prices.
  - Mega-menu category dropdown.
  - Category filter sidebar, price range slider, and multi-option sorting.
- **Product Experience**:
  - Multi-image gallery with thumbnail switcher.
  - Wholesale bulk discount tiers table (1-5 packs, 6-20 packs, 20+ cartons).
  - One-click **"Order on WhatsApp"** with pre-filled message.
  - Related items carousel and food-grade specification tabs.
- **Cart & Checkout**:
  - Slide-out Cart Drawer with Free Shipping progress bar (Free shipping at AED 200).
  - Full Cart page with order delivery instructions.
  - Multi-step checkout supporting Cash on Delivery (COD), Direct Bank Transfer, and Credit Card placeholder prepared for payment gateway keys.
  - Order success page with unique order number (`IP-XXXXXX`) and WhatsApp tracking.
- **Company Pages**:
  - Custom Packaging & Logo Printing request form (`/pages/customization`).
  - Wholesale B2B application form (`/pages/wholesale`).
  - Store & Warehouse Locator with interactive Sharjah hub map (`/pages/store-locator`).
  - Contact Us form & direct communication channels (`/pages/contact`).
  - Wishlist system (`/pages/wishlist`).
  - Admin & Firebase Sync dashboard (`/admin`).
- **Backend & Firebase Target (`idealpack-store`)**:
  - Express API with CORS support.
  - Firebase Admin SDK configuration.
  - Firestore rules (`firestore.rules`) and project definition (`.firebaserc`).
  - Automated database seed script (`npm run seed`) to batch-populate Firestore.

---

## 📁 Project Structure

```
idealpackstore/
├── .firebaserc              # Configured for project "idealpack-store"
├── firebase.json            # Firebase Hosting & Firestore rules configuration
├── firestore.rules          # Security rules for collections (products, orders, inquiries)
├── firestore.indexes.json
├── package.json             # Root workspace scripts
│
├── frontend/                # React 19 + Vite + Tailwind CSS 4
│   ├── src/
│   │   ├── components/      # Navbar, Footer, HeroSlider, ProductCard, CartDrawer, etc.
│   │   ├── context/         # CartContext & WishlistContext (with LocalStorage sync)
│   │   ├── data/            # Scraped products.json (377 items) & categories.json (12 categories)
│   │   ├── pages/           # Home, Catalog, ProductDetail, Cart, Checkout, Success, Admin, etc.
│   │   ├── firebase.js      # Client-side Firebase configuration
│   │   └── App.jsx          # Route definitions
│   └── dist/                # Production build ready to deploy
│
└── backend/                 # Node.js + Express API + Firebase Admin SDK
    ├── data/                # Scraped products & categories
    ├── server.js            # REST API (products, categories, orders, inquiries, seed)
    ├── firebaseConfig.js    # Firebase Admin SDK initialization for "idealpack-store"
    └── seed.js              # Command-line Firestore database batch seeder
```

---

## 🛠️ How to Run Locally

### 1. Run the Frontend:
```bash
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Run the Backend API:
```bash
cd backend
npm start
```
Runs on [http://localhost:5000](http://localhost:5000).

---

## ☁️ Deploying to Firebase (`idealpack-store`)

The project is already pre-configured for Firebase project ID: **`idealpack-store`**.

### Step 1: Login to Firebase CLI
```bash
firebase login
```

### Step 2: Verify Project Selection
```bash
firebase use idealpack-store
```

### Step 3: Build & Deploy Frontend to Firebase Hosting
```bash
npm run deploy:hosting
```
*(Or manually: `cd frontend && npm run build` then `firebase deploy --only hosting`)*

### Step 4: Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### Step 5: Seed All 377 Products into Firestore Database
To push all 377 scraped products and 12 categories into your live Firestore database:
```bash
npm run seed
```
*(Or via the Admin UI at `http://localhost:5173/admin` by clicking "Seed Firestore Project Now")*

---

## 💳 Payment Gateway Integration (Instructions)

As requested, the checkout flow is ready for your preferred payment gateway:
- **Frontend**: Edit [CheckoutPage.jsx](file:///d:/ideax%20project/idealpackstore/frontend/src/pages/CheckoutPage.jsx) under `handleSubmitOrder` to initialize your payment gateway SDK (e.g. Stripe, Telr, Tap, PayTabs, or Razorpay).
- **Backend**: Add your secret webhook and verification in [server.js](file:///d:/ideax%20project/idealpackstore/backend/server.js) under `/api/orders`.
