// Business details and homepage content. Edit here, not in components.

export const contact = {
  phone: '+971 6 564 2072',
  phoneHref: 'tel:+97165642072',
  whatsapp: '+971 54 991 0027',
  whatsappNumber: '971549910027',
  email: 'Info@idealpackstore.com',
  address: 'Sharjah Industrial Area 12, Sharjah, UAE',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sharjah+Industrial+Area+12+UAE',
};

export const social = [
  { label: 'Instagram', href: 'https://www.instagram.com/idealpack.uae/' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100092517775347' },
  { label: 'YouTube', href: 'https://www.youtube.com/@idealpack2589' },
];

export const whatsappLink = (message) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Categories', to: '/categories', mega: true },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const announcements = [
  'Free UAE delivery on orders over AED 200',
  'Cash on delivery available across all 7 emirates',
  'Buying in bulk? Ask our team for wholesale pricing',
];

// Add product handles to control these homepage sections by hand. Until there
// is real sales data, an empty list shows a selection across key categories.
export const featuredHandles = [];
export const bestSellerHandles = [];

// Replace with real customer quotes and set placeholder to false. Entries
// still marked placeholder show in development only and never in production.
export const testimonials = [
  {
    placeholder: true,
    quote: 'Replace this with a real quote from a restaurant or catering customer.',
    name: 'Customer name',
    role: 'Business, Emirate',
  },
  {
    placeholder: true,
    quote: 'Replace this with a real quote about delivery, quality or service.',
    name: 'Customer name',
    role: 'Business, Emirate',
  },
  {
    placeholder: true,
    quote: 'Replace this with a real quote from a wholesale customer.',
    name: 'Customer name',
    role: 'Business, Emirate',
  },
];
