'use client';

import useBookingDraftStore from '@/store/bookingDraftStore';

export default function DateRangePicker() {
  const { startDate, endDate, updateDraft } = useBookingDraftStore();
  const today = new Date().toISOString().slice(0, 10);
  return <div className="space-y-4"><div className="grid grid-cols-2 gap-3"><label className="block"><span className="mb-1 block text-sm font-medium text-ink">Pickup date</span><input type="date" min={today} value={startDate || ''} onChange={(e) => updateDraft({ startDate: e.target.value })} className="min-h-11 w-full rounded-lg border border-line px-3 text-sm focus:ring-2 focus:ring-burgundy" /></label><label className="block"><span className="mb-1 block text-sm font-medium text-ink">Return date</span><input type="date" min={startDate || today} value={endDate || ''} onChange={(e) => updateDraft({ endDate: e.target.value })} className="min-h-11 w-full rounded-lg border border-line px-3 text-sm focus:ring-2 focus:ring-burgundy" /></label></div><p className="text-xs text-ink-soft">Choose your rental dates to check availability.</p></div>;
}
