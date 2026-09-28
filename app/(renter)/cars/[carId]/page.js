import Link from 'next/link';
import { notFound } from 'next/navigation';
import CarGallery from '@/components/car/CarGallery';
import Badge from '@/components/ui/Badge';
import { formatNaira } from '@/lib/format';
import { getCarById, BADGE_LABELS, RULES_FOR_CAR } from '@/lib/data/cars';

export default async function CarDetailPage({ params }) {
  const { carId } = await params;
  const car = getCarById(carId);
  if (!car) notFound();

  const initials = car.owner.name
    .split(' ')
    .map((p) => p[0])
    .join('');

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <CarGallery car={car} />

          <div className="mt-6">
            <h1 className="font-display text-2xl font-bold text-ink">{car.title}</h1>
            <p className="mt-1 text-sm text-ink-soft">
              {car.fullAddress} · {car.transmission} · {car.fuel} · {car.seats} seats
              {car.airConditioning ? ' · Air conditioning' : ''}
            </p>

            {car.badges.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {car.badges.map((key) => (
                  <Badge key={key} tone="info">
                    {BADGE_LABELS[key] ?? key}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
            <span className="flex size-11 items-center justify-center rounded-full bg-burgundy-tint text-sm font-bold text-burgundy">
              {initials}
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink">{car.owner.name}</p>
              <p className="text-xs text-ink-soft">
                Owner since {car.owner.since} · {car.owner.trips} completed trips ·{' '}
                {car.owner.verified}
              </p>
            </div>
            <button
              type="button"
              className="inline-flex min-h-9 items-center justify-center rounded-lg border border-ink px-4 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Message owner
            </button>
          </div>

          <div className="mt-6">
            <h2 className="font-display text-sm font-bold text-ink">Rules for this car</h2>
            <p className="mt-2 text-sm text-ink-soft">{RULES_FOR_CAR}</p>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-20">
          <p className="font-display text-xl font-bold text-ink">
            {formatNaira(car.pricePerDay)}
            <span className="text-sm font-normal text-ink-soft"> per day</span>
          </p>
          <Link
            href={`/booking/${car.id}`}
            className="mt-4 flex min-h-11 w-full items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright"
          >
            Book this car
          </Link>
          <p className="mt-3 text-xs text-ink-soft">
            Your money is held in escrow. The owner is paid after the return is confirmed and
            both of you confirm.
          </p>
        </aside>
      </div>
    </div>
  );
}
