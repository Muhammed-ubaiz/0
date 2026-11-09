import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatAED, getCategory, heroLineup, imageUrl, productSpecs } from '../../lib/catalog';
import Button from '../ui/Button';
import { Eyebrow } from '../ui/SectionHeading';

const STEP_MS = 3000;

// Zoom offsets the empty margin built into each product photo.
const RANGES = [
  { handle: 'aluminium-products', short: 'Aluminium', zoom: 'scale-[1.25]' },
  { handle: 'black-base-containers', short: 'Black Base', zoom: 'scale-[1.2]' },
  { handle: 'kraft-products', short: 'Kraft', zoom: 'scale-100' },
  { handle: 'clear-containers', short: 'Clear', zoom: 'scale-100' },
].map((range) => ({ ...range, category: getCategory(range.handle), products: heroLineup(range.handle) }));

const LINEUP = RANGES.flatMap((range, rangeIndex) =>
  range.products.map((product, step) => ({ product, zoom: range.zoom, category: range.category, rangeIndex, step })),
);

function Stage({ item, onPause }) {
  const { product, category, zoom } = item;
  const spec = productSpecs(product).capacity;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[470px]">
      <div className="absolute -inset-[7%] rounded-full border border-navy/10" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden rounded-full bg-white shadow-lift">
        <AnimatePresence initial={false}>
          <motion.img
            key={product.handle}
            src={imageUrl(product.image, 900)}
            alt={product.title}
            initial={{ opacity: 0, x: '55%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-55%' }}
            transition={{ duration: 0.6, ease: [0.3, 0.7, 0.2, 1] }}
            className={`absolute inset-[14%] size-[72%] object-contain ${zoom}`}
          />
        </AnimatePresence>
      </div>
      <div
        className="absolute bottom-[4%] left-0 sm:-left-[6%]"
        onMouseEnter={() => onPause(true)}
        onMouseLeave={() => onPause(false)}
        onFocus={() => onPause(true)}
        onBlur={() => onPause(false)}
      >
        <motion.div key={product.handle} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.15 }}>
          <Link to={`/product/${product.handle}`} className="group on-dark flex items-center gap-4 rounded-lg bg-navy py-3 pl-4 pr-3 text-white shadow-lift transition-colors duration-200 hover:bg-blue">
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-white/75">{spec ? `${category.name} · ${spec}` : category.name}</span>
              <span className="mt-0.5 block font-display text-lg font-bold">{formatAED(product.price)}</span>
            </span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function RangeProgress({ item, count, moving }) {
  const from = item.step / count;
  const to = (item.step + 1) / count;
  return moving ? (
    <motion.span key={item.product.handle} className="block h-full origin-left bg-blue" initial={{ scaleX: from }} animate={{ scaleX: to }} transition={{ duration: STEP_MS / 1000, ease: 'linear' }} />
  ) : (
    <span className="block h-full origin-left bg-blue" style={{ transform: `scaleX(${to})` }} />
  );
}

export default function Hero() {
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const moving = !paused && !reduceMotion;
  const item = LINEUP[position];

  useEffect(() => {
    // Load the next photo early so it never slides in blank.
    new Image().src = imageUrl(LINEUP[(position + 1) % LINEUP.length].product.image, 900);
    if (!moving) return undefined;
    const timer = setTimeout(() => setPosition((current) => (current + 1) % LINEUP.length), STEP_MS);
    return () => clearTimeout(timer);
  }, [position, moving]);

  return (
    <section className="overflow-hidden bg-mist">
      <div className="shell grid items-center gap-12 py-12 lg:min-h-[540px] lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:py-14">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <Eyebrow>Ideas for better packing</Eyebrow>
          <h1 className="mt-5 text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-6xl xl:text-[72px]">
            Packaging that works as hard as your kitchen.
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink/75">
            Aluminium, black base, clear, kraft and paper packaging, stocked in Sharjah and delivered to restaurants, caterers and homes across the UAE.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/shop" variant="red" size="lg">
              Shop all products <ArrowRight size={18} />
            </Button>
            <Button to="/contact?type=wholesale" variant="outline" size="lg" className="bg-white">
              Wholesale enquiry
            </Button>
          </div>
        </motion.div>

        <Stage item={item} onPause={setPaused} />
      </div>

      <div className="border-t border-navy/10 bg-white">
        <div className="shell grid grid-cols-2 lg:grid-cols-4" role="group" aria-label="Choose a product range">
          {RANGES.map((range, index) => {
            const isActive = index === item.rangeIndex;
            return (
              <button
                key={range.handle}
                type="button"
                onClick={() => setPosition(LINEUP.findIndex((entry) => entry.rangeIndex === index))}
                aria-pressed={isActive}
                className="relative flex items-center gap-3 py-3.5 text-left transition-colors hover:bg-mist/60 sm:px-3 lg:py-4"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 bg-navy/10" aria-hidden="true">
                  {isActive && <RangeProgress item={item} count={range.products.length} moving={moving} />}
                </span>
                <img src={imageUrl(range.category.image, 112)} alt="" className="size-11 shrink-0 scale-125 object-contain" />
                <span className="min-w-0">
                  <span className={`block truncate text-[15px] font-semibold ${isActive ? 'text-navy' : 'text-ink/75'}`}>{range.short}</span>
                  <span className="block text-[12.5px] text-ink/65">{range.category.products_count} products</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
