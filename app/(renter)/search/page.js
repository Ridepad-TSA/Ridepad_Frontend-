/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { Map } from 'lucide-react';
import api from '@/lib/api';
import { normalizeCar } from '@/lib/adapters/cars';
import CarCard from '@/components/car/CarCard';
import SearchBar from '@/components/car/SearchBar';
import SearchFilters from '@/components/car/SearchFilters';
import MobileFilterSheet, { MobileFilterButton } from '@/components/car/MobileFilterSheet';
import EmptyState from '@/components/ui/EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import useFilterStore, { selectActiveFilterCount } from '@/store/filterStore';

export default function SearchPage() {
  const filters = useFilterStore();
  const [cars, setCars] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [filtersOpen, setFiltersOpen] = useState(false);
  const activeFilterCount = selectActiveFilterCount(filters);

  useEffect(() => {
    let active = true;
    const params = Object.fromEntries(Object.entries({ location: filters.area, category: filters.categories.length === 1 ? filters.categories[0] : '', minPrice: filters.minPrice, maxPrice: filters.maxPrice, seats: filters.seats, transmission: filters.transmission, availableFrom: filters.startDate, availableTo: filters.endDate }).filter(([, value]) => value !== '' && value !== null && value !== undefined));
    setLoading(true); setError('');
    api.get('/cars', { params }).then(({ data }) => { if (active) setCars((Array.isArray(data) ? data : []).map(normalizeCar)); }).catch(() => { if (active) setError('We couldn’t load vehicles right now. Please try again.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [filters.area, filters.categories, filters.minPrice, filters.maxPrice, filters.seats, filters.transmission, filters.startDate, filters.endDate]);

  return <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6"><SearchBar /><div className="mt-5 flex items-center justify-between gap-3"><h1 className="font-display text-lg font-bold text-ink">{loading ? 'Loading cars...' : `${cars.length} ${cars.length === 1 ? 'car' : 'cars'} available`}</h1><div className="lg:hidden"><MobileFilterButton activeCount={activeFilterCount} onClick={() => setFiltersOpen(true)} /></div></div><div className="mt-4 flex flex-col gap-6 lg:flex-row"><SearchFilters /><div className="min-w-0 flex-1">{error ? <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"><p>{error}</p><button type="button" onClick={() => setFiltersOpen(false)} className="mt-3 font-semibold underline">Try again</button></div> : loading ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><Skeleton className="aspect-[4/3]" /><Skeleton className="aspect-[4/3]" /></div> : cars.length === 0 ? <EmptyState title="No cars match your search" body="Try adjusting your filters or dates." /> : <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{cars.map((car) => <CarCard key={car.id} car={car} ctaLabel="View" />)}</div>}</div><div className="hidden h-fit w-80 shrink-0 items-center justify-center rounded-2xl border border-line bg-line/30 py-24 text-ink-soft lg:flex"><div className="flex flex-col items-center gap-2 text-sm"><Map className="size-6" aria-hidden="true" />Map of results</div></div></div><MobileFilterSheet open={filtersOpen} onClose={() => setFiltersOpen(false)} activeCount={activeFilterCount} /></div>;
}
