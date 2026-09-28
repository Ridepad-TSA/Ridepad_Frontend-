'use client';

import { useState } from 'react';

/** No backend endpoint exists yet for confirming a return, so this is local-only. */
export default function BookingActions({ disabled }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="mt-4 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => setConfirmed(true)}
        disabled={disabled || confirmed}
        className="flex min-h-10 flex-1 items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright disabled:cursor-not-allowed disabled:bg-burgundy/50"
      >
        {confirmed ? 'Return confirmed' : 'Confirm return'}
      </button>
      <button
        type="button"
        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-ink px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
      >
        Report an issue
      </button>
    </div>
  );
}
