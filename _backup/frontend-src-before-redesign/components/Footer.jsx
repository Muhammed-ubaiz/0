import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck, 
  Truck, Award, Send, Check 
} from 'lucide-react';
import { categories } from '../data/products';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0a0f1d] text-slate-300 pt-16 pb-20 lg:pb-10 border-t border-slate-800">
      {/* Newsletter Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-12 border-b border-slate-800">
        <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-6 sm:p-10 border border-slate-700/60 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          {/* Subtle Red glow */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#ed1c24]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl text-center lg:text-left relative z-10">
            <span className="text-xs font-black text-[#ed1c24] uppercase tracking-widest block mb-1 font-heading">
              Join UAE's Premier Packaging Network
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 font-heading">
              Get Exclusive Wholesale Deals & Product Launches
            </h3>
            <p className="text-xs text-slate-300">
              Subscribe to receive weekly stock alerts, discounted carton rates, and industry packaging trends.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full max-w-md relative z-10">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your business email address..."
              className="flex-1 bg-white/10 text-white placeholder:text-slate-400 text-xs px-4 py-3 rounded-xl border border-white/20 focus:outline-none focus:border-[#ed1c24] focus:bg-white/15 transition-all font-sans"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-[#ed1c24] hover:bg-[#dc2626] text-white text-xs font-black uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5 shadow-red-btn font-heading cursor-pointer"
            >
              {subscribed ? (
                <>
                  <Check size={14} />
                  <span>Joined!</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Subscribe</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/logo-white.png"
                alt="Ideal Pack Logo"
                className="h-10 w-auto object-contain transition-transform hover:scale-105"
              />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm mb-6">
              Ideal Pack Store is the United Arab Emirates' premier packaging manufacturer and supplier. Serving 500+ restaurants, cafes, cloud kitchens, and households with certified food-grade packaging.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/idealpack.uae/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-[#ed1c24] transition-all flex items-center justify-center p-2"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100092517775347"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-[#ed1c24] transition-all flex items-center justify-center p-2"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/></svg>
              </a>
              <a
                href="https://www.youtube.com/@idealpack2589"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-[#ed1c24] transition-all flex items-center justify-center p-2"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a
                href="https://wa.me/971549910027"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 hover:text-white hover:bg-emerald-600 transition-all flex items-center justify-center"
                title="WhatsApp Direct"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-4 pb-2 border-b border-slate-800 font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-heading">
              <li>
                <Link to="/products" className="hover:text-[#ed1c24] transition-colors">
                  All 377+ Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[#ed1c24] transition-colors">
                  Packaging Collections
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#ed1c24] transition-colors">
                  About Ideal Pack UAE
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#ed1c24] transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <a 
                  href="https://wa.me/971549910027?text=Hello%20Ideal%20Pack!%20I%20would%20like%20to%20open%20a%20wholesale%20B2B%20account."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ed1c24] transition-colors text-red-400 font-bold"
                >
                  Wholesale B2B Account
                </a>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#ed1c24] transition-colors">
                  View Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Packaging Lines */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-4 pb-2 border-b border-slate-800 font-heading">
              Top Categories
            </h4>
            <ul className="space-y-2.5 text-xs font-heading">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link to={`/products?category=${c.handle}`} className="hover:text-[#ed1c24] transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact Info */}
          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-widest mb-4 pb-2 border-b border-slate-800 font-heading">
              UAE Distribution Hub
            </h4>
            <ul className="space-y-3.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#ed1c24] shrink-0 mt-0.5" />
                <span>Po. Box 65631, Industrial Area 12, Sharjah, UAE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#ed1c24] shrink-0" />
                <a href="tel:+97165642072" className="hover:text-white transition-colors">
                  (+971) 656 420 72
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle size={15} className="text-emerald-400 shrink-0" />
                <a href="https://wa.me/971549910027" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +971 54 991 0027
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#ed1c24] shrink-0" />
                <a href="mailto:Info@idealpackstore.com" className="hover:text-white transition-colors">
                  Info@idealpackstore.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={15} className="text-[#ed1c24] shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Sat: 9:00 AM - 10:00 PM</p>
                  <p>Sun: 10:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 Ideal Pack Store LLC. Ideas For Better Packing. All rights reserved.</p>
        <div className="flex items-center gap-2.5 text-[11px]">
          <span className="bg-slate-800/90 px-2.5 py-1 rounded-lg text-slate-300 font-medium">Cash on Delivery</span>
          <span className="bg-slate-800/90 px-2.5 py-1 rounded-lg text-slate-300 font-medium">Visa • MasterCard</span>
          <span className="bg-slate-800/90 px-2.5 py-1 rounded-lg text-slate-300 font-medium">Apple Pay</span>
          <span className="bg-slate-800/90 px-2.5 py-1 rounded-lg text-slate-300 font-medium">Bank Transfer</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
