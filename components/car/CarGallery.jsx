import Image from 'next/image';
import { Car as CarIcon } from 'lucide-react';

const SIDE_SHOTS = ['Interior', 'Map', 'Boot'];

export default function CarGallery({ car }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink sm:aspect-video">
        {car.image ? (
          <Image
            src={car.image}
            alt={car.title}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <CarIcon className="size-16 text-white/25" strokeWidth={1.25} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex w-20 flex-col gap-3 sm:w-28">
        {SIDE_SHOTS.map((label) => (
          <div
            key={label}
            className="flex flex-1 items-center justify-center rounded-xl border border-line bg-line/30 text-center text-[10px] font-medium text-ink-soft sm:text-xs"
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
