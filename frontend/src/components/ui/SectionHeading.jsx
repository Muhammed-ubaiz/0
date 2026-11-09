import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Eyebrow({ children, light = false, className = '' }) {
  return (
    <p className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] ${light ? 'text-white/75' : 'text-blue'} ${className}`}>
      <span className="size-1.5 bg-red" aria-hidden="true" />
      {children}
    </p>
  );
}

export default function SectionHeading({ eyebrow, title, intro, linkTo, linkLabel }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 lg:mb-10">
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
        {intro && <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{intro}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:text-navy">
          {linkLabel}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
