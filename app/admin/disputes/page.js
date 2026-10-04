import EmptyState from '@/components/ui/EmptyState';

export default function AdminDisputesPage() {
  return <div className="p-6"><h1 className="font-display text-xl font-bold text-ink">Disputes</h1><div className="mt-5"><EmptyState title="Disputes are not part of the current MVP" /></div></div>;
}
