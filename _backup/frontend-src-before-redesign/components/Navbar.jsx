import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, ShoppingBag, Heart, Menu, X, Phone, Mail, 
  MapPin, ChevronDown, MessageCircle, ArrowRight, Sparkles,
  Layers, Home, Grid, SlidersHorizontal
} from 'lucide-react';
import { useCart, useWishlist } from '../context/CartContext';
import { products, categories } from '../data/products';

const ANNOUNCEMENTS = [
  '🚚 FREE DELIVERY ACROSS UAE ON ORDERS OVER AED 200',
  '⚡ FAST 24-48 HOUR DISPATCH FROM SHARJAH HUB',
  '🏭 FACTORY DIRECT RATES FOR RESTAURANTS, CAFES & CATERING',
  '✨ CUSTOM LOGO PRINTING AVAILABLE ON ALL PACKAGING'
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { totalItems, subtotal } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const term = searchTerm.toLowerCase();
      const matches = products
        .filter(p => 
          p.title.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.handle.toLowerCase().includes(term)
        )
        .slice(0, 6);
      setSearchResults(matches);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-100">
        {/* Top Announcement Ticker */}
        <div className="bg-[#0f172a] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-4 text-[11px] font-medium text-slate-300">
              <a 
                href="tel:+97165642072" 
                className="flex items-center gap-1.5 hover:text-[#ed1c24] transition-colors"
              >
                <Phone size={12} className="text-[#ed1c24]" />
                <span>(+971) 656 420 72</span>
              </a>
              <span className="hidden sm:inline text-slate-700">|</span>
              <a 
                href="mailto:Info@idealpackstore.com" 
                className="hidden sm:flex items-center gap-1.5 hover:text-[#ed1c24] transition-colors"
              >
                <Mail size={12} className="text-[#ed1c24]" />
                <span>Info@idealpackstore.com</span>
              </a>
              <span className="hidden md:inline text-slate-700">|</span>
              <div className="hidden md:flex items-center gap-1 text-slate-400">
                <MapPin size={12} className="text-[#ed1c24]" />
                <span>Sharjah & Dubai, UAE</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold tracking-wide">
              <span className="text-[#ed1c24] bg-[#ed1c24]/10 border border-[#ed1c24]/20 px-2.5 py-0.5 rounded-full transition-all duration-500 font-heading">
                {ANNOUNCEMENTS[announcementIdx]}
              </span>
              <a
                href="https://wa.me/971549910027"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium text-[11px]"
              >
                <MessageCircle size={13} />
                <span>WhatsApp: +971 54 991 0027</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#ed1c24] rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="Ideal Pack - Ideas For Better Packing"
              className="h-8 sm:h-10 w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>

          {/* Smart Search Bar */}
          <div ref={searchRef} className="relative flex-1 max-w-xl mx-4 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.trim().length > 1 && setIsSearchOpen(true)}
                placeholder="Search 377+ packaging products, containers, foil, cups..."
                className="w-full bg-[#f8fafc] text-xs sm:text-sm pl-5 pr-11 py-2.5 rounded-full border border-slate-200 hover:border-slate-300 focus:outline-none focus:border-[#ed1c24] focus:bg-white focus:ring-4 focus:ring-[#ed1c24]/10 transition-all placeholder:text-slate-400 font-sans shadow-2xs"
              />
              <button
                type="submit"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#ed1c24] p-1 cursor-pointer transition-colors"
                title="Search"
              >
                <Search size={18} />
              </button>
            </form>

            {/* Instant Search Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-fade-in-up">
                <div className="p-3 border-b border-slate-100 bg-slate-50/70 flex justify-between items-center text-xs text-slate-500 font-semibold font-heading">
                  <span>Found {searchResults.length} Products</span>
                  <span className="text-[#ed1c24] font-bold">Press Enter for full results</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
                  {searchResults.map((item) => (
                    <Link
                      key={item.handle}
                      to={`/product/${item.handle}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchTerm('');
                      }}
                      className="flex items-center gap-3.5 p-3 hover:bg-red-50/30 transition-colors group"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-contain bg-[#f8fafc] rounded-lg border border-slate-100 p-1 shrink-0 mix-blend-multiply"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800 truncate group-hover:text-[#ed1c24] transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-medium capitalize">
                          {item.category.replace(/-/g, ' ')}
                        </span>
                      </div>
                      <span className="font-heading font-black text-sm text-[#ed1c24] shrink-0">
                        AED {item.price.toFixed(2)}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs font-bold text-slate-800 hover:text-[#ed1c24] flex items-center justify-center gap-1.5 mx-auto cursor-pointer font-heading transition-colors"
                  >
                    <span>View all matching results</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            {/* Quick WhatsApp Pill */}
            <a
              href="https://wa.me/971549910027?text=Hello%20Ideal%20Pack,%20I%20am%20interested%20in%20food%20packaging"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 transition-colors shrink-0 shadow-2xs font-heading"
            >
              <MessageCircle size={15} className="text-emerald-600" />
              <span>Chat</span>
            </a>

            {/* Wishlist */}
            <Link
              to="/products"
              className="relative p-2.5 text-slate-700 hover:text-[#ed1c24] hover:bg-slate-50 rounded-xl transition-all shrink-0"
              title="Browse Products"
            >
              <Heart size={21} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#ed1c24] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger Capsule */}
            <Link
              to="/cart"
              className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#0f172a] text-white hover:bg-[#ed1c24] transition-all duration-300 shadow-md hover:shadow-lg shrink-0 group cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag size={19} className="group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#ed1c24] group-hover:bg-[#0f172a] text-white text-[10px] font-black px-1.5 py-0.2 rounded-full min-w-[18px] text-center shadow-xs font-heading transition-colors">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight text-xs font-heading">
                <span className="text-slate-400 group-hover:text-white/80 text-[10px] uppercase font-bold tracking-wider">My Cart</span>
                <span className="font-black text-white text-xs">AED {subtotal.toFixed(2)}</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="px-4 pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search packaging products..."
              className="w-full bg-[#f8fafc] text-xs pl-4 pr-10 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#ed1c24] focus:bg-white font-sans"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search size={16} />
            </button>
          </form>
        </div>

        {/* Primary Desktop Navigation Bar (Sleek Single-Line No-Wrap) */}
        <div className="hidden lg:block bg-white border-t border-slate-100 shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3 font-heading py-1.5 overflow-x-auto no-scrollbar">
            
            {/* Left Section: All Categories Mega Menu + Core Lines */}
            <div className="flex items-center gap-1.5 xl:gap-2.5 shrink-0">
              {/* Mega Menu Trigger */}
              <div 
                className="relative shrink-0"
                onMouseEnter={() => setIsCatDropdownOpen(true)}
                onMouseLeave={() => setIsCatDropdownOpen(false)}
              >
                <Link 
                  to="/categories"
                  className="flex items-center gap-2 bg-[#0f172a] hover:bg-[#1e293b] text-white px-4 py-2 rounded-xl font-black uppercase tracking-wider text-xs transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                >
                  <Menu size={14} className="text-[#ed1c24]" />
                  <span>All Categories</span>
                  <ChevronDown size={13} className={`transition-transform duration-300 ${isCatDropdownOpen ? 'rotate-180' : ''}`} />
                </Link>

                {/* Category Mega Menu */}
                {isCatDropdownOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-fade-in-up mt-1">
                    <div className="max-h-[420px] overflow-y-auto divide-y divide-slate-50 px-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/products?category=${cat.handle}`}
                          onClick={() => setIsCatDropdownOpen(false)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-red-50/50 hover:text-[#ed1c24] transition-all group"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-7 h-7 object-contain rounded bg-[#f8fafc] p-0.5 border border-slate-100 mix-blend-multiply"
                            />
                            <span className="font-semibold text-slate-800 group-hover:text-[#ed1c24] text-xs transition-colors whitespace-nowrap">
                              {cat.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#ed1c24] bg-slate-100 group-hover:bg-red-50 px-2 py-0.5 rounded-full transition-colors whitespace-nowrap">
                            {cat.products_count}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Core Packaging Links - strictly whitespace-nowrap */}
              <Link 
                to="/products" 
                className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-[#ed1c24] hover:bg-red-50/50 uppercase tracking-wide transition-colors font-bold text-xs whitespace-nowrap"
              >
                All Products <span className="text-[11px] text-slate-400 font-semibold">({products.length})</span>
              </Link>

              <Link 
                to="/products?category=aluminium-products" 
                className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-[#ed1c24] hover:bg-red-50/50 uppercase tracking-wide transition-colors font-bold text-xs whitespace-nowrap"
              >
                Aluminium
              </Link>

              <Link 
                to="/products?category=black-base-containers" 
                className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-[#ed1c24] hover:bg-red-50/50 uppercase tracking-wide transition-colors font-bold text-xs whitespace-nowrap"
              >
                Black Base
              </Link>

              <Link 
                to="/products?category=clear-containers" 
                className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-[#ed1c24] hover:bg-red-50/50 uppercase tracking-wide transition-colors font-bold text-xs whitespace-nowrap"
              >
                Clear Containers
              </Link>

              <Link 
                to="/products?category=kraft-products" 
                className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-[#ed1c24] hover:bg-red-50/50 uppercase tracking-wide transition-colors font-bold text-xs whitespace-nowrap"
              >
                Kraft & Eco
              </Link>

              <Link 
                to="/products?category=paper-products" 
                className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-[#ed1c24] hover:bg-red-50/50 uppercase tracking-wide transition-colors font-bold text-xs whitespace-nowrap"
              >
                Paper Tableware
              </Link>
            </div>

            {/* Subtle Divider */}
            <div className="h-4 w-px bg-slate-200 shrink-0 hidden xl:block" />

            {/* Right Section: B2B, Custom Branding & Hub Links */}
            <div className="flex items-center gap-1.5 xl:gap-2.5 shrink-0">
              <Link 
                to="/about" 
                className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-[#ed1c24] hover:bg-red-50/50 uppercase tracking-wide transition-colors font-bold text-xs whitespace-nowrap"
              >
                About Us
              </Link>

              <a 
                href="https://wa.me/971549910027?text=Hello%20Ideal%20Pack!%20I%20would%20like%20to%20open%20a%20wholesale%20B2B%20account."
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-red-50 text-[#ed1c24] hover:bg-red-100 font-extrabold uppercase tracking-wide border border-red-200 transition-colors flex items-center gap-1.5 text-xs whitespace-nowrap shadow-2xs shrink-0"
              >
                <Sparkles size={12} className="text-[#ed1c24]" />
                <span>Wholesale B2B</span>
              </a>

              <Link 
                to="/contact" 
                className="px-2.5 py-1.5 rounded-lg text-slate-700 hover:text-[#ed1c24] hover:bg-red-50/50 uppercase tracking-wide transition-colors font-bold text-xs whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Fullscreen Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" 
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-fade-in-up">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <img
                  src="/logo.png"
                  alt="Ideal Pack"
                  className="h-8 w-auto object-contain"
                />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Main Navigation Links */}
                <div>
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 font-heading">
                    Navigation
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5 font-heading text-xs font-bold">
                    <Link
                      to="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-[#ed1c24] rounded-xl text-center transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      to="/products"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-[#ed1c24] rounded-xl text-center transition-colors"
                    >
                      Products
                    </Link>
                    <Link
                      to="/categories"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-[#ed1c24] rounded-xl text-center transition-colors"
                    >
                      Categories
                    </Link>
                    <Link
                      to="/about"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-2 bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-[#ed1c24] rounded-xl text-center transition-colors"
                    >
                      About Us
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="col-span-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-[#ed1c24] rounded-xl text-center transition-colors"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>

                <div>
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 font-heading">
                    Shop Categories
                  </h4>
                  <div className="space-y-1">
                    <Link
                      to="/products"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-black text-white bg-[#0f172a] rounded-xl"
                    >
                      All Packaging Products ({products.length})
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/products?category=${cat.handle}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 text-xs text-slate-700 hover:bg-red-50 hover:text-[#ed1c24] rounded-xl transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <img src={cat.image} alt="" className="w-5 h-5 object-contain mix-blend-multiply" />
                          <span className="font-semibold">{cat.name}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold">({cat.products_count})</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2 font-heading">
                    Corporate Solutions
                  </h4>
                  <div className="space-y-1 text-xs font-bold font-heading">
                    <Link
                      to="/products?category=paper-bags"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl"
                    >
                      Custom Logo Printing
                    </Link>
                    <a
                      href="https://wa.me/971549910027?text=Hello%20Ideal%20Pack!%20I%20would%20like%20to%20open%20a%20wholesale%20B2B%20account."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 text-red-700 bg-red-50 rounded-xl"
                    >
                      B2B Wholesale Accounts
                    </a>
                    <a
                      href="https://maps.google.com/?q=Po+Box+65631+Industrial+Area+12+Sharjah+UAE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl"
                    >
                      Store Locator (Sharjah Hub)
                    </a>
                    <a
                      href="tel:+97165642072"
                      className="block px-3 py-2 text-slate-700 hover:bg-slate-50 rounded-xl"
                    >
                      Contact Phone Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom Navigation Bar on Mobile */}
      <nav className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 lg:hidden px-4 py-2 flex items-center justify-around shadow-2xl font-heading">
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            location.pathname === '/' ? 'text-[#ed1c24]' : 'text-slate-400'
          }`}
        >
          <Home size={19} />
          <span>Home</span>
        </Link>

        <Link 
          to="/products" 
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            location.pathname.startsWith('/products') ? 'text-[#ed1c24]' : 'text-slate-400'
          }`}
        >
          <Grid size={19} />
          <span>Products</span>
        </Link>

        <Link 
          to="/cart" 
          className={`relative flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            location.pathname === '/cart' ? 'text-[#ed1c24]' : 'text-slate-400'
          }`}
        >
          <div className="relative">
            <ShoppingBag size={19} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#ed1c24] text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center font-heading">
                {totalItems}
              </span>
            )}
          </div>
          <span>Cart</span>
        </Link>

        <a 
          href="https://wa.me/971549910027" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-emerald-600"
        >
          <MessageCircle size={19} />
          <span>WhatsApp</span>
        </a>
      </nav>
    </>
  );
};

export default Navbar;
