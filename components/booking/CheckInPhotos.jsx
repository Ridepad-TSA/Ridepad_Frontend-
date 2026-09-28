'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Check, Plus } from 'lucide-react';
import { CHECK_IN_SLOTS } from '@/lib/data/cars';

/**
 * Check-in and return photo capture. No backend endpoint exists yet
 * (`hooks/useUpload.js` posts to /uploads/sign), so this captures the file
 * locally and marks the slot done rather than uploading it anywhere.
 */
export default function CheckInPhotos({ initialUploadedKeys = [], ownerConfirmedCount = 0 }) {
  const [uploadedKeys, setUploadedKeys] = useState(new Set(initialUploadedKeys));
  const [confirmed, setConfirmed] = useState(false);
  const fileInputRef = useRef(null);

  const requiredSlots = CHECK_IN_SLOTS.filter((s) => s.required);
  const nextSlot = CHECK_IN_SLOTS.find((slot) => !uploadedKeys.has(slot.key));
  const allRequiredDone = requiredSlots.every((slot) => uploadedKeys.has(slot.key));

  function handleFileChosen(e) {
    if (e.target.files?.length && nextSlot) {
      setUploadedKeys((prev) => new Set(prev).add(nextSlot.key));
    }
    e.target.value = '';
  }

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-sm font-bold text-ink">Pickup photos</h2>
        <p className="text-xs text-ink-soft">
          {uploadedKeys.size} of {CHECK_IN_SLOTS.length} uploaded · owner has confirmed{' '}
          {ownerConfirmedCount}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {CHECK_IN_SLOTS.map((slot) => {
          const done = uploadedKeys.has(slot.key);
          return (
            <div
              key={slot.key}
              className={clsx(
                'flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border text-center text-xs',
                done ? 'border-burgundy bg-burgundy-tint text-burgundy' : 'border-dashed border-line text-ink-soft',
              )}
            >
              {done ? (
                <Check className="size-4" aria-hidden="true" />
              ) : (
                <Plus className="size-4" aria-hidden="true" />
              )}
              <span className="font-semibold">{slot.label}</span>
              <span className="text-[10px]">
                {done ? 'Uploaded' : slot.required ? 'Add photo' : 'Optional'}
              </span>
            </div>
          );
        })}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChosen}
      />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={!nextSlot || confirmed}
          className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright disabled:cursor-not-allowed disabled:bg-burgundy/50"
        >
          Upload next photo
        </button>
        <button
          type="button"
          onClick={() => setConfirmed(true)}
          disabled={!allRequiredDone || confirmed}
          className="flex min-h-11 flex-1 items-center justify-center rounded-lg border border-ink px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:border-line disabled:text-ink-soft disabled:hover:bg-transparent"
        >
          {confirmed ? 'Handover confirmed' : 'Confirm handover'}
        </button>
      </div>
      <p className="mt-2 text-xs text-ink-soft">
        Photos are compressed on your phone and carry a timestamp if the automatic one is wrong.
      </p>
    </div>
  );
}
