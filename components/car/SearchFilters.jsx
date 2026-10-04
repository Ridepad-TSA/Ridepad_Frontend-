'use client';

import useFilterStore from '@/store/filterStore';
import { formatNaira } from '@/lib/format';

const CATEGORIES = [{ value: 'economy', label: 'Economy' }, { value: 'suv', label: 'SUV' }, { value: 'van', label: 'Van' }, { value: 'mercedes', label: 'Mercedes' }, { value: 'lamborghini', label: 'Lamborghini' }, { value: 'ferrari', label: 'Ferrari' }];
const PRICE_FLOOR = 15000; const PRICE_CEIL = 600000;

export default function SearchFilters() {
  const { categories, minPrice, maxPrice, toggleCategory } = useFilterStore();
  return <aside className="w-full shrink-0 space-y-6 lg:w-64"><div><h3 className="text-sm font-semibold text-ink">Price per day</h3><p className="mt-1 text-xs text-ink-soft">{formatNaira(minPrice ?? PRICE_FLOOR)} to {formatNaira(maxPrice ?? PRICE_CEIL)}</p><input type="range" min={PRICE_FLOOR} max={PRICE_CEIL} step={5000} value={maxPrice ?? PRICE_CEIL} onChange={(e) => useFilterStore.getState().setFilter('maxPrice', Number(e.target.value))} className="mt-2 w-full accent-burgundy" aria-label="Maximum price per day" /></div><div><h3 className="text-sm font-semibold text-ink">Category</h3><ul className="mt-2 space-y-2">{CATEGORIES.map((category) => <li key={category.value}><label className="flex items-center gap-2 text-sm text-ink"><input type="checkbox" className="size-4 rounded border-line accent-burgundy" checked={categories.includes(category.value)} onChange={() => toggleCategory(category.value)} />{category.label}</label></li>)}</ul></div></aside>;
}
