import EmptyState from '@/components/ui/EmptyState';

export default function AdminUsersPage() {
  return <div className="p-6"><h1 className="font-display text-xl font-bold text-ink">Users</h1><div className="mt-5"><EmptyState title="User management is not available yet" body="Use the supported booking and fleet workflows for the current MVP." /></div></div>;
}
