'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/car/SearchBar';
import CarCard from '@/components/car/CarCard';
import EmptyState from '@/components/ui/EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import api from '@/lib/api';
import { normalizeCar } from '@/lib/adapters/cars';

export default function LandingPage() {
  const [cars, setCars] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  useEffect(() => { api.get('/cars').then(({ data }) => setCars((data || []).map(normalizeCar).slice(0, 4))).catch((err) => setError(err.message)).finally(() => setLoading(false)); }, []);
  return <><Navbar /><main className="flex-1"><section className="bg-night text-white"><div className="mx-auto max-w-6xl px-4 py-16 sm:px-6"><p className="text-xs font-semibold tracking-wide text-burgundy-bright uppercase">Ridepad fleet rentals in Lagos</p><h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold sm:text-5xl">Find the right car for your next trip.</h1><p className="mt-4 max-w-xl text-white/70">Browse Ridepad vehicles, choose your dates, and request a booking through our simple rental workflow.</p><div className="mt-8"><SearchBar /></div></div></section><section className="mx-auto max-w-6xl px-4 py-14 sm:px-6"><div className="mb-6 flex items-end justify-between"><div><h2 className="font-display text-2xl font-bold text-ink">Available vehicles</h2><p className="mt-1 text-sm text-ink-soft">Real-time vehicles from the Ridepad fleet.</p></div><Link href="/search" className="text-sm font-semibold text-burgundy">See all vehicles</Link></div>{loading ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><Skeleton className="aspect-[4/3]" /><Skeleton className="aspect-[4/3]" /></div> : error ? <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p> : cars.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{cars.map((car) => <CarCard key={car.id} car={car} />)}</div> : <EmptyState title="No cars found" body="Try again soon for available Ridepad cars." action={<Link href="/search" className="mt-2 text-sm font-semibold text-burgundy">Browse catalogue</Link>} />}</section></main><Footer /></>;
}
