import { useState } from 'react';
import { Package } from 'lucide-react';
import { imageUrl } from '../../lib/catalog';

/** Product photo on a light tile. A placeholder shows until the photo loads, and stays if it never does. */
export default function ProductThumb({ src, width = 160, className = '' }) {
  const [state, setState] = useState(src ? 'loading' : 'failed');

  return (
    <span className={`relative grid place-items-center overflow-hidden rounded-lg border border-navy/10 bg-white ${className}`}>
      {state !== 'loaded' && <Package size={22} className="text-blue/45" aria-hidden="true" />}
      {state !== 'failed' && (
        <img
          src={imageUrl(src, width)}
          alt=""
          loading="lazy"
          onLoad={() => setState('loaded')}
          onError={() => setState('failed')}
          className={`absolute inset-0 size-full scale-110 object-contain p-1.5 photo-clean transition-opacity duration-300 ${state === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </span>
  );
}
