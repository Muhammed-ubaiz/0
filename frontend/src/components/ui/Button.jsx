import { Link } from 'react-router-dom';

const VARIANTS = {
  red: 'bg-red text-white hover:bg-navy',
  blue: 'bg-blue text-white hover:bg-navy',
  navy: 'bg-navy text-white hover:bg-blue',
  white: 'bg-white text-navy hover:bg-mist',
  outline: 'border border-navy/25 text-navy hover:border-navy hover:bg-mist',
  outlineLight: 'border border-white/35 text-white hover:border-white hover:bg-white/10',
};

const SIZES = {
  sm: 'h-9 px-3.5 text-[13px]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-[15px]',
};

export default function Button({ variant = 'blue', size = 'md', to, href, className = '', children, ...props }) {
  // A custom rounded-* class replaces the default corner radius.
  const radius = /(^|\s)rounded-/.test(className) ? '' : 'rounded-md';
  const classes = `inline-flex items-center justify-center gap-2 ${radius} font-semibold whitespace-nowrap transition-colors duration-200 disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
