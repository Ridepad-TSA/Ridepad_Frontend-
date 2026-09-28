import Link from 'next/link';
import clsx from 'clsx';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { formatDateRange } from '@/lib/format';
import { BOOKING_STATUS_LABELS } from '@/lib/constants';
import { MOCK_TRIPS, getCarById } from '@/lib/data/cars';

export default function TripsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-ink">Your trips</h1>

      {MOCK_TRIPS.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No trips yet"
            body="Book a car to see it here."
            action={
              <Link
                href="/search"
                className="mt-2 inline-flex min-h-9 items-center justify-center rounded-lg bg-burgundy px-4 text-sm font-semibold text-white hover:bg-burgundy-bright"
              >
                Browse cars
              </Link>
            }
          />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {MOCK_TRIPS.map((trip) => {
            const car = getCarById(trip.carId);
            if (!car) return null;
            return (
              <li key={trip.bookingId}>
                <Link
                  href={`/trips/${trip.bookingId}`}
                  className={clsx(
                    'flex items-center justify-between rounded-2xl border p-4 transition-colors hover:border-burgundy',
                    trip.status === 'active' ? 'border-burgundy bg-burgundy-tint' : 'border-line bg-surface',
                  )}
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">{car.title}</p>
                    <p className="text-xs text-ink-soft">
                      {formatDateRange(trip.startDate, trip.endDate)}
                    </p>
                  </div>
                  <Badge tone={trip.status === 'active' ? 'brand' : 'default'}>
                    {BOOKING_STATUS_LABELS[trip.status]}
                  </Badge>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
