import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ value, onChange, min = 1, size = 'md' }) {
  const box = size === 'sm' ? 'size-8' : 'size-11';
  const button = `${box} grid place-items-center text-navy transition-colors hover:bg-mist disabled:opacity-35`;

  return (
    <div className="inline-flex items-center rounded-md border border-navy/20 bg-white">
      <button type="button" className={button} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <Minus size={15} />
      </button>
      <span className={`min-w-8 text-center font-mono font-medium text-navy ${size === 'sm' ? 'text-[13px]' : 'text-[15px]'}`} aria-live="polite">
        {value}
      </span>
      <button type="button" className={button} onClick={() => onChange(value + 1)} aria-label="Increase quantity">
        <Plus size={15} />
      </button>
    </div>
  );
}
