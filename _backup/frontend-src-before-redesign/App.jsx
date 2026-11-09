import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#fbfbfb] text-gray-900 font-sans selection:bg-red-100 selection:text-red-900">
          {/* Top Sticky Header */}
          <Navbar />

          {/* Main Application Page Routes */}
          <main className="flex-1">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Products & Collections */}
              <Route path="/products" element={<Products />} />
              <Route path="/collections/all" element={<Products />} />
              <Route path="/collections/:category" element={<Products />} />

              {/* Dedicated Categories Page */}
              <Route path="/categories" element={<Categories />} />

              {/* Product Details */}
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products/:id" element={<ProductDetails />} />

              {/* Cart & Checkout */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />

              {/* Corporate Pages */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/contact-us" element={<ContactUs />} />

              {/* Fallback to Products */}
              <Route path="*" element={<Products />} />
            </Routes>
          </main>

          {/* Site Footer */}
          <Footer />

          {/* Floating WhatsApp Action Button */}
          <a
            href="https://wa.me/971549910027?text=Hello%20Ideal%20Pack!%20I%20have%20an%20inquiry%20about%20packaging"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            title="Chat with us on WhatsApp"
          >
            <MessageCircle size={26} />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2 font-heading">
              WhatsApp (+971 54 991 0027)
            </span>
          </a>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
