import { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Lock, Minus, Plus, ShoppingBag, Truck, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatAED, getProduct, inCategory } from '../../lib/catalog';
import ProductThumb from '../product/ProductThumb';
import Button from '../ui/Button';

const SHIPPING_FEE = 15;

function DeliveryProgress() {
  const { subtotal, freeShippingThreshold, amountToFreeShipping } = useCart();
  const percent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const unlocked = amountToFreeShipping === 0;

  return (
    <div className="border-b border-navy/10 px-5 py-4">
      <p className="text-[13.5px] text-navy">
        {unlocked ? (
          <strong>You’ve unlocked free UAE delivery</strong>
        ) : (
          <>
            You’re <strong>{formatAED(amountToFreeShipping)}</strong> away from free delivery
          </>
        )}
      </p>
      <div className="relative mt-3 h-1.5 rounded-full bg-mist">
        <motion.div className="h-full rounded-full bg-blue" initial={false} animate={{ width: `${percent}%` }} transition={{ duration: 0.5, ease: 'easeOut' }} />
        <motion.span
          className="absolute top-1/2 grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-navy/10 bg-white text-blue shadow-card"
          initial={false}
          animate={{ left: `${Math.min(Math.max(percent, 4), 96)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <Truck size={14} />
        </motion.span>
      </div>
    </div>
  );
}

function CartLine({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const stepper = 'grid size-8 place-items-center text-navy transition-colors hover:bg-mist disabled:opacity-35';

  return (
    <motion.li layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.25 }} className="flex gap-3.5 py-4">
      <Link to={`/product/${item.handle}`} className="shrink-0">
        <ProductThumb src={item.image} className="size-20" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/product/${item.handle}`} className="line-clamp-2 text-[14px] font-semibold leading-snug text-navy hover:text-blue">
            {item.title}
          </Link>
          <span className="shrink-0 font-display text-[15px] font-bold text-navy">{formatAED(item.price * item.quantity)}</span>
        </div>
        <p className="mt-0.5 text-[12.5px] text-ink/60">{formatAED(item.price)} each</p>
        <div className="mt-auto flex items-center justify-between pt-2.5">
          <div className="inline-flex items-center overflow-hidden rounded-full border border-navy/15 bg-white">
            <button type="button" className={stepper} onClick={() => updateQuantity(item.handle, -1)} disabled={item.quantity <= 1} aria-label={`Decrease ${item.title}`}>
              <Minus size={14} />
            </button>
            <span className="min-w-7 text-center text-[13.5px] font-semibold text-navy" aria-live="polite">{item.quantity}</span>
            <button type="button" className={stepper} onClick={() => updateQuantity(item.handle, 1)} aria-label={`Increase ${item.title}`}>
              <Plus size={14} />
            </button>
          </div>
          <button type="button" onClick={() => removeFromCart(item.handle)} className="text-[12.5px] font-medium text-ink/55 underline-offset-2 hover:text-navy hover:underline">
            Remove
          </button>
        </div>
      </div>
    </motion.li>
  );
}

function Suggestions() {
  const { cart, addToCart } = useCart();
  const items = useMemo(() => {
    const last = getProduct(cart[cart.length - 1]?.handle);
    if (!last) return [];
    const inCart = new Set(cart.map((item) => item.handle));
    return inCategory(last.category).filter((product) => !inCart.has(product.handle)).slice(0, 3);
  }, [cart]);

  if (!items.length) return null;

  return (
    <div className="mt-2 rounded-xl bg-mist/60 p-4">
      <p className="text-[13px] font-semibold text-navy">You may also need</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((product) => (
          <li key={product.handle} className="flex items-center gap-3">
            <ProductThumb src={product.image} width={96} className="size-11 bg-white" />
            <Link to={`/product/${product.handle}`} className="line-clamp-1 flex-1 text-[13px] text-navy hover:text-blue">
              {product.title}
            </Link>
            <span className="shrink-0 text-[12.5px] font-semibold text-navy">{formatAED(product.price)}</span>
            <button type="button" onClick={() => addToCart(product)} aria-label={`Add ${product.title}`} className="grid size-8 shrink-0 place-items-center rounded-full bg-blue text-white transition-colors hover:bg-navy">
              <Plus size={15} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, subtotal, totalItems, freeShippingThreshold } = useCart();
  const { pathname } = useLocation();
  const close = () => setIsCartOpen(false);
  const shipping = subtotal >= freeShippingThreshold ? 0 : SHIPPING_FEE;

  useEffect(() => {
    setIsCartOpen(false);
  }, [pathname, setIsCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return undefined;
    const onKey = (event) => event.key === 'Escape' && setIsCartOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isCartOpen, setIsCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div className="fixed inset-0 z-50 bg-navy/45 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[440px] flex-col bg-white shadow-panel sm:inset-y-3 sm:right-3 sm:overflow-hidden sm:rounded-2xl"
            initial={{ x: '105%' }}
            animate={{ x: 0 }}
            exit={{ x: '105%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-navy/10 px-5">
              <div className="flex items-center gap-2.5">
                <h2 className="text-xl font-bold">Your cart</h2>
                {totalItems > 0 && <span className="grid h-6 min-w-6 place-items-center rounded-full bg-navy px-2 text-[12px] font-semibold text-white">{totalItems}</span>}
              </div>
              <button type="button" onClick={close} aria-label="Close cart" className="grid size-10 place-items-center rounded-full text-navy transition-colors hover:bg-mist">
                <X size={20} />
              </button>
            </header>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="grid size-20 place-items-center rounded-full bg-mist text-blue">
                  <ShoppingBag size={30} />
                </span>
                <h3 className="mt-5 text-xl font-bold">Your cart is empty</h3>
                <p className="mt-1.5 text-[14.5px] text-ink/70">Add containers, foil, cups and more for your kitchen.</p>
                <Button to="/shop" className="mt-6 rounded-xl px-6">
                  Start shopping <ArrowRight size={16} />
                </Button>
              </div>
            ) : (
              <>
                <DeliveryProgress />
                <div className="flex-1 overflow-y-auto px-5 pb-5">
                  <ul className="divide-y divide-navy/8">
                    <AnimatePresence initial={false}>
                      {cart.map((item) => <CartLine key={item.handle} item={item} />)}
                    </AnimatePresence>
                  </ul>
                  <Suggestions />
                </div>

                <footer className="shrink-0 border-t border-navy/10 bg-white px-5 pb-5 pt-4">
                  <dl className="space-y-1.5 text-[14px]">
                    <div className="flex justify-between">
                      <dt className="text-ink/70">Subtotal</dt>
                      <dd className="font-semibold text-navy">{formatAED(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink/70">UAE delivery</dt>
                      <dd className="font-semibold text-navy">{shipping ? formatAED(shipping) : 'Free'}</dd>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-dashed border-navy/15 pt-2.5">
                      <dt className="font-semibold text-navy">Total <span className="text-[12px] font-normal text-ink/55">VAT included</span></dt>
                      <dd className="font-display text-[22px] font-bold text-navy">{formatAED(subtotal + shipping)}</dd>
                    </div>
                  </dl>
                  <Button to="/checkout" variant="red" size="lg" className="group mt-4 w-full rounded-xl">
                    <Lock size={16} /> Checkout
                    <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Link to="/cart" className="mt-3 block text-center text-[13.5px] font-semibold text-blue hover:text-navy">
                    View full cart
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
