import Link from 'next/link';
import { Car as CarIcon } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import { formatNaira } from '@/lib/format';

const STATUS_TONE = { live: 'success', pending: 'info' };
const STATUS_LABEL = { live: 'Live', pending: 'Pending approval' };

export default function ListingCard({ listing }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-ink">
        <CarIcon className="size-6 text-white/40" strokeWidth={1.25} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-ink">{listing.title}</p>
        <p className="text-xs text-ink-soft">
          {formatNaira(listing.pricePerDay)}/day · {listing.trips} trips
        </p>
      </div>
      <Badge tone={STATUS_TONE[listing.status]}>{STATUS_LABEL[listing.status]}</Badge>
      <Link
        href={`/listings/${listing.id}/edit`}
        className="inline-flex min-h-9 items-center justify-center rounded-lg border border-ink px-4 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
      >
        Edit
      </Link>
    </div>
  );
}
