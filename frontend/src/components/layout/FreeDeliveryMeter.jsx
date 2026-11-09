import { Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatAED } from '../../lib/catalog';

export default function FreeDeliveryMeter() {
  const { subtotal, freeShippingThreshold, amountToFreeShipping } = useCart();
  const percent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="rounded-lg bg-mist p-3.5">
      <p className="flex items-center gap-2 text-[13.5px] text-navy">
        <Truck size={17} className="shrink-0" aria-hidden="true" />
        {amountToFreeShipping > 0 ? (
          <span>
            Add <strong>{formatAED(amountToFreeShipping)}</strong> more for free UAE delivery
          </span>
        ) : (
          <strong>Your order qualifies for free UAE delivery</strong>
        )}
      </p>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white">
        <div className="h-full rounded-full bg-blue transition-[width] duration-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
