import { useMemo, useState } from 'react';
import { featuredProducts, inCategory } from '../../lib/catalog';
import ProductGrid from '../product/ProductGrid';
import SectionHeading from '../ui/SectionHeading';

const TABS = [
  { label: 'All', handle: null },
  { label: 'Aluminium', handle: 'aluminium-products' },
  { label: 'Black Base', handle: 'black-base-containers' },
  { label: 'Clear', handle: 'clear-containers' },
  { label: 'Kraft', handle: 'kraft-products' },
];

export default function FeaturedProducts() {
  const [active, setActive] = useState(null);
  const items = useMemo(() => (active ? inCategory(active).slice(0, 8) : featuredProducts()), [active]);

  return (
    <section className="border-t border-navy/10 bg-white py-16 lg:py-24">
      <div className="shell">
        <SectionHeading eyebrow="Featured products" title="Workhorses of the commercial kitchen" linkTo="/shop" linkLabel="Shop all" />
        <div className="no-scrollbar -mt-2 mb-7 flex gap-2 overflow-x-auto" role="group" aria-label="Filter featured products">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(tab.handle)}
              aria-pressed={active === tab.handle}
              className={`h-9 shrink-0 rounded-md px-4 text-[13.5px] font-semibold transition-colors ${active === tab.handle ? 'bg-navy text-white' : 'bg-mist text-navy hover:bg-navy/15'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <ProductGrid key={active ?? 'all'} products={items} />
      </div>
    </section>
  );
}
