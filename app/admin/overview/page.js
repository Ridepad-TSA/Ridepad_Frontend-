import Link from 'next/link';
import StatTile from '@/components/dashboard/StatTile';
import BarChart from '@/components/dashboard/BarChart';
import Badge from '@/components/ui/Badge';
import { formatNaira } from '@/lib/format';
import { BOOKING_STATUS_LABELS, BOOKING_STATUS_TONE } from '@/lib/constants';
import { OVERVIEW_STATS, BOOKINGS_PER_WEEK, NEEDS_ATTENTION, RECENT_BOOKINGS } from '@/lib/data/admin';

export default function AdminOverviewPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-bold text-ink">Overview</h1>
        <div className="flex items-center gap-2">
          <select className="min-h-9 rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
          <button
            type="button"
            className="inline-flex min-h-9 items-center justify-center rounded-lg bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
          >
            Export
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {OVERVIEW_STATS.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-display text-sm font-bold text-ink">Bookings per week</h2>
          <div className="mt-4">
            <BarChart data={BOOKINGS_PER_WEEK} unitLabel="bookings" />
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-display text-sm font-bold text-ink">Needs attention</h2>
          <ul className="mt-3 space-y-3">
            {NEEDS_ATTENTION.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between text-sm text-ink hover:text-burgundy"
                >
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.count}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/admin/verifications"
            className="mt-4 flex min-h-9 w-full items-center justify-center rounded-lg bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-ink/90"
          >
            Open review queue
          </Link>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-surface p-5">
        <h2 className="font-display text-sm font-bold text-ink">Recent bookings</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs text-ink-soft">
                <th className="pb-2 font-medium">Booking</th>
                <th className="pb-2 font-medium">Renter</th>
                <th className="pb-2 font-medium">Car</th>
                <th className="pb-2 font-medium">Amount</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_BOOKINGS.map((booking) => (
                <tr key={booking.bookingId} className="border-b border-line last:border-0">
                  <td className="py-2.5 font-medium text-ink">{booking.bookingId}</td>
                  <td className="py-2.5 text-ink-soft">{booking.renter}</td>
                  <td className="py-2.5 text-ink-soft">{booking.car}</td>
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
  );
}
