import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, PackageSearch, SlidersHorizontal, X } from 'lucide-react';
import { categories, products, searchProducts } from '../../lib/catalog';
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

function Filters({ params, update, lockedCategory }) {
  const activeCategory = lockedCategory ?? params.get('category');
  const priceInput = 'h-10 w-full rounded-md border border-navy/20 bg-white px-3 font-mono text-[13px] placeholder:text-ink/50';
  const row = (active) => `flex items-center justify-between rounded-md px-2.5 py-2 text-[14px] transition-colors ${active ? 'bg-navy font-semibold text-white' : 'text-navy hover:bg-mist'}`;

  return (
    <div className="space-y-7">
      <div>
        <h2 className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-blue">Category</h2>
        <div className="space-y-0.5">
          <Link to="/shop" className={row(!activeCategory)}>
            All products <span className="font-mono text-[12px]">{products.length}</span>
          </Link>
          {categories.map((category) => (
            <Link key={category.handle} to={`/category/${category.handle}`} className={row(activeCategory === category.handle)}>
              <span className="truncate">{category.name}</span>
              <span className="font-mono text-[12px]">{category.products_count}</span>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-blue">Price (AED)</h2>
        <div className="grid grid-cols-2 gap-2">
          <input type="number" min="0" inputMode="decimal" placeholder="Min" aria-label="Minimum price" className={priceInput} value={params.get('min') ?? ''} onChange={(event) => update({ min: event.target.value })} />
          <input type="number" min="0" inputMode="decimal" placeholder="Max" aria-label="Maximum price" className={priceInput} value={params.get('max') ?? ''} onChange={(event) => update({ max: event.target.value })} />
        </div>
      </div>
    </div>
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
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="shell grid gap-8 py-8 lg:grid-cols-[250px_1fr] lg:gap-10 lg:py-10">
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
          <Filters params={params} update={update} lockedCategory={lockedCategory} />
        </div>
      </aside>

      <div className="min-w-0">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[14px] text-ink/75" aria-live="polite">
            <strong className="font-mono font-medium text-navy">{results.length}</strong> {results.length === 1 ? 'product' : 'products'}
            {q && <> for “{q}”</>}
          </p>
          <div className="flex items-center gap-2">
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
            <ProductGrid key={`${page}-${sort}-${category}-${q}`} products={visible} columns="xl:grid-cols-4 lg:grid-cols-3" />
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
