import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import { formatNaira, formatDateRange } from '@/lib/format';
import { BOOKING_STATUS_LABELS, BOOKING_STATUS_TONE } from '@/lib/constants';

/** One booking in the owner's list, linking through to its detail page. */
export default function BookingRow({ booking }) {
  return (
    <Link
      href={`/bookings/${booking.bookingId}`}
      className="flex flex-col gap-2 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-burgundy sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{booking.car}</p>
        <p className="text-xs text-ink-soft">
          {booking.renter} · {formatDateRange(booking.startDate, booking.endDate)} · {booking.bookingId}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm font-semibold text-ink">{formatNaira(booking.amount)}</p>
        <Badge tone={BOOKING_STATUS_TONE[booking.status]}>{BOOKING_STATUS_LABELS[booking.status]}</Badge>
      </div>
    </Link>
  );
}
