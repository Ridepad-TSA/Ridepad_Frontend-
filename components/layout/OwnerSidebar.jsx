import DashboardSidebar from './DashboardSidebar';

const LINKS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Listings', href: '/listings' },
  { label: 'Bookings', href: '/bookings' },
  { label: 'Payouts', href: '/payouts' },
];

export default function OwnerSidebar() {
  return <DashboardSidebar homeHref="/dashboard" links={LINKS} />;
}
