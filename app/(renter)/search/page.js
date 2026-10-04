/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { Map } from 'lucide-react';
import api from '@/lib/api';
import { normalizeCar } from '@/lib/adapters/cars';
import CarCard from '@/components/car/CarCard';
import SearchBar from '@/components/car/SearchBar';
import SearchFilters from '@/components/car/SearchFilters';
import EmptyState from '@/components/ui/EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import useFilterStore from '@/store/filterStore';

export default function SearchPage() {
  const filters = useFilterStore();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const params = Object.fromEntries(Object.entries({
      location: filters.area, category: filters.categories.length === 1 ? filters.categories[0] : '',
      minPrice: filters.minPrice, maxPrice: filters.maxPrice, seats: filters.seats,
      transmission: filters.transmission, availableFrom: filters.startDate, availableTo: filters.endDate,
    }).filter(([, value]) => value !== '' && value !== null && value !== undefined));
    setLoading(true); setError('');
    api.get('/cars', { params }).then(({ data }) => {
      if (active) setCars((Array.isArray(data) ? data : []).map(normalizeCar));
    }).catch((err) => { if (active) setError(err.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [filters.area, filters.categories, filters.minPrice, filters.maxPrice, filters.seats, filters.transmission, filters.startDate, filters.endDate]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <SearchBar />
      <div className="mt-6 flex items-center justify-between"><h1 className="font-display text-lg font-bold text-ink">{loading ? 'Loading carsâ€¦' : `${cars.length} ${cars.length === 1 ? 'car' : 'cars'} available`}</h1></div>
      <div className="mt-4 flex flex-col gap-6 lg:flex-row">
        <SearchFilters />
        <div className="flex-1">
          {error ? <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p> : loading ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><Skeleton className="aspect-[4/3]" /><Skeleton className="aspect-[4/3]" /></div> : cars.length === 0 ? <EmptyState title="No cars found" body="Try changing your dates or filters." /> : <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{cars.map((car) => <CarCard key={car.id} car={car} ctaLabel="View" />)}</div>}
        </div>
        <div className="hidden h-fit w-80 shrink-0 items-center justify-center rounded-2xl border border-line bg-line/30 py-24 text-ink-soft lg:flex"><div className="flex flex-col items-center gap-2 text-sm"><Map className="size-6" aria-hidden="true" />Map of results</div></div>
      </div>
    </div>
  );
}
