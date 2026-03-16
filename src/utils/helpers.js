export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

export const truncate = (str, n = 80) =>
  str?.length > n ? str.slice(0, n) + '…' : str;

export const getInitials = (name = '') =>
  name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

export const CATEGORIES = ['pets', 'food', 'accessories', 'care products'];

export const SORT_OPTIONS = [
  { value: 'newest',     label: 'Newest First' },
  { value: 'oldest',     label: 'Oldest First' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
];

export const DEMO_USER  = { email: 'demo@pawmart.com',  password: 'Demo@123' };
export const DEMO_ADMIN = { email: 'admin@pawmart.com', password: 'Admin@123' };