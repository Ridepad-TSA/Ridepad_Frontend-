import { notFound } from 'next/navigation';
import clsx from 'clsx';
import { Check, ImageOff } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import StatusTimeline from '@/components/booking/StatusTimeline';
import PriceBreakdown from '@/components/car/PriceBreakdown';
import BookingActions from '@/components/owner/BookingActions';
import { formatDateRange } from '@/lib/format';
import { BOOKING_STATUS_LABELS, BOOKING_STATUS_TONE } from '@/lib/constants';
import { getOwnerBookingById } from '@/lib/data/owner';
import { getCarById, priceBreakdown, CHECK_IN_SLOTS } from '@/lib/data/cars';

export default async function OwnerBookingDetailPage({ params }) {
  const { bookingId } = await params;
  const booking = getOwnerBookingById(bookingId);
  const car = booking ? getCarById(booking.carId) : null;
  if (!booking || !car) notFound();

  const nights = Math.max(
    1,
    Math.round((new Date(booking.endDate) - new Date(booking.startDate)) / 86_400_000),
  );
  const breakdown = priceBreakdown(car, nights);
  const requiredSlots = CHECK_IN_SLOTS.filter((s) => s.required);
  const requiredDone = requiredSlots.every((s) => booking.uploadedPhotoKeys.includes(s.key));

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-ink">{booking.car}</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {booking.renter} · {formatDateRange(booking.startDate, booking.endDate)} ·{' '}
            {booking.bookingId}
          </p>
        </div>
        <Badge tone={BOOKING_STATUS_TONE[booking.status]}>
          {BOOKING_STATUS_LABELS[booking.status]}
        </Badge>
      </div>

      <div className="mt-5 rounded-2xl border border-line bg-surface p-5">
        <StatusTimeline status={booking.status} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-display text-sm font-bold text-ink">Pickup photos</h2>
          <p className="mt-1 text-xs text-ink-soft">
            {booking.uploadedPhotoKeys.length} of {CHECK_IN_SLOTS.length} uploaded by the renter
          </p>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CHECK_IN_SLOTS.map((slot) => {
              const done = booking.uploadedPhotoKeys.includes(slot.key);
              return (
                <div
                  key={slot.key}
                  className={clsx(
                    'flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border text-center text-xs',
                    done
                      ? 'border-burgundy bg-burgundy-tint text-burgundy'
                      : 'border-dashed border-line text-ink-soft',
                  )}
                >
                  {done ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    <ImageOff className="size-4" aria-hidden="true" />
                  )}
                  <span className="font-semibold">{slot.label}</span>
                  <span className="text-[10px]">{done ? 'Uploaded' : 'Not yet'}</span>
                </div>
              );
            })}
          </div>

          <BookingActions disabled={!requiredDone} />
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-display text-sm font-bold text-ink">What the renter paid</h2>
          <div className="mt-3">
            <PriceBreakdown car={car} breakdown={breakdown} />
          </div>
        </aside>
      </div>
    </div>
  );
}
