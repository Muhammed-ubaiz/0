import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categoriesBySize, imageUrl } from '../../lib/catalog';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { Eyebrow } from '../ui/SectionHeading';

// This category's image is a full photo, so it fills the circle.
const FULL_BLEED = new Set(['cleaning-tools']);

function CategoryCircle({ category }) {
  const photo = FULL_BLEED.has(category.handle)
    ? 'inset-0 size-full object-cover'
    : 'inset-[13%] size-[74%] scale-125 object-contain photo-clean group-hover:scale-[1.38]';

  return (
    <Link to={`/category/${category.handle}`} className="group flex flex-col items-center text-center">
      <span className="relative block aspect-square w-full max-w-[188px]">
        <span className="absolute -inset-1.5 rounded-full border border-transparent transition-colors duration-300 group-hover:border-blue/35" aria-hidden="true" />
        <span className="absolute inset-0 overflow-hidden rounded-full border border-navy/10 bg-white transition-all duration-300 group-hover:shadow-lift">
          <img src={imageUrl(category.image, 400)} alt="" loading="lazy" className={`absolute transition-transform duration-500 ease-out ${photo}`} />
        </span>
      </span>
      <span className="mt-4 text-[13.5px] font-semibold leading-snug text-navy transition-colors group-hover:text-blue sm:text-[15px]">{category.name}</span>
      <span className="mt-0.5 text-[12px] text-ink/65 sm:text-[12.5px]">{category.products_count} products</span>
    </Link>
  );
}

export default function CategoryShowcase() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="shell">
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <Eyebrow className="justify-center">Shop by category</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold sm:text-[44px] sm:leading-[1.1]">Everything a kitchen packs, in one place</h2>
        </div>

        <ul className="grid grid-cols-3 gap-x-3 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-6 lg:gap-y-11">
          {categoriesBySize.map((category, index) => (
            <li key={category.handle} className="flex justify-center">
              <Reveal delay={Math.min(index, 8) * 0.03} className="w-full">
                <CategoryCircle category={category} />
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-11 text-center">
          <Button to="/categories" variant="outline">
            View all categories <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
