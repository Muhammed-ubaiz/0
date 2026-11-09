import { ArrowRight, Boxes, Headset, MapPin, Truck } from 'lucide-react';
import Button from '../components/ui/Button';
import Dieline from '../components/ui/Dieline';
import { Breadcrumbs } from '../components/ui/PageIntro';
import Reveal from '../components/ui/Reveal';
import { Eyebrow } from '../components/ui/SectionHeading';
import { contact } from '../data/site';
import { categories, products } from '../lib/catalog';

const VALUES = [
  { icon: Boxes, title: 'A complete range', text: 'Containers, foil, cups, bags, tissue and cleaning supplies from one supplier.' },
  { icon: Truck, title: 'Delivery UAE-wide', text: 'We deliver to all 7 emirates from our base in Sharjah.' },
  { icon: Headset, title: 'Helpful people', text: 'Our team helps you find the right size and quantity for your menu.' },
  { icon: MapPin, title: 'Based in Sharjah', text: contact.address },
];

export default function About() {
  return (
    <>
      <section className="on-dark relative overflow-hidden bg-navy text-white">
        <Dieline className="absolute -right-32 top-1/2 w-[900px] max-w-none -translate-y-1/2 text-white/10" />
        <div className="shell relative py-14 lg:py-24">
          <Breadcrumbs light items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
          <div className="mt-10 max-w-3xl">
            <Eyebrow light>About Ideal Pack</Eyebrow>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.04] tracking-[-0.03em] text-white sm:text-6xl">Ideas for better packing.</h1>
            <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-white/80">
              Ideal Pack supplies food packaging and hygiene products to restaurants, caterers, businesses and homes across the United Arab Emirates.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-navy/10 bg-mist">
        <dl className="shell grid grid-cols-3 py-8">
          {[[products.length, 'Products'], [categories.length, 'Categories'], [7, 'Emirates served']].map(([value, label]) => (
            <div key={label}>
              <dt className="font-display text-4xl font-bold text-navy sm:text-5xl">{value}</dt>
              <dd className="mt-1 text-[14px] text-ink/70">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="py-16 lg:py-24">
        <div className="shell grid gap-x-16 gap-y-10 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="text-4xl font-bold leading-[1.08]">What you can expect from us</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            {VALUES.map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.05}>
                <Icon size={24} className="text-blue" aria-hidden="true" />
                <h3 className="mt-3 text-xl font-bold">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink/75">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-16 lg:pb-24">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-[10px] bg-mist p-8 lg:p-12">
          <h2 className="text-3xl font-bold">Ready to stock your kitchen?</h2>
          <div className="flex flex-wrap gap-3">
            <Button to="/shop" variant="red" size="lg">Shop now <ArrowRight size={18} /></Button>
            <Button to="/contact" variant="outline" size="lg">Contact us</Button>
          </div>
        </div>
      </section>
    </>
  );
}
