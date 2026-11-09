import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, ArrowLeft, ShieldCheck, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    freeShippingThreshold, 
    amountToFreeShipping 
  } = useCart();

  const [orderNote, setOrderNote] = useState('');
  const navigate = useNavigate();

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-[#f8f9fa] flex items-center justify-center text-slate-300 mb-5 border border-slate-100">
          <ShoppingBag size={40} />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 font-heading">
          Your Shopping Cart is Empty
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-md">
          Explore our extensive catalog of food containers, paper cups, cutlery, aluminium foil, and kraft boxes.
        </p>
        <Link
          to="/products"
          className="px-8 py-4 rounded-full bg-[#0b1320] text-white text-xs font-black uppercase tracking-wider hover:bg-[#162232] transition-colors shadow-lg hover:shadow-xl font-heading cursor-pointer"
        >
          Browse Packaging Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen py-10 pb-20 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
            Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)
          </h1>
          <button
            onClick={clearCart}
            className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors font-heading"
          >
            Clear All
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-white rounded-3xl border border-red-100 p-5 mb-8 shadow-card-subtle">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 mb-2.5 font-heading">
            <Truck size={18} className="text-[#ed1c24]" />
            {amountToFreeShipping > 0 ? (
              <span>
                Add <strong className="text-[#ed1c24]">AED {amountToFreeShipping.toFixed(2)}</strong> more to your order for <strong className="text-slate-900">FREE UAE DELIVERY</strong>!
              </span>
            ) : (
              <span className="text-emerald-700 font-black">🎉 Congratulations! You have unlocked FREE DELIVERY across UAE!</span>
            )}
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className={`h-2.5 rounded-full transition-all duration-500 ${amountToFreeShipping === 0 ? 'bg-emerald-500' : 'bg-[#ed1c24]'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-card-subtle divide-y divide-slate-100">
              <div className="hidden sm:grid grid-cols-12 text-xs font-black text-slate-400 uppercase tracking-widest pb-3 font-heading">
                <span className="col-span-6">Product Details</span>
                <span className="col-span-2 text-center">Unit Price</span>
                <span className="col-span-2 text-center">Quantity</span>
                <span className="col-span-2 text-right">Total</span>
              </div>

              {cart.map((item) => (
                <div key={item.handle} className="py-4 first:pt-0 last:pb-0 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="sm:col-span-6 flex items-center gap-3.5">
                    <div className="w-16 h-16 rounded-xl bg-[#f8f9fa] border border-slate-100 p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div>
                      <Link 
                        to={`/product/${item.handle}`}
                        className="text-xs sm:text-sm font-bold text-slate-800 hover:text-[#ed1c24] transition-colors line-clamp-2 leading-snug font-heading"
                      >
                        {item.title}
                      </Link>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                        {item.category?.replace(/-/g, ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="sm:col-span-2 text-left sm:text-center text-xs font-bold text-slate-600 font-heading">
                    <span className="sm:hidden text-slate-400 font-normal">Unit: </span>
                    AED {item.price.toFixed(2)}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="sm:col-span-2 flex items-center justify-start sm:justify-center">
                    <div className="flex items-center border border-slate-200 rounded-full bg-white p-0.5">
                      <button
                        onClick={() => updateQuantity(item.handle, -1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-xs font-black text-slate-800 font-heading">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.handle, 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove */}
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 text-right">
                    <span className="text-xs sm:text-sm font-black text-slate-900 font-heading">
                      AED {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.handle)}
                      className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                      title="Remove Item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Instructions & Note */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-card-subtle">
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2 font-heading">
                Special Delivery Instructions / Order Notes
              </label>
              <textarea
                rows={3}
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="e.g. Please deliver to restaurant back kitchen entrance, or call upon arrival..."
                className="w-full bg-[#f8f9fa] border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-800 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all font-sans"
              />
            </div>

            {/* Back to Shopping */}
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#ed1c24] transition-colors font-heading pt-2"
            >
              <ArrowLeft size={14} />
              <span>Continue Shopping Packaging</span>
            </Link>
          </div>

          {/* Right: Order Summary Card */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-card-subtle sticky top-24">
              <h2 className="text-lg font-black text-slate-900 tracking-tight mb-5 pb-3 border-b border-slate-100 font-heading">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs mb-6 font-heading">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">AED {subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>UAE Delivery</span>
                  <span className={`font-bold ${subtotal >= freeShippingThreshold ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {subtotal >= freeShippingThreshold ? 'FREE' : 'AED 15.00'}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>5% VAT</span>
                  <span>Included</span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between text-base font-black text-slate-900">
                  <span>Estimated Total</span>
                  <span className="text-xl text-[#ed1c24]">
                    AED {(subtotal + (subtotal >= freeShippingThreshold ? 0 : 15)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout', { state: { orderNote } })}
                className="w-full py-4 rounded-full bg-[#ed1c24] hover:bg-[#dc2626] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-xl shadow-red-btn flex items-center justify-center gap-2 font-heading cursor-pointer mb-3"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span>Secure SSL Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-[#ed1c24]" />
                  <span>Doorstep delivery to all 7 Emirates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
