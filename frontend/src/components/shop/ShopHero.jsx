import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Search, Truck } from 'lucide-react';
import { categories, formatAED, products } from '../../lib/catalog';
import Button from '../ui/Button';

// Each of these returns real products in the current catalogue.
const POPULAR = ['Aluminium container', 'Paper cup', 'Black base', 'Kraft bowl', '500 ml'];
const LOWEST_PRICE = Math.min(...products.map((product) => product.price));

/** The shop page hero, in the same centred style as the home page hero. */
export default function ShopHero({ onShop }) {
  const navigate = useNavigate();
  const still = useReducedMotion();
  const [query, setQuery] = useState('');
  const go = (term) => navigate(`/shop?q=${encodeURIComponent(term)}`);

  const enter = (delay) => ({
    initial: still ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] },
  });

  return (
    <section className="relative overflow-hidden bg-white lg:flex lg:min-h-[calc(100svh-210px)] lg:items-center">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(25_41_87/0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
        aria-hidden="true"
      />

      <div className="shell relative w-full pb-12 pt-8 text-center lg:py-12">
        <motion.p {...enter(0)} className="inline-flex items-center gap-2 rounded-full bg-navy py-1.5 pl-2 pr-4 text-[13px] font-semibold text-white">
          <span className="grid size-6 place-items-center rounded-full bg-white/15">
            <Truck size={14} aria-hidden="true" />
          </span>
          Free UAE delivery on orders over AED 200
        </motion.p>

        <motion.h1 {...enter(0.06)} className="mx-auto mt-5 max-w-4xl text-[40px] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-[54px] lg:text-[64px]">
          Every pack your kitchen needs, in{' '}
          <span className="relative inline-block text-blue">
            one shop
            <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-red sm:-bottom-2 sm:h-[6px]" aria-hidden="true" />
          </span>
          .
        </motion.h1>

        <motion.p {...enter(0.12)} className="mx-auto mt-4 max-w-2xl text-[16.5px] leading-relaxed text-ink/70 sm:text-[17px]">
          {products.length} products across {categories.length} categories, from {formatAED(LOWEST_PRICE)} a pack. Search by name, size or material.
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
            aria-label="Search the shop"
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
          <Button variant="red" size="lg" className="rounded-full px-7" onClick={onShop}>
            Browse all products <ArrowDown size={18} />
          </Button>
          <Button to="/contact?type=wholesale" variant="outline" size="lg" className="rounded-full px-7">
            Wholesale enquiry
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
