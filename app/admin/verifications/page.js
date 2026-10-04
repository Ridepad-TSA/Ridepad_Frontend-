import EmptyState from '@/components/ui/EmptyState';

export default function AdminVerificationsPage() {
  return <div className="p-6"><h1 className="font-display text-xl font-bold text-ink">Verification</h1><div className="mt-5"><EmptyState title="Verification is not part of the current MVP" body="Ridepad currently manages its own fleet and does not run an owner verification workflow." /></div></div>;
}
