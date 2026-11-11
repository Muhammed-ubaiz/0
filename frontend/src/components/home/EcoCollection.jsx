import { ArrowRight } from 'lucide-react';
import { getCategory, inCategory } from '../../lib/catalog';
import ProductCard from '../product/ProductCard';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { Eyebrow } from '../ui/SectionHeading';

const category = getCategory('eco-friendly-products');
const items = inCategory('eco-friendly-products').slice(0, 4);

export default function EcoCollection() {
  return (
    <section className="border-t border-navy/10 bg-white py-16 lg:py-24">
      <div className="shell grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 grid grid-cols-2 gap-3 sm:gap-5 lg:order-1">
          {items.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <Eyebrow>Eco-friendly collection</Eyebrow>
          <h2 className="mt-4 text-4xl font-bold leading-[1.06] sm:text-5xl">A lighter way to serve.</h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink/75">{category.description}</p>
          <Button to="/category/eco-friendly-products" variant="navy" size="lg" className="mt-8">
            Explore all {category.products_count} products <ArrowRight size={18} />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
