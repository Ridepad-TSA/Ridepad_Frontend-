import Link from 'next/link';
import { formatNaira } from '@/lib/format';
import Badge from '@/components/ui/Badge';
import VehicleImage from '@/components/car/VehicleImage';
import { BADGE_LABELS } from '@/lib/data/cars';

export default function CarCard({ car, ctaLabel = 'Book' }) {
  const { id, title, area, tripType, seats, pricePerDay, image, badges } = car;
  return <Link href={`/cars/${id}`} className="group block overflow-hidden rounded-2xl border border-line bg-surface transition-shadow hover:shadow-lg"><div className="relative aspect-video overflow-hidden bg-ink"><VehicleImage src={image} alt={title} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />{badges?.length > 0 && <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">{badges.map((key) => <Badge key={key} tone="brand">{BADGE_LABELS[key] ?? key}</Badge>)}</div>}</div><div className="space-y-2 p-4"><div><h3 className="font-display text-sm font-bold text-ink">{title}</h3><p className="text-xs text-ink-soft">{area} · {tripType} · {seats} seats</p></div><div className="flex items-center justify-between pt-1"><p className="text-sm font-semibold text-ink">{formatNaira(pricePerDay)}<span className="font-normal text-ink-soft"> / day</span></p><span className="text-sm font-semibold text-burgundy group-hover:text-burgundy-bright">{ctaLabel}</span></div></div></Link>;
}