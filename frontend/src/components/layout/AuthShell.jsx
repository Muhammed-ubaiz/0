import Dieline from '../ui/Dieline';
import { Eyebrow } from '../ui/SectionHeading';

export default function AuthShell({ title, intro, children }) {
  return (
    <div className="shell grid min-h-[640px] items-stretch gap-0 py-8 lg:grid-cols-2 lg:py-12">
      <div className="on-dark relative hidden overflow-hidden rounded-l-[10px] bg-navy p-12 text-white lg:flex lg:flex-col lg:justify-end">
        <Dieline className="absolute -right-16 -top-10 w-[640px] max-w-none text-white/14" />
        <div className="relative">
          <Eyebrow light>Ideas for better packing</Eyebrow>
          <p className="mt-4 max-w-sm font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em]">Your packing list, saved and ready to reorder.</p>
        </div>
      </div>
      <div className="flex items-center justify-center rounded-[10px] border border-navy/12 p-6 sm:p-12 lg:rounded-l-none lg:border-l-0">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
          {intro && <p className="mt-2 text-[15px] text-ink/70">{intro}</p>}
          <div className="mt-7">{children}</div>
        </div>
      </div>
    </div>
  );
}
