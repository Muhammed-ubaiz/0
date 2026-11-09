import { Boxes, Headset, Layers, Truck } from 'lucide-react';
import { categories, products } from '../../lib/catalog';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const REASONS = [
  { icon: Boxes, title: 'One complete range', text: `${products.length} products across ${categories.length} categories, so one order covers the whole kitchen.` },
  { icon: Truck, title: 'Delivered UAE-wide', text: 'Delivery to all 7 emirates from Sharjah, free on orders over AED 200.' },
  { icon: Layers, title: 'From one pack to full cartons', text: 'Buy a single pack today, then move to carton pricing as you grow.' },
  { icon: Headset, title: 'Real people to talk to', text: 'Call or WhatsApp our team when you need help choosing the right size.' },
];

export default function WhyChoose() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="shell">
        <SectionHeading eyebrow="Why choose Ideal Pack" title="A supplier that makes reordering easy" />
        <div className="grid border-t border-navy/12 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.06} className="border-b border-navy/12 py-7 sm:pr-6 lg:border-b-0 lg:border-r lg:py-9 lg:pl-6 lg:first:pl-0 lg:last:border-r-0">
              <Icon size={26} className="text-blue" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
