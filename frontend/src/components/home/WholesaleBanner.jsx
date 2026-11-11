import { ArrowRight, ClipboardList, MessageCircle, Tag, Truck } from 'lucide-react';
import { whatsappLink } from '../../data/site';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import { Eyebrow } from '../ui/SectionHeading';

const STEPS = [
  { icon: ClipboardList, title: 'Share your list', text: 'Tell us the products, sizes and monthly volumes you need.' },
  { icon: Tag, title: 'Get your price', text: 'Our team replies with carton pricing for your business.' },
  { icon: Truck, title: 'Schedule delivery', text: 'We deliver from Sharjah to your kitchen or branches.' },
];

export default function WholesaleBanner() {
  return (
    <section className="bg-white pb-2 pt-16 lg:pb-4 lg:pt-24">
      <div className="shell">
        <div className="on-dark relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy via-navy to-blue px-6 py-10 text-white sm:px-10 lg:px-14 lg:py-14">
          <span className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full bg-white/[0.05]" aria-hidden="true" />
          <span className="pointer-events-none absolute -bottom-40 right-1/3 size-96 rounded-full bg-blue/50 blur-3xl" aria-hidden="true" />

          <Reveal className="relative flex flex-wrap items-end justify-between gap-x-10 gap-y-7">
            <div className="max-w-xl">
              <Eyebrow light>Wholesale and business</Eyebrow>
              <h2 className="mt-4 text-4xl font-bold leading-[1.06] text-white sm:text-[46px]">Buying by the carton? Let’s talk price.</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-white/80">
                For restaurants, cloud kitchens, caterers and resellers that order regularly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/contact?type=wholesale" variant="red" size="lg" className="rounded-lg">
                Request wholesale pricing <ArrowRight size={18} />
              </Button>
              <Button href={whatsappLink('Hello Ideal Pack, I would like wholesale pricing.')} target="_blank" rel="noreferrer" variant="outlineLight" size="lg" className="rounded-lg">
                <MessageCircle size={18} /> WhatsApp us
              </Button>
            </div>
          </Reveal>

          <div className="relative mt-12 lg:mt-14">
            <span className="pointer-events-none absolute inset-x-[16%] top-[42px] hidden border-t-2 border-dashed border-white/20 md:block" aria-hidden="true" />
            <ol className="relative grid gap-4 md:grid-cols-3 lg:gap-5">
              {STEPS.map(({ icon: Icon, title, text }, index) => (
                <li key={title} className="h-full">
                  <Reveal delay={0.1 + index * 0.08} className="h-full">
                    <div className="group h-full rounded-xl border border-white/12 bg-white/[0.06] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.1]">
                      <div className="flex items-center justify-between">
                        <span className="grid size-11 place-items-center rounded-full bg-white text-navy shadow-lift transition-transform duration-300 group-hover:scale-105">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span className="font-mono text-[12px] tracking-[0.12em] text-white/60">STEP 0{index + 1}</span>
                      </div>
                      <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-white/75">{text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
