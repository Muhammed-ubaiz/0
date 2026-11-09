const control =
  'w-full rounded-md border border-navy/20 bg-white px-3.5 text-[15px] text-ink transition-colors placeholder:text-ink/45 hover:border-navy/40 focus:border-blue';

export default function Field({ label, as = 'input', required, className = '', children, ...props }) {
  const Control = as;
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[13px] font-semibold text-navy">
        {label}
        {required && <span className="text-red"> *</span>}
      </span>
      <Control required={required} className={`${control} ${as === 'textarea' ? 'min-h-28 py-3' : 'h-11'}`} {...props}>
        {children}
      </Control>
    </label>
  );
}
