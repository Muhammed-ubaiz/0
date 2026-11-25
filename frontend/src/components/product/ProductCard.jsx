import { useCallback, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, Eye, Heart, Package, ShoppingBag } from 'lucide-react';
import { useCart, useWishlist } from '../../context/CartContext';
import QuickView from './QuickView';
import { categoryName, discountPercent, formatAED, imageUrl, productSpecs } from '../../lib/catalog';

export default function ProductCard({ product, badge, highlightPrice = false }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const closeQuickView = useCallback(() => setQuickView(false), []);

  const off = discountPercent(product);
  const { pricePerPiece } = productSpecs(product);
  const saved = isInWishlist(product.handle);
  const label = off ? `${off}% off` : badge;

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="group flex h-full flex-col rounded-xl border border-navy/10 bg-white p-2 transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-lift">
      <div className="relative aspect-[6/5] overflow-hidden rounded-lg bg-white">
        <Link to={`/product/${product.handle}`} aria-label={product.title} className="absolute inset-0 p-3 sm:p-4">
          {!loaded && <Package size={30} strokeWidth={1.5} aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse text-navy/15" />}
          <img
            src={imageUrl(product.image, 420)}
            alt=""
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`size-full scale-105 object-contain photo-clean transition-[transform,opacity] duration-500 ease-out group-hover:scale-[1.17] ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </Link>

        {label && (
          <span className="absolute left-2 top-2 rounded bg-red px-2 py-0.5 text-[11px] font-semibold text-white">
            {label}
          </span>
        )}

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={saved}
          className={`absolute right-1.5 top-1.5 grid size-8 place-items-center rounded-full bg-white text-navy shadow-card transition-all duration-200 hover:text-blue focus-visible:opacity-100 lg:group-hover:opacity-100 ${saved ? '' : 'lg:opacity-0'}`}
        >
          <Heart size={15} className={saved ? 'fill-red text-red' : ''} />
        </button>

        <button
          type="button"
          onClick={() => setQuickView(true)}
          aria-label={`Quick view: ${product.title}`}
          className="absolute right-1.5 top-11 grid size-8 place-items-center rounded-full bg-white text-navy shadow-card transition-colors hover:text-blue lg:inset-x-2 lg:bottom-2 lg:top-auto lg:flex lg:h-9 lg:w-auto lg:translate-y-2 lg:items-center lg:justify-center lg:gap-1.5 lg:rounded-lg lg:bg-white/95 lg:text-[12.5px] lg:font-semibold lg:opacity-0 lg:backdrop-blur lg:transition-all lg:duration-300 lg:hover:bg-navy lg:hover:text-white lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:focus-visible:translate-y-0 lg:focus-visible:opacity-100"
        >
          <Eye size={15} />
          <span className="hidden lg:inline">Quick view</span>
        </button>
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3">
        <p className="truncate text-[11px] font-medium text-blue">{categoryName(product.category)}</p>
        <h3 className="mt-1 text-[13.5px] font-semibold leading-[1.35] tracking-normal">
          <Link to={`/product/${product.handle}`} className="line-clamp-2 min-h-[2.7em] hover:text-blue">
            {product.title}
          </Link>
        </h3>

        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <div className="min-w-0">
            {off > 0 && <s className="block text-[11.5px] leading-none text-ink/55">{formatAED(product.compare_at_price)}</s>}
            <p className={`whitespace-nowrap font-display text-[16px] font-bold leading-tight ${off || highlightPrice ? 'text-red' : 'text-navy'}`}>{formatAED(product.price)}</p>
            {pricePerPiece && <p className="whitespace-nowrap font-mono text-[10.5px] text-ink/65">{formatAED(pricePerPiece)}/pc</p>}
          </div>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add ${product.title} to cart`}
            className="inline-flex h-9 min-w-9 shrink-0 items-center justify-center gap-1.5 rounded-lg bg-blue px-2.5 text-[12.5px] font-semibold text-white transition-colors duration-200 hover:bg-navy"
          >
            {added ? <Check size={15} /> : <ShoppingBag size={15} />}
            <span className="hidden xl:inline">{added ? 'Added' : 'Add'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>{quickView && <QuickView product={product} onClose={closeQuickView} />}</AnimatePresence>
    </article>
  );
}
