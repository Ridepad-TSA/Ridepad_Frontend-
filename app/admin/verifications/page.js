'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { FileText, ScanFace, Car, FileCheck2 } from 'lucide-react';
import { VERIFICATION_QUEUE, VERIFICATION_DOCS } from '@/lib/data/admin';

const DOC_ICONS = { nin: FileText, selfie: ScanFace, vehicle: Car, address: FileCheck2 };

export default function VerificationsPage() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(VERIFICATION_QUEUE[0]?.id);

  const filtered = VERIFICATION_QUEUE.filter((v) =>
    v.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const selected = VERIFICATION_QUEUE.find((v) => v.id === selectedId) ?? filtered[0] ?? null;
  const initials = selected?.name
    .split(' ')
    .map((p) => p[0])
    .join('');

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h1 className="font-display text-xl font-bold text-ink">Verifications</h1>
          <span className="rounded-full bg-burgundy px-2.5 py-1 text-xs font-semibold text-white">
            {VERIFICATION_QUEUE.length} waiting
          </span>
        </div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or NIN"
          className="min-h-9 w-64 rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <ul className="space-y-2">
          {filtered.map((v) => (
            <li key={v.id}>
              <button
                type="button"
                onClick={() => setSelectedId(v.id)}
                className={clsx(
                  'w-full rounded-xl border p-3 text-left transition-colors',
                  selected?.id === v.id ? 'border-burgundy bg-burgundy-tint' : 'border-line bg-surface hover:border-burgundy',
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                    {v.name
                      .split(' ')
                      .map((p) => p[0])
                      .join('')}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{v.name}</p>
                    <p className="truncate text-xs text-ink-soft">
                      {v.role} · {v.detail}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-ink-soft">{v.waited}</p>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <p className="p-3 text-sm text-ink-soft">No matches.</p>
          )}
        </ul>

        {selected && (
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-burgundy-tint text-sm font-bold text-burgundy">
                {initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">{selected.name}</p>
                <p className="text-xs text-ink-soft">
                  {selected.role} application · submitted {selected.submitted} · {selected.area}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {VERIFICATION_DOCS.map((doc) => {
                const Icon = DOC_ICONS[doc.key];
                return (
                  <div
                    key={doc.key}
                    className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line text-center"
                  >
                    <Icon className="size-5 text-ink-soft" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-ink">{doc.label}</p>
                      <p className="text-xs text-ink-soft">{doc.placeholder}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
              {selected.checks.map((check) => (
                <div key={check.label} className="rounded-lg border border-line p-3">
                  <dt className="text-xs text-ink-soft">{check.label}</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">{check.result}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright"
              >
                Approve {selected.role.toLowerCase()}
              </button>
              <button
                type="button"
                className="inline-flex min-h-10 flex-1 items-center justify-center rounded-lg border border-ink px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                Request new photo
              </button>
              <button
                type="button"
                className="inline-flex min-h-10 items-center justify-center px-3 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
              >
                Reject
              </button>
            </div>
            <p className="mt-3 text-xs text-ink-soft">Decisions are logged with your admin ID.</p>
          </div>
        )}
      </div>
    </div>
  );
}
