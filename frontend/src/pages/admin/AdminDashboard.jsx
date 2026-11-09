import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ClipboardList, ExternalLink, Inbox, LayoutDashboard, Lock, Package, Search } from 'lucide-react';
import CategoryBars from '../../components/admin/CategoryBars';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { categories, categoryName, formatAED, imageUrl, products, searchProducts } from '../../lib/catalog';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'inquiries', label: 'Enquiries', icon: Inbox },
];

const PRODUCT_LIMIT = 50;
const formatDate = (value) => new Date(value).toLocaleString('en-AE', { dateStyle: 'medium', timeStyle: 'short' });

function Stat({ label, value, note }) {
  return (
    <div className="rounded-[10px] border border-navy/12 bg-white p-5">
      <p className="text-[13px] text-ink/70">{label}</p>
      <p className="mt-1.5 font-display text-3xl font-bold text-navy">{value}</p>
      {note && <p className="mt-1 text-[12.5px] text-ink/65">{note}</p>}
    </div>
  );
}

function Locked() {
  return (
    <div className="rounded-[10px] border border-navy/12 bg-white px-6 py-16 text-center">
      <Lock size={26} className="mx-auto text-blue" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-bold">Sign in as an admin to see this</h2>
      <p className="mx-auto mt-1.5 max-w-md text-[14.5px] text-ink/70">Customer orders and enquiries are private and only load for approved admin accounts.</p>
    </div>
  );
}

function Empty({ text }) {
  return <p className="rounded-[10px] border border-navy/12 bg-white px-6 py-16 text-center text-[15px] text-ink/70">{text}</p>;
}

const th = 'whitespace-nowrap px-4 py-3 text-left font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-blue';
const td = 'px-4 py-3 align-middle';

function Table({ head, children }) {
  return (
    <div className="overflow-x-auto rounded-[10px] border border-navy/12 bg-white">
      <table className="w-full min-w-[640px] text-[14px]">
        <thead className="border-b border-navy/12 bg-mist">
          <tr>{head.map((label) => <th key={label} className={th}>{label}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-navy/8">{children}</tbody>
      </table>
    </div>
  );
}

function Overview({ orders, canRead }) {
  const prices = products.map((product) => product.price).sort((a, b) => a - b);
  const median = prices[Math.floor(prices.length / 2)];
  const revenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <Stat label="Products" value={products.length} note={`${categories.length} categories`} />
        <Stat label="Median price" value={formatAED(median)} note={`${formatAED(prices[0])} to ${formatAED(prices[prices.length - 1])}`} />
        <Stat label="Orders" value={canRead ? orders.length : '—'} note={canRead ? 'Most recent 200' : 'Admin sign-in required'} />
        <Stat label="Order value" value={canRead ? formatAED(revenue) : '—'} note={canRead ? 'Across these orders' : 'Admin sign-in required'} />
      </div>
      <div className="rounded-[10px] border border-navy/12 bg-white p-5 lg:p-6">
        <CategoryBars />
      </div>
    </div>
  );
}

function Products() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => (query.trim() ? searchProducts(query) : products), [query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex h-10 w-full max-w-sm items-center gap-2 rounded-md border border-navy/20 bg-white px-3">
          <Search size={16} className="text-blue" aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, size or SKU" aria-label="Search products" className="min-w-0 flex-1 bg-transparent text-[14px] outline-none placeholder:text-ink/50" />
        </label>
        <p className="font-mono text-[12.5px] text-ink/70">Showing {Math.min(PRODUCT_LIMIT, results.length)} of {results.length}</p>
      </div>
      <Table head={['Product', 'SKU', 'Category', 'Price', 'Stock']}>
        {results.slice(0, PRODUCT_LIMIT).map((product) => (
          <tr key={product.handle} className="hover:bg-mist/60">
            <td className={td}>
              <Link to={`/product/${product.handle}`} className="flex items-center gap-3 hover:text-blue">
                <img src={imageUrl(product.image, 80)} alt="" className="size-10 shrink-0 object-contain" />
                <span className="line-clamp-1 max-w-md font-medium text-navy">{product.title}</span>
              </Link>
            </td>
            <td className={`${td} whitespace-nowrap font-mono text-[12.5px]`}>{product.sku}</td>
            <td className={`${td} whitespace-nowrap`}>{categoryName(product.category)}</td>
            <td className={`${td} whitespace-nowrap font-mono text-[13px] text-navy`}>{formatAED(product.price)}</td>
            <td className={td}>{product.in_stock ? 'In stock' : 'Out of stock'}</td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

function Orders({ orders }) {
  if (!orders.length) return <Empty text="No orders yet." />;
  return (
    <Table head={['Order', 'Date', 'Customer', 'Emirate', 'Payment', 'Total']}>
      {orders.map((order) => (
        <tr key={order.orderId}>
          <td className={`${td} whitespace-nowrap font-mono text-[13px] text-navy`}>{order.orderId}</td>
          <td className={`${td} whitespace-nowrap`}>{formatDate(order.createdAt)}</td>
          <td className={td}>
            <p className="font-medium text-navy">{order.customer?.name}</p>
            <p className="text-[12.5px] text-ink/70">{order.customer?.phone}</p>
          </td>
          <td className={td}>{order.shippingAddress?.emirate}</td>
          <td className={`${td} whitespace-nowrap`}>{order.paymentMethod?.replace(/_/g, ' ')}</td>
          <td className={`${td} whitespace-nowrap font-mono text-[13px] text-navy`}>{formatAED(order.totalAmount)}</td>
        </tr>
      ))}
    </Table>
  );
}

function Inquiries({ inquiries }) {
  if (!inquiries.length) return <Empty text="No enquiries yet." />;
  return (
    <Table head={['Date', 'Type', 'From', 'Message']}>
      {inquiries.map((inquiry) => (
        <tr key={inquiry.id}>
          <td className={`${td} whitespace-nowrap`}>{formatDate(inquiry.createdAt)}</td>
          <td className={`${td} capitalize`}>{inquiry.type}</td>
          <td className={td}>
            <p className="font-medium text-navy">{inquiry.name || inquiry.email}</p>
            <p className="text-[12.5px] text-ink/70">{inquiry.phone || inquiry.email}</p>
          </td>
          <td className={`${td} max-w-md`}>{inquiry.message}</td>
        </tr>
      ))}
    </Table>
  );
}

export default function AdminDashboard() {
  const { user, loading, getToken } = useAuth();
  const [tab, setTab] = useState('overview');
  const [data, setData] = useState({ orders: [], inquiries: [] });
  const [access, setAccess] = useState('checking');

  useEffect(() => {
    if (loading) return undefined;
    let cancelled = false;
    (async () => {
      const token = await getToken();
      if (!token) {
        if (!cancelled) setAccess('denied');
        return;
      }
      try {
        const [orders, inquiries] = await Promise.all([
          api('/api/admin/orders', { token }),
          api('/api/admin/inquiries', { token }),
        ]);
        if (!cancelled) {
          setData({ orders, inquiries });
          setAccess('granted');
        }
      } catch {
        if (!cancelled) setAccess('denied');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loading, getToken, user]);

  const isPreview = import.meta.env.DEV && access === 'denied';
  const canRead = access === 'granted';

  if (!import.meta.env.DEV && !loading && !user) return <Navigate to="/login" replace state={{ from: '/admin' }} />;
  if (!import.meta.env.DEV && access === 'denied') {
    return (
      <div className="grid min-h-screen place-items-center bg-mist p-6">
        <div className="max-w-md">
          <Locked />
          <Link to="/" className="mt-4 block text-center text-[14px] font-semibold text-blue">Back to the store</Link>
        </div>
      </div>
    );
  }

  const title = TABS.find((item) => item.id === tab).label;
  const privateTab = tab === 'orders' || tab === 'inquiries';

  return (
    <div className="min-h-screen bg-mist lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="on-dark bg-navy text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <div className="flex items-center justify-between p-4 lg:block lg:p-5">
          <span className="inline-block rounded-md bg-white px-2.5 py-1.5">
            <img src="/logo-original.png" alt="Ideal Pack" className="h-7 w-auto" />
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/70 lg:mt-3">Admin</p>
        </div>
        <nav className="no-scrollbar flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-1 lg:flex-col lg:overflow-visible">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" onClick={() => setTab(id)} aria-current={tab === id ? 'page' : undefined} className={`flex h-10 shrink-0 items-center gap-2.5 rounded-md px-3 text-[14px] font-medium transition-colors ${tab === id ? 'bg-blue' : 'hover:bg-white/10'}`}>
              <Icon size={17} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>
        <Link to="/" className="hidden items-center gap-2 border-t border-white/15 p-5 text-[13.5px] font-semibold hover:underline lg:flex">
          <ExternalLink size={15} aria-hidden="true" /> View store
        </Link>
      </aside>

      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        {isPreview && (
          <p className="mt-3 rounded-md border border-blue/30 bg-white p-3 text-[13.5px] text-navy">
            Development preview: catalogue data is live, while orders and enquiries need an approved admin sign-in.
          </p>
        )}
        <div className="mt-6">
          {access === 'checking' && <p className="text-[14px] text-ink/70">Loading…</p>}
          {access !== 'checking' && tab === 'overview' && <Overview orders={data.orders} canRead={canRead} />}
          {access !== 'checking' && tab === 'products' && <Products />}
          {access !== 'checking' && privateTab && !canRead && <Locked />}
          {canRead && tab === 'orders' && <Orders orders={data.orders} />}
          {canRead && tab === 'inquiries' && <Inquiries inquiries={data.inquiries} />}
        </div>
      </main>
    </div>
  );
}
