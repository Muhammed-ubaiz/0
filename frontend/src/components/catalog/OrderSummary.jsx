import { useCart } from '../../context/CartContext';
import { formatAED } from '../../lib/catalog';

export const SHIPPING_FEE = 15;

export function useTotals() {
  const { subtotal, freeShippingThreshold } = useCart();
  const shipping = subtotal >= freeShippingThreshold ? 0 : SHIPPING_FEE;
  return { subtotal, shipping, total: subtotal + shipping };
}

export default function OrderSummary({ children }) {
  const { subtotal, shipping, total } = useTotals();
  const row = 'flex justify-between text-[14.5px]';

  return (
    <div className="rounded-[10px] border border-navy/12 bg-white p-6 shadow-card">
      <h2 className="text-xl font-bold">Order summary</h2>
      <div className="mt-4 space-y-2.5">
        <div className={row}>
          <span className="text-ink/75">Subtotal</span>
          <span className="font-mono text-[14px] text-navy">{formatAED(subtotal)}</span>
        </div>
        <div className={row}>
          <span className="text-ink/75">UAE delivery</span>
          <span className="font-mono text-[14px] text-navy">{shipping ? formatAED(shipping) : 'Free'}</span>
        </div>
        <div className={row}>
          <span className="text-ink/75">5% VAT</span>
          <span className="text-[14px] text-navy">Included</span>
        </div>
      </div>
      <div className="mt-4 flex items-baseline justify-between border-t border-navy/12 pt-4">
        <span className="font-semibold text-navy">Total</span>
        <span className="font-display text-2xl font-bold text-navy">{formatAED(total)}</span>
      </div>
      {children}
    </div>
  );
}
