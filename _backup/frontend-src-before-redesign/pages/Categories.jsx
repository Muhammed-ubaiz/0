import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Sparkles, Layers, Box, Package, ShieldCheck, 
  Search, CheckCircle2, ChevronRight, Home, Building2, MessageCircle
} from 'lucide-react';
import { categories, products } from '../data/products';

const CATEGORY_DESCRIPTIONS = {
  'aluminium-products': 'Premium heavy-duty aluminium foil rolls, takeout containers, platters, and baking dishes designed for high heat tolerance and optimal thermal retention.',
  'black-base-containers': 'Sleek, microwavable black base food containers with tight anti-fog clear lids. The #1 industry standard for delivery kitchens and gourmet meal prep.',
  'clear-containers': 'Ultra-clear PET and PP salad bowls, deli containers, and hinged boxes that showcase the fresh colors of salads, desserts, and cold snacks.',
  'kraft-products': 'Eco-responsible brown kraft lunch boxes, salad bowls with PE lining, burger clamshells, and boat trays for sustainable food service.',
  'paper-products': 'Heavy-duty single and double-wall hot coffee cups, cold ripple cups, paper bowls, soup cups, and food-grade paper straws.',
  'paper-bags': 'Twisted handle and flat-handle kraft takeaway shopping bags, SOS grocery bags, and bakery pouches. Perfect for custom logo printing.',
  'clear-cups': 'Crystal-clear PET smoothie, iced coffee, boba, and juice cups with matching flat or dome lids. Leak-resistant snap fit.',
  'cutlery': 'Hygienically wrapped cutlery packs, heavyweight PS forks, knives, spoons, and biodegradable wooden tableware for dining on the go.',
  'baking-paper': 'Silicon-coated greaseproof baking paper rolls and pre-cut sheets preventing sticking in commercial ovens and bakery pans.',
  'cling-film': 'Commercial-grade PVC and PE food wrap cling film with slide cutters for airtight freshness sealing in busy kitchens.',
  'sauce-cups': 'Portion cups from 0.75oz to 4oz with airtight snap-on lids for dressings, condiments, dips, and gourmet sauces.',
  'wooden-products': '100% natural, biodegradable birchwood forks, spoons, knives, stirrers, and skewers for eco-conscious events and cafes.'
};

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (CATEGORY_DESCRIPTIONS[cat.handle] && CATEGORY_DESCRIPTIONS[cat.handle].toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          <span className="text-slate-800 font-bold">Packaging Collections</span>
        </nav>

        {/* Page Banner Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-card-subtle mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#ed1c24] uppercase tracking-wider mb-2.5 font-heading">
                <Sparkles size={14} />
                <span>Ideal Pack Comprehensive Portfolio</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
                Packaging Lines & Categories
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-2 leading-relaxed">
                Discover 12 specialized packaging categories precision-engineered for restaurants, cloud kitchens, bakeries, cafes, and hospitality businesses across UAE.
              </p>
            </div>

            {/* Quick Search */}
            <div className="w-full md:w-80">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter categories (e.g. foil, cups)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f8fafc] text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#ed1c24] focus:bg-white transition-all font-sans"
                />
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 12 Category Detailed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCategories.map((cat, idx) => {
            const catProducts = products.filter(p => p.category === cat.handle).slice(0, 3);
            const description = CATEGORY_DESCRIPTIONS[cat.handle] || 'Premium food-safe packaging designed for professional commercial food service.';

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="bg-white rounded-3xl border border-slate-100 hover:border-red-200 p-6 flex flex-col justify-between shadow-card-subtle hover:shadow-card-hover transition-all duration-300 group"
              >
                <div>
                  {/* Top: Image + Count */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="w-24 h-24 rounded-2xl bg-[#f8fafc] border border-slate-100 p-3 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider font-heading border border-red-200/50">
                      {cat.products_count} Products
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#ed1c24] transition-colors mb-2 font-heading">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-3">
                    {description}
                  </p>

                  {/* Sample Items in This Category */}
                  {catProducts.length > 0 && (
                    <div className="pt-4 border-t border-slate-100 mb-6">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2 font-heading">
                        Popular Items in Collection:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700 font-heading">
                        {catProducts.map(p => (
                          <li key={p.handle} className="truncate flex items-center gap-1.5 text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ed1c24]" />
                            <span className="truncate">{p.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card CTA */}
                <Link
                  to={`/products?category=${cat.handle}`}
                  className="w-full py-3 px-4 rounded-xl bg-[#0f172a] group-hover:bg-[#ed1c24] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-heading shadow-xs cursor-pointer"
                >
                  <span>Explore {cat.name}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Wholesale B2B Custom Packaging Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-8 sm:p-12 overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-[#ed1c24] border border-[#ed1c24]/30 text-xs font-black uppercase tracking-wider mb-4 font-heading">
              <Building2 size={13} />
              <span>Bulk Commercial Inquiries</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3 font-heading">
              Need Custom Sizing or Branded Packaging?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Ideal Pack supplies hundreds of UAE hospitality brands with customized carton sizes, bespoke cup dimensions, and private logo printing. Talk directly to our packaging specialists.
            </p>
            <div className="flex flex-wrap items-center gap-3 font-heading">
              <a
                href="https://wa.me/971549910027?text=Hello%20Ideal%20Pack!%20I%20would%20like%20to%20discuss%20custom%20bulk%20packaging."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#ed1c24] hover:bg-[#dc2626] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-red-btn"
              >
                <MessageCircle size={16} />
                <span>Chat with Wholesale Specialist</span>
              </a>
              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/20 transition-all"
              >
                Submit B2B Inquiry
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;