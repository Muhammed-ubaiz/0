import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, MessageCircle, Truck, ShieldCheck, 
  Flame, Award, Clock, CheckCircle2, ChevronRight, Layers,
  PhoneCall, PackageCheck, Building2, Star, Quote, ThumbsUp, HeartHandshake
} from 'lucide-react';
import Hero from '../components/Hero';
import Category from '../components/Category';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Chef Omar Khalid',
    role: 'Operations Director',
    company: 'Dubai Marina Cloud Kitchens',
    city: 'Dubai',
    rating: 5,
    comment: 'Ideal Pack has supplied our 4 cloud kitchen branches for over 2 years. Their microwave black base containers never leak or deform during motorcycle transit, and stock delivery is 100% dependable.'
  },
  {
    id: 2,
    name: 'Fatima Al-Zahra',
    role: 'Head Baker & Founder',
    company: 'Sweet Bloom Artisanal Bakery',
    city: 'Sharjah',
    rating: 5,
    comment: 'As a bakery in Sharjah, consistent paper bag thickness and greaseproof baking paper are non-negotiable. Ideal Pack gives us direct manufacturer rates and next-morning dispatch every time.'
  },
  {
    id: 3,
    name: 'Rashed Al-Mansoor',
    role: 'Co-Founder',
    company: 'Urban Greens Cafe & Bowls',
    city: 'Abu Dhabi',
    rating: 5,
    comment: 'Switching to Ideal Pack’s biodegradable kraft salad bowls and crystal-clear smoothie cups boosted our delivery ratings significantly. Top-tier food safety certification you can trust.'
  },
  {
    id: 4,
    name: 'Vikram Sharma',
    role: 'Procurement Specialist',
    company: 'Royal Feast Catering LLC',
    city: 'Ajman & Dubai',
    rating: 5,
    comment: 'Wholesale carton rates on heavy-duty aluminium foil and steam table trays reduced our packaging overhead by 22%. Their team communicates seamlessly via WhatsApp whenever we need emergency stock.'
  }
];

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Filter products by selected tab
  const featuredProducts = activeTab === 'all'
    ? products.slice(0, 12)
    : products.filter(p => p.category === activeTab).slice(0, 12);

  // Best Sellers (first 8 high-demand packaging items)
  const bestSellers = products.slice(0, 8);

  // New arrivals section
  const newArrivals = products.slice(12, 20);

  return (
    <div className="bg-[#fafafa] pb-16 lg:pb-0">
      {/* 1. Promotional Hero Banner */}
      <Hero />

      {/* 2. Value Propositions Bar */}
      <section className="bg-white border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#ed1c24] flex items-center justify-center shrink-0 border border-red-200/60">
                <Truck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs font-heading">UAE-Wide Delivery</h4>
                <p className="text-slate-400 text-[11px]">Free delivery on orders AED 200+</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Award size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs font-heading">Direct Manufacturer Rates</h4>
                <p className="text-slate-400 text-[11px]">Wholesale savings on cartons</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs font-heading">100% Food Safe</h4>
                <p className="text-slate-400 text-[11px]">UAE Municipality certified</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                <Clock size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs font-heading">Quick 24-48h Dispatch</h4>
                <p className="text-slate-400 text-[11px]">From Sharjah distribution hub</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Shop by Categories Showcase */}
      <Category />

      {/* 4. Featured Products (With Filter Tabs) */}
      <section className="py-14 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-[#ed1c24] uppercase tracking-widest mb-1.5 font-heading">
              <Sparkles size={15} className="text-[#ed1c24]" />
              <span>Packaging Highlights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Featured Packaging Supplies
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar font-heading">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#ed1c24] text-white shadow-md shadow-red-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveTab('aluminium-products')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'aluminium-products'
                  ? 'bg-[#ed1c24] text-white shadow-md shadow-red-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Aluminium Foil & Trays
            </button>
            <button
              onClick={() => setActiveTab('paper-bags')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'paper-bags'
                  ? 'bg-[#ed1c24] text-white shadow-md shadow-red-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Paper Bags
            </button>
            <button
              onClick={() => setActiveTab('microwave-containers')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                activeTab === 'microwave-containers'
                  ? 'bg-[#ed1c24] text-white shadow-md shadow-red-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Microwave Containers
            </button>
          </div>
        </div>

        {/* 12-Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id || product.handle} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0f172a] hover:bg-[#ed1c24] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:shadow-xl hover:scale-105 font-heading cursor-pointer"
          >
            <span>Explore All 377+ Items in Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* 5. Best Sellers Showcase */}
      <section className="py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-[#ed1c24] uppercase tracking-widest mb-1.5 font-heading">
                <Flame size={15} className="text-[#ed1c24]" />
                <span>Most Ordered by UAE Kitchens</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
                Best Sellers & Top Essentials
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-slate-800 hover:text-[#ed1c24] flex items-center gap-1 group transition-colors font-heading"
            >
              <span>View All Best Sellers</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map(product => (
              <ProductCard key={`bestseller-${product.handle}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Custom Branding & Promotional Banner */}
      <section className="py-14 max-w-7xl mx-auto px-4">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xl">
          {/* Background geometric accents in brand red */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#ed1c24]/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-64 h-64 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ed1c24]/20 border border-[#ed1c24]/40 text-[#ed1c24] text-[11px] font-black uppercase tracking-wider mb-4 font-heading">
              <Sparkles size={13} />
              <span>Custom Logo Printing Available</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4 font-heading">
              Elevate Your Brand with Custom Food Packaging
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-8 max-w-xl">
              Get your restaurant, cloud kitchen, bakery or coffee shop logo custom printed on paper cups, burger boxes, kraft takeaway bags, and seal stickers. Low MOQs and competitive factory pricing across UAE.
            </p>

            <div className="flex flex-wrap items-center gap-4 font-heading">
              <a
                href="https://wa.me/971549910027?text=Hello%20Ideal%20Pack!%20I%20am%20interested%20in%20custom%20logo%20printing%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#ed1c24] hover:bg-[#dc2626] text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer shadow-red-btn"
              >
                <MessageCircle size={16} />
                <span>Request Custom Printing Quote</span>
              </a>

              <Link
                to="/categories"
                className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              >
                Browse Printable Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. New Arrivals Section */}
      <section className="py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-black text-[#ed1c24] uppercase tracking-widest mb-1.5 font-heading">
                <Sparkles size={14} />
                <span>Just Added to Inventory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
                New Arrivals & Essentials
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-slate-800 hover:text-[#ed1c24] flex items-center gap-1 group transition-colors font-heading"
            >
              <span>See All Products</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map(product => (
              <ProductCard key={`new-${product.handle}`} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Why Choose Us (Corporate Advantages) */}
      <section className="py-16 bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-[#ed1c24] font-heading">
              UAE's Trusted Supplier
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2 mb-3 text-white font-heading">
              Why Hundreds of Restaurants Partner With Ideal Pack
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Reliable stock levels, uncompromised hygiene standards, and rapid delivery right to your kitchen door.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#ed1c24]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 text-[#ed1c24] flex items-center justify-center mb-4">
                <Building2 size={24} />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-heading">Direct Factory Import</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                By bypassing middlemen, we guarantee wholesale warehouse pricing for restaurants, bakeries, cafes, and supermarkets across all 7 Emirates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#ed1c24]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <PackageCheck size={24} />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-heading">Food Safety Certified</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every container, cup, bowl, and wrap is certified by UAE regulatory bodies for high heat resistance, microwavability, and safe food contact.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#ed1c24]/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                <Truck size={24} />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-heading">Dedicated Fleet Delivery</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our distribution vehicles operate daily across Dubai, Sharjah, Ajman, and Abu Dhabi, ensuring your kitchen never runs out of stock during peak hours.
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-3xl font-black text-[#ed1c24] block font-heading">15+</span>
              <span className="text-xs text-slate-400 font-heading">Years in UAE Market</span>
            </div>
            <div>
              <span className="text-3xl font-black text-[#ed1c24] block font-heading">377+</span>
              <span className="text-xs text-slate-400 font-heading">Packaging SKUs in Stock</span>
            </div>
            <div>
              <span className="text-3xl font-black text-[#ed1c24] block font-heading">5,000+</span>
              <span className="text-xs text-slate-400 font-heading">Happy UAE Businesses</span>
            </div>
            <div>
              <span className="text-3xl font-black text-[#ed1c24] block font-heading">100%</span>
              <span className="text-xs text-slate-400 font-heading">Food-Grade Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Customer Testimonials */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#ed1c24] uppercase tracking-widest mb-1.5 font-heading">
            <ThumbsUp size={14} />
            <span>Verified UAE Client Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
            Trusted by Chefs, Bakers & Cloud Kitchens
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Read what hospitality leaders across Dubai, Abu Dhabi, and Sharjah say about Ideal Pack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl border border-slate-100 p-6 shadow-card-subtle flex flex-col justify-between hover:shadow-card-hover transition-all"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                <Quote size={20} className="text-slate-200 mb-2" />
                <p className="text-xs text-slate-600 leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 font-heading">
                <h4 className="text-xs font-black text-slate-900 leading-tight">
                  {t.name}
                </h4>
                <p className="text-[11px] text-slate-400 font-medium">
                  {t.role}, <span className="text-slate-600 font-bold">{t.company}</span>
                </p>
                <span className="inline-block mt-1 text-[10px] font-bold text-[#ed1c24] bg-red-50 px-2 py-0.5 rounded-full">
                  📍 {t.city}, UAE
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;