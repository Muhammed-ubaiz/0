import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Heart, MessageCircle, PackageSearch, ShoppingBag, Store, Truck, Wallet } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { Breadcrumbs } from '../components/ui/PageIntro';
import QuantityStepper from '../components/ui/QuantityStepper';
import SectionHeading from '../components/ui/SectionHeading';
import { useCart, useWishlist } from '../context/CartContext';
import { whatsappLink } from '../data/site';
import { categoryName, discountPercent, formatAED, getProduct, imageUrl, inCategory, productSpecs } from '../lib/catalog';

const PROMISES = [
  { icon: Truck, text: 'Delivery across all 7 emirates. Free over AED 200.' },
  { icon: Wallet, text: 'Pay by cash on delivery or bank transfer.' },
  { icon: Store, text: 'Need cartons? Ask our team for wholesale pricing.' },
];

export default function ProductDetails() {
  const { handle } = useParams();
  return <ProductView key={handle} handle={handle} />;
}

function ProductView({ handle }) {
  const product = getProduct(handle);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <EmptyState icon={PackageSearch} title="Product not found" text="This product may no longer be available.">
        <Button to="/shop">Back to shop</Button>
      </EmptyState>
    );
  }

  const images = product.images?.length ? product.images : [product.image];
  const specs = productSpecs(product);
  const off = discountPercent(product);
  const saved = isInWishlist(product.handle);
  const related = inCategory(product.category).filter((item) => item.handle !== product.handle).slice(0, 4);

  const rows = [
    ['SKU', product.sku],
    ['Category', categoryName(product.category)],
    ['Capacity', specs.capacity],
    ['Size', specs.size],
    ['Pieces', specs.pieces > 1 ? specs.pieces.toLocaleString('en-AE') : null],
    ['Brand', product.vendor],
  ].filter(([, value]) => value);

  const enquiry = whatsappLink(`Hello Ideal Pack, I'd like to ask about ${product.title} (SKU ${product.sku}), quantity ${quantity}.`);

  const buyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <>
      <div className="shell py-6 pb-28 lg:py-8 lg:pb-16">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: categoryName(product.category), to: `/category/${product.category}` },
            { label: product.title },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative aspect-square overflow-hidden rounded-[10px] border border-navy/12 bg-white p-8 sm:p-14">
              <img src={imageUrl(images[activeImage], 1000)} alt={product.title} className="size-full object-contain" />
              {off > 0 && <span className="absolute left-4 top-4 rounded bg-red px-2.5 py-1 text-[12.5px] font-semibold text-white">{off}% off</span>}
            </div>
            {images.length > 1 && (
              <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View image ${index + 1}`}
                    aria-pressed={index === activeImage}
                    className={`size-20 shrink-0 rounded-md border bg-white p-1.5 transition-colors ${index === activeImage ? 'border-blue' : 'border-navy/12 hover:border-navy/40'}`}
                  >
                    <img src={imageUrl(image, 160)} alt="" className="size-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <Link to={`/category/${product.category}`} className="font-mono text-[12px] uppercase tracking-[0.08em] text-blue hover:underline">
              {categoryName(product.category)}
            </Link>
            <h1 className="mt-3 text-[28px] font-bold leading-[1.15] sm:text-[34px]">{product.title}</h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-navy/10 pb-5">
              <span className={`font-display text-[34px] font-bold ${off ? 'text-red' : 'text-navy'}`}>{formatAED(product.price)}</span>
              {off > 0 && <s className="text-lg text-ink/55">{formatAED(product.compare_at_price)}</s>}
              {specs.pricePerPiece && <span className="font-mono text-[13px] text-ink/70">{formatAED(specs.pricePerPiece)} per piece</span>}
              <span className="w-full text-[13px] text-ink/65">Price includes 5% VAT</span>
            </div>

            <div className="mt-6 flex gap-2.5">
              <QuantityStepper value={quantity} onChange={setQuantity} />
              <Button size="md" className="min-w-0 flex-1" onClick={() => addToCart(product, quantity)}>
                <ShoppingBag size={18} /> Add to Cart
              </Button>
              <button type="button" onClick={() => toggleWishlist(product)} aria-pressed={saved} aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'} className="grid size-11 place-items-center rounded-md border border-navy/20 text-navy transition-colors hover:bg-mist">
                <Heart size={19} className={saved ? 'fill-red text-red' : ''} />
              </button>
            </div>
            <div className="mt-2.5 grid gap-2.5 sm:grid-cols-2">
              <Button variant="red" onClick={buyNow}>Buy now</Button>
              <Button variant="outline" href={enquiry} target="_blank" rel="noreferrer">
                <MessageCircle size={17} /> Ask on WhatsApp
              </Button>
            </div>

            <ul className="mt-6 space-y-3 rounded-[10px] bg-mist p-5">
              {PROMISES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-[14px] text-navy">
                  <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h2 className="text-xl font-bold">Specifications</h2>
              <dl className="mt-3 divide-y divide-navy/10 border-y border-navy/10">
                {rows.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-6 py-2.5 text-[14px]">
                    <dt className="text-ink/70">{label}</dt>
                    <dd className="text-right font-mono text-[13px] text-navy">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold">Description</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="bg-mist py-14 lg:py-20">
          <div className="shell">
            <SectionHeading eyebrow="More in this range" title="You may also need" linkTo={`/category/${product.category}`} linkLabel={`All ${categoryName(product.category)}`} />
            <ProductGrid key={handle} products={related} />
          </div>
        </section>
      )}

      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-navy/12 bg-white p-3 lg:hidden">
        <span className="font-display text-lg font-bold text-navy">{formatAED(product.price * quantity)}</span>
        <Button className="flex-1" onClick={() => addToCart(product, quantity)}>
          <ShoppingBag size={17} /> Add to Cart
        </Button>
      </div>
    </>
  );
}
