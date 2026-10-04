import EmptyState from '@/components/ui/EmptyState';

export default function AdminPayoutsPage() {
  return <div className="p-6"><h1 className="font-display text-xl font-bold text-ink">Payouts</h1><div className="mt-5"><EmptyState title="Payouts are not part of the current MVP" /></div></div>;
}
