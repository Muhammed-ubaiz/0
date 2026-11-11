import { useParams } from 'react-router-dom';
import { PackageSearch } from 'lucide-react';
import CatalogView from '../components/catalog/CatalogView';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { Breadcrumbs } from '../components/ui/PageIntro';
import { formatAED, getCategory, imageUrl, inCategory } from '../lib/catalog';

function Fact({ children }) {
  return (
    <span className="inline-flex h-9 items-center rounded-full border border-navy/12 bg-white px-4 text-[13.5px] font-semibold text-navy">
      {children}
    </span>
  );
}

export default function CategoryPage() {
  const { handle } = useParams();
  const category = getCategory(handle);

  if (!category) {
    return (
      <EmptyState icon={PackageSearch} title="Category not found" text="This category may have moved. Browse the full range instead.">
        <Button to="/categories">All categories</Button>
      </EmptyState>
    );
  }

  const lowest = Math.min(...inCategory(handle).map((product) => product.price));

  return (
    <>
      <div className="overflow-hidden border-b border-navy/10 bg-white">
        <div className="shell-wide grid items-center gap-8 py-8 sm:grid-cols-[1fr_auto] lg:py-10">
          <div className="max-w-2xl">
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Categories', to: '/categories' }, { label: category.name }]} />
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] sm:text-5xl">{category.name}</h1>
            <p className="mt-3 text-[16px] leading-relaxed text-ink/75">{category.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Fact>{category.products_count} products</Fact>
              <Fact>From {formatAED(lowest)}</Fact>
            </div>
          </div>

          <div className="relative mr-2 hidden size-44 sm:block lg:size-52" aria-hidden="true">
            <span className="absolute -inset-3 rounded-full border border-navy/10" />
            <span className="absolute inset-0 overflow-hidden rounded-full bg-white shadow-lift">
              <img src={imageUrl(category.image, 480)} alt="" className="absolute inset-[16%] size-[68%] scale-125 object-contain" />
            </span>
          </div>
        </div>
      </div>
      <CatalogView key={handle} lockedCategory={handle} />
    </>
  );
}
