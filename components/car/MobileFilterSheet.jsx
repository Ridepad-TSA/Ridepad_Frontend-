'use client';

import { useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import SearchFilters from '@/components/car/SearchFilters';
import useFilterStore from '@/store/filterStore';

export default function MobileFilterSheet({ open, onClose, activeCount }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => { if (event.key === 'Escape') onClose(); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title"><button type="button" aria-label="Close filters" onClick={onClose} className="absolute inset-0 bg-night/50" /><section className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-2xl bg-surface p-5 shadow-2xl sm:inset-x-4 sm:bottom-4 sm:rounded-2xl"><div className="flex items-center justify-between border-b border-line pb-4"><h2 id="mobile-filter-title" className="font-display text-lg font-bold text-ink">Filters</h2><button type="button" onClick={onClose} aria-label="Close filters" className="flex size-11 items-center justify-center rounded-lg text-ink-soft hover:bg-burgundy-tint hover:text-ink"><X className="size-5" /></button></div><div className="py-5"><SearchFilters mobile /></div><div className="flex gap-3 border-t border-line pt-4"><button type="button" onClick={() => useFilterStore.getState().reset()} className="min-h-11 flex-1 rounded-lg border border-ink px-4 text-sm font-semibold text-ink hover:bg-ink hover:text-white">Clear filters</button><button type="button" onClick={onClose} className="min-h-11 flex-1 rounded-lg bg-burgundy px-4 text-sm font-semibold text-white hover:bg-burgundy-bright">Show results{activeCount ? ` (${activeCount})` : ''}</button></div></section></div>;
}

export function MobileFilterButton({ activeCount, onClick }) { return <button type="button" onClick={onClick} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm font-semibold text-ink hover:border-burgundy hover:text-burgundy"><SlidersHorizontal className="size-4" aria-hidden="true" />Filters{activeCount ? ` (${activeCount})` : ''}</button>; }
