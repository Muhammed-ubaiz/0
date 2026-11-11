import BestSellers from '../components/home/BestSellers';
import CategoryShowcase from '../components/home/CategoryShowcase';
import EcoCollection from '../components/home/EcoCollection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Hero, { CategoryStrip } from '../components/home/Hero';
import Newsletter from '../components/home/Newsletter';
import SpecialOffers from '../components/home/SpecialOffers';
import Testimonials from '../components/home/Testimonials';
import WholesaleBanner from '../components/home/WholesaleBanner';
import WhyChoose from '../components/home/WhyChoose';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <CategoryShowcase />
      <FeaturedProducts />
      <BestSellers />
      <SpecialOffers />
      <EcoCollection />
      <WholesaleBanner />
      <WhyChoose />
      <Testimonials />
      <Newsletter />
    </>
  );
}
