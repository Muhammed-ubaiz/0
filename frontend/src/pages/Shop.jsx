import CatalogView from '../components/catalog/CatalogView';
import PageIntro from '../components/ui/PageIntro';
import { categories, products } from '../lib/catalog';

export default function Shop() {
  return (
    <>
      <PageIntro wide title="Shop all packaging" intro={`${products.length} products across ${categories.length} categories, priced in AED.`} crumbs={[{ label: 'Shop' }]} />
      <CatalogView />
    </>
  );
}
