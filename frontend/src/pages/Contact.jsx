import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import Field from '../components/ui/Field';
import { Breadcrumbs } from '../components/ui/PageIntro';
import Reveal from '../components/ui/Reveal';
import { Eyebrow } from '../components/ui/SectionHeading';
import WhatsAppIcon from '../components/ui/WhatsAppIcon';
import { contact, whatsappLink } from '../data/site';
import { api } from '../lib/api';

const TYPES = [
  ['contact', 'General question'],
  ['wholesale', 'Wholesale pricing'],
  ['customization', 'Custom printing'],
];

const FAQS = [
  ['Where do you deliver?', 'To all 7 emirates from our base in Sharjah. Delivery is free on orders over AED 200.'],
  ['How can I pay?', 'Cash on delivery or bank transfer, whichever suits you best.'],
  ['Do you offer wholesale prices?', 'Yes. Choose “Wholesale pricing” in the form and tell us the products and quantities you need.'],
];

const CHANNELS = [
  { icon: WhatsAppIcon, label: 'WhatsApp', value: contact.whatsapp, action: 'Start a chat', href: whatsappLink('Hello Ideal Pack, I have a question.') },
  { icon: Phone, label: 'Call us', value: contact.phone, action: 'Call now', href: contact.phoneHref },
  { icon: Mail, label: 'Email', value: contact.email, action: 'Send an email', href: `mailto:${contact.email}` },
  { icon: MapPin, label: 'Visit', value: 'Sharjah Industrial Area 12', action: 'Get directions', href: contact.mapUrl },
];

function Channels() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {CHANNELS.map(({ icon: Icon, label, value, action, href }, index) => (
        <Reveal key={label} delay={index * 0.05}>
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            className="group flex h-full flex-col rounded-2xl border border-navy/10 bg-white p-4 transition-all sm:p-5 duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-lift"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-mist text-blue transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
              <Icon size={20} aria-hidden="true" />
            </span>
            <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink/55 sm:mt-4 sm:text-[12px]">{label}</span>
            <span className="mt-1 text-[13.5px] font-semibold text-navy [overflow-wrap:anywhere] sm:text-[15.5px]">{value}</span>
            <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[13px] font-semibold text-blue sm:pt-4 sm:text-[13.5px]">
              {action} <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

function EnquiryForm({ initialType }) {
  const [form, setForm] = useState({ type: initialType, name: '', business: '', email: '', phone: '', message: '' });
  const [state, setState] = useState('idle');
  const isWholesale = form.type === 'wholesale';

  const bind = (name) => ({
    value: form[name],
    onChange: (event) => setForm((current) => ({ ...current, [name]: event.target.value })),
  });

  const submit = async (event) => {
    event.preventDefault();
    setState('sending');
    try {
      await api('/api/inquiries', {
        method: 'POST',
        body: {
          type: form.type,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          details: { business: form.business },
        },
      });
      setState('done');
    } catch {
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <span className="grid size-16 place-items-center rounded-full bg-mist text-blue">
          <CheckCircle2 size={32} aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-bold">Thanks, we’ve got your message</h2>
        <p className="mt-2 max-w-sm text-[15px] text-ink/70">Our team will get back to you shortly. For anything urgent, message us on WhatsApp.</p>
        <button type="button" onClick={() => { setForm((current) => ({ ...current, message: '' })); setState('idle'); }} className="mt-6 text-[14px] font-semibold text-blue hover:text-navy">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <h2 className="text-2xl font-bold sm:text-[28px]">Send us a message</h2>
      <p className="mt-1.5 text-[15px] text-ink/70">Choose a topic and we’ll make sure the right person replies.</p>

      <div className="mt-6 flex flex-wrap gap-2" role="radiogroup" aria-label="How can we help?">
        {TYPES.map(([value, label]) => {
          const active = form.type === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setForm((current) => ({ ...current, type: value }))}
              className={`h-10 rounded-full border px-4 text-[13.5px] font-semibold transition-colors ${active ? 'border-navy bg-navy text-white' : 'border-navy/15 text-navy hover:border-navy/40 hover:bg-mist'}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required autoComplete="name" {...bind('name')} />
        <Field label="Business name" autoComplete="organization" {...bind('business')} />
        <Field label="Email" type="email" required autoComplete="email" icon={Mail} {...bind('email')} />
        <Field label="Phone" type="tel" required autoComplete="tel" placeholder="+971" icon={Phone} {...bind('phone')} />
        <Field
          as="textarea"
          label="Message"
          required
          className="sm:col-span-2"
          placeholder={isWholesale ? 'Products, sizes and monthly quantities' : 'How can we help?'}
          {...bind('message')}
        />
      </div>

      {state === 'error' && (
        <p role="alert" className="mt-4 rounded-xl border border-red/30 px-4 py-3 text-[14px] font-medium text-red">
          We couldn’t send your message. Please try again or reach us on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'sending'}
        className={`group mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl text-[15.5px] font-semibold text-white shadow-lift transition-all duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70 sm:w-auto sm:px-8 ${isWholesale ? 'bg-red hover:bg-navy' : 'bg-blue hover:bg-navy'}`}
      >
        {state === 'sending' ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Send size={17} aria-hidden="true" />}
        {state === 'sending' ? 'Sending…' : isWholesale ? 'Request wholesale pricing' : 'Send message'}
      </button>
    </form>
  );
}

function Sidebar() {
  return (
    <div className="space-y-4">
      <div className="on-dark rounded-3xl bg-gradient-to-br from-navy to-blue p-7 text-white">
        <span className="grid size-11 place-items-center rounded-xl bg-white/10">
          <MapPin size={20} aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-white">Visit us in Sharjah</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-white/80">{contact.address}</p>
        <a href={contact.mapUrl} target="_blank" rel="noreferrer" className="group mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-white px-4 text-[14px] font-semibold text-navy transition-colors hover:bg-mist">
          Open in Google Maps <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </div>

      <div className="rounded-3xl border border-navy/10 bg-white p-7">
        <h3 className="text-lg font-bold">Quick answers</h3>
        <dl className="mt-4 divide-y divide-navy/10">
          {FAQS.map(([question, answer]) => (
            <div key={question} className="py-3.5 first:pt-0 last:pb-0">
              <dt className="text-[14.5px] font-semibold text-navy">{question}</dt>
              <dd className="mt-1 text-[14px] leading-relaxed text-ink/70">{answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default function Contact() {
  const [params] = useSearchParams();
  const initialType = TYPES.some(([value]) => value === params.get('type')) ? params.get('type') : 'contact';
  const isWholesale = initialType === 'wholesale';

  return (
    <>
      <section className="bg-white">
        <div className="shell pb-28 pt-8 lg:pb-32 lg:pt-10">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="mx-auto mt-10 max-w-3xl text-center lg:mt-12">
            <Eyebrow className="justify-center">{isWholesale ? 'Wholesale enquiry' : 'Contact us'}</Eyebrow>
            <h1 className="mt-4 text-[40px] font-extrabold leading-[1.04] tracking-[-0.035em] sm:text-[56px]">
              {isWholesale ? 'Let’s talk carton pricing.' : 'Let’s talk packaging.'}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-ink/70">
              {isWholesale
                ? 'Tell us what you buy and how often, and our team will send pricing for your business.'
                : 'Questions about a product, size or order? Message us and our team in Sharjah will help.'}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="shell relative z-10 -mt-20 pb-16 lg:pb-24">
        <Channels />
        <div className="mt-6 grid items-start gap-6 lg:mt-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal className="rounded-3xl border border-navy/10 bg-white p-6 shadow-card sm:p-9">
            <EnquiryForm key={initialType} initialType={initialType} />
          </Reveal>
          <Reveal delay={0.08}>
            <Sidebar />
          </Reveal>
        </div>
      </div>
    </>
  );
}
