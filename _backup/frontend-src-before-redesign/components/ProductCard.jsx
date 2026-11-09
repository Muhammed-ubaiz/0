import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, ShoppingBag, Check, Eye, Star, Plus, Minus, X, MessageCircle, ArrowRight 
} from 'lucide-react';
import { useCart, useWishlist } from '../context/CartContext';

// Self-contained Quick View Popup Modal
const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image || (product.images && product.images[0]) || '');
      setQuantity(1);
      setIsAdded(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const isLiked = isInWishlist(product.handle);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Ideal Pack! I would like to order: ${product.title} (Qty: ${quantity}) - https://idealpackstore.com/products/${product.handle}`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10 animate-fade-in-up border border-slate-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors z-20 cursor-pointer"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square bg-[#f8f9fa] rounded-2xl border border-slate-100 p-4 flex items-center justify-center overflow-hidden">
              <span className="absolute top-3 left-3 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white text-slate-700 shadow-xs border border-slate-200/60 font-heading">
                {product.category ? product.category.replace(/-/g, ' ') : 'Packaging'}
              </span>

              <img
                src={selectedImage}
                alt={product.title}
                className="max-h-full max-w-full object-contain mix-blend-multiply"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-12 h-12 rounded-xl border p-1 bg-white shrink-0 transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-[#ed1c24] ring-2 ring-[#ed1c24]/20'
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-[#ed1c24] uppercase tracking-widest font-heading">
                  {product.vendor || 'Ideal Pack'}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 font-heading">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                  In Stock
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug mb-3 font-heading">
                {product.title}
              </h2>

              <div className="flex items-baseline gap-2 mb-4 font-heading">
                <span className="text-2xl font-black text-slate-900">AED {product.price.toFixed(2)}</span>
                <span className="text-xs text-slate-400">VAT Included</span>
              </div>

              <p className="text-xs text-slate-500 mb-5 leading-relaxed">
                Direct food-safe packaging from UAE distributor. Free delivery across UAE for orders over AED 200.
              </p>

              {/* Quantity Picker */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center border border-slate-200 rounded-full bg-[#f8f9fa] p-1">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:bg-white transition-colors cursor-pointer"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-900 font-heading">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:bg-white transition-colors cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                    isLiked
                      ? 'border-red-200 bg-red-50 text-[#ed1c24]'
                      : 'border-slate-200 text-slate-400 hover:text-[#ed1c24] hover:border-red-200'
                  }`}
                  title="Wishlist"
                >
                  <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 font-heading">
              <button
                onClick={handleAddToCart}
                className={`w-full py-3 px-4 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#ed1c24] text-white hover:bg-[#dc2626] shadow-red-btn'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={16} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Add {quantity} to Cart</span>
                  </>
                )}
              </button>

              <div className="flex gap-2">
                <Link
                  to={`/product/${product.handle}`}
                  onClick={onClose}
                  className="flex-1 py-2.5 px-3 rounded-full border border-slate-200 hover:border-slate-300 text-slate-700 text-[11px] font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1"
                >
                  <span>Full Details</span>
                  <ArrowRight size={13} />
                </Link>

                <a
                  href={`https://wa.me/971549910027?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 transition-colors flex items-center justify-center"
                  title="WhatsApp Order"
                >
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const isLiked = isInWishlist(product.handle);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const primaryImage = product.image || (product.images && product.images[0]) || 'https://idealpackstore.com/cdn/shop/files/ideal-pack_LOGO-PNG.png';
  const secondaryImage = (product.images && product.images.length > 1) ? product.images[1] : primaryImage;

  return (
    <>
      <div 
        className="group relative bg-white rounded-2xl border border-slate-100 hover:border-slate-300/80 p-3 sm:p-3.5 transition-all duration-300 hover:shadow-card-hover flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top: Product Image Stage */}
        <div className="relative w-full aspect-square bg-[#f8f9fa] rounded-xl overflow-hidden mb-3 p-3 flex items-center justify-center">
          {/* Category Pill */}
          <span className="absolute top-2.5 left-2.5 z-10 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/95 text-slate-700 shadow-xs border border-slate-200/60 backdrop-blur-md font-heading">
            {product.category ? product.category.replace(/-/g, ' ') : 'Packaging'}
          </span>

          {/* Right Action Icons (Wishlist & Quick View) */}
          <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
            <button
              onClick={handleWishlist}
              className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-xs cursor-pointer ${
                isLiked 
                  ? 'bg-red-50 text-[#ed1c24] scale-105' 
                  : 'bg-white/90 text-slate-400 hover:text-[#ed1c24] hover:bg-white hover:scale-105'
              }`}
              title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
              aria-label="Wishlist"
            >
              <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
            </button>

            <button
              onClick={handleQuickView}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-slate-400 hover:text-[#ed1c24] hover:bg-white transition-all shadow-xs opacity-0 group-hover:opacity-100 hidden sm:flex items-center justify-center hover:scale-105 cursor-pointer"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye size={14} />
            </button>
          </div>

          {/* Product Image */}
          <Link to={`/product/${product.handle}`} className="w-full h-full flex items-center justify-center">
            <img
              src={isHovered ? secondaryImage : primaryImage}
              alt={product.title}
              loading="lazy"
              className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Hover Quick-Add Bar */}
          <div className="absolute inset-x-2.5 bottom-2.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:block font-heading">
            <button
              onClick={handleAdd}
              className={`w-full py-2 px-3 rounded-xl text-[11px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer ${
                isAdded 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#0f172a] text-white hover:bg-[#ed1c24] hover:shadow-red-btn'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={13} />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={13} />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom: Details & Price */}
        <div className="flex-1 flex flex-col justify-between pt-1">
          <div>
            {/* Meta Row: Brand + Rating */}
            <div className="flex items-center justify-between text-[10px] mb-1 font-heading">
              <span className="font-bold text-[#ed1c24] uppercase tracking-widest truncate max-w-[120px]">
                {product.vendor || 'Ideal Pack'}
              </span>
              <span className="flex items-center gap-1 font-bold text-amber-500">
                <Star size={11} fill="currentColor" />
                <span className="text-slate-800">4.9</span>
                <span className="text-slate-400 font-normal">(18)</span>
              </span>
            </div>

            {/* Product Title */}
            <Link
              to={`/product/${product.handle}`}
              className="text-xs sm:text-[13px] font-semibold text-slate-800 line-clamp-2 hover:text-[#ed1c24] transition-colors leading-snug mb-2.5 font-heading"
              title={product.title}
            >
              {product.title}
            </Link>
          </div>

          {/* Pricing & Cart Tap Button */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
            <div>
              <div className="flex items-baseline gap-1 font-heading">
                <span className="text-[10px] font-black text-[#ed1c24] tracking-wider">AED</span>
                <span className="text-lg sm:text-xl font-black text-slate-900 leading-none">
                  {product.price.toFixed(2)}
                </span>
              </div>
              <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-1 mt-1 font-heading">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                In Stock
              </span>
            </div>

            {/* Round Tap Button (Visible on Mobile & Tablet) */}
            <button
              onClick={handleAdd}
              className={`sm:hidden w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90 ${
                isAdded 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#0f172a] text-white hover:bg-[#ed1c24]'
              }`}
              aria-label="Add to cart"
            >
              {isAdded ? <Check size={14} /> : <Plus size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};

export default ProductCard;
