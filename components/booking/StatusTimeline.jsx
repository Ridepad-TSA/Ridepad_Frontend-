import clsx from 'clsx';
import { Check } from 'lucide-react';
import { BOOKING_FLOW, BOOKING_STATUS_LABELS } from '@/lib/constants';

/** Booking progress through BOOKING_FLOW. `status` outside the happy path (e.g. cancelled/disputed) renders nothing filled. */
export default function StatusTimeline({ status }) {
  const currentIndex = BOOKING_FLOW.indexOf(status);

  return (
    <ol className="flex items-center">
      {BOOKING_FLOW.map((step, i) => {
        const done = currentIndex >= 0 && i < currentIndex;
        const current = i === currentIndex;
        return (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={clsx(
                  'flex size-6 items-center justify-center rounded-full text-[10px] font-bold',
                  done && 'bg-burgundy text-white',
                  current && 'bg-burgundy-bright text-white ring-4 ring-burgundy-tint',
                  !done && !current && 'bg-line text-ink-soft',
                )}
              >
                {done ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span
                className={clsx(
                  'max-w-[4.5rem] text-center text-[11px] leading-tight whitespace-normal',
                  current ? 'font-semibold text-ink' : 'text-ink-soft',
                )}
              >
                {BOOKING_STATUS_LABELS[step]}
              </span>
            </div>
            {i < BOOKING_FLOW.length - 1 && (
              <div className={clsx('mx-1 mb-4 h-0.5 flex-1', done ? 'bg-burgundy' : 'bg-line')} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
