import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Heart, ShoppingBag, X } from 'lucide-react';
import { useCart, useWishlist } from '../../context/CartContext';
import { categoryName, discountPercent, formatAED, imageUrl, productSpecs } from '../../lib/catalog';
import QuantityStepper from '../ui/QuantityStepper';

/** A product preview dialog: photos, price, quantity and add to cart, without leaving the page. */
export default function QuickView({ product, onClose }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const photos = product.images?.length ? product.images.slice(0, 5) : [product.image];
  const [photo, setPhoto] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const off = discountPercent(product);
  const specs = productSpecs(product);
  const saved = isInWishlist(product.handle);
  const facts = [specs.capacity, specs.size && `${specs.size}`, specs.pieces > 1 && `${specs.pieces} pcs`].filter(Boolean);

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div className="absolute inset-0 bg-navy/55 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view: ${product.title}`}
        className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl bg-white shadow-panel sm:rounded-2xl md:grid-cols-[1.05fr_1fr]"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <button type="button" onClick={onClose} autoFocus aria-label="Close quick view" className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-white text-navy shadow-card transition-colors hover:bg-mist">
          <X size={18} />
        </button>

        <div className="border-b border-navy/10 p-5 md:border-b-0 md:border-r">
          <div className="grid aspect-square place-items-center overflow-hidden rounded-xl bg-white">
            <img key={photo} src={imageUrl(photos[photo], 700)} alt={product.title} className="size-[88%] object-contain photo-clean" />
          </div>
          {photos.length > 1 && (
            <div className="mt-3 flex gap-2">
              {photos.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setPhoto(index)}
                  aria-label={`Photo ${index + 1}`}
                  aria-pressed={photo === index}
                  className={`grid size-14 place-items-center overflow-hidden rounded-lg border bg-white transition-colors ${photo === index ? 'border-navy' : 'border-navy/12 hover:border-blue/50'}`}
                >
                  <img src={imageUrl(src, 120)} alt="" className="size-[85%] object-contain photo-clean" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col p-6 sm:p-7">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-blue">{categoryName(product.category)}</p>
          <h2 className="mt-2 pr-8 text-[22px] font-bold leading-snug">{product.title}</h2>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className={`font-display text-[28px] font-bold ${off ? 'text-red' : 'text-navy'}`}>{formatAED(product.price)}</span>
            {off > 0 && (
              <>
                <s className="text-[15px] text-ink/50">{formatAED(product.compare_at_price)}</s>
                <span className="rounded bg-red px-2 py-0.5 text-[11.5px] font-semibold text-white">{off}% off</span>
              </>
            )}
            {specs.pricePerPiece && <span className="font-mono text-[12px] text-ink/60">{formatAED(specs.pricePerPiece)}/pc</span>}
          </div>

          {facts.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {facts.map((fact) => (
                <li key={fact} className="rounded-full border border-navy/12 px-2.5 py-1 text-[12px] font-medium text-navy">{fact}</li>
              ))}
            </ul>
          )}

          {product.description && <p className="mt-4 line-clamp-4 text-[14px] leading-relaxed text-ink/70">{product.description}</p>}

          <div className="mt-auto pt-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <button type="button" onClick={handleAdd} disabled={product.in_stock === false} className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-red px-5 text-[14px] font-semibold text-white transition-colors hover:bg-navy disabled:opacity-50">
                {added ? <Check size={17} /> : <ShoppingBag size={17} />}
                {product.in_stock === false ? 'Out of stock' : added ? 'Added to cart' : 'Add to cart'}
              </button>
              <button type="button" onClick={() => toggleWishlist(product)} aria-pressed={saved} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} className="grid size-11 place-items-center rounded-md border border-navy/20 text-navy transition-colors hover:border-navy">
                <Heart size={18} className={saved ? 'fill-red text-red' : ''} />
              </button>
            </div>
            <Link to={`/product/${product.handle}`} onClick={onClose} className="group mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-blue hover:text-navy">
              View full details <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
