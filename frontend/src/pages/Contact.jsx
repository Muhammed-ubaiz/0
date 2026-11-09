import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import Field from '../components/ui/Field';
import PageIntro from '../components/ui/PageIntro';
import { contact, whatsappLink } from '../data/site';
import { api } from '../lib/api';

const TYPES = [
  ['contact', 'General question'],
  ['wholesale', 'Wholesale pricing'],
  ['customization', 'Custom printed packaging'],
];

export default function Contact() {
  const [params] = useSearchParams();
  const initial = TYPES.some(([value]) => value === params.get('type')) ? params.get('type') : 'contact';
  const [form, setForm] = useState({ type: initial, name: '', business: '', email: '', phone: '', message: '' });
  const [state, setState] = useState('idle');

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

  const CHANNELS = [
    { icon: MessageCircle, label: 'WhatsApp', value: contact.whatsapp, href: whatsappLink('Hello Ideal Pack, I have a question.') },
    { icon: Phone, label: 'Phone', value: contact.phone, href: contact.phoneHref },
    { icon: Mail, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: 'Visit', value: contact.address, href: contact.mapUrl },
  ];

  const isWholesale = form.type === 'wholesale';

  return (
    <>
      <PageIntro
        title={isWholesale ? 'Wholesale enquiry' : 'Contact us'}
        intro={isWholesale ? 'Tell us what you buy and how often, and we’ll send carton pricing.' : 'Questions about a product, size or order? We’re here to help.'}
        crumbs={[{ label: 'Contact' }]}
      />
      <div className="shell grid items-start gap-8 py-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14 lg:py-14">
        <ul className="divide-y divide-navy/10 border-y border-navy/10">
          {CHANNELS.map(({ icon: Icon, label, value, href }) => (
            <li key={label}>
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex items-center gap-4 py-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-md bg-mist text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.1em] text-blue">{label}</span>
                  <span className="block text-[15.5px] font-semibold text-navy">{value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="rounded-[10px] border border-navy/12 p-6 sm:p-8">
          {state === 'done' ? (
            <div role="status" className="py-12 text-center">
              <CheckCircle2 size={44} className="mx-auto text-blue" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-bold">Thanks, we’ve got your message</h2>
              <p className="mt-2 text-[15px] text-ink/75">Our team will get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
              <Field as="select" label="How can we help?" className="sm:col-span-2" {...bind('type')}>
                {TYPES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </Field>
              <Field label="Your name" required autoComplete="name" {...bind('name')} />
              <Field label="Business name" autoComplete="organization" {...bind('business')} />
              <Field label="Email" type="email" required autoComplete="email" {...bind('email')} />
              <Field label="Phone" type="tel" required autoComplete="tel" placeholder="+971" {...bind('phone')} />
              <Field as="textarea" label="Message" required className="sm:col-span-2" placeholder={isWholesale ? 'Products, sizes and monthly quantities' : ''} {...bind('message')} />
              {state === 'error' && <p role="alert" className="text-[14px] font-medium text-red sm:col-span-2">We couldn’t send your message. Please try again or reach us on WhatsApp.</p>}
              <Button type="submit" variant={isWholesale ? 'red' : 'blue'} size="lg" disabled={state === 'sending'} className="sm:col-span-2">
                {state === 'sending' ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
