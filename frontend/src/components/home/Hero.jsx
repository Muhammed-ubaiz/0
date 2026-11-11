import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Box, Coffee, CookingPot, Disc, GlassWater, Layers, Leaf, Package, Search, ShoppingBag, Sparkles, SprayCan, Trash2, Truck,
} from 'lucide-react';
import { categoriesBySize, products } from '../../lib/catalog';
import Button from '../ui/Button';

// Each of these returns real products in the current catalogue.
const POPULAR = ['Aluminium container', 'Paper cup', 'Black base', 'Kraft bowl', '500 ml'];

const ICONS = {
  'aluminium-products': CookingPot,
  'black-base-containers': Box,
  'cleaning-tools': SprayCan,
  'clear-containers': GlassWater,
  'eco-friendly-products': Leaf,
  'foam-products': Disc,
  'ideal-care-products': Sparkles,
  'kraft-products': ShoppingBag,
  'paper-products': Coffee,
  'plastic-products': Package,
  'plastic-roll-bags': Trash2,
  'tissue-products': Layers,
};

const enter = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] },
});

function CategoryMarquee() {
  // The list is doubled so the strip can loop without a visible seam.
  const loop = [...categoriesBySize, ...categoriesBySize];

  return (
    <div className="marquee-pause relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul className="animate-marquee flex w-max gap-3">
        {loop.map((category, index) => {
          const Icon = ICONS[category.handle] ?? Package;
          return (
            <li key={`${category.handle}-${index}`} aria-hidden={index >= categoriesBySize.length || undefined}>
              <Link
                to={`/category/${category.handle}`}
                tabIndex={index >= categoriesBySize.length ? -1 : undefined}
                className="group flex items-center gap-3 rounded-2xl border border-navy/10 bg-white py-3 pl-3 pr-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-lift"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-navy text-white transition-colors duration-300 group-hover:bg-blue">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block whitespace-nowrap text-[14.5px] font-bold text-navy">{category.name}</span>
                  <span className="block text-[12.5px] text-ink/60">{category.products_count} products</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const go = (term) => navigate(`/shop?q=${encodeURIComponent(term)}`);

  return (
    <section className="relative overflow-hidden bg-white lg:flex lg:min-h-[calc(100svh-168px)] lg:items-center">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(25_41_87/0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="shell relative w-full pb-10 pt-8 text-center lg:py-10">
        <motion.p {...enter(0)} className="inline-flex items-center gap-2 rounded-full bg-navy py-1.5 pl-2 pr-4 text-[13px] font-semibold text-white">
          <span className="grid size-6 place-items-center rounded-full bg-white/15">
            <Truck size={14} aria-hidden="true" />
          </span>
          Free UAE delivery on orders over AED 200
        </motion.p>

        <motion.h1 {...enter(0.06)} className="mx-auto mt-5 max-w-4xl text-[40px] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-[54px] lg:text-[64px]">
          Packaging that works as{' '}
          <span className="relative inline-block text-blue">
            hard
            <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-red sm:-bottom-2 sm:h-[6px]" aria-hidden="true" />
          </span>{' '}
          as your kitchen.
        </motion.h1>

        <motion.p {...enter(0.12)} className="mx-auto mt-4 max-w-2xl text-[16.5px] leading-relaxed text-ink/70 sm:text-[17px]">
          {products.length} packaging products, from aluminium trays to kraft bowls, stocked in Sharjah and delivered across the UAE.
        </motion.p>

        <motion.form
          {...enter(0.18)}
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            if (query.trim()) go(query.trim());
          }}
          className="mx-auto mt-7 flex h-14 max-w-2xl items-center rounded-full border border-navy/15 bg-white pl-5 shadow-lift transition-colors focus-within:border-blue"
        >
          <Search size={20} className="shrink-0 text-blue" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search containers, cups, foil, sizes…"
            aria-label="Search products"
            className="h-full min-w-0 flex-1 bg-transparent px-3 text-[16px] outline-none placeholder:text-ink/40"
          />
          <button type="submit" className="m-1.5 h-11 shrink-0 rounded-full bg-blue px-6 text-[15px] font-semibold text-white transition-colors hover:bg-navy">
            Search
          </button>
        </motion.form>

        <motion.div {...enter(0.22)} className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[13.5px]">
          <span className="text-ink/55">Popular:</span>
          {POPULAR.map((term) => (
            <button key={term} type="button" onClick={() => go(term)} className="rounded-full px-2.5 py-1 font-medium text-navy underline-offset-4 transition-colors hover:bg-navy/5 hover:underline">
              {term}
            </button>
          ))}
        </motion.div>

        <motion.div {...enter(0.26)} className="mt-6 flex flex-wrap justify-center gap-3">
          <Button to="/shop" variant="red" size="lg" className="rounded-full px-7">
            Shop all products <ArrowRight size={18} />
          </Button>
          <Button to="/contact?type=wholesale" variant="outline" size="lg" className="rounded-full px-7">
            Wholesale enquiry
          </Button>
        </motion.div>
      </div>

    </section>
  );
}

/** The moving category band, shown as its own section below the hero. */
export function CategoryStrip() {
  return (
    <section className="border-y border-navy/10 bg-white py-6 lg:py-8" aria-label="Product categories">
      <CategoryMarquee />
    </section>
  );
}
