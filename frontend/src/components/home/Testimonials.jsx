import { Quote } from 'lucide-react';
import { testimonials } from '../../data/site';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

// Placeholder quotes are visible while developing but never reach production.
const visible = testimonials.filter((item) => !item.placeholder || import.meta.env.DEV);

export default function Testimonials() {
  if (!visible.length) return null;

  return (
    <section className="border-t border-navy/10 bg-white py-16 lg:py-24">
      <div className="shell">
        <SectionHeading eyebrow="Customer testimonials" title="Trusted in kitchens across the Emirates" />
        <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
          {visible.map((item, index) => (
            <Reveal key={index} delay={index * 0.07}>
              <figure className="flex h-full flex-col rounded-[10px] border border-navy/12 bg-white p-7">
                <div className="flex items-center justify-between">
                  <Quote size={24} className="text-blue" aria-hidden="true" />
                  {item.placeholder && <span className="rounded-sm bg-mist px-2 py-0.5 font-mono text-[10.5px] uppercase text-blue">Sample</span>}
                </div>
                <blockquote className="mt-5 flex-1 font-display text-lg font-medium leading-snug text-navy">{item.quote}</blockquote>
                <figcaption className="mt-6 border-t border-navy/10 pt-4">
                  <p className="text-[14.5px] font-semibold text-navy">{item.name}</p>
                  <p className="text-[13px] text-ink/70">{item.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
