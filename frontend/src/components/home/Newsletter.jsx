import { useState } from 'react';
import { Check } from 'lucide-react';
import { api } from '../../lib/api';
import Button from '../ui/Button';
import { Eyebrow } from '../ui/SectionHeading';

export default function Newsletter() {
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
