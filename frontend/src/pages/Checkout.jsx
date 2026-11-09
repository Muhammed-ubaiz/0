import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Banknote, Building2, CheckCircle2, MessageCircle } from 'lucide-react';
import OrderSummary, { useTotals } from '../components/catalog/OrderSummary';
import Button from '../components/ui/Button';
import Field from '../components/ui/Field';
import PageIntro from '../components/ui/PageIntro';
import { useCart } from '../context/CartContext';
import { whatsappLink } from '../data/site';
import { api } from '../lib/api';
import { formatAED, imageUrl } from '../lib/catalog';

const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'];

const PAYMENTS = [
  { value: 'cash_on_delivery', icon: Banknote, title: 'Cash on delivery', text: 'Pay when your order arrives.' },
  { value: 'bank_transfer', icon: Building2, title: 'Bank transfer', text: 'We’ll send our bank details to confirm your order.' },
];

function Step({ number, title, children }) {
  return (
    <section className="rounded-[10px] border border-navy/12 bg-white p-5 sm:p-7">
      <h2 className="flex items-center gap-3 text-xl font-bold">
        <span className="grid size-7 place-items-center rounded-full bg-navy font-mono text-[12px] font-medium text-white">{number}</span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Confirmation({ order }) {
  const message = `Hello Ideal Pack, I placed order ${order.orderId} for ${formatAED(order.totalAmount)}.`;
  return (
    <div className="shell max-w-xl py-16 text-center lg:py-24">
      <CheckCircle2 size={52} className="mx-auto text-blue" aria-hidden="true" />
      <h1 className="mt-5 text-4xl font-bold">Thank you for your order</h1>
      <p className="mt-3 text-[16px] leading-relaxed text-ink/75">We’ve received it and will contact you at {order.customer.phone} to arrange delivery.</p>
      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-navy/12 bg-navy/12 text-left">
        <div className="bg-white p-4">
          <dt className="text-[13px] text-ink/70">Order number</dt>
          <dd className="mt-1 font-mono text-[15px] text-navy">{order.orderId}</dd>
        </div>
        <div className="bg-white p-4">
          <dt className="text-[13px] text-ink/70">Total</dt>
          <dd className="mt-1 font-mono text-[15px] text-navy">{formatAED(order.totalAmount)}</dd>
        </div>
      </dl>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href={whatsappLink(message)} target="_blank" rel="noreferrer" variant="navy"><MessageCircle size={17} /> Confirm on WhatsApp</Button>
        <Button to="/shop" variant="outline">Continue shopping</Button>
      </div>
    </div>
  );
}

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { total } = useTotals();
  const { state } = useLocation();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', emirate: 'Dubai', city: '', address: '', building: '', paymentMethod: 'cash_on_delivery', notes: state?.note ?? '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  if (order) return <Confirmation order={order} />;
  if (!cart.length) return <Navigate to="/cart" replace />;

  const bind = (name) => ({
    name,
    value: form[name],
    onChange: (event) => setForm((current) => ({ ...current, [name]: event.target.value })),
  });

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const data = await api('/api/orders', {
        method: 'POST',
        timeout: 30000,
        body: {
          items: cart,
          customer: { name: `${form.firstName} ${form.lastName}`.trim(), email: form.email, phone: form.phone },
          shippingAddress: { emirate: form.emirate, city: form.city || form.emirate, address: form.address, buildingVilla: form.building },
          paymentMethod: form.paymentMethod,
          totalAmount: total,
          notes: form.notes,
        },
      });
      setOrder(data.order);
      clearCart();
    } catch {
      setError('We couldn’t place your order, and you have not been charged. Please try again or contact us on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageIntro title="Checkout" crumbs={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <form onSubmit={submit} className="shell grid items-start gap-6 py-8 lg:grid-cols-[1fr_400px] lg:gap-8 lg:py-12">
        <div className="space-y-5">
          <Step number="1" title="Contact details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" required autoComplete="given-name" {...bind('firstName')} />
              <Field label="Last name" autoComplete="family-name" {...bind('lastName')} />
              <Field label="Email" type="email" required autoComplete="email" {...bind('email')} />
              <Field label="Phone" type="tel" required autoComplete="tel" placeholder="+971" {...bind('phone')} />
            </div>
          </Step>

          <Step number="2" title="Delivery address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field as="select" label="Emirate" required {...bind('emirate')}>
                {EMIRATES.map((emirate) => <option key={emirate}>{emirate}</option>)}
              </Field>
              <Field label="City or area" {...bind('city')} />
              <Field label="Street address" required autoComplete="street-address" className="sm:col-span-2" {...bind('address')} />
              <Field label="Building, villa or office" className="sm:col-span-2" {...bind('building')} />
              <Field as="textarea" label="Order notes" className="sm:col-span-2" {...bind('notes')} />
            </div>
          </Step>

          <Step number="3" title="Payment">
            <div className="grid gap-3 sm:grid-cols-2">
              {PAYMENTS.map(({ value, icon: Icon, title, text }) => {
                const active = form.paymentMethod === value;
                return (
                  <label key={value} className={`flex cursor-pointer gap-3 rounded-lg border p-4 transition-colors ${active ? 'border-blue bg-mist' : 'border-navy/15 hover:border-navy/40'}`}>
                    <input type="radio" name="paymentMethod" value={value} checked={active} onChange={bind('paymentMethod').onChange} className="mt-1 accent-blue" />
                    <span>
                      <span className="flex items-center gap-2 text-[15px] font-semibold text-navy"><Icon size={17} aria-hidden="true" /> {title}</span>
                      <span className="mt-1 block text-[13.5px] text-ink/70">{text}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </Step>
        </div>

        <div className="lg:sticky lg:top-24">
          <OrderSummary>
            <ul className="mt-5 max-h-64 space-y-3 overflow-y-auto border-t border-navy/10 pt-4">
              {cart.map((item) => (
                <li key={item.handle} className="flex items-center gap-3">
                  <img src={imageUrl(item.image, 96)} alt="" className="size-11 shrink-0 rounded border border-navy/10 object-contain p-0.5" />
                  <span className="line-clamp-1 flex-1 text-[13px] text-navy">{item.quantity} × {item.title}</span>
                  <span className="shrink-0 font-mono text-[12.5px] text-navy">{formatAED(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            {error && <p role="alert" className="mt-4 rounded-md border border-red/40 p-3 text-[13.5px] font-medium text-red">{error}</p>}
            <Button type="submit" variant="red" size="lg" className="mt-5 w-full" disabled={submitting}>
              {submitting ? 'Placing order…' : `Place order · ${formatAED(total)}`}
            </Button>
            <Link to="/cart" className="mt-3 block text-center text-[14px] font-semibold text-blue hover:text-navy">Back to cart</Link>
          </OrderSummary>
        </div>
      </form>
    </>
  );
}
