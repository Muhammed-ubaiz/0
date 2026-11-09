import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, ShieldCheck, Truck, Award, Sparkles, CheckCircle2, 
  MapPin, Phone, Mail, MessageCircle, ArrowRight, Home, ChevronRight,
  Leaf, Users, Clock, Globe
} from 'lucide-react';

const STATS = [
  { value: '15+', label: 'Years Serving UAE Food Service' },
  { value: '377+', label: 'Certified Packaging SKU Lines' },
  { value: '5,000+', label: 'Restaurants, Cafes & Cloud Kitchens' },
  { value: '24-48h', label: 'Average Dispatch Across All 7 Emirates' }
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: '100% Certified Food Grade',
    description: 'All aluminium containers, microwave bowls, kraft trays, and drinkware comply strictly with UAE Municipality and ESMA standards for hygienic food contact.'
  },
  {
    icon: Award,
    title: 'Manufacturer-Direct Rates',
    description: 'We cut out middlemen to bring factory-direct pricing to small cafeterias, multi-branch restaurant chains, and large corporate catering establishments.'
  },
  {
    icon: Leaf,
    title: 'Sustainable Packaging Innovation',
    description: 'Pioneering eco-friendly kraft paper, biodegradable wooden cutlery, and recyclable aluminium solutions to minimize the UAE hospitality carbon footprint.'
  },
  {
    icon: Truck,
    title: 'Dedicated Fleet Distribution',
    description: 'Operating our own logistics fleet daily from Sharjah Industrial Area 12, ensuring kitchens in Dubai, Abu Dhabi, and Northern Emirates never run out of supplies.'
  }
];

const AboutUs = () => {
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
          <span className="text-slate-800 font-bold">About Ideal Pack</span>
        </nav>

        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white rounded-3xl p-8 sm:p-14 lg:p-16 mb-12 overflow-hidden shadow-xl"
        >
          {/* Subtle Ambient Red Light */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#ed1c24]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ed1c24]/20 border border-[#ed1c24]/40 text-[#ed1c24] text-[11px] font-black uppercase tracking-wider mb-5 font-heading">
              <Sparkles size={14} />
              <span>IDEAS FOR BETTER PACKING</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6 font-heading tracking-tight">
              Powering the UAE Food Service Industry with Modern Packaging
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8 max-w-2xl">
              Ideal Pack is a premier packaging supplier headquartered in Sharjah, United Arab Emirates. We engineer and distribute high-performance food containers, eco-friendly kraft tableware, and custom-branded packaging to thousands of UAE culinary establishments.
            </p>

            <div className="flex flex-wrap items-center gap-3 font-heading">
              <Link
                to="/products"
                className="px-8 py-4 rounded-full bg-[#ed1c24] hover:bg-[#dc2626] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-red-btn flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Full Catalog</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                to="/contact"
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              >
                Contact Our Sharjah Hub
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Key Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-card-subtle"
            >
              <span className="text-3xl sm:text-4xl font-black text-[#ed1c24] block mb-1 font-heading">
                {stat.value}
              </span>
              <span className="text-xs text-slate-500 font-medium font-heading">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Company Mission & Story */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 mb-14 shadow-card-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs font-black text-[#ed1c24] uppercase tracking-widest block mb-2 font-heading">
                Our Heritage & Mission
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-4 font-heading">
                Engineered for Peak Commercial Performance
              </h2>
              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                <p>
                  Established to serve the vibrant, fast-evolving UAE culinary landscape, <strong>Ideal Pack Store</strong> has grown into an indispensable partner for cloud kitchens, restaurant groups, hotels, and retail outlets.
                </p>
                <p>
                  We understand that food packaging is not merely a container—it is the direct touchpoint between your culinary craft and your customer. It protects meal temperature, prevents leaks during courier transit, and carries your brand identity into homes and offices across the Emirates.
                </p>
                <p>
                  From our modern distribution center in Sharjah Industrial Area 12, we manage over 377 packaging lines with high-volume stock readiness, guaranteeing uninterrupted daily fulfillment.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-700 font-bold font-heading">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>Sharjah Municipality Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>ISO 9001 Compliant Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  <span>HACCP Food Safety Standards</span>
                </div>
              </div>
            </div>

            {/* Visual Showcase Card */}
            <div className="relative rounded-2xl bg-[#f8fafc] border border-slate-100 p-8 flex flex-col justify-center items-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-red-50 text-[#ed1c24] flex items-center justify-center mb-6 shadow-sm border border-red-200/50">
                <Building2 size={36} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2 font-heading">
                Sharjah Logistics & Distribution Hub
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed">
                Po. Box 65631, Industrial Area 12, Sharjah, UAE. Direct commercial pickup, warehouse visits, and custom branding consultations available.
              </p>
              <div className="flex items-center gap-4 text-xs font-bold font-heading">
                <a
                  href="tel:+97165642072"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-[#ed1c24] transition-colors"
                >
                  <Phone size={14} className="text-[#ed1c24]" />
                  <span>(+971) 656 420 72</span>
                </a>
                <span className="text-slate-300">|</span>
                <a
                  href="mailto:Info@idealpackstore.com"
                  className="flex items-center gap-1.5 text-slate-700 hover:text-[#ed1c24] transition-colors"
                >
                  <Mail size={14} className="text-[#ed1c24]" />
                  <span>Info@idealpackstore.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="mb-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black text-[#ed1c24] uppercase tracking-widest font-heading">
              Why Ideal Pack Stands Apart
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1 font-heading">
              The Four Pillars of Our Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-white rounded-3xl border border-slate-100 p-6 shadow-card-subtle hover:shadow-card-hover transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#ed1c24] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-red-200/50">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mb-2 font-heading">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Printing CTA Box */}
        <div className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 shadow-card-subtle flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-black text-[#ed1c24] uppercase tracking-wider block mb-1 font-heading">
              Bespoke Branding Solutions
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2 font-heading">
              Put Your Logo on UAE's Most Reliable Food Packaging
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We offer full-color Pantone printing, foil stamping, and embossed logos on paper cups, kraft delivery bags, and takeout boxes. Low minimum order quantities.
            </p>
          </div>

          <a
            href="https://wa.me/971549910027?text=Hello%20Ideal%20Pack!%20I%20would%20like%20to%20inquire%20about%20custom%20branding."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-[#ed1c24] hover:bg-[#dc2626] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-red-btn shrink-0 flex items-center gap-2 font-heading cursor-pointer"
          >
            <MessageCircle size={16} />
            <span>Chat on WhatsApp (+971 54 991 0027)</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;