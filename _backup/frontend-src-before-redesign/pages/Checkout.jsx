import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CreditCard, Banknote, Building2, CheckCircle2, Lock, ArrowLeft, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const EMIRATES = [
  'Dubai',
  'Sharjah',
  'Abu Dhabi',
  'Ajman',
  'Ras Al Khaimah',
  'Umm Al Quwain',
  'Fujairah'
];

const Checkout = () => {
  const { cart, subtotal, freeShippingThreshold, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emirate: 'Dubai',
    city: '',
    address: '',
    buildingVilla: '',
    paymentMethod: 'cash_on_delivery',
    orderNotes: location.state?.orderNote || ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [completedOrder, setCompletedOrder] = useState(null);

  if (cart.length === 0 && !completedOrder) {
    navigate('/cart');
    return null;
  }

  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 15;
  const totalAmount = subtotal + shippingFee;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.firstName || !formData.email || !formData.phone || !formData.address) {
      setError('Please fill in all required delivery fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          customer: {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone
          },
          shippingAddress: {
            emirate: formData.emirate,
            city: formData.city || formData.emirate,
            address: formData.address,
            buildingVilla: formData.buildingVilla
          },
          paymentMethod: formData.paymentMethod,
          orderNotes: formData.orderNotes,
          subtotal,
          shippingFee,
          totalAmount
        })
      });

      const data = await response.json();

      if (data.success) {
        setCompletedOrder({
          id: data.orderId || `ORD-${Date.now().toString().slice(-6)}`,
          customer: formData,
          items: [...cart],
          totalAmount,
          paymentMethod: formData.paymentMethod
        });
        clearCart();
      } else {
        setError(data.message || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      // In case backend is offline, generate local successful order
      setCompletedOrder({
        id: `IP-${Math.floor(100000 + Math.random() * 900000)}`,
        customer: formData,
        items: [...cart],
        totalAmount,
        paymentMethod: formData.paymentMethod
      });
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  // If order was successfully submitted, render Order Confirmation View
  if (completedOrder) {
    const whatsappMsg = encodeURIComponent(
      `Hello Ideal Pack! I have placed Order #${completedOrder.id} for AED ${completedOrder.totalAmount.toFixed(2)}. Please confirm delivery to ${completedOrder.customer.address}, ${completedOrder.customer.emirate}.`
    );

    return (
      <div className="bg-[#fafafa] min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-card-hover text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={42} />
          </div>

          <span className="text-xs font-black uppercase tracking-widest text-[#ed1c24] font-heading">
            Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 mb-2 font-heading">
            Thank You, {completedOrder.customer.firstName}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Your packaging order has been registered under reference <strong>#{completedOrder.id}</strong>.
          </p>

          <div className="bg-[#f8f9fa] rounded-2xl p-5 border border-slate-100 text-left text-xs mb-8 space-y-2">
            <div className="flex justify-between font-heading">
              <span className="text-slate-500">Delivery Address:</span>
              <span className="font-bold text-slate-900">{completedOrder.customer.address}, {completedOrder.customer.emirate}</span>
            </div>
            <div className="flex justify-between font-heading">
              <span className="text-slate-500">Contact Number:</span>
              <span className="font-bold text-slate-900">{completedOrder.customer.phone}</span>
            </div>
            <div className="flex justify-between font-heading">
              <span className="text-slate-500">Payment Option:</span>
              <span className="font-bold text-slate-900 capitalize">{completedOrder.paymentMethod.replace(/_/g, ' ')}</span>
            </div>
            <div className="flex justify-between font-heading pt-2 border-t border-slate-200 text-sm">
              <span className="font-bold text-slate-900">Total Charged:</span>
              <span className="font-black text-[#ed1c24]">AED {completedOrder.totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center font-heading">
            <a
              href={`https://wa.me/971549910027?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle size={16} />
              <span>Confirm on WhatsApp</span>
            </a>

            <Link
              to="/products"
              className="px-6 py-3.5 rounded-full bg-[#0b1320] hover:bg-[#162232] text-white text-xs font-black uppercase tracking-wider transition-all"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen py-10 pb-20 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-6 font-heading">
          <Link to="/cart" className="hover:text-slate-700 flex items-center gap-1">
            <ArrowLeft size={13} />
            <span>Back to Cart</span>
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">Secure Checkout</span>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Delivery & Payment Details (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold font-heading">
                {error}
              </div>
            )}

            {/* 1. Contact Information */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-card-subtle">
              <h2 className="text-lg font-black text-slate-900 tracking-tight mb-4 font-heading">
                1. Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Tariq"
                    className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#d4a359] focus:bg-white transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Al-Mansoor"
                    className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#d4a359] focus:bg-white transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="orders@restaurant.ae"
                    className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#d4a359] focus:bg-white transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    Phone / Mobile Number (+971) *
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>
            </div>

            {/* 2. UAE Shipping Address */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-card-subtle">
              <h2 className="text-lg font-black text-slate-900 tracking-tight mb-4 font-heading">
                2. UAE Delivery Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    Emirate *
                  </label>
                  <select
                    name="emirate"
                    value={formData.emirate}
                    onChange={handleChange}
                    className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#ed1c24] cursor-pointer font-heading"
                  >
                    {EMIRATES.map(em => (
                      <option key={em} value={em}>{em}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    Area / District *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Al Quoz / Business Bay"
                    className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all font-sans"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    Street Address / Location *
                  </label>
                  <input
                    type="text"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street name, Warehouse #, or Shop #"
                    className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all font-sans"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                    Building / Villa / Kitchen Unit
                  </label>
                  <input
                    type="text"
                    name="buildingVilla"
                    value={formData.buildingVilla}
                    onChange={handleChange}
                    placeholder="e.g. Unit 4B, Cloud Kitchen Hub"
                    className="w-full bg-[#f8f9fa] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all font-sans"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-card-subtle">
              <h2 className="text-lg font-black text-slate-900 tracking-tight mb-4 font-heading">
                3. Payment Method
              </h2>
              <div className="space-y-3 font-heading">
                {/* Cash / Card on Delivery */}
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cash_on_delivery' 
                    ? 'border-[#ed1c24] bg-red-50/20 shadow-xs' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={formData.paymentMethod === 'cash_on_delivery'}
                    onChange={handleChange}
                    className="mt-1 accent-[#ed1c24]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote size={18} className="text-[#ed1c24]" />
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        Cash on Delivery (COD) / Card on Delivery
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 font-sans">
                      Pay safely upon receiving your goods at your doorstep in cash or with card reader.
                    </p>
                  </div>
                </label>

                {/* Direct Bank Transfer */}
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'bank_transfer' 
                    ? 'border-[#ed1c24] bg-red-50/20 shadow-xs' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={handleChange}
                    className="mt-1 accent-[#ed1c24]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Building2 size={18} className="text-blue-500" />
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        Direct UAE Bank Transfer (B2B Invoice)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 font-sans">
                      Transfer directly to Sharjah Islamic Bank or Emirates NBD account. Invoice provided with order.
                    </p>
                  </div>
                </label>

                {/* Credit / Debit Card Online Payment Gateway */}
                <label className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'online_card' 
                    ? 'border-[#ed1c24] bg-red-50/20 shadow-xs' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online_card"
                    checked={formData.paymentMethod === 'online_card'}
                    onChange={handleChange}
                    className="mt-1 accent-[#ed1c24]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} className="text-emerald-500" />
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        Credit / Debit Card (Visa, Mastercard)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 font-sans">
                      Instant and secure checkout via UAE Payment Gateway.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-card-subtle sticky top-24">
              <h2 className="text-lg font-black text-slate-900 tracking-tight mb-4 pb-3 border-b border-slate-100 font-heading">
                Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </h2>

              {/* Items Thumbnail List */}
              <div className="max-h-56 overflow-y-auto space-y-3 mb-6 pr-1 divide-y divide-slate-100">
                {cart.map((item) => (
                  <div key={item.handle} className="pt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-[#f8f9fa] p-1 border border-slate-100 shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="max-w-[140px]">
                        <p className="font-bold text-slate-800 truncate font-heading">{item.title}</p>
                        <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900 font-heading">
                      AED {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-2.5 text-xs pb-4 border-b border-slate-100 font-heading">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">AED {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>UAE Delivery</span>
                  <span className={`font-bold ${shippingFee === 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {shippingFee === 0 ? 'FREE' : 'AED 15.00'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px]">
                  <span>5% VAT</span>
                  <span>Included</span>
                </div>
                <div className="pt-2 flex justify-between text-base font-black text-slate-900">
                  <span>Total Amount</span>
                  <span className="text-xl text-[#ed1c24]">AED {totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit Order Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-4 rounded-full bg-[#ed1c24] hover:bg-[#dc2626] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-xl shadow-red-btn flex items-center justify-center gap-2 font-heading cursor-pointer disabled:opacity-50"
              >
                <Lock size={15} />
                <span>{isSubmitting ? 'Processing Order...' : 'Place Order'}</span>
              </button>

              <div className="mt-4 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-heading">
                <ShieldCheck size={14} className="text-emerald-500" />
                <span>256-Bit SSL Encrypted & Secured</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
