import { useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Heart, Menu, ShoppingBag, User, X } from 'lucide-react';
import { useCart, useWishlist } from '../../context/CartContext';
import { categories, categoriesBySize, formatAED, getCategory, imageUrl, products } from '../../lib/catalog';
import { nav } from '../../data/site';
import { Eyebrow } from '../ui/SectionHeading';
import SearchBox from './SearchBox';

const PROMO_CATEGORIES = ['black-base-containers', 'aluminium-products', 'kraft-products'];

function CountBadge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -right-1 -top-1 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-red px-1 font-mono text-[10px] font-medium text-white">
      {count}
    </span>
  );
}

const iconLink = 'relative grid size-11 place-items-center rounded-md text-navy transition-colors hover:bg-mist';

function MegaMenu({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className="absolute inset-x-0 top-full z-40 border-t border-white/10 bg-white shadow-panel"
    >
      <div className="shell grid grid-cols-[1fr_280px] gap-8 py-6 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-3 flex items-center justify-between border-b border-navy/10 pb-3">
            <Eyebrow>Shop by category</Eyebrow>
            <Link to="/shop" onClick={onClose} className="group inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-blue hover:text-navy">
              Shop all {products.length} products
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 xl:grid-cols-3">
            {categoriesBySize.map((category) => (
              <Link key={category.handle} to={`/category/${category.handle}`} onClick={onClose} className="group/item flex items-center gap-3.5 rounded-lg p-2 transition-colors duration-200 hover:bg-mist">
                <span className="size-14 shrink-0 overflow-hidden rounded-md bg-mist transition-colors duration-200 group-hover/item:bg-white">
                  <img src={imageUrl(category.image, 160)} alt="" className="size-full scale-[1.3] object-contain mix-blend-multiply transition-transform duration-300 group-hover/item:scale-[1.45]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14.5px] font-semibold text-navy">{category.name}</span>
                  <span className="mt-0.5 block text-[12.5px] text-ink/65">{category.products_count} products</span>
                </span>
                <ArrowRight size={16} aria-hidden="true" className="mr-1 shrink-0 -translate-x-1 text-blue opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        <Link to="/contact?type=wholesale" onClick={onClose} className="group/promo flex flex-col overflow-hidden rounded-[10px] border border-navy/12 bg-white transition-colors duration-200 hover:border-blue/50">
          <div className="relative flex min-h-36 flex-1 items-center justify-center bg-mist px-3">
            <span className="absolute left-3 top-3 rounded-sm bg-navy px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-white">Wholesale</span>
            {PROMO_CATEGORIES.map((handle, index) => (
              <img
                key={handle}
                src={imageUrl(getCategory(handle).image, 280)}
                alt=""
                className={`object-contain mix-blend-multiply transition-transform duration-500 ease-out ${index === 1 ? 'z-10 size-32 group-hover/promo:scale-110' : 'size-24 group-hover/promo:scale-105'} ${index === 0 ? '-mr-5' : ''} ${index === 2 ? '-ml-5' : ''}`}
              />
            ))}
          </div>
          <div className="p-5">
            <p className="font-display text-[21px] font-bold leading-tight tracking-[-0.015em] text-navy">Buying by the carton?</p>
            <p className="mt-1 text-[13.5px] leading-snug text-ink/70">Get pricing for your business.</p>
            <span className="mt-4 flex h-11 items-center justify-center gap-2 rounded-md bg-red text-[14px] font-semibold text-white transition-colors duration-200 group-hover/promo:bg-navy">
              Get wholesale pricing <ArrowRight size={16} />
            </span>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

function MobileMenu({ onClose }) {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <>
      <motion.div className="fixed inset-0 z-50 bg-navy/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        onClick={(event) => event.target.closest('a') && onClose()}
        className="fixed inset-y-0 left-0 z-50 flex w-[86vw] max-w-sm flex-col bg-white"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.26 }}
      >
        <div className="flex h-16 items-center justify-between border-b border-navy/10 px-4">
          <img src="/logo-original.png" alt="Ideal Pack" className="h-8" />
          <button type="button" onClick={onClose} className={iconLink} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          {nav.map((item) =>
            item.mega ? (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => setShowCategories((current) => !current)}
                  aria-expanded={showCategories}
                  className="flex w-full items-center justify-between rounded-md px-3 py-3 text-[16px] font-semibold text-navy hover:bg-mist"
                >
                  {item.label}
                  <ChevronDown size={18} className={`transition-transform ${showCategories ? 'rotate-180' : ''}`} />
                </button>
                {showCategories && (
                  <div className="mb-1 ml-3 border-l border-navy/12 pl-2">
                    {categories.map((category) => (
                      <Link key={category.handle} to={`/category/${category.handle}`} className="flex justify-between rounded-md px-3 py-2.5 text-[14.5px] text-navy hover:bg-mist">
                        {category.name}
                        <span className="font-mono text-[12px] text-ink/60">{category.products_count}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.label} to={item.to} className="block rounded-md px-3 py-3 text-[16px] font-semibold text-navy hover:bg-mist">
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="grid grid-cols-2 gap-2 border-t border-navy/10 p-3">
          <Link to="/login" className="flex h-11 items-center justify-center gap-2 rounded-md border border-navy/20 text-sm font-semibold text-navy">
            <User size={16} /> Account
          </Link>
          <Link to="/wishlist" className="flex h-11 items-center justify-center gap-2 rounded-md border border-navy/20 text-sm font-semibold text-navy">
            <Heart size={16} /> Wishlist
          </Link>
        </div>
      </motion.aside>
    </>
  );
}

export default function Header() {
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { pathname } = useLocation();
  // Each menu remembers the page it was opened on, so navigating closes it.
  const [mobileOpenOn, setMobileOpenOn] = useState(null);
  const [megaOpenOn, setMegaOpenOn] = useState(null);
  const hover = useRef();
  const mobileOpen = mobileOpenOn === pathname;
  const megaOpen = megaOpenOn === pathname;
  const setMobileOpen = (next) => setMobileOpenOn(next ? pathname : null);
  const setMegaOpen = (next) => setMegaOpenOn(next ? pathname : null);

  const delayMega = (next) => {
    clearTimeout(hover.current);
    hover.current = setTimeout(() => setMegaOpen(next), next ? 200 : 260);
  };

  const navClass = ({ isActive }) =>
    `relative flex h-12 items-center gap-1 px-4 text-[14px] font-semibold transition-colors hover:bg-white/10 ${isActive ? 'bg-blue' : ''}`;

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-navy/10 bg-white">
        <div className="shell flex h-16 items-center gap-3 lg:h-[76px] lg:gap-8">
          <button type="button" className={`${iconLink} -ml-2 lg:hidden`} onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu size={23} />
          </button>

          <Link to="/" aria-label="Ideal Pack home" className="shrink-0 lg:-ml-8">
            <img src="/logo-original.png" alt="Ideal Pack, ideas for better packing" className="h-8 w-auto lg:h-11" />
          </Link>

          <SearchBox className="mx-auto hidden max-w-2xl flex-1 lg:block" />

          <div className="ml-auto flex items-center gap-0.5 lg:ml-0 lg:gap-1">
            <Link to="/login" className={`${iconLink} max-lg:hidden`} aria-label="Account">
              <User size={21} />
            </Link>
            <Link to="/wishlist" className={iconLink} aria-label={`Wishlist, ${wishlistCount} items`}>
              <Heart size={21} />
              <CountBadge count={wishlistCount} />
            </Link>
            <button type="button" onClick={() => setIsCartOpen(true)} className="relative ml-1 flex h-11 items-center gap-2.5 rounded-md text-white max-lg:w-11 max-lg:justify-center lg:bg-navy lg:px-4 lg:transition-colors lg:hover:bg-blue" aria-label={`Cart, ${totalItems} items`}>
              <ShoppingBag size={21} className="max-lg:text-navy" />
              <span className="hidden font-mono text-[13px] lg:inline">{formatAED(subtotal)}</span>
              <CountBadge count={totalItems} />
            </button>
          </div>
        </div>
        <div className="shell pb-2.5 lg:hidden">
          <SearchBox />
        </div>
      </div>

      <div className="on-dark relative z-30 hidden bg-navy text-white lg:block" onMouseLeave={() => delayMega(false)}>
        <nav className="shell flex items-center justify-between">
          <div className="flex">
            {nav.map((item) =>
              item.mega ? (
                <div key={item.label} onMouseEnter={() => delayMega(true)}>
                  <NavLink to={item.to} className={navClass} aria-haspopup="true" aria-expanded={megaOpen} onFocus={() => setMegaOpen(true)}>
                    {item.label}
                    <ChevronDown size={15} className={`transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
                  </NavLink>
                </div>
              ) : (
                <div key={item.label} onMouseEnter={() => delayMega(false)}>
                  <NavLink to={item.to} end={item.to === '/'} className={navClass}>
                    {item.label}
                  </NavLink>
                </div>
              ),
            )}
          </div>
          <Link to="/contact?type=wholesale" className="group flex items-center gap-1.5 text-[13.5px] font-semibold">
            Wholesale enquiry
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
        <AnimatePresence>{megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}</AnimatePresence>
      </div>

      <AnimatePresence>{mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}</AnimatePresence>
    </>
  );
}
