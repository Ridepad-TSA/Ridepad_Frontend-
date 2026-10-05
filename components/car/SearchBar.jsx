'use client';

import useFilterStore from '@/store/filterStore';
import { LAGOS_AREAS } from '@/lib/constants';

const fieldClasses = 'min-h-11 w-full bg-transparent text-sm font-medium text-ink focus:outline-none';
const dateClasses = 'min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy';

export default function SearchBar() {
  const { area, startDate, endDate, transmission, setFilter } = useFilterStore();
  return <div className="grid grid-cols-1 gap-3 rounded-2xl border border-line bg-surface p-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_auto] lg:items-center lg:gap-0 lg:divide-x lg:divide-line">
    <label className="block px-3 py-1 lg:py-0"><span className="block text-xs text-ink-soft">Pickup location</span><select value={area} onChange={(e) => setFilter('area', e.target.value)} className={fieldClasses}><option value="">Select area</option>{LAGOS_AREAS.map((name) => <option key={name} value={name}>{name}, Lagos</option>)}</select></label>
    <div className="grid min-w-0 grid-cols-2 gap-2 px-3 py-1 sm:col-span-2 lg:col-span-1 lg:py-0"><label className="block min-w-0 w-full"><span className="mb-1 block text-xs text-ink-soft">Pickup</span><input type="date" aria-label="Pickup date" value={startDate ?? ''} onChange={(e) => setFilter('startDate', e.target.value)} className={`${dateClasses} min-w-0 px-2 text-[13px] sm:px-3 sm:text-sm`} /></label><label className="block min-w-0 w-full"><span className="mb-1 block text-xs text-ink-soft">Return</span><input type="date" aria-label="Return date" min={startDate || undefined} value={endDate ?? ''} onChange={(e) => setFilter('endDate', e.target.value)} className={`${dateClasses} min-w-0 px-2 text-[13px] sm:px-3 sm:text-sm`} /></label></div>
    <label className="col-span-1 block px-3 py-1 lg:col-span-1 lg:py-0"><span className="block text-xs text-ink-soft">Transmission</span><select value={transmission} onChange={(e) => setFilter('transmission', e.target.value)} className={fieldClasses}><option value="">Any transmission</option><option value="automatic">Automatic</option><option value="manual">Manual</option></select></label>
    <button type="button" className="col-span-1 min-h-11 rounded-xl bg-burgundy px-4 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright sm:col-span-2 lg:col-span-1 lg:ml-3">Search</button>
  </div>;
}
