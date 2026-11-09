import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Sparkles, Truck, Award } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: 'https://idealpackstore.com/cdn/shop/files/web_banner_1500x700_2fe3724b-7eb8-4df8-b8c4-5ec57eee5d66.webp',
    tag: 'UAE Premier Food Packaging Supplier',
    title: 'Packaging Supplies Crafted for Quality & Freshness',
    subtitle: 'From heavy-duty aluminium foil & microwave black base containers to eco-friendly paper tableware. Fast dispatch to all 7 Emirates.',
    primaryBtn: { text: 'Shop All 377+ Products', link: '/products' },
    secondaryBtn: { text: 'Wholesale B2B Pricing', link: '/products?category=aluminium-products' }
  },
  {
    id: 2,
    image: 'https://idealpackstore.com/cdn/shop/files/web_banner_02_1500x700_30933d53-3392-449a-b516-5b65fe246af6.webp',
    tag: 'Custom Branding & Logo Printing',
    title: 'Your Brand Identity on Every Package',
    subtitle: 'Elevate your restaurant, cafe or bakery with custom logo printing on cups, burger boxes, and bags. High quality, low MOQ, direct delivery.',
    primaryBtn: { text: 'Explore Catalog', link: '/products' },
    secondaryBtn: { text: 'Contact Our Team', link: '/checkout' }
  }
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative w-full bg-[#0b1320] overflow-hidden">
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((slide) => (
          <div 
            key={slide.id} 
            className="w-full shrink-0 relative min-h-[460px] sm:min-h-[520px] lg:min-h-[590px] flex items-center"
          >
            {/* Ambient Dark Background Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b1320] via-[#0b1320]/85 to-transparent" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-20 w-full">
              <div className="max-w-2xl text-white">
                {/* Floating Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ed1c24]/20 border border-[#ed1c24]/40 text-[#ed1c24] text-[11px] font-black uppercase tracking-wider mb-5 backdrop-blur-md animate-fade-in-up font-heading">
                  <Sparkles size={14} className="text-[#ed1c24]" />
                  <span>{slide.tag}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight mb-4 tracking-tight font-heading">
                  {slide.title}
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-xl font-normal">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 mb-10 font-heading">
                  <Link
                    to={slide.primaryBtn.link}
                    className="px-8 py-4 rounded-full bg-[#ed1c24] hover:bg-[#dc2626] text-white text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 cursor-pointer shadow-red-btn"
                  >
                    <span>{slide.primaryBtn.text}</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    to={slide.secondaryBtn.link}
                    className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider border border-white/20 backdrop-blur-md transition-all duration-300 cursor-pointer"
                  >
                    {slide.secondaryBtn.text}
                  </Link>
                </div>

                {/* Trust Mini Stats */}
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-xs text-slate-300 font-heading font-medium">
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-[#ed1c24]" />
                    <span>Free Shipping over AED 200</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[#ed1c24]" />
                    <span>100% UAE Food Safe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-[#ed1c24]" />
                    <span>Manufacturer Direct Rates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              current === i ? 'w-10 bg-[#ed1c24]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
