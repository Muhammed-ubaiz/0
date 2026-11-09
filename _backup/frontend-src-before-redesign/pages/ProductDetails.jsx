import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Heart, ShoppingBag, Truck, ShieldCheck, 
  MessageCircle, Check, Star, Layers, Plus, Minus, Home, ArrowRight,
  Package, Award, Clock, Share2
} from 'lucide-react';
import { useCart, useWishlist } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const found = products.find(p => p.handle === id || String(p.id) === String(id));
    if (found) {
      setProduct(found);
      const mainImg = found.image || (found.images && found.images[0]) || '';
      setSelectedImage(mainImg);
      setQuantity(1);
    } else {
      setProduct(null);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-black text-slate-800 mb-2 font-heading">Product Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">The packaging product you are looking for is unavailable or has moved.</p>
        <Link
          to="/products"
          className="px-8 py-3.5 rounded-full bg-[#0b1320] text-white text-xs font-bold uppercase tracking-wider font-heading hover:bg-[#162232] transition-colors"
        >
          Back to Packaging Catalog
        </Link>
      </div>
    );
  }

  const isLiked = isInWishlist(product.handle);

  const images = (product.images && product.images.length > 0)
    ? product.images
    : [product.image];

  const relatedProducts = products
    .filter(p => p.category === product.category && p.handle !== product.handle)
    .slice(0, 4);

  // Bulk tier pricing calculations
  const discountRate = quantity >= 20 ? 0.15 : quantity >= 6 ? 0.08 : 0;
  const unitPrice = product.price * (1 - discountRate);
  const totalPrice = unitPrice * quantity;
  const totalSavings = (product.price * quantity) - totalPrice;

  const handleAddToCart = () => {
    addToCart({ ...product, price: unitPrice }, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, price: unitPrice }, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Ideal Pack! I would like to order: ${product.title} (Quantity: ${quantity}) - https://idealpackstore.com/products/${product.handle}`
  );

  return (
    <div className="bg-[#fafafa] min-h-screen py-8 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 font-medium font-heading">
          <Link to="/" className="hover:text-[#ed1c24] flex items-center gap-1">
            <Home size={13} />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} />
          <Link to="/products" className="hover:text-[#ed1c24]">Catalog</Link>
          <ChevronRight size={13} />
          <Link to={`/products?category=${product.category}`} className="hover:text-[#ed1c24] capitalize">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <ChevronRight size={13} />
          <span className="text-slate-800 font-bold truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Main Product Stage Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-card-subtle p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            
            {/* Left: Product Images Gallery */}
            <div className="flex flex-col gap-4">
              {/* Primary Image Stage */}
              <div className="relative w-full aspect-square bg-[#f8fafc] rounded-2xl overflow-hidden border border-slate-100 p-8 flex items-center justify-center">
                <img
                  src={selectedImage || product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain mix-blend-multiply transition-all duration-300"
                />
                
                {/* Wishlist Heart on Image */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-sm ${
                    isLiked 
                      ? 'bg-red-50 text-[#ed1c24]' 
                      : 'bg-white/90 text-slate-400 hover:text-[#ed1c24] hover:bg-white'
                  }`}
                  title={isLiked ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-slate-400 hover:text-slate-800 hover:bg-white flex items-center justify-center transition-all shadow-sm"
                  title="Share Product"
                >
                  <Share2 size={16} />
                </button>
                {copiedLink && (
                  <span className="absolute top-16 left-4 text-[11px] font-bold bg-[#ed1c24] text-white px-2.5 py-1 rounded-md shadow-md animate-fade-in-up">
                    Link Copied!
                  </span>
                )}
              </div>

              {/* Thumbnails Row */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-xl bg-[#f8fafc] p-1.5 shrink-0 border-2 transition-all cursor-pointer overflow-hidden ${
                        selectedImage === img
                          ? 'border-[#ed1c24] shadow-sm'
                          : 'border-transparent hover:border-slate-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} ${idx + 1}`}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Buy Box & Specs */}
            <div className="flex flex-col justify-between">
              <div>
                {/* Category & Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-red-50 text-red-800 border border-red-200/60 font-heading">
                    {product.category.replace(/-/g, ' ')}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 font-heading">
                    In Stock (Ready to Dispatch)
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-4 font-heading">
                  {product.title}
                </h1>

                {/* Pricing Box */}
                <div className="bg-[#f8fafc] rounded-2xl p-5 border border-slate-100 mb-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#ed1c24] font-heading">
                      AED {unitPrice.toFixed(2)}
                    </span>
                    {discountRate > 0 && (
                      <span className="text-sm font-bold text-slate-400 line-through font-heading">
                        AED {product.price.toFixed(2)}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-medium">VAT Included</span>
                  </div>

                  {discountRate > 0 && (
                    <p className="text-xs font-bold text-emerald-600 mt-1 font-heading">
                      Wholesale bulk discount applied! ({Math.round(discountRate * 100)}% Off)
                    </p>
                  )}

                  <p className="text-xs text-slate-500 mt-2">
                    Orders over AED 200 qualify for <strong className="text-slate-800">FREE delivery</strong> across all 7 Emirates.
                  </p>
                </div>

                {/* Bulk Savings Calculator Tiers */}
                <div className="border border-slate-200 rounded-2xl p-4 mb-6">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2 font-heading">
                    Wholesale Volume Savings
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs font-heading">
                    <div className={`p-2.5 rounded-xl border ${quantity < 6 ? 'bg-red-50 border-red-300 font-bold' : 'bg-slate-50 border-slate-100'}`}>
                      <p className="text-[10px] text-slate-500">1 - 5 Packs</p>
                      <p className="font-extrabold text-slate-900 mt-0.5">AED {product.price.toFixed(2)}</p>
                      <p className="text-[9px] text-slate-400">Standard Rate</p>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${quantity >= 6 && quantity < 20 ? 'bg-red-50 border-red-300 font-bold' : 'bg-slate-50 border-slate-100'}`}>
                      <p className="text-[10px] text-slate-500">6 - 19 Packs</p>
                      <p className="font-extrabold text-slate-900 mt-0.5">AED {(product.price * 0.92).toFixed(2)}</p>
                      <p className="text-[9px] text-emerald-600 font-bold">8% OFF</p>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${quantity >= 20 ? 'bg-red-50 border-red-300 font-bold' : 'bg-slate-50 border-slate-100'}`}>
                      <p className="text-[10px] text-slate-500">20+ Packs</p>
                      <p className="font-extrabold text-slate-900 mt-0.5">AED {(product.price * 0.85).toFixed(2)}</p>
                      <p className="text-[9px] text-emerald-600 font-bold">15% OFF</p>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Order Summary */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center border border-slate-200 rounded-full bg-white p-1">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="w-12 text-center text-sm font-extrabold text-slate-900 font-heading">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  <div className="text-xs">
                    <span className="text-slate-400">Total Price: </span>
                    <span className="text-base font-black text-slate-900 font-heading">AED {totalPrice.toFixed(2)}</span>
                    {totalSavings > 0 && (
                      <span className="ml-2 text-[11px] font-bold text-emerald-600 font-heading">
                        (Saved AED {totalSavings.toFixed(2)})
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6 font-heading">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 py-4 px-6 rounded-full text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                      isAdded 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-[#0f172a] text-white hover:bg-[#ed1c24] hover:shadow-lg'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check size={18} />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        <span>Add {quantity} to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-4 px-6 rounded-full bg-[#ed1c24] hover:bg-[#dc2626] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-lg shadow-red-btn cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Instant Checkout</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* WhatsApp Quick Order Button */}
                <a
                  href={`https://wa.me/971549910027?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-heading cursor-pointer mb-8"
                >
                  <MessageCircle size={18} />
                  <span>Order via WhatsApp Direct (+971 54 991 0027)</span>
                </a>
              </div>

              {/* Trust Features Strip */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-[11px] text-slate-500 font-heading">
                <div className="flex items-center gap-2">
                  <Truck size={16} className="text-[#ed1c24] shrink-0" />
                  <span>Next Day UAE Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-blue-500 shrink-0" />
                  <span>100% Food-Grade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-emerald-500 shrink-0" />
                  <span>Hygienic Sealed Pack</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Specs & Info */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-card-subtle p-6 sm:p-10 mb-12">
          <div className="flex border-b border-slate-100 mb-6 font-heading">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 px-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === 'description'
                  ? 'border-[#ed1c24] text-[#ed1c24]'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              Description & Details
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 px-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                activeTab === 'shipping'
                  ? 'border-[#ed1c24] text-[#ed1c24]'
                  : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
            >
              UAE Shipping & Delivery
            </button>
          </div>

          {activeTab === 'description' ? (
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4">
              <p>
                The <strong>{product.title}</strong> is precision-manufactured for commercial food service, cloud kitchens, cafeterias, and catering enterprises requiring premium packaging reliability.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 font-heading">
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Product Category</span>
                  <span className="text-sm font-black text-slate-900 capitalize">{product.category.replace(/-/g, ' ')}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Food Contact Safety</span>
                  <span className="text-sm font-black text-slate-900">100% Certified Food Grade</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
              <p>
                <strong>Delivery Timelines:</strong> Orders placed before 2:00 PM are dispatched same-day or next business day across Dubai, Sharjah, and Ajman. Abu Dhabi, RAK, Fujairah, and UAQ deliveries arrive within 24 to 48 hours.
              </p>
              <p>
                <strong>Free Delivery:</strong> All orders with a total value equal to or greater than AED 200 receive free door-to-door delivery across all 7 Emirates.
              </p>
            </div>
          )}
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading">
                Related Packaging Products
              </h2>
              <Link
                to={`/products?category=${product.category}`}
                className="text-xs font-bold text-slate-700 hover:text-[#ed1c24] font-heading flex items-center gap-1"
              >
                <span>View More</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id || p.handle} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
