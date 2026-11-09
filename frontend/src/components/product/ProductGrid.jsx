import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, columns = 'lg:grid-cols-4' }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 ${columns}`}>
      {products.map((product, index) => (
        <motion.div
          key={product.handle}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: Math.min(index, 7) * 0.04 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
}
