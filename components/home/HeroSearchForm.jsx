'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LAGOS_AREAS } from '@/lib/constants';

const fieldClasses =
  'w-full bg-transparent text-sm font-medium text-ink placeholder:text-ink-soft focus:outline-none';

export default function HeroSearchForm() {
  const router = useRouter();
  const [area, setArea] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tripType, setTripType] = useState('with-driver');

  function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (area) params.set('area', area);
    if (startDate) params.set('from', startDate);
    if (endDate) params.set('to', endDate);
    if (tripType) params.set('tripType', tripType);
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl bg-white p-3 shadow-xl sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_auto] lg:items-center lg:gap-0 lg:divide-x lg:divide-line"
    >
      <label className="block px-3 py-1 lg:py-0">
        <span className="block text-xs text-ink-soft">Pickup location</span>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
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
        <span className="block text-xs text-ink-soft">From</span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={fieldClasses}
        />
      </label>

      <label className="block px-3 py-1 lg:py-0">
        <span className="block text-xs text-ink-soft">To</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={fieldClasses}
        />
      </label>

      <label className="block px-3 py-1 lg:py-0">
        <span className="block text-xs text-ink-soft">Trip type</span>
        <select
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          className={fieldClasses}
        >
          <option value="with-driver">With driver</option>
          <option value="self-drive">Self drive</option>
        </select>
      </label>

      <button
        type="submit"
        className="min-h-11 rounded-xl bg-burgundy px-6 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright sm:col-span-2 lg:col-span-1 lg:ml-3"
      >
        Search cars
      </button>
    </form>
  );
}
