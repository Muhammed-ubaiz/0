import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { contact, social, whatsappLink } from '../../data/site';
import { categoriesBySize } from '../../lib/catalog';

const COMPANY = [
  { label: 'About us', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Wholesale enquiry', to: '/contact?type=wholesale' },
];

const CUSTOMER = [
  { label: 'Shop all', to: '/shop' },
  { label: 'My account', to: '/login' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Cart', to: '/cart' },
];

function Column({ title, children }) {
  return (
    <div>
      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-[14px]">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const contactRow = 'group flex items-start gap-2.5 text-white/80 transition-colors hover:text-white';

  return (
    <footer className="on-dark bg-navy text-white">
      <div className="shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:py-16">
        <div>
          <span className="inline-block rounded-md bg-white px-3 py-2">
            <img src="/logo-original.png" alt="Ideal Pack" className="h-9 w-auto" />
          </span>
          <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-white/80">
            Food packaging, foil, paper and cleaning supplies for kitchens and homes across the UAE, from our base in Sharjah.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-semibold">
            {social.map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="text-white/80 hover:text-white link-underline">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <Column title="Top categories">
          {categoriesBySize.slice(0, 6).map((category) => (
            <li key={category.handle}>
              <Link to={`/category/${category.handle}`} className="text-white/80 hover:text-white link-underline">{category.name}</Link>
            </li>
          ))}
        </Column>

        <Column title="Store">
          {[...CUSTOMER, ...COMPANY].map((item) => (
            <li key={item.label}>
              <Link to={item.to} className="text-white/80 hover:text-white link-underline">{item.label}</Link>
            </li>
          ))}
        </Column>

        <Column title="Get in touch">
          <li>
            <a href={contact.phoneHref} className={contactRow}><Phone size={16} className="mt-0.5 shrink-0" aria-hidden="true" /><span className="link-underline">{contact.phone}</span></a>
          </li>
          <li>
            <a href={whatsappLink('Hello Ideal Pack, I have a question about packaging.')} target="_blank" rel="noreferrer" className={contactRow}>
              <MessageCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" /><span className="link-underline">WhatsApp {contact.whatsapp}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`} className={contactRow}><Mail size={16} className="mt-0.5 shrink-0" aria-hidden="true" /><span className="link-underline">{contact.email}</span></a>
          </li>
          <li>
            <a href={contact.mapUrl} target="_blank" rel="noreferrer" className={contactRow}><MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" /><span className="link-underline">{contact.address}</span></a>
          </li>
        </Column>
      </div>

      <div className="border-t border-white/15">
        <div className="shell flex flex-wrap justify-between gap-2 py-5 text-[13px] text-white/70">
          <p>© {new Date().getFullYear()} Ideal Pack. All rights reserved.</p>
          <p className="font-mono text-[12px]">Ideas for better packing</p>
        </div>
      </div>
    </footer>
  );
}
