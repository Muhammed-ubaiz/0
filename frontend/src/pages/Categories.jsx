import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageIntro from '../components/ui/PageIntro';
import Reveal from '../components/ui/Reveal';
import { categoriesBySize, imageUrl } from '../lib/catalog';

export default function CategoriesPage() {
  return (
    <>
      <PageIntro title="All categories" intro="Choose a range to see every size and pack available." crumbs={[{ label: 'Categories' }]} />
      <div className="shell grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 lg:py-14">
        {categoriesBySize.map((category, index) => (
          <Reveal key={category.handle} delay={Math.min(index, 5) * 0.04}>
            <Link to={`/category/${category.handle}`} className="group flex h-full overflow-hidden rounded-[10px] border border-navy/12 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue/45 hover:shadow-lift">
              <div className="w-2/5 shrink-0 bg-mist p-4">
                <img src={imageUrl(category.image, 360)} alt="" loading="lazy" className="aspect-square size-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-[11px] text-blue">{category.products_count} products</p>
                <h2 className="mt-1.5 text-xl font-bold leading-tight">{category.name}</h2>
                <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed text-ink/70">{category.description}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[13.5px] font-semibold text-blue">
                  Browse <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
