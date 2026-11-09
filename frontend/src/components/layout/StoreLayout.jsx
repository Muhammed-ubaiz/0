import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../../data/site';
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
        className={`fixed bottom-5 right-5 z-30 h-13 items-center gap-2 rounded-full bg-navy px-4 text-[14px] font-semibold text-white shadow-lift transition-colors hover:bg-blue ${hideOnPhones ? 'hidden lg:flex' : 'flex'}`}
      >
        <MessageCircle size={21} />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}
