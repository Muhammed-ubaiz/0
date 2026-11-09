import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import OrderSummary from '../components/catalog/OrderSummary';
import FreeDeliveryMeter from '../components/layout/FreeDeliveryMeter';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Field from '../components/ui/Field';
import PageIntro from '../components/ui/PageIntro';
import QuantityStepper from '../components/ui/QuantityStepper';
import { useCart } from '../context/CartContext';
import { formatAED, imageUrl } from '../lib/catalog';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalItems } = useCart();
  const [note, setNote] = useState('');

  if (!cart.length) {
    return (
      <>
        <PageIntro title="Your cart" crumbs={[{ label: 'Cart' }]} />
        <EmptyState icon={ShoppingBag} title="Your cart is empty" text="Browse the range and add what your kitchen needs.">
          <Button to="/shop">Start shopping</Button>
        </EmptyState>
      </>
    );
  }

  return (
    <>
      <PageIntro title="Your cart" intro={`${totalItems} ${totalItems === 1 ? 'item' : 'items'} ready for checkout.`} crumbs={[{ label: 'Cart' }]} />
      <div className="shell grid items-start gap-8 py-8 lg:grid-cols-[1fr_380px] lg:py-12">
        <div>
          <FreeDeliveryMeter />
          <ul className="mt-5 divide-y divide-navy/10 border-y border-navy/10">
            {cart.map((item) => (
              <li key={item.handle} className="grid grid-cols-[80px_1fr] gap-4 py-5 sm:grid-cols-[96px_1fr_auto]">
                <Link to={`/product/${item.handle}`} className="aspect-square rounded-md border border-navy/10 p-2">
                  <img src={imageUrl(item.image, 192)} alt="" className="size-full object-contain" />
                </Link>
                <div className="min-w-0">
                  <Link to={`/product/${item.handle}`} className="line-clamp-2 text-[15px] font-semibold leading-snug text-navy hover:text-blue">
                    {item.title}
                  </Link>
                  <p className="mt-1 font-mono text-[12.5px] text-ink/70">{formatAED(item.price)} each</p>
                  <div className="mt-3 flex items-center gap-2">
                    <QuantityStepper size="sm" value={item.quantity} onChange={(next) => updateQuantity(item.handle, next - item.quantity)} />
                    <button type="button" onClick={() => removeFromCart(item.handle)} className="flex h-8 items-center gap-1.5 rounded-md px-2 text-[13px] font-medium text-ink/70 hover:bg-mist hover:text-navy">
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                </div>
                <p className="col-start-2 font-display text-lg font-bold text-navy sm:col-start-3 sm:text-right">{formatAED(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <Field as="textarea" label="Order notes (optional)" className="mt-6" placeholder="Delivery instructions or special requests" value={note} onChange={(event) => setNote(event.target.value)} />
        </div>

        <div className="lg:sticky lg:top-24">
          <OrderSummary>
            <Button to="/checkout" state={{ note }} variant="red" size="lg" className="mt-5 w-full">
              Proceed to checkout <ArrowRight size={18} />
            </Button>
            <Link to="/shop" className="mt-3 block text-center text-[14px] font-semibold text-blue hover:text-navy">Continue shopping</Link>
          </OrderSummary>
        </div>
      </div>
    </>
  );
}
