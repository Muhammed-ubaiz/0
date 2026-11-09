import { ArrowRight, MessageCircle } from 'lucide-react';
import { whatsappLink } from '../../data/site';
import Button from '../ui/Button';
import Dieline from '../ui/Dieline';
import Reveal from '../ui/Reveal';
import { Eyebrow } from '../ui/SectionHeading';

const STEPS = [
  ['01', 'Share your list', 'Tell us the products, sizes and monthly volumes you need.'],
  ['02', 'Get your price', 'Our team replies with carton pricing for your business.'],
  ['03', 'Schedule delivery', 'We deliver from Sharjah to your kitchen or branches.'],
];

export default function WholesaleBanner() {
  return (
    <section className="on-dark relative overflow-hidden bg-navy py-16 text-white lg:py-24">
      <Dieline className="absolute -right-40 top-1/2 w-[900px] max-w-none -translate-y-1/2 text-white/10" />
      <div className="shell relative grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Eyebrow light>Wholesale and business</Eyebrow>
          <h2 className="mt-4 text-4xl font-bold leading-[1.06] text-white sm:text-5xl">Buying by the carton? Let’s talk price.</h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/80">
            For restaurants, cloud kitchens, caterers and resellers that order regularly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/contact?type=wholesale" variant="red" size="lg">
              Request wholesale pricing <ArrowRight size={18} />
            </Button>
            <Button href={whatsappLink('Hello Ideal Pack, I would like wholesale pricing.')} target="_blank" rel="noreferrer" variant="outlineLight" size="lg">
              <MessageCircle size={18} /> WhatsApp us
            </Button>
          </div>
        </Reveal>
        <ol className="divide-y divide-white/15 border-y border-white/15">
          {STEPS.map(([number, title, text], index) => (
            <Reveal key={number} delay={index * 0.08}>
              <li className="flex gap-6 py-5">
                <span className="pt-1 font-mono text-[13px] text-white/70">{number}</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <p className="mt-1 text-[15px] text-white/80">{text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
