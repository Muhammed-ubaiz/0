import { Headset, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { contact } from '../../data/site';
import Reveal from '../ui/Reveal';
import { Eyebrow } from '../ui/SectionHeading';

const BENEFITS = [
  { icon: ShieldCheck, title: 'Secure checkout', text: 'Pay cash on delivery or by bank transfer. No card details are taken online.' },
  { icon: Sparkles, title: 'Food-grade quality', text: 'Containers, cups and wraps made for restaurants, catering and home kitchens.' },
  { icon: Truck, title: 'UAE-wide delivery', text: 'Delivered to all 7 emirates from Sharjah, free on orders over AED 200.' },
  { icon: Headset, title: 'Real support', text: `Call ${contact.phone} or WhatsApp us when you need help choosing a size.` },
];

export default function ShopBenefits() {
  return (
    <section className="bg-white py-16 lg:py-28">
      <div className="shell-wide">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Why Ideal Pack</Eyebrow>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <p className="text-[28px] font-bold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[42px]">
              We handle the packaging, so you can focus on the food<span className="text-red">.</span>{' '}
              <span className="text-ink/35">One supplier for every container, cup and wrap your kitchen goes through.</span>
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy/10 bg-navy/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text }, index) => (
            <li key={title} className="bg-white">
              <Reveal delay={index * 0.06} className="group h-full p-7 lg:p-8">
                <span className="grid size-11 place-items-center rounded-full border border-navy/12 text-blue transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                  <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[17px] font-bold">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink/70">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
