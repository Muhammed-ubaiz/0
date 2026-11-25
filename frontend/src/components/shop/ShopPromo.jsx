import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Truck } from 'lucide-react';
import { formatAED, imageUrl, specialOffers } from '../../lib/catalog';
import { Eyebrow } from '../ui/SectionHeading';

const { items, isValue } = specialOffers(3);

export default function ShopPromo({ onShop }) {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rise = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [50, -50]);
  const sink = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [-30, 30]);
  const drift = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [24, -24]);
  const offsets = [rise, sink, drift];

  return (
    <section ref={ref} className="bg-white py-4 lg:py-8">
      <div className="grid overflow-hidden bg-navy lg:grid-cols-2">
        <motion.div
          className="flex flex-col justify-center px-6 py-14 sm:px-12 lg:py-24 lg:pl-[max(3rem,calc((100vw-1680px)/2+3rem))] lg:pr-16"
          initial={still ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <Eyebrow light>{isValue ? 'Value picks' : 'Special offers'}</Eyebrow>
          <h2 className="mt-5 text-[40px] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-[58px]">
            {isValue ? (
              <>
                Everyday essentials
                <br /> under <span className="whitespace-nowrap">AED 10</span>
              </>
            ) : (
              'On offer now'
            )}
            <span className="text-red">.</span>
          </h2>
          <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-white/70">
            The packaging you go through every day, from {formatAED(items[0]?.price)} a pack. Stock up and get free UAE delivery on orders over AED 200.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => onShop(isValue ? { max: '10', sort: 'price-asc' } : {})}
              className="group inline-flex h-13 items-center gap-2 rounded-full bg-red px-7 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-navy"
            >
              {isValue ? 'Shop under AED 10' : 'Shop the offers'}
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <span className="flex items-center gap-2 text-[13.5px] font-medium text-white/75">
              <Truck size={17} aria-hidden="true" /> Delivery to all 7 emirates
            </span>
          </div>
        </motion.div>

        <div className="grid min-h-[340px] grid-cols-3 items-center gap-3 bg-white px-5 py-12 sm:gap-5 sm:px-10 lg:min-h-[540px] lg:rounded-l-[36px] lg:pr-[max(2.5rem,calc((100vw-1680px)/2+2.5rem))]">
          {items.map((product, index) => (
            <motion.figure key={product.handle} style={{ y: offsets[index] }} className={index === 1 ? 'lg:-mt-20' : 'lg:mt-16'}>
              <div className="group aspect-[4/5] overflow-hidden rounded-2xl border border-navy/10 bg-white">
                <img
                  src={imageUrl(product.image, 420)}
                  alt=""
                  loading="lazy"
                  className="size-full object-contain p-[12%] photo-clean transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
              </div>
              <figcaption className="mt-3">
                <p className="line-clamp-1 text-[12.5px] font-medium text-ink/70 sm:text-[13.5px]">{product.title}</p>
                <p className="font-mono text-[13px] font-medium text-navy sm:text-[14px]">{formatAED(product.price)}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
