import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const control =
  'w-full rounded-md border border-navy/20 bg-white px-3.5 text-[15px] text-ink transition-colors placeholder:text-ink/45 hover:border-navy/40 focus:border-blue';

export default function Field({ label, as = 'input', required, icon: Icon, type, className = '', children, ...props }) {
  const [visible, setVisible] = useState(false);
  const Control = as;
  const isPassword = type === 'password';

  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[13px] font-semibold text-navy">
        {label}
        {required && <span className="text-red"> *</span>}
      </span>
      <span className="relative block">
        {Icon && <Icon size={17} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-blue" />}
        <Control
          required={required}
          type={isPassword && visible ? 'text' : type}
          className={`${control} ${as === 'textarea' ? 'min-h-28 py-3' : 'h-11'} ${Icon ? 'pl-10' : ''} ${isPassword ? 'pr-11' : ''}`}
          {...props}
        >
          {children}
        </Control>
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded text-ink/60 hover:bg-mist hover:text-navy"
          >
            {visible ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </span>
    </label>
  );
}
