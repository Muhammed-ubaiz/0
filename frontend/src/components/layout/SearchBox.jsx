import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { formatAED, imageUrl, products, searchProducts } from '../../lib/catalog';

export default function SearchBox({ className = '' }) {
  const [query, setQuery] = useState('');
  const [openOn, setOpenOn] = useState(null);
  const box = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const open = openOn === pathname;
  const setOpen = (next) => setOpenOn(next ? pathname : null);

  const suggestions = useMemo(() => searchProducts(query, 6), [query]);

  useEffect(() => {
    const onDown = (event) => {
      if (!box.current?.contains(event.target)) setOpenOn(null);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);

  const submit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div ref={box} className={`relative ${className}`}>
      <form role="search" onSubmit={submit} className="flex h-11 items-center rounded-md border border-navy/20 bg-white transition-colors focus-within:border-blue">
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => event.key === 'Escape' && setOpen(false)}
          placeholder={`Search ${products.length} products, sizes, materials`}
          aria-label="Search products"
          className="h-full min-w-0 flex-1 bg-transparent px-3.5 text-[14.5px] outline-none placeholder:text-ink/50"
        />
        <button type="submit" aria-label="Search" className="m-1 grid size-9 shrink-0 place-items-center rounded-[5px] bg-navy text-white transition-colors hover:bg-blue">
          <Search size={17} />
        </button>
      </form>

      {open && query.trim() && (
        <div className="absolute inset-x-0 top-full z-50 mt-1.5 overflow-hidden rounded-lg border border-navy/12 bg-white shadow-panel">
          {suggestions.length ? (
            <>
              <ul>
                {suggestions.map((product) => (
                  <li key={product.handle}>
                    <Link to={`/product/${product.handle}`} className="flex items-center gap-3 px-3 py-2 hover:bg-mist">
                      <img src={imageUrl(product.image, 96)} alt="" className="size-11 shrink-0 object-contain" />
                      <span className="line-clamp-1 flex-1 text-[13.5px] text-navy">{product.title}</span>
                      <span className="shrink-0 font-mono text-[12px] text-ink/70">{formatAED(product.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button type="button" onClick={submit} className="w-full border-t border-navy/10 px-3 py-2.5 text-left text-[13px] font-semibold text-blue hover:bg-mist">
                See all results for “{query.trim()}”
              </button>
            </>
          ) : (
            <p className="px-4 py-4 text-[13.5px] text-ink/70">No products match “{query.trim()}”. Try a size or material, such as 500 ml or kraft.</p>
          )}
        </div>
      )}
    </div>
  );
}
