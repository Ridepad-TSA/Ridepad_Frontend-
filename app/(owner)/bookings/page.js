'use client';

import { useState } from 'react';
import clsx from 'clsx';
import BookingRow from '@/components/owner/BookingRow';
import EmptyState from '@/components/ui/EmptyState';
import { BOOKING_STATUS_LABELS } from '@/lib/constants';
import { OWNER_BOOKINGS } from '@/lib/data/owner';

const TABS = ['all', ...new Set(OWNER_BOOKINGS.map((b) => b.status))];

export default function OwnerBookingsPage() {
  const [tab, setTab] = useState('all');
  const bookings = tab === 'all' ? OWNER_BOOKINGS : OWNER_BOOKINGS.filter((b) => b.status === tab);

  return (
    <div className="p-6">
      <h1 className="font-display text-xl font-bold text-ink">Bookings</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {TABS.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setTab(status)}
            className={clsx(
              'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
              tab === status ? 'bg-burgundy text-white' : 'bg-line/60 text-ink hover:bg-line',
            )}
          >
            {status === 'all' ? 'All' : BOOKING_STATUS_LABELS[status]}
          </button>
        ))}
      </div>

      {bookings.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No bookings here" body="Try a different filter." />
        </div>
      ) : (
        <ul className="mt-5 space-y-3">
          {bookings.map((booking) => (
            <li key={booking.bookingId}>
              <BookingRow booking={booking} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
