'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { formatNaira } from '@/lib/format';

const FORMATTERS = {
  number: (v) => v,
  currency: (v) => formatNaira(v),
};

/**
 * Single-series column chart. One consistent hue (no legend needed for a
 * single series); each bar is its own hover/focus hit target showing the
 * exact value, per the dataviz skill's interaction spec.
 *
 * `valueFormat` is a string, not a function prop, so this can be rendered
 * directly from a Server Component (functions aren't serializable across
 * the server/client boundary).
 */
export default function BarChart({ data, valueFormat = 'number', unitLabel = '' }) {
  const [active, setActive] = useState(null);
  const max = Math.max(...data.map((d) => d.value));
  const format = FORMATTERS[valueFormat] ?? FORMATTERS.number;

  return (
    <div className="flex h-40 items-end gap-2">
      {data.map((point, i) => {
        const heightPct = Math.max(6, Math.round((point.value / max) * 100));
        const isActive = active === i;
        return (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative flex h-32 w-full max-w-6 items-end justify-center">
              {isActive && (
                <span className="absolute -top-7 rounded-md bg-ink px-2 py-1 text-[11px] font-semibold whitespace-nowrap text-white">
                  {format(point.value)}
                </span>
              )}
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                style={{ height: `${heightPct}%` }}
                className={clsx(
                  'w-full max-w-6 rounded-t-[4px] transition-colors focus:outline-none',
                  isActive ? 'bg-burgundy-bright' : 'bg-burgundy',
                )}
                aria-label={`${point.label}: ${format(point.value)}${unitLabel ? ` ${unitLabel}` : ''}`}
              />
            </div>
            <span className="text-[11px] text-ink-soft">{point.label}</span>
          </div>
        );
      })}
    </div>
  );
}
