'use client';

import useFilterStore from '@/store/filterStore';
import { LAGOS_AREAS } from '@/lib/constants';

const fieldClasses = 'w-full bg-transparent text-sm font-medium text-ink focus:outline-none';

export default function SearchBar() {
  const { area, startDate, endDate, transmission, setFilter } = useFilterStore();

  return (
    <div className="grid grid-cols-1 gap-3 rounded-2xl border border-line bg-surface p-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:items-center lg:gap-0 lg:divide-x lg:divide-line">
      <label className="block px-3 py-1 lg:py-0">
        <span className="block text-xs text-ink-soft">Pickup</span>
        <select
          value={area}
          onChange={(e) => setFilter('area', e.target.value)}
          className={fieldClasses}
        >
          <option value="">Select area</option>
          {LAGOS_AREAS.map((name) => (
            <option key={name} value={name}>
              {name}, Lagos
            </option>
          ))}
        </select>
      </label>

      <label className="block px-3 py-1 lg:py-0">
        <span className="block text-xs text-ink-soft">Dates</span>
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-1 text-sm font-medium text-ink">
          <input
            type="date"
            value={startDate ?? ''}
            onChange={(e) => setFilter('startDate', e.target.value)}
            className="min-w-0 w-full bg-transparent focus:outline-none"
          />
          <span className="text-ink-soft">to</span>
          <input
            type="date"
            value={endDate ?? ''}
            onChange={(e) => setFilter('endDate', e.target.value)}
            className="min-w-0 w-full bg-transparent focus:outline-none"
          />
        </div>
      </label>

      <label className="block px-3 py-1 lg:py-0">
        <span className="block text-xs text-ink-soft">Transmission</span>
        <select
          value={transmission}
          onChange={(e) => setFilter('transmission', e.target.value)}
          className={fieldClasses}
        >
          <option value="">Any transmission</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </label>

      <button
        type="button"
        className="mt-1 min-h-11 rounded-xl bg-burgundy px-6 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright sm:col-span-2 lg:col-span-1 lg:mt-0 lg:ml-3"
      >
        Search
      </button>
    </div>
  );
}
