import { ArrowRight, Truck } from 'lucide-react';
import { formatAED, specialOffers } from '../../lib/catalog';
import ProductCard from '../product/ProductCard';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { Eyebrow } from '../ui/SectionHeading';

const { items, isValue } = specialOffers(3);

function OfferCoupon() {
  const notch = 'absolute top-1/2 size-6 -translate-y-1/2 rounded-full bg-white';

  return (
    <div className="flex h-full min-h-80 flex-col rounded-xl bg-mist">
      <div className="flex-1 p-6 lg:p-7">
        <Eyebrow>Special offers</Eyebrow>
        {isValue ? (
          <>
            <h2 className="mt-5 text-[19px] font-semibold leading-snug tracking-[-0.01em]">
              Everyday essentials under
              <span className="mt-1 flex items-baseline gap-2 font-extrabold leading-none tracking-[-0.04em]">
                <span className="text-[28px]">AED</span>
                <span className="text-[92px]">10</span>
              </span>
            </h2>
            <p className="mt-3 text-[14.5px] text-ink/75">Prices start at {formatAED(items[0].price)}</p>
          </>
        ) : (
          <h2 className="mt-5 text-4xl font-bold leading-[1.08]">On offer now</h2>
        )}
      </div>

      <div className="relative mx-3 border-t-2 border-dashed border-navy/20" aria-hidden="true">
        <span className={`${notch} -left-6`} />
        <span className={`${notch} -right-6`} />
      </div>

      <div className="p-6 lg:p-7">
        <p className="flex items-center gap-2 text-[13.5px] font-medium text-navy">
          <Truck size={17} className="shrink-0" aria-hidden="true" />
          Free UAE delivery over AED 200
        </p>
        <Button to={isValue ? '/shop?max=10&sort=price-asc' : '/shop'} variant="red" className="mt-4 w-full">
          Shop the offers <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}

export default function SpecialOffers() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="shell grid gap-4 lg:grid-cols-[1fr_2.6fr]">
        <Reveal className="overflow-hidden rounded-xl">
          <OfferCoupon />
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {items.map((product, index) => (
            <Reveal key={product.handle} delay={index * 0.06} className={index === 2 ? 'max-md:hidden' : ''}>
              <ProductCard product={product} badge={isValue ? 'Under AED 10' : undefined} highlightPrice />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
