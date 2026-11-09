import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { categories } from '../data/products';

const Category = () => {
  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black text-[#ed1c24] uppercase tracking-widest mb-1.5 font-heading">
              <Sparkles size={14} />
              <span>Packaging Lines</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
              Browse by Product Category
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-slate-800 hover:text-[#ed1c24] flex items-center gap-1 group transition-colors font-heading"
          >
            <span>View All 12 Collections</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 12 Modern Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.handle}`}
              className="group relative flex flex-col items-center p-4 rounded-2xl bg-[#f8fafc] hover:bg-white border border-slate-100 hover:border-red-200 hover:shadow-card-hover transition-all duration-300 text-center overflow-hidden"
            >
              {/* Category Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white shadow-xs p-2 mb-3.5 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300 border border-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>

              {/* Title */}
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#ed1c24] transition-colors leading-snug mb-1 line-clamp-1 font-heading">
                {cat.name}
              </h3>

              {/* Count Badge */}
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#ed1c24] bg-white group-hover:bg-red-50 px-2 py-0.5 rounded-full border border-slate-200/60 group-hover:border-red-200 transition-colors font-heading">
                {cat.products_count} Items
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
