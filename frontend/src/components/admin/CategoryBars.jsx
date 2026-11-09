import { useState } from 'react';
import { categoriesBySize } from '../../lib/catalog';

export default function CategoryBars() {
  const [hovered, setHovered] = useState(null);
  const max = categoriesBySize[0].products_count;
  const total = categoriesBySize.reduce((sum, category) => sum + category.products_count, 0);

  return (
    <figure>
      <figcaption className="text-lg font-bold text-navy">Products by category</figcaption>
      <ul className="mt-4 space-y-0.5">
        {categoriesBySize.map((category) => (
          <li
            key={category.handle}
            onMouseEnter={() => setHovered(category.handle)}
            onMouseLeave={() => setHovered(null)}
            className={`grid grid-cols-[minmax(0,10.5rem)_1fr_2.5rem] items-center gap-3 rounded px-1 py-1.5 transition-colors ${hovered === category.handle ? 'bg-mist' : ''}`}
            title={`${category.name}: ${category.products_count} products, ${Math.round((category.products_count / total) * 100)}% of the catalogue`}
          >
            <span className="truncate text-[13.5px] text-ink/80">{category.name}</span>
            <span className="h-3 border-l border-navy/25">
              <span className="block h-full rounded-r bg-blue" style={{ width: `${(category.products_count / max) * 100}%` }} />
            </span>
            <span className="text-right font-mono text-[12.5px] text-navy">{category.products_count}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
