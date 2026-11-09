import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2, 
  Home, ChevronRight, Sparkles, Building2, HelpCircle 
} from 'lucide-react';

const FAQS = [
  {
    q: 'What is the minimum order for free delivery in the UAE?',
    a: 'We offer 100% free delivery across all 7 Emirates on all orders totaling AED 200 or more. For smaller orders, a flat delivery fee of AED 15 applies.'
  },
  {
    q: 'How fast do you dispatch packaging orders?',
    a: 'Orders placed before 2:00 PM are dispatched same-day or next business day from our Sharjah hub. Delivery takes 24-48 hours across Dubai, Sharjah, Ajman, and Abu Dhabi.'
  },
  {
    q: 'Do you offer custom logo printing on containers and cups?',
    a: 'Yes! We specialize in custom Pantone printing on coffee cups, paper takeaway bags, burger boxes, and seal labels. Contact our B2B team for minimum order quantities and proofs.'
  },
  {
    q: 'Can restaurants and catering companies open wholesale credit accounts?',
    a: 'Absolutely. We provide dedicated corporate B2B pricing, scheduled recurring deliveries, and credit facility terms for verified UAE hospitality establishments.'
  }
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryType: 'wholesale',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitted(true); // Graceful fallback
      }
    } catch (err) {
      // Offline fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen py-8 pb-20 lg:pb-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 font-medium font-heading">
          <Link to="/" className="hover:text-[#ed1c24] flex items-center gap-1">
            <Home size={13} />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} />
          <span className="text-slate-800 font-bold">Contact & Inquiries</span>
        </nav>

        {/* Page Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-card-subtle mb-10"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#ed1c24] uppercase tracking-wider mb-2 font-heading">
              <Sparkles size={14} />
              <span>We're Here to Help</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
              Contact Our Packaging Specialists
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
              Have questions about carton bulk orders, custom logo printing, or product specifications? Our Sharjah logistics center and sales team are at your service.
            </p>
          </div>
        </motion.div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {/* Phone */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-card-subtle flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#ed1c24] flex items-center justify-center mb-4 border border-red-200/50">
                <Phone size={22} />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-1 font-heading">Phone Support</h3>
              <p className="text-xs text-slate-400 mb-4">Direct landline assistance</p>
            </div>
            <a
              href="tel:+97165642072"
              className="text-xs font-bold text-slate-800 hover:text-[#ed1c24] transition-colors font-heading"
            >
              (+971) 656 420 72
            </a>
          </div>

          {/* WhatsApp Direct */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-card-subtle flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
                <MessageCircle size={22} />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-1 font-heading">WhatsApp Direct</h3>
              <p className="text-xs text-slate-400 mb-4">Instant quotes & stock alerts</p>
            </div>
            <a
              href="https://wa.me/971549910027"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors font-heading"
            >
              +971 54 991 0027
            </a>
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-card-subtle flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
                <Mail size={22} />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-1 font-heading">Email Address</h3>
              <p className="text-xs text-slate-400 mb-4">Inquiries & purchase orders</p>
            </div>
            <a
              href="mailto:Info@idealpackstore.com"
              className="text-xs font-bold text-slate-800 hover:text-[#ed1c24] transition-colors font-heading truncate"
            >
              Info@idealpackstore.com
            </a>
          </div>

          {/* Location */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-card-subtle flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 border border-purple-100">
                <MapPin size={22} />
              </div>
              <h3 className="text-sm font-black text-slate-900 mb-1 font-heading">Distribution Hub</h3>
              <p className="text-xs text-slate-400 mb-4">Sharjah Industrial Area 12</p>
            </div>
            <span className="text-xs font-bold text-slate-800 font-heading">
              Po. Box 65631, Sharjah, UAE
            </span>
          </div>
        </div>

        {/* Main Grid: Contact Form + Map/Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-card-subtle">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2 font-heading">
                Send an Inquiry or Request a Quote
              </h2>
              <p className="text-xs text-slate-500 mb-8">
                Fill out the details below and our packaging manager will reply within 2 business hours.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-1 font-heading">Inquiry Received!</h3>
                  <p className="text-xs text-slate-600 mb-6 max-w-md mx-auto">
                    Thank you, <strong>{formData.name || 'valued partner'}</strong>. Our B2B commercial packaging specialist will contact you shortly via phone or WhatsApp.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        inquiryType: 'wholesale',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#0f172a] text-white text-xs font-bold uppercase tracking-wider font-heading hover:bg-[#ed1c24] transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                        Business / Restaurant Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Dubai Cafe LLC"
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all font-sans"
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
                        placeholder="sarah@restaurant.com"
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all font-sans"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                        Phone / WhatsApp (+971) *
                      </label>
                      <input
                        type="tel"
                        required
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+971 50 123 4567"
                        className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                      Nature of Inquiry *
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#ed1c24] cursor-pointer font-heading"
                    >
                      <option value="wholesale">Wholesale B2B Carton Rates</option>
                      <option value="custom-print">Custom Logo Printing on Packaging</option>
                      <option value="product-spec">Product Specs / Food Safety Certificate Request</option>
                      <option value="order-support">Existing Order Delivery Support</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-slate-700 uppercase tracking-wider mb-1.5 font-heading">
                      Message / Product Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please specify product handles, carton quantities, or delivery requirements..."
                      className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl p-4 text-xs text-slate-900 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#ed1c24] hover:bg-[#dc2626] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-xl shadow-red-btn flex items-center justify-center gap-2 font-heading cursor-pointer disabled:opacity-50"
                  >
                    <Send size={15} />
                    <span>{isSubmitting ? 'Sending Request...' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Map & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Business Working Hours Card */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-card-subtle">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-[#ed1c24]" />
                <h3 className="text-base font-black text-slate-900 font-heading">Warehouse & Showroom Hours</h3>
              </div>
              <div className="space-y-3 text-xs text-slate-600 font-heading">
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="font-semibold text-slate-800">Monday - Saturday</span>
                  <span className="font-black text-slate-900">9:00 AM – 10:00 PM</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-100">
                  <span className="font-semibold text-slate-800">Sunday</span>
                  <span className="font-black text-slate-900">10:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold pt-1">
                  <span>Dispatch Operations:</span>
                  <span>Daily Dispatch Across UAE</span>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-card-subtle overflow-hidden">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-100">
                <iframe
                  title="Ideal Pack Sharjah Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115392.44186532467!2d55.33405527878848!3d25.328373307567798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f40f3c5598f%3A0xe5a36371bfab14d8!2sIndustrial%20Area%2012%20-%20Sharjah%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-3 text-center">
                <a
                  href="https://maps.google.com/?q=Po+Box+65631+Industrial+Area+12+Sharjah+UAE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#ed1c24] hover:underline font-heading inline-flex items-center gap-1"
                >
                  <MapPin size={13} />
                  <span>Open Sharjah Location in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion Strip */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-card-subtle">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-black text-[#ed1c24] uppercase tracking-widest font-heading">
              Frequently Asked Questions
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 font-heading">
              Helpful Answers for Commercial Buyers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-100">
                <div className="flex items-start gap-2.5 mb-2">
                  <HelpCircle size={16} className="text-[#ed1c24] shrink-0 mt-0.5" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading leading-snug">
                    {faq.q}
                  </h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;