import DashboardSidebar from './DashboardSidebar';

const LINKS = [
  { label: 'Overview', href: '/admin/overview' },
  { label: 'Bookings', href: '/admin/bookings' },
  { label: 'Verifications', href: '/admin/verifications' },
  { label: 'Disputes', href: '/admin/disputes' },
  { label: 'Payouts', href: '/admin/payouts' },
  { label: 'Users', href: '/admin/users' },
];

export default function AdminSidebar() {
  return <DashboardSidebar homeHref="/admin/overview" links={LINKS} />;
}
