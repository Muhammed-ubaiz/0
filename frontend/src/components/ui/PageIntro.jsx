import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items, light = false }) {
  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-1 text-[13px] ${light ? 'text-white/75' : 'text-ink/65'}`}>
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1">
          {index > 0 && <ChevronRight size={13} aria-hidden="true" />}
          {item.to ? (
            <Link to={item.to} className={light ? 'hover:text-white' : 'hover:text-blue'}>
              {item.label}
            </Link>
          ) : (
            <span className={`line-clamp-1 ${light ? 'text-white' : 'text-navy'}`}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default function PageIntro({ title, intro, crumbs, wide = false, children }) {
  return (
    <div className="border-b border-navy/10 bg-white">
      <div className={`${wide ? 'shell-wide' : 'shell'} py-8 lg:py-10`}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, ...crumbs]} />
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold sm:text-[40px] sm:leading-[1.1]">{title}</h1>
            {intro && <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{intro}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
