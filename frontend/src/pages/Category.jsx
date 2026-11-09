import { useParams } from 'react-router-dom';
import { PackageSearch } from 'lucide-react';
import CatalogView from '../components/catalog/CatalogView';
import Button from '../components/ui/Button';
import Dieline from '../components/ui/Dieline';
import EmptyState from '../components/ui/EmptyState';
import { Breadcrumbs } from '../components/ui/PageIntro';
import { Eyebrow } from '../components/ui/SectionHeading';
import { getCategory, imageUrl } from '../lib/catalog';

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

  return (
    <>
      <div className="on-dark relative overflow-hidden bg-navy text-white">
        <Dieline className="absolute -right-24 top-1/2 w-[760px] max-w-none -translate-y-1/2 text-white/10" />
        <div className="shell relative grid items-center gap-6 py-9 sm:grid-cols-[1fr_auto] lg:py-12">
          <div className="max-w-2xl">
            <Breadcrumbs light items={[{ label: 'Home', to: '/' }, { label: 'Categories', to: '/categories' }, { label: category.name }]} />
            <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl">{category.name}</h1>
            <p className="mt-3 text-[16px] leading-relaxed text-white/80">{category.description}</p>
            <Eyebrow light className="mt-5">{category.products_count} products</Eyebrow>
          </div>
          <div className="hidden size-44 rounded-[10px] bg-white p-4 shadow-panel sm:block lg:size-52">
            <img src={imageUrl(category.image, 480)} alt="" className="size-full object-contain" />
          </div>
        </div>
      </div>
      <CatalogView key={handle} lockedCategory={handle} />
    </>
  );
}
