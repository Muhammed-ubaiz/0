import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categoriesBySize, formatAED, imageUrl, inCategory } from '../../lib/catalog';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

// This category's image is a full scene rather than a cut-out product photo.
const FULL_BLEED = new Set(['cleaning-tools']);

/** Two extra product photos per category, skipping the category's own image. */
function extraPhotos(category) {
  const seen = new Set([category.image]);
  const picks = [];
  for (const product of inCategory(category.handle)) {
    if (picks.length === 2) break;
    if (!product.image || seen.has(product.image)) continue;
    seen.add(product.image);
    picks.push(product.image);
  }
  return picks;
}

const CARDS = categoriesBySize.map((category) => {
  const items = inCategory(category.handle);
  return {
    ...category,
    extras: extraPhotos(category),
    from: items.length ? Math.min(...items.map((item) => item.price)) : null,
  };
});

// Three compositions, rotated through the grid so neighbouring cards look different.
function Composition({ card, variant }) {
  const zoom = 'transition-transform duration-700 ease-out group-hover:scale-[1.06]';
  const main = FULL_BLEED.has(card.handle) ? 'size-full object-cover' : 'size-full object-contain p-[12%] photo-clean';
  const tile = 'min-h-0 overflow-hidden rounded-xl bg-white';

  if (variant === 1 && card.extras.length === 2) {
    return (
      <div className="absolute inset-0 grid grid-cols-[1.4fr_1fr] gap-2 p-2">
        <div className={tile}>
          <img src={imageUrl(card.image, 420)} alt="" loading="lazy" className={`${main} ${zoom}`} />
        </div>
        <div className="grid min-h-0 grid-rows-2 gap-2">
          {card.extras.map((src) => (
            <div key={src} className={tile}>
              <img src={imageUrl(src, 220)} alt="" loading="lazy" className={`size-full object-contain p-[14%] photo-clean ${zoom}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 2 && card.extras.length) {
    return (
      <div className="absolute inset-0 p-2">
        <div className={`${tile} size-full`}>
          <img src={imageUrl(card.image, 480)} alt="" loading="lazy" className={`${main} ${zoom}`} />
        </div>
        <div className="absolute bottom-4 right-4 size-[34%] overflow-hidden rounded-xl border border-navy/10 bg-white shadow-lift">
          <img src={imageUrl(card.extras[0], 200)} alt="" loading="lazy" className={`size-full object-contain p-[12%] photo-clean ${zoom}`} />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 p-2">
      <div className={`${tile} size-full`}>
        <img src={imageUrl(card.image, 480)} alt="" loading="lazy" className={`${main} ${zoom}`} />
      </div>
    </div>
  );
}

export default function ShopCategories() {
  return (
    <section id="shop-categories" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <div className="shell-wide">
        <SectionHeading
          eyebrow="Shop by category"
          title={`${CARDS.length} ranges, one supplier`}
          intro="From aluminium trays to tissue, every range is built for busy kitchens."
          linkTo="/categories"
          linkLabel="All categories"
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {CARDS.map((card, index) => (
            <Reveal key={card.handle} delay={(index % 4) * 0.06} className="h-full">
              <Link
                to={`/category/${card.handle}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy/10 bg-mist transition-all duration-300 hover:-translate-y-1 hover:border-blue/35 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3.4] overflow-hidden">
                  <Composition card={card} variant={index % 3} />
                </div>
                <div className="flex items-end justify-between gap-3 px-4 pb-4 pt-2 sm:px-5 sm:pb-5">
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-bold leading-tight text-navy sm:text-[17px]">{card.name}</h3>
                    <p className="mt-1 font-mono text-[11px] text-ink/60 sm:text-[12px]">
                      {card.products_count} items{card.from != null && <span className="hidden sm:inline"> · from {formatAED(card.from)}</span>}
                    </p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-navy/15 bg-white text-navy transition-colors duration-300 group-hover:border-red group-hover:bg-red group-hover:text-white">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
