import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import CatalogView from '../components/catalog/CatalogView';
import { CategoryStrip } from '../components/home/Hero';
import Newsletter from '../components/home/Newsletter';
import ShopBenefits from '../components/shop/ShopBenefits';
import ShopCategories from '../components/shop/ShopCategories';
import ShopFeatured from '../components/shop/ShopFeatured';
import ShopHero from '../components/shop/ShopHero';
import ShopPromo from '../components/shop/ShopPromo';
import { Breadcrumbs } from '../components/ui/PageIntro';
import { Eyebrow } from '../components/ui/SectionHeading';
import { products } from '../lib/catalog';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const listRef = useRef(null);
  const q = params.get('q') ?? '';
  const filtered = params.toString() !== '';
  const firstRender = useRef(true);

  const scrollToList = useCallback((behavior = 'smooth') => {
    listRef.current?.scrollIntoView({ behavior, block: 'start' });
  }, []);

  // Arriving with a search or filter (from the header search or a link), or searching
  // again from the header, jumps straight to the results instead of the hero.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (filtered) scrollToList('instant');
      return;
    }
    if (q) scrollToList();
    // Only a new search should move the page; filter changes keep the scroll position.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const shopWith = (changes) => {
    const next = new URLSearchParams();
    Object.entries(changes).forEach(([key, value]) => value && next.set(key, value));
    setParams(next, { replace: true });
    scrollToList();
  };

  return (
    <>
      <div className="shell-wide pt-6">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop' }]} />
      </div>
      <ShopHero onShop={() => scrollToList()} />
      <CategoryStrip />
      <ShopCategories />
      <ShopFeatured />
      <ShopPromo onShop={shopWith} />

      <section ref={listRef} id="all-products" className="scroll-mt-20 bg-white pt-16 lg:pt-24">
        <div className="shell-wide flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>All products</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-[44px] sm:leading-[1.08]">The full catalogue</h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink/70">
            Filter all {products.length} products by category and price, search by size, and sort the way you shop.
          </p>
        </div>
        <CatalogView />
      </section>

      <ShopBenefits />
      <Newsletter variant="feature" />
    </>
  );
}
