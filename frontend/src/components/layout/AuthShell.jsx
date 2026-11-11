import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info, Truck } from 'lucide-react';
import { categories, heroLineup, imageUrl, products } from '../../lib/catalog';
import { Eyebrow } from '../ui/SectionHeading';

const [main, left, right] = ['aluminium-products', 'black-base-containers', 'kraft-products'].map((handle) => heroLineup(handle, 1)[0]);

export function AuthNotice({ children }) {
  return (
    <p className="mb-6 flex items-start gap-2.5 rounded-lg bg-mist px-3.5 py-3 text-[13.5px] leading-snug text-navy">
      <Info size={17} className="mt-px shrink-0 text-blue" aria-hidden="true" />
      {children}
    </p>
  );
}

function Orbit({ product, className, delay }) {
  return (
    <motion.span
      className={`absolute grid place-items-center overflow-hidden rounded-full border-4 border-mist bg-white shadow-lift ${className}`}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <img src={imageUrl(product.image, 300)} alt="" className="size-[78%] scale-110 object-contain" />
    </motion.span>
  );
}

function Showcase() {
  return (
    <div className="relative hidden items-center justify-center overflow-hidden border-l border-navy/10 bg-white px-10 py-16 lg:flex">
      <div className="w-full max-w-md text-center">
        <Eyebrow className="justify-center">Ideas for better packing</Eyebrow>
        <p className="mx-auto mt-4 max-w-sm font-display text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-navy">
          Your packing list, saved and ready to reorder.
        </p>

        <div className="relative mx-auto mt-12 size-[340px] xl:size-[380px]" aria-hidden="true">
          <span className="absolute -inset-6 rounded-full border border-navy/10" />
          <span className="absolute inset-0 overflow-hidden rounded-full bg-white shadow-lift">
            <img src={imageUrl(main.image, 700)} alt="" className="absolute inset-[16%] size-[68%] scale-[1.3] object-contain" />
          </span>
          <Orbit product={left} className="-left-10 top-4 size-28" delay={0} />
          <Orbit product={right} className="-right-8 bottom-12 size-24" delay={1.2} />

          <span className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-lg bg-navy px-4 py-2.5 text-[13px] font-semibold text-white shadow-lift">
            {products.length} products · {categories.length} categories
          </span>
          <span className="absolute -right-12 top-6 flex items-center gap-2 whitespace-nowrap rounded-lg bg-white px-3.5 py-2.5 text-[12.5px] font-semibold text-navy shadow-lift">
            <Truck size={16} className="text-blue" />
            Free delivery over AED 200
          </span>
        </div>
      </div>
    </div>
  );
}

const tab = ({ isActive }) =>
  `flex h-10 items-center justify-center rounded-md text-[14px] font-semibold transition-colors ${isActive ? 'bg-white text-navy shadow-card' : 'text-ink/65 hover:text-navy'}`;

export default function AuthShell({ title, intro, tabs = true, children }) {
  return (
    <div className="grid border-b border-navy/10 lg:min-h-[calc(100vh-170px)] lg:grid-cols-2">
      <div className="flex items-center justify-center bg-white px-4 py-12 sm:px-8 lg:py-16">
        <div className="w-full max-w-[400px]">
          {tabs && (
            <nav className="mb-9 grid grid-cols-2 gap-1 rounded-lg bg-mist p-1" aria-label="Account">
              <NavLink to="/login" className={tab}>Sign in</NavLink>
              <NavLink to="/register" className={tab}>Create account</NavLink>
            </nav>
          )}
          <h1 className="text-[34px] font-bold leading-[1.1] sm:text-[40px]">{title}</h1>
          {intro && <p className="mt-2 text-[15.5px] text-ink/70">{intro}</p>}
          <div className="mt-7">{children}</div>
        </div>
      </div>
      <Showcase />
    </div>
  );
}
