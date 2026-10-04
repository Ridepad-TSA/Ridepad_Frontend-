'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import api from '@/lib/api';
import { normalizeCar } from '@/lib/adapters/cars';
import CarGallery from '@/components/car/CarGallery';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import { formatNaira } from '@/lib/format';

export default function CarDetailPage({ params }) {
  const { carId } = use(params); const [car, setCar] = useState(null); const [error, setError] = useState('');
  useEffect(() => { api.get('/cars/' + carId).then(({ data }) => setCar(normalizeCar(data))).catch((err) => setError(err.message)); }, [carId]);
  if (error) return <div className="mx-auto max-w-2xl px-4 py-12 text-center"><p className="text-sm text-red-600">{error}</p><Link href="/search" className="mt-4 inline-block text-sm font-semibold text-burgundy">Back to cars</Link></div>;
  if (!car) return <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6"><Skeleton className="aspect-video" /></div>;
  return <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6"><div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]"><div><CarGallery car={car} /><div className="mt-6"><h1 className="font-display text-2xl font-bold text-ink">{car.title}</h1><p className="mt-1 text-sm text-ink-soft">{car.location} · {car.year} · {car.seats} seats</p><div className="mt-3 flex flex-wrap gap-2"><Badge tone="info">{car.category}</Badge><Badge tone="default">{car.transmission}</Badge><Badge tone="default">{car.fuel}</Badge></div></div><div className="mt-6 rounded-2xl border border-line bg-surface p-5"><h2 className="font-display text-sm font-bold text-ink">Vehicle details</h2><dl className="mt-3 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-ink-soft">Make</dt><dd className="font-medium">{car.make}</dd></div><div><dt className="text-ink-soft">Model</dt><dd className="font-medium">{car.model}</dd></div><div><dt className="text-ink-soft">Year</dt><dd className="font-medium">{car.year}</dd></div><div><dt className="text-ink-soft">Seats</dt><dd className="font-medium">{car.seats}</dd></div><div><dt className="text-ink-soft">Location</dt><dd className="font-medium">{car.location}</dd></div></dl></div><div className="mt-6"><h2 className="font-display text-sm font-bold text-ink">About this car</h2><p className="mt-2 text-sm text-ink-soft">{car.description}</p></div></div><aside className="h-fit rounded-2xl border border-line bg-surface p-5 lg:sticky lg:top-20"><p className="font-display text-xl font-bold text-ink">{formatNaira(car.pricePerDay)}<span className="text-sm font-normal text-ink-soft"> per day</span></p><Link href={'/booking/' + car.id} className="mt-4 flex min-h-11 w-full items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white hover:bg-burgundy-bright">Book this car</Link></aside></div></div>;
}
