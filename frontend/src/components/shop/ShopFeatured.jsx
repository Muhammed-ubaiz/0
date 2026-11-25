import { featuredProducts } from '../../lib/catalog';
import ProductGrid from '../product/ProductGrid';
import SectionHeading from '../ui/SectionHeading';

const PICKS = featuredProducts().slice(0, 8);

export default function ShopFeatured() {
  return (
    <section className="border-t border-navy/10 bg-white py-16 lg:py-24">
      <div className="shell-wide">
        <SectionHeading
          eyebrow="Featured"
          title="Kitchen favourites"
          intro="Containers and trays for everyday service. Add them in one tap, or open Quick view for photos and sizes."
        />
        <ProductGrid products={PICKS} columns="md:grid-cols-4" />
      </div>
    </section>
  );
}
