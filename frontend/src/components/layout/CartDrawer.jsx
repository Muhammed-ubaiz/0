import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatAED, imageUrl } from '../../lib/catalog';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import QuantityStepper from '../ui/QuantityStepper';
import FreeDeliveryMeter from './FreeDeliveryMeter';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const { pathname } = useLocation();
  const close = () => setIsCartOpen(false);

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
          <motion.div className="fixed inset-0 z-50 bg-navy/55" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <div className="flex h-16 items-center justify-between border-b border-navy/10 px-5">
              <h2 className="text-lg font-bold">
                Your cart <span className="font-mono text-[13px] font-normal text-ink/65">({totalItems})</span>
              </h2>
              <button type="button" onClick={close} aria-label="Close cart" className="grid size-10 place-items-center rounded-md text-navy hover:bg-mist">
                <X size={21} />
              </button>
            </div>

            {cart.length === 0 ? (
              <EmptyState icon={ShoppingBag} title="Your cart is empty" text="Browse the range and add what your kitchen needs.">
                <Button to="/shop">Start shopping</Button>
              </EmptyState>
            ) : (
              <>
                <div className="p-4 pb-2">
                  <FreeDeliveryMeter />
                </div>
                <ul className="flex-1 divide-y divide-navy/8 overflow-y-auto px-5">
                  {cart.map((item) => (
                    <li key={item.handle} className="flex gap-3 py-4">
                      <Link to={`/product/${item.handle}`} className="size-18 shrink-0 rounded-md border border-navy/10 p-1.5">
                        <img src={imageUrl(item.image, 144)} alt="" className="size-full object-contain" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link to={`/product/${item.handle}`} className="line-clamp-2 text-[13.5px] font-semibold leading-snug text-navy hover:text-blue">
                          {item.title}
                        </Link>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <QuantityStepper size="sm" value={item.quantity} onChange={(next) => updateQuantity(item.handle, next - item.quantity)} />
                          <span className="font-mono text-[13px] font-medium text-navy">{formatAED(item.price * item.quantity)}</span>
                          <button type="button" onClick={() => removeFromCart(item.handle)} aria-label={`Remove ${item.title}`} className="grid size-8 place-items-center rounded-md text-ink/60 hover:bg-mist hover:text-navy">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="space-y-3 border-t border-navy/10 p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[14px] text-ink/75">Subtotal</span>
                    <span className="font-display text-xl font-bold text-navy">{formatAED(subtotal)}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button to="/cart" variant="outline">View cart</Button>
                    <Button to="/checkout" variant="red">Checkout</Button>
                  </div>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
