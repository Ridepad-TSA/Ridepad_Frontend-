'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Plus } from 'lucide-react';
import clsx from 'clsx';
import Input from '@/components/ui/Input';
import useAuth from '@/hooks/useAuth';
import { verifySchema } from '@/lib/validators/auth';
import { ROLES } from '@/lib/constants';

const BASE_DOCS = [{ key: 'selfie', label: 'Selfie', hint: 'A clear photo of your face' }];
const OWNER_DOCS = [
  { key: 'vehicle', label: 'Vehicle papers', hint: 'Registration or proof of ownership' },
  { key: 'address', label: 'Proof of address', hint: 'A recent utility bill' },
];

const HOME_BY_ROLE = { [ROLES.OWNER]: '/dashboard', [ROLES.RENTER]: '/search' };

/**
 * No identity-review endpoint exists yet, so document capture is local-only
 * (same approach as components/booking/CheckInPhotos.jsx) and submission
 * simulates the round trip rather than calling a real API.
 */
export default function VerifyForm() {
  const { role } = useAuth();
  const isOwner = role === ROLES.OWNER;
  const docs = isOwner ? [...BASE_DOCS, ...OWNER_DOCS] : BASE_DOCS;

  const [uploaded, setUploaded] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(verifySchema) });

  function markUploaded(key) {
    setUploaded((prev) => new Set(prev).add(key));
  }

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitted(true);
  }

  const allDocsUploaded = docs.every((doc) => uploaded.has(doc.key));

  if (submitted) {
    return (
      <div className="text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-burgundy-tint text-burgundy">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-display text-xl font-bold text-ink">Submitted for review</h1>
        <p className="mt-2 text-sm text-ink-soft">
          We&apos;re checking your details. This usually takes a few hours — we&apos;ll let you
          know as soon as you&apos;re verified.
        </p>
        <Link
          href={HOME_BY_ROLE[role] ?? '/search'}
          className="mt-6 flex min-h-11 w-full items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright"
        >
          Continue to Ridepad
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-xl font-bold text-ink">Verify your identity</h1>
      <p className="mt-1 text-sm text-ink-soft">
        {isOwner
          ? "We verify every owner before a car goes live, so renters can trust who they're dealing with."
          : 'Verified renters get faster approvals and unlock self drive after a few clean trips.'}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
        <Input
          label="NIN or BVN"
          type="text"
          inputMode="numeric"
          placeholder="12345678901"
          error={errors.ninOrBvn?.message}
          {...register('ninOrBvn')}
        />

        <div>
          <span className="mb-1.5 block text-sm font-medium text-ink">Documents</span>
          <div className="grid grid-cols-2 gap-3">
            {docs.map((doc) => {
              const done = uploaded.has(doc.key);
              return (
                <label
                  key={doc.key}
                  className={clsx(
                    'flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border p-4 text-center transition-colors',
                    done
                      ? 'border-burgundy bg-burgundy-tint text-burgundy'
                      : 'border-dashed border-line text-ink-soft hover:border-burgundy',
                  )}
                >
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.length) markUploaded(doc.key);
                    }}
                  />
                  {done ? (
                    <Check className="size-4" aria-hidden="true" />
                  ) : (
                    <Plus className="size-4" aria-hidden="true" />
                  )}
                  <span className="text-xs font-semibold">{doc.label}</span>
                  <span className="text-[11px]">{done ? 'Uploaded' : doc.hint}</span>
                </label>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !allDocsUploaded}
          className="flex min-h-11 w-full items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright disabled:cursor-not-allowed disabled:bg-burgundy/50"
        >
          {isSubmitting ? 'Submitting…' : 'Submit for review'}
        </button>
        {!allDocsUploaded && (
          <p className="text-center text-xs text-ink-soft">Add all documents to continue.</p>
        )}
      </form>
    </>
  );
}
