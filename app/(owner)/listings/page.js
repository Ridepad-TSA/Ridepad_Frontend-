import Link from 'next/link';
import ListingCard from '@/components/owner/ListingCard';
import EmptyState from '@/components/ui/EmptyState';
import { OWNER_LISTINGS } from '@/lib/data/owner';

export default function ListingsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-ink">Your listings</h1>
        <Link
          href="/listings/new"
          className="inline-flex min-h-9 items-center justify-center rounded-lg bg-burgundy px-4 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright"
        >
          List a car
        </Link>
      </div>

      {OWNER_LISTINGS.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No cars listed yet"
            body="List your first car to start earning when it's idle."
            action={
              <Link
                href="/listings/new"
                className="mt-2 inline-flex min-h-9 items-center justify-center rounded-lg bg-burgundy px-4 text-sm font-semibold text-white hover:bg-burgundy-bright"
              >
                List a car
              </Link>
            }
          />
        </div>
      ) : (
        <ul className="mt-5 space-y-3">
          {OWNER_LISTINGS.map((listing) => (
            <li key={listing.id}>
              <ListingCard listing={listing} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
