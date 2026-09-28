import { notFound } from 'next/navigation';
import Badge from '@/components/ui/Badge';
import StatusTimeline from '@/components/booking/StatusTimeline';
import CheckInPhotos from '@/components/booking/CheckInPhotos';
import { formatDateRange } from '@/lib/format';
import { getTripById, getCarById, CHECK_IN_SLOTS } from '@/lib/data/cars';

export default async function TripDetailPage({ params }) {
  const { bookingId } = await params;
  const trip = getTripById(bookingId);
  const car = trip ? getCarById(trip.carId) : null;
  if (!trip || !car) notFound();

  const requiredDone = CHECK_IN_SLOTS.filter((s) => s.required).every((s) =>
    trip.uploadedPhotoKeys.includes(s.key),
  );
  const headline = trip.status === 'active' && !requiredDone ? 'Pickup today' : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">{car.title}</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {formatDateRange(trip.startDate, trip.endDate)} · Driver: {trip.driver} · Booking{' '}
            {trip.bookingId}
          </p>
        </div>
        {headline && <Badge tone="brand">{headline}</Badge>}
      </div>

      <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <StatusTimeline status={trip.status} />
      </div>

      {trip.status === 'active' && (
        <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
          <CheckInPhotos
            initialUploadedKeys={trip.uploadedPhotoKeys}
            ownerConfirmedCount={trip.ownerConfirmedCount}
          />
        </div>
      )}
    </div>
  );
}
