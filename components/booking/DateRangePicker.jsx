'use client';

import useBookingDraftStore from '@/store/bookingDraftStore';
import { LAGOS_AREAS } from '@/lib/constants';

/** Pickup and return dates, plus pickup area, for the in-progress booking draft. */
export default function DateRangePicker() {
  const { startDate, endDate, pickupArea, updateDraft } = useBookingDraftStore();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink">From</span>
          <input
            type="date"
            value={startDate ?? ''}
            onChange={(e) => updateDraft({ startDate: e.target.value })}
            className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-ink">To</span>
          <input
            type="date"
            value={endDate ?? ''}
            onChange={(e) => updateDraft({ endDate: e.target.value })}
            className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-ink">Pickup point</span>
        <select
          value={pickupArea}
          onChange={(e) => updateDraft({ pickupArea: e.target.value })}
          className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
        >
          <option value="">Select pickup point</option>
          <option value="Murtala Muhammed Airport">Murtala Muhammed Airport</option>
          {LAGOS_AREAS.map((name) => (
            <option key={name} value={name}>
              {name}, Lagos
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
