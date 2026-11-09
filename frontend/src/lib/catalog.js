import { products, categories } from '../data/products';
import { featuredHandles, bestSellerHandles } from '../data/site';

export { products, categories };

const productIndex = new Map(products.map((product) => [product.handle, product]));

export const getProduct = (handle) => productIndex.get(handle);
export const getCategory = (handle) => categories.find((category) => category.handle === handle);
export const categoryName = (handle) => getCategory(handle)?.name ?? '';
export const inCategory = (handle) => products.filter((product) => product.category === handle);

export const categoriesBySize = [...categories].sort((a, b) => b.products_count - a.products_count);

export const formatAED = (value) =>
  `AED ${Number(value || 0).toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Requests a sized version of a Shopify CDN image. */
export function imageUrl(url, width = 600) {
  if (!url) return '';
  return url.includes('cdn/shop') ? `${url}${url.includes('?') ? '&' : '?'}width=${width}` : url;
}

/** Percentage off, only when the product has a genuine compare-at price. */
export function discountPercent(product) {
  const was = Number(product.compare_at_price);
  return was > product.price ? Math.round(((was - product.price) / was) * 100) : 0;
}

/** Reads size, capacity and pack count from the product title. */
export function productSpecs(product) {
  const title = product.title;
  const capacity = title.match(/(\d+(?:\.\d+)?)\s?(ml|cc|ltr|litres?|liters?|oz)\b/i);
  const size = title.match(/(\d+(?:\.\d+)?)\s?[x×*]\s?(\d+(?:\.\d+)?)(?:\s?[x×*]\s?(\d+(?:\.\d+)?))?\s?(mm|cm|inch(?:es)?|in\b|")?/i);
  const pack =
    title.match(/(\d[\d,]*)\s?(?:pcs?|pieces?)\b/i) ?? title.match(/pack\s+of\s+(\d[\d,]*)/i);
  const pieces = pack ? Number(pack[1].replace(/,/g, '')) : 0;

  return {
    capacity: capacity ? `${capacity[1]} ${capacity[2].replace(/^(ltr|litres?|liters?)$/i, 'L').replace(/^ml$/i, 'ml')}` : null,
    size: size ? [size[1], size[2], size[3]].filter(Boolean).join(' × ') + (size[4] ? ` ${size[4]}` : '') : null,
    pieces,
    pricePerPiece: pieces > 1 ? product.price / pieces : null,
  };
}

const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[×*]/g, 'x')
    .replace(/\b(litres?|liters?|ltrs?)\b/g, 'l')
    .replace(/\b(cc|millilit(?:er|re)s?)\b/g, 'ml')
    .replace(/\bounces?\b/g, 'oz')
    .replace(/\b(pieces?|pcs)\b/g, 'pc')
    .replace(/(\d)\s+(ml|l|oz|g|gm|kg|mm|cm|pc)\b/g, '$1$2')
    .replace(/(\d)\s*x\s*(\d)/g, '$1x$2')
    .trim();

const searchIndex = products.map((product) => ({
  product,
  title: normalize(product.title),
  text: normalize(`${product.title} ${categoryName(product.category)} ${product.sku}`),
}));

/** Unit-aware search, so "500 ml", "500ml" and "500 cc" all match. */
export function searchProducts(query, limit) {
  const terms = normalize(query || '').split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const results = searchIndex
    .filter((entry) => terms.every((term) => entry.text.includes(term)))
    .sort((a, b) => Number(b.title.startsWith(terms[0])) - Number(a.title.startsWith(terms[0])))
    .map((entry) => entry.product);
  return limit ? results.slice(0, limit) : results;
}

const pickAcross = (handles, count, offset) => {
  const pools = handles.map(inCategory);
  const picked = [];
  for (let i = offset; picked.length < count && i < offset + 40; i += 1) {
    const pool = pools[picked.length % pools.length];
    const item = pool[i % pool.length];
    if (item && !picked.includes(item)) picked.push(item);
  }
  return picked;
};

/** Everyday-priced products with a known size, spread across the range. */
export function heroLineup(handle, count = 3) {
  const seen = new Set();
  const pool = inCategory(handle).filter((item) => {
    // Glass jars with metal lids are filed under aluminium but don't represent it.
    if (handle === 'aluminium-products' && /\b(jar|glass)\b/i.test(item.title)) return false;
    if (item.price >= 60 || !productSpecs(item).capacity || seen.has(item.image)) return false;
    seen.add(item.image);
    return true;
  });
  if (pool.length <= count) return pool.length ? pool : inCategory(handle).slice(0, count);
  return Array.from({ length: count }, (_, index) => pool[Math.floor((index * pool.length) / count)]);
}

const fromHandles = (handles) => handles.map(getProduct).filter(Boolean);

const MERCH_CATEGORIES = ['aluminium-products', 'black-base-containers', 'kraft-products', 'clear-containers'];

export const featuredProducts = () =>
  featuredHandles.length ? fromHandles(featuredHandles) : pickAcross(MERCH_CATEGORIES, 8, 0);

export const bestSellers = () =>
  bestSellerHandles.length
    ? fromHandles(bestSellerHandles)
    : pickAcross(['paper-products', 'aluminium-products', 'plastic-products', 'eco-friendly-products'], 10, 3);

/** Genuine reductions first; otherwise the lowest priced everyday items. */
export function specialOffers(count = 4) {
  const reduced = products.filter((product) => discountPercent(product) > 0);
  if (reduced.length) {
    return {
      isValue: false,
      items: reduced.sort((a, b) => discountPercent(b) - discountPercent(a)).slice(0, count),
    };
  }
  return {
    isValue: true,
    items: [...products].filter((product) => product.price < 10).sort((a, b) => a.price - b.price).slice(0, count),
  };
}
