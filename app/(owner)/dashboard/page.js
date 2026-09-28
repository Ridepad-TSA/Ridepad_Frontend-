import Link from 'next/link';
import StatTile from '@/components/dashboard/StatTile';
import BarChart from '@/components/dashboard/BarChart';
import Badge from '@/components/ui/Badge';
import { formatNaira } from '@/lib/format';
import { BOOKING_STATUS_LABELS, BOOKING_STATUS_TONE } from '@/lib/constants';
import { OWNER_STATS, EARNINGS_PER_WEEK, OWNER_NEEDS_ATTENTION, OWNER_BOOKINGS, OWNER_LISTINGS } from '@/lib/data/owner';

const LISTING_TONE = { live: 'success', pending: 'info' };
const LISTING_LABEL = { live: 'Live', pending: 'Pending approval' };

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-ink">Dashboard</h1>
        <Link
          href="/listings/new"
          className="inline-flex min-h-9 items-center justify-center rounded-lg bg-burgundy px-4 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright"
        >
          List a car
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {OWNER_STATS.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-display text-sm font-bold text-ink">Earnings per week</h2>
          <div className="mt-4">
            <BarChart data={EARNINGS_PER_WEEK} valueFormat="currency" />
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-display text-sm font-bold text-ink">Needs attention</h2>
          <ul className="mt-3 space-y-3">
            {OWNER_NEEDS_ATTENTION.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-3 text-sm text-ink hover:text-burgundy"
                >
                  <span>{item.label}</span>
                  <span className="shrink-0 font-semibold">{item.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-ink">Your listings</h2>
            <Link href="/listings" className="text-xs font-semibold text-burgundy hover:text-burgundy-bright">
              View all
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-line">
            {OWNER_LISTINGS.map((listing) => (
              <li key={listing.id} className="flex items-center justify-between gap-3 py-2.5">
                <div>
                  <p className="text-sm font-semibold text-ink">{listing.title}</p>
                  <p className="text-xs text-ink-soft">
                    {formatNaira(listing.pricePerDay)}/day · {listing.trips} trips
                  </p>
                </div>
                <Badge tone={LISTING_TONE[listing.status]}>{LISTING_LABEL[listing.status]}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-ink">Recent bookings</h2>
            <Link href="/bookings" className="text-xs font-semibold text-burgundy hover:text-burgundy-bright">
              View all
            </Link>
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-ink-soft">
                  <th className="pb-2 font-medium">Booking</th>
                  <th className="pb-2 font-medium">Renter</th>
                  <th className="pb-2 font-medium">Amount</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {OWNER_BOOKINGS.slice(0, 3).map((booking) => (
                  <tr key={booking.bookingId} className="border-b border-line last:border-0">
                    <td className="py-2.5 font-medium text-ink">
                      <Link href={`/bookings/${booking.bookingId}`} className="hover:text-burgundy">
                        {booking.bookingId}
                      </Link>
                    </td>
                    <td className="py-2.5 text-ink-soft">{booking.renter}</td>
                    <td className="py-2.5 text-ink-soft">{formatNaira(booking.amount)}</td>
                    <td className="py-2.5">
                      <Badge tone={BOOKING_STATUS_TONE[booking.status]}>
                        {BOOKING_STATUS_LABELS[booking.status]}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
