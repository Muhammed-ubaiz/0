import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { announcements, contact } from '../../data/site';

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((current) => (current + 1) % announcements.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="on-dark bg-blue text-white">
      <div className="shell flex h-9 items-center justify-center text-[12.5px] sm:justify-between">
        <div className="h-5 flex-1 overflow-hidden text-center sm:text-left">
          <motion.p key={index} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35 }} className="truncate leading-5">
            {announcements[index]}
          </motion.p>
        </div>
        <a href={contact.phoneHref} className="hidden items-center gap-1.5 font-mono text-[12px] hover:underline sm:flex">
          <Phone size={13} aria-hidden="true" />
          {contact.phone}
        </a>
      </div>
    </div>
  );
}
