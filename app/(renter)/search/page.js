'use client';

import { Map } from 'lucide-react';
import CarCard from '@/components/car/CarCard';
import SearchBar from '@/components/car/SearchBar';
import SearchFilters from '@/components/car/SearchFilters';
import EmptyState from '@/components/ui/EmptyState';
import useFilterStore from '@/store/filterStore';
import { CARS } from '@/lib/data/cars';

function matchesFilters(car, filters) {
  if (filters.area && car.area !== filters.area) return false;
  if (filters.categories.length > 0 && !filters.categories.includes(car.category)) return false;
  if (filters.minPrice && car.pricePerDay < filters.minPrice) return false;
  if (filters.maxPrice && car.pricePerDay > filters.maxPrice) return false;
  if (filters.verifiedOnly && !car.badges.includes('verified')) return false;
  return true;
}

export default function SearchPage() {
  const filters = useFilterStore();
  const results = CARS.filter((car) => matchesFilters(car, filters));

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <SearchBar />

      <div className="mt-6 flex items-center justify-between">
        <h1 className="font-display text-lg font-bold text-ink">
          {results.length} {results.length === 1 ? 'car' : 'cars'} available
        </h1>
      </div>

      <div className="mt-4 flex flex-col gap-6 lg:flex-row">
        <SearchFilters />

        <div className="flex-1">
          {results.length === 0 ? (
            <EmptyState
              title="No cars match those filters"
              body="Try widening your price range or clearing a filter."
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {results.map((car) => (
                <CarCard key={car.id} car={car} ctaLabel="View" />
              ))}
            </div>
          )}
        </div>

        <div className="hidden h-fit w-80 shrink-0 items-center justify-center rounded-2xl border border-line bg-line/30 py-24 text-ink-soft lg:flex">
          <div className="flex flex-col items-center gap-2 text-sm">
            <Map className="size-6" aria-hidden="true" />
            Map of results
          </div>
        </div>
      </div>
    </div>
  );
}
