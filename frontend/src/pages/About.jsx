import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChefHat, Coffee, House, Mail, MapPin, MessageCircle, Phone, UtensilsCrossed } from 'lucide-react';
import Button from '../components/ui/Button';
import { Breadcrumbs } from '../components/ui/PageIntro';
import Reveal from '../components/ui/Reveal';
import { Eyebrow } from '../components/ui/SectionHeading';
import { contact, whatsappLink } from '../data/site';
import { categories, products } from '../lib/catalog';

const STATS = [
  [products.length, 'products in our range'],
  [categories.length, 'packaging categories'],
  [7, 'emirates we deliver to'],
  ['AED 200', 'for free delivery'],
];

const PRINCIPLES = [
  ['Everything in one order', 'Containers, foil, cups, bags, tissue and cleaning supplies from a single supplier, so your whole kitchen is covered at once.'],
  ['Delivered across the UAE', 'Orders are prepared in Sharjah and delivered to all seven emirates, free once your order reaches AED 200.'],
  ['From one pack to full cartons', 'Buy a single pack today, then ask our team for carton pricing as your business grows.'],
  ['Real people, quick answers', 'Call or WhatsApp us and we’ll help you choose the right size and quantity for your menu.'],
];

const AUDIENCES = [
  { icon: ChefHat, title: 'Restaurants', text: 'Takeaway and delivery packaging that travels well.' },
  { icon: Coffee, title: 'Cafés and bakeries', text: 'Cups, boxes and bags for counters and grab-and-go.' },
  { icon: UtensilsCrossed, title: 'Caterers and cloud kitchens', text: 'Trays and containers by the carton for regular orders.' },
  { icon: House, title: 'Homes and offices', text: 'Storage, cleaning and everyday essentials in single packs.' },
];

function Hero() {
  return (
    <section className="bg-white">
      <div className="shell pb-14 pt-8 lg:pb-20 lg:pt-10">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto mt-12 max-w-4xl text-center lg:mt-16">
          <Eyebrow className="justify-center">About Ideal Pack</Eyebrow>
          <h1 className="mt-5 text-[42px] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[80px]">
            We make packing <span className="text-blue">simple</span> for UAE kitchens.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-ink/70 sm:text-[18px]">
            Ideal Pack supplies food packaging and hygiene products to restaurants, caterers, cafés, businesses and homes across the United Arab Emirates.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/shop" variant="red" size="lg" className="rounded-full px-7">
              Shop the range <ArrowRight size={18} />
            </Button>
            <Button to="/contact" variant="outline" size="lg" className="rounded-full px-7">
              Contact us
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="shell">
      <Reveal>
        <dl className="on-dark grid grid-cols-2 gap-y-8 rounded-3xl bg-navy px-6 py-10 text-white sm:px-10 lg:grid-cols-4 lg:py-12">
          {STATS.map(([value, label], index) => (
            <div key={label} className={`px-2 lg:px-6 ${index ? 'lg:border-l lg:border-white/15' : ''}`}>
              <dt className="font-display text-[40px] font-bold leading-none tracking-[-0.02em] sm:text-5xl">{value}</dt>
              <dd className="mt-2.5 text-[14px] text-white/70">{label}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

function Purpose() {
  return (
    <section className="py-20 lg:py-28">
      <div className="shell grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-16">
        <Reveal>
          <Eyebrow>Our purpose</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="font-display text-[26px] font-semibold leading-[1.3] tracking-[-0.015em] text-navy sm:text-[34px]">
            Good packaging keeps food safe, looks after your brand and gets every order to the customer the way it left your kitchen. Our job is to make it easy to get.
          </p>
          <div className="mt-8 grid gap-6 text-[16px] leading-relaxed text-ink/70 sm:grid-cols-2">
            <p>From aluminium trays and black base containers to kraft bowls, paper bags and cleaning supplies, we bring the essentials of food service together in one place.</p>
            <p>Whether you need a single pack for home or regular cartons for a busy kitchen, our team in Sharjah prepares your order and delivers it across the Emirates.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="border-t border-navy/10 py-20 lg:py-28">
      <div className="shell">
        <Reveal className="max-w-2xl">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="mt-3 text-4xl font-bold leading-[1.08] sm:text-[46px]">Four things you can count on</h2>
        </Reveal>
        <ol className="mt-12 border-t border-navy/12">
          {PRINCIPLES.map(([title, text], index) => (
            <li key={title}>
              <Reveal delay={index * 0.05}>
                <div className="group grid gap-3 border-b border-navy/12 py-7 transition-colors duration-300 hover:bg-mist/50 sm:grid-cols-[80px_1fr] lg:grid-cols-[100px_1fr_1.2fr_40px] lg:items-center lg:gap-8 lg:px-4">
                  <span className="font-mono text-[14px] text-blue">0{index + 1}</span>
                  <h3 className="text-2xl font-bold">{title}</h3>
                  <p className="text-[15.5px] leading-relaxed text-ink/70 sm:col-start-2 lg:col-start-auto">{text}</p>
                  <ArrowUpRight size={22} className="hidden text-blue opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 lg:block" aria-hidden="true" />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Audiences() {
  return (
    <section className="border-t border-navy/10 bg-white py-20 lg:py-28">
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow className="justify-center">Who we serve</Eyebrow>
          <h2 className="mt-3 text-4xl font-bold leading-[1.08] sm:text-[46px]">Built for every kind of kitchen</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map(({ icon: Icon, title, text }, index) => (
            <Reveal key={title} delay={index * 0.06}>
              <div className="group h-full rounded-3xl border border-navy/10 bg-white p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-mist text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
                  <Icon size={28} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink/70">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  const details = [
    { icon: MapPin, value: contact.address, href: contact.mapUrl },
    { icon: Phone, value: contact.phone, href: contact.phoneHref },
    { icon: Mail, value: contact.email, href: `mailto:${contact.email}` },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[56px]">
            Questions? We’re one message away.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ink/70">
            Tell us what you’re packing and we’ll suggest the right products, or send carton pricing if you order regularly.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={whatsappLink('Hello Ideal Pack, I have a question.')} target="_blank" rel="noreferrer" variant="navy" size="lg" className="rounded-full px-7">
              <MessageCircle size={18} /> WhatsApp us
            </Button>
            <Button to="/contact?type=wholesale" variant="red" size="lg" className="rounded-full px-7">
              Wholesale enquiry <ArrowRight size={18} />
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-navy/10 pt-8 text-[14px]">
            {details.map(({ icon: Icon, value, href }) => (
              <li key={value}>
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex items-center gap-2 text-ink/75 hover:text-navy">
                  <Icon size={16} className="text-blue" aria-hidden="true" />
                  <span className="link-underline">{value}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Purpose />
      <Principles />
      <Audiences />
      <Closing />
    </>
  );
}
