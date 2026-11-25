import { useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, PackageSearch, Search, SlidersHorizontal, X } from 'lucide-react';
import { categories, formatAED, products, searchProducts } from '../../lib/catalog';
import ProductGrid from '../product/ProductGrid';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';

const PAGE_SIZE = 24;

const SORTS = [
  ['featured', 'Featured'],
  ['price-asc', 'Price: low to high'],
  ['price-desc', 'Price: high to low'],
  ['title-asc', 'Name: A to Z'],
];

const SORTERS = {
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'title-asc': (a, b) => a.title.localeCompare(b.title),
};

// Most products are cheap, so the slider uses a squared scale: fine steps at the low end.
const PRICE_CEILING = Math.ceil(Math.max(...products.map((product) => product.price)) / 10) * 10;
const STEPS = 1000;
const toPosition = (price) => Math.round(Math.sqrt(Math.min(price, PRICE_CEILING) / PRICE_CEILING) * STEPS);
const toPrice = (position) => Math.round(PRICE_CEILING * (position / STEPS) ** 2);

function PriceSlider({ min, max, update }) {
  const low = min === '' ? 0 : toPosition(Number(min));
  const high = max === '' ? STEPS : toPosition(Number(max));
  const lowPrice = min === '' ? 0 : Number(min);
  const highPrice = max === '' ? PRICE_CEILING : Number(max);

  const setLow = (position) => {
    const next = Math.min(position, high - 20);
    update({ min: next <= 0 ? '' : String(toPrice(next)) });
  };
  const setHigh = (position) => {
    const next = Math.max(position, low + 20);
    update({ max: next >= STEPS ? '' : String(toPrice(next)) });
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[13px] font-semibold text-navy">
        <span>{formatAED(lowPrice)}</span>
        <span className="text-ink/40">–</span>
        <span>{max === '' ? `${formatAED(PRICE_CEILING)}+` : formatAED(highPrice)}</span>
      </div>
      <div className="price-range relative h-5">
        <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-mist" aria-hidden="true" />
        <span className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-blue" style={{ left: `${(low / STEPS) * 100}%`, right: `${100 - (high / STEPS) * 100}%` }} aria-hidden="true" />
        <input type="range" min="0" max={STEPS} value={low} onChange={(event) => setLow(Number(event.target.value))} aria-label="Minimum price" aria-valuetext={formatAED(lowPrice)} />
        <input type="range" min="0" max={STEPS} value={high} onChange={(event) => setHigh(Number(event.target.value))} aria-label="Maximum price" aria-valuetext={formatAED(highPrice)} />
      </div>
    </div>
  );
}

const PRICE_RANGES = [
  ['Under 10', '', '10'],
  ['10 – 50', '10', '50'],
  ['50 – 100', '50', '100'],
  ['100+', '100', ''],
];

function FilterSection({ title, children }) {
  return (
    <div className="border-t border-navy/10 px-4 py-4 first:border-t-0">
      <h3 className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-ink/55">{title}</h3>
      {children}
    </div>
  );
}

function Filters({ params, update, lockedCategory, boxed = false }) {
  const activeCategory = lockedCategory ?? params.get('category');
  const min = params.get('min') ?? '';
  const max = params.get('max') ?? '';
  const hasPrice = Boolean(min || max);

  const row = (active) =>
    `relative flex items-center justify-between gap-2 rounded-lg py-[7px] pl-3 pr-2 text-[13.5px] transition-colors ${
      active ? 'bg-mist font-semibold text-navy before:absolute before:inset-y-1.5 before:left-0 before:w-[3px] before:rounded-full before:bg-blue' : 'text-ink/80 hover:bg-mist/60 hover:text-navy'
    }`;
  const count = (active) => `shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium tabular-nums ${active ? 'bg-white text-navy' : 'bg-mist text-ink/60'}`;
  const priceInput = 'h-10 w-full rounded-lg border border-navy/15 bg-white pl-11 pr-2 text-[13.5px] text-ink placeholder:text-ink/40 hover:border-navy/30 focus:border-blue';

  return (
    <div className={boxed ? 'overflow-hidden rounded-xl border border-navy/10 bg-white shadow-card' : ''}>
      {boxed && (
        <div className="flex items-center justify-between border-b border-navy/10 px-4 py-3">
          <span className="text-[15px] font-bold text-navy">Filters</span>
          {(hasPrice || activeCategory) && !lockedCategory && (
            <Link to="/shop" className="text-[12.5px] font-semibold text-blue hover:text-navy">Clear all</Link>
          )}
        </div>
      )}

      <FilterSection title="Price">
        <PriceSlider min={min} max={max} update={update} />
        <div className="mt-4 flex flex-wrap gap-1.5">
          {PRICE_RANGES.map(([label, from, to]) => {
            const active = min === from && max === to;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={active}
                onClick={() => update(active ? { min: '', max: '' } : { min: from, max: to })}
                className={`h-8 rounded-full border px-3 text-[12.5px] font-medium transition-colors ${active ? 'border-navy bg-navy text-white' : 'border-navy/15 text-navy hover:border-navy/40 hover:bg-mist'}`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[['min', 'Min', min], ['max', 'Max', max]].map(([key, label, value]) => (
            <label key={key} className="relative block">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-ink/45">AED</span>
              <input type="number" min="0" inputMode="decimal" placeholder={label} aria-label={`${label} price in AED`} className={priceInput} value={value} onChange={(event) => update({ [key]: event.target.value })} />
            </label>
          ))}
        </div>
        {hasPrice && (
          <button type="button" onClick={() => update({ min: '', max: '' })} className="mt-2.5 text-[12.5px] font-semibold text-blue hover:text-navy">
            Clear price
          </button>
        )}
      </FilterSection>
      <FilterSection title="Category">
        <div className="space-y-0.5">
          {lockedCategory ? (
            <Link to="/shop" className={row(false)}>
              All products <span className={count(false)}>{products.length}</span>
            </Link>
          ) : (
            <button type="button" onClick={() => update({ category: '' })} aria-pressed={!activeCategory} className={`${row(!activeCategory)} w-full`}>
              All products <span className={count(!activeCategory)}>{products.length}</span>
            </button>
          )}
          {categories.map((category) => {
            const active = activeCategory === category.handle;
            // On the category page these lead to other categories; on the shop page they filter in place.
            return lockedCategory ? (
              <Link key={category.handle} to={`/category/${category.handle}`} className={row(active)} aria-current={active ? 'page' : undefined}>
                <span className="truncate">{category.name}</span>
                <span className={count(active)}>{category.products_count}</span>
              </Link>
            ) : (
              <button key={category.handle} type="button" onClick={() => update({ category: active ? '' : category.handle })} aria-pressed={active} className={`${row(active)} w-full text-left`}>
                <span className="truncate">{category.name}</span>
                <span className={count(active)}>{category.products_count}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

    </div>
  );
}

function CatalogSearch({ initial, onSearch, placeholder }) {
  const [value, setValue] = useState(initial);
  const submit = (text) => {
    setValue(text);
    onSearch(text.trim());
  };

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        submit(value);
      }}
      className="flex h-10 min-w-0 flex-1 items-center rounded-lg border border-navy/15 bg-white pl-3 transition-colors focus-within:border-blue/60 sm:max-w-sm"
    >
      <Search size={16} className="shrink-0 text-ink/50" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="h-full min-w-0 flex-1 bg-transparent px-2.5 text-[14px] text-ink outline-none placeholder:text-ink/45 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button type="button" onClick={() => submit('')} aria-label="Clear search" className="mr-1 grid size-8 shrink-0 place-items-center rounded-md text-ink/55 hover:bg-mist hover:text-navy">
          <X size={15} />
        </button>
      )}
    </form>
  );
}

function Pagination({ page, total, onChange }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, index) => index + 1).filter((value) => value === 1 || value === total || Math.abs(value - page) <= 1);
  const cell = 'grid size-10 place-items-center rounded-md font-mono text-[13px] transition-colors';

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1">
      <button type="button" className={`${cell} text-navy hover:bg-mist disabled:opacity-35`} disabled={page === 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
        <ChevronLeft size={18} />
      </button>
      {pages.map((value, index) => (
        <span key={value} className="flex items-center gap-1">
          {index > 0 && value - pages[index - 1] > 1 && <span className="px-1 text-ink/50">…</span>}
          <button type="button" aria-current={value === page ? 'page' : undefined} onClick={() => onChange(value)} className={`${cell} ${value === page ? 'bg-navy text-white' : 'text-navy hover:bg-mist'}`}>
            {value}
          </button>
        </span>
      ))}
      <button type="button" className={`${cell} text-navy hover:bg-mist disabled:opacity-35`} disabled={page === total} onClick={() => onChange(page + 1)} aria-label="Next page">
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}

export default function CatalogView({ lockedCategory }) {
  const [params, setParams] = useSearchParams();
  const [sheetOpen, setSheetOpen] = useState(false);
  const topRef = useRef(null);

  const update = (changes, keepPage = false) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
    if (!keepPage) next.delete('page');
    setParams(next, { replace: true });
  };

  const q = params.get('q') ?? '';
  const category = lockedCategory ?? params.get('category');
  const min = parseFloat(params.get('min'));
  const max = parseFloat(params.get('max'));
  const sort = params.get('sort') ?? 'featured';

  const results = useMemo(() => {
    let list = q ? searchProducts(q) : [...products];
    if (category) list = list.filter((product) => product.category === category);
    if (!Number.isNaN(min)) list = list.filter((product) => product.price >= min);
    if (!Number.isNaN(max)) list = list.filter((product) => product.price <= max);
    return SORTERS[sort] ? [...list].sort(SORTERS[sort]) : list;
  }, [q, category, min, max, sort]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(totalPages, parseInt(params.get('page'), 10) || 1);
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (next) => {
    update({ page: next > 1 ? String(next) : '' }, true);
    topRef.current?.scrollIntoView({ block: 'start' });
  };

  return (
    <div ref={topRef} className="shell-wide grid scroll-mt-24 gap-8 py-8 lg:grid-cols-[236px_1fr] lg:gap-8 xl:gap-10 lg:py-10">
      <aside className="hidden lg:block">
        <div className="no-scrollbar sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-2">
          <Filters boxed params={params} update={update} lockedCategory={lockedCategory} />
        </div>
      </aside>

      <div className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <CatalogSearch key={q} initial={q} onSearch={(value) => update({ q: value })} placeholder={lockedCategory ? 'Search this category' : 'Search by name, size or material'} />
          <p className="order-last w-full text-[14px] text-ink/75 sm:order-none sm:w-auto" aria-live="polite">
            <strong className="font-mono font-medium text-navy">{results.length}</strong> {results.length === 1 ? 'product' : 'products'}
            {q && <> for “{q}”</>}
          </p>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setSheetOpen(true)}>
              <SlidersHorizontal size={15} /> Filters
            </Button>
            <select aria-label="Sort products" value={sort} onChange={(event) => update({ sort: event.target.value === 'featured' ? '' : event.target.value })} className="h-9 rounded-md border border-navy/20 bg-white px-2.5 text-[13.5px] font-medium text-navy">
              {SORTS.map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {visible.length ? (
          <>
            <ProductGrid key={`${page}-${sort}-${category}-${q}`} products={visible} columns="lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" />
            <Pagination page={page} total={totalPages} onChange={goToPage} />
          </>
        ) : (
          <EmptyState icon={PackageSearch} title="No products found" text="Try a different size or material, or clear your filters.">
            <Button to={lockedCategory ? `/category/${lockedCategory}` : '/shop'} variant="navy">Clear filters</Button>
          </EmptyState>
        )}
      </div>

      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div className="fixed inset-0 z-50 bg-navy/55 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSheetOpen(false)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-2xl bg-white lg:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'tween', duration: 0.26 }}
            >
              <div className="flex items-center justify-between border-b border-navy/10 px-5 py-3">
                <h2 className="text-lg font-bold">Filters</h2>
                <button type="button" onClick={() => setSheetOpen(false)} aria-label="Close filters" className="grid size-10 place-items-center rounded-md text-navy hover:bg-mist">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <Filters params={params} update={update} lockedCategory={lockedCategory} />
              </div>
              <div className="border-t border-navy/10 p-4">
                <Button variant="blue" className="w-full" onClick={() => setSheetOpen(false)}>
                  Show {results.length} products
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
