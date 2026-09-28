'use client';

import { useState } from 'react';
import { formatNaira } from '@/lib/format';

/** No payout-initiation endpoint exists yet, so this simulates the round trip. */
export default function WithdrawButton({ amount }) {
  const [state, setState] = useState('idle'); // idle | pending | done

  function handleClick() {
    setState('pending');
    setTimeout(() => setState('done'), 700);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={state !== 'idle'}
      className="inline-flex min-h-10 items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright disabled:cursor-not-allowed disabled:bg-burgundy/50"
    >
      {state === 'idle' && `Withdraw ${formatNaira(amount)}`}
      {state === 'pending' && 'Requesting…'}
      {state === 'done' && 'Withdrawal requested'}
    </button>
  );
}
