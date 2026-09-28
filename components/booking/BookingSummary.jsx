import { Car as CarIcon } from 'lucide-react';
import { formatDateRange } from '@/lib/format';
import PriceBreakdown from '@/components/car/PriceBreakdown';

/** Car, dates and price breakdown for a booking — used on checkout. */
export default function BookingSummary({ car, breakdown, startDate, endDate }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-ink">
          <CarIcon className="size-6 text-white/40" strokeWidth={1.25} aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{car.title}</p>
          <p className="text-xs text-ink-soft">
            {formatDateRange(startDate, endDate)} · {car.tripType}
          </p>
        </div>
      </div>

      <PriceBreakdown car={car} breakdown={breakdown} />
    </div>
  );
}
