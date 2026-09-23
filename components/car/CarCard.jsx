import Image from 'next/image';
import Link from 'next/link';
import { Car as CarIcon } from 'lucide-react';
import { formatNaira } from '@/lib/format';

/**
 * Summary card for search results and the landing page carousel.
 * `car.image` is optional — until real photos exist (e.g. exported from
 * Figma), a car-outline placeholder is shown instead.
 */
export default function CarCard({ car }) {
  const { id, title, area, tripType, seats, pricePerDay, image } = car;

  return (
    <Link
      href={`/cars/${id}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-video overflow-hidden bg-ink">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <CarIcon className="size-12 text-white/25" strokeWidth={1.25} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="space-y-2 p-4">
        <div>
          <h3 className="font-display text-sm font-bold text-ink">{title}</h3>
          <p className="text-xs text-ink-soft">
            {area} · {tripType} · {seats} seats
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <p className="text-sm font-semibold text-ink">
            {formatNaira(pricePerDay)}
            <span className="font-normal text-ink-soft"> / day</span>
          </p>
          <span className="text-sm font-semibold text-burgundy group-hover:text-burgundy-bright">
            Book
          </span>
        </div>
      </div>
    </Link>
  );
}
