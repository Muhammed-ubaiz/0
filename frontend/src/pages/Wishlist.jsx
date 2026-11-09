import { Heart } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import PageIntro from '../components/ui/PageIntro';
import { useWishlist } from '../context/CartContext';
import { getProduct } from '../lib/catalog';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const items = wishlist.map((item) => getProduct(item.handle)).filter(Boolean);

  return (
    <>
      <PageIntro title="Your wishlist" intro={items.length ? `${items.length} saved ${items.length === 1 ? 'product' : 'products'}.` : undefined} crumbs={[{ label: 'Wishlist' }]} />
      {items.length ? (
        <div className="shell py-10 lg:py-14">
          <ProductGrid key={items.length} products={items} />
        </div>
      ) : (
        <EmptyState icon={Heart} title="Nothing saved yet" text="Tap the heart on any product to keep it here for your next order.">
          <Button to="/shop">Browse products</Button>
        </EmptyState>
      )}
    </>
  );
}
