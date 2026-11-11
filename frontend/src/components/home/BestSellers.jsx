import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bestSellers } from '../../lib/catalog';
import ProductCard from '../product/ProductCard';
import { Eyebrow } from '../ui/SectionHeading';

const items = bestSellers();

export default function BestSellers() {
  const rail = useRef(null);
  const scroll = (direction) => rail.current?.scrollBy({ left: direction * rail.current.clientWidth * 0.8, behavior: 'smooth' });
  const arrow = 'grid size-11 place-items-center rounded-md border border-navy/20 bg-white text-navy transition-colors hover:bg-navy hover:text-white';

  return (
    <section className="border-t border-navy/10 bg-white py-16 lg:py-24">
      <div className="shell">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Best sellers</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Stock up on the staples</h2>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button type="button" className={arrow} onClick={() => scroll(-1)} aria-label="Previous products"><ChevronLeft size={20} /></button>
            <button type="button" className={arrow} onClick={() => scroll(1)} aria-label="Next products"><ChevronRight size={20} /></button>
          </div>
        </div>
        <div ref={rail} className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 sm:mx-0 sm:gap-5 sm:scroll-px-0 sm:px-0">
          {items.map((product) => (
            <div key={product.handle} className="w-[52vw] shrink-0 snap-start sm:w-[240px] lg:w-[calc((100%-3.75rem)/4)]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
