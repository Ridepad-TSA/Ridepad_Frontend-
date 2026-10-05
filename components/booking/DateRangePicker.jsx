'use client';

import useBookingDraftStore from '@/store/bookingDraftStore';

const dateClasses = 'min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy';

export default function DateRangePicker() {
  const { startDate, endDate, updateDraft } = useBookingDraftStore();
  const today = new Date().toISOString().slice(0, 10);
  return <div className="space-y-4"><div className="grid min-w-0 grid-cols-2 gap-3"><label className="block min-w-0 w-full"><span className="mb-1 block text-sm font-medium text-ink">Pickup date</span><input type="date" aria-label="Pickup date" min={today} value={startDate || ''} onChange={(e) => updateDraft({ startDate: e.target.value })} className={`${dateClasses} min-w-0 px-2 text-[13px] sm:px-3 sm:text-sm`} /></label><label className="block min-w-0 w-full"><span className="mb-1 block text-sm font-medium text-ink">Return date</span><input type="date" aria-label="Return date" min={startDate || today} value={endDate || ''} onChange={(e) => updateDraft({ endDate: e.target.value })} className={`${dateClasses} min-w-0 px-2 text-[13px] sm:px-3 sm:text-sm`} /></label></div><p className="text-xs text-ink-soft">Choose your rental dates to check availability.</p></div>;
}
