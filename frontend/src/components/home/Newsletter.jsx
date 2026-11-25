import { useState } from 'react';
import { Check } from 'lucide-react';
import { api } from '../../lib/api';
import Button from '../ui/Button';
import { Eyebrow } from '../ui/SectionHeading';

export default function Newsletter({ variant = 'plain' }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');

  const submit = async (event) => {
    event.preventDefault();
    setState('sending');
    try {
      await api('/api/inquiries', {
        method: 'POST',
        body: { type: 'newsletter', name: '', email, phone: '', message: 'Newsletter subscription' },
      });
      setState('done');
    } catch {
      setState('error');
    }
  };

  if (variant === 'feature') {
    return (
      <section className="bg-white pb-16 lg:pb-24">
        <div className="shell-wide">
          <div className="relative overflow-hidden rounded-[28px] border border-navy/10 bg-mist px-6 py-14 text-center sm:px-12 lg:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
              style={{ backgroundImage: 'radial-gradient(rgba(36,74,145,0.18) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl">
              <Eyebrow className="justify-center">Newsletter</Eyebrow>
              <h2 className="mt-4 text-[32px] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[48px]">
                New lines and offers, first<span className="text-red">.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-relaxed text-ink/70">
                Hear about new packaging ranges and price drops before anyone else. No spam, unsubscribe any time.
              </p>
              {state === 'done' ? (
                <p role="status" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-navy shadow-card">
                  <Check size={18} /> Thanks, you’re on the list.
                </p>
              ) : (
                <form onSubmit={submit} className="mx-auto mt-8 max-w-lg">
                  <div className="flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-lift sm:flex-row sm:rounded-full">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@business.ae"
                      aria-label="Email address"
                      className="h-12 min-w-0 flex-1 rounded-full bg-transparent px-5 text-[15px] outline-none placeholder:text-ink/45"
                    />
                    <Button type="submit" variant="navy" size="lg" className="h-12 rounded-full" disabled={state === 'sending'}>
                      {state === 'sending' ? 'Subscribing…' : 'Subscribe'}
                    </Button>
                  </div>
                  {state === 'error' && <p role="alert" className="mt-3 text-[14px] font-medium text-red">We couldn’t sign you up just now. Please try again.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="shell">
        <div className="grid items-center gap-8 rounded-[10px] border border-navy/10 bg-white p-7 sm:p-10 lg:grid-cols-2 lg:p-14">
          <div>
            <Eyebrow>Newsletter</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">New lines and offers, straight to your inbox</h2>
          </div>
          {state === 'done' ? (
            <p role="status" className="flex items-center gap-2 text-[16px] font-semibold text-navy">
              <Check size={20} /> Thanks, you’re on the list.
            </p>
          ) : (
            <form onSubmit={submit}>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@business.ae"
                  aria-label="Email address"
                  className="h-13 min-w-0 flex-1 rounded-md border border-navy/20 bg-white px-4 text-[15px] placeholder:text-ink/50"
                />
                <Button type="submit" variant="navy" size="lg" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Subscribing…' : 'Subscribe'}
                </Button>
              </div>
              {state === 'error' && <p role="alert" className="mt-2 text-[14px] font-medium text-red">We couldn’t sign you up just now. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
