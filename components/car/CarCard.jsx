import Link from 'next/link';
import { formatNaira } from '@/lib/format';
import Badge from '@/components/ui/Badge';
import VehicleImage from '@/components/car/VehicleImage';
import { BADGE_LABELS } from '@/lib/data/cars';

export default function CarCard({ car, ctaLabel = 'Book' }) {
  const { id, title, area, tripType, seats, pricePerDay, image, badges } = car;
  return <Link href={`/cars/${id}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[box-shadow,transform,border-color] hover:-translate-y-0.5 hover:border-burgundy/40 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy">
    <div className="relative aspect-video shrink-0 overflow-hidden bg-ink"><VehicleImage src={image} alt={title} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.02]" />{badges?.length > 0 && <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">{badges.map((key) => <Badge key={key} tone="brand">{BADGE_LABELS[key] ?? key}</Badge>)}</div>}</div>
    <div className="flex flex-1 flex-col justify-between gap-3 p-4"><div><h3 className="min-h-10 break-words font-display text-sm font-bold text-ink">{title}</h3><p className="text-xs text-ink-soft">{area} · {tripType} · {seats} seats</p></div><div className="flex flex-wrap items-center justify-between gap-2 pt-1"><p className="text-sm font-semibold text-ink">{formatNaira(pricePerDay)}<span className="font-normal text-ink-soft"> / day</span></p><span className="text-sm font-semibold text-burgundy group-hover:text-burgundy-bright">{ctaLabel}</span></div></div>
  </Link>;
}
