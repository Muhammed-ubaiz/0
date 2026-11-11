import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { whatsappLink } from '../../data/site';
import WhatsAppIcon from '../ui/WhatsAppIcon';
import AnnouncementBar from './AnnouncementBar';
import CartDrawer from './CartDrawer';
import Footer from './Footer';
import Header from './Header';

export default function StoreLayout() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  // These pages have their own bottom action bar or need a clear form on phones.
  const hideOnPhones = pathname.startsWith('/product/') || pathname === '/checkout' || pathname === '/shop' || pathname.startsWith('/category/');

  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <a
        href={whatsappLink('Hello Ideal Pack, I have a question about packaging.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`fixed bottom-5 right-5 z-30 h-14 items-center gap-2.5 rounded-full bg-whatsapp px-4 text-[15px] font-bold text-white shadow-[0_10px_28px_-8px_rgb(37_211_102/0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-whatsapp-dark sm:pr-5 ${hideOnPhones ? 'hidden lg:flex' : 'flex'}`}
      >
        <WhatsAppIcon size={26} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
