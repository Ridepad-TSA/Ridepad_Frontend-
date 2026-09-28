import Link from 'next/link';

export default function AdminBookingsPage() {
  return (
    <div className="p-6">
      <h1 className="font-display text-xl font-bold text-ink">Bookings</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Full booking search and detail view — not built yet. See the Recent bookings table on{' '}
        <Link href="/admin/overview" className="font-semibold text-burgundy hover:text-burgundy-bright">
          Overview
        </Link>{' '}
        for now.
      </p>
    </div>
  );
}
