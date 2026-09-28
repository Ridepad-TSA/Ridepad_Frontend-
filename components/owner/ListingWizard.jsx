'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { Check, Plus } from 'lucide-react';
import Input from '@/components/ui/Input';
import { CAR_CATEGORIES, LAGOS_AREAS } from '@/lib/constants';
import { TRANSMISSIONS, FUEL_TYPES, TRIP_TYPES, LISTING_PHOTO_SLOTS } from '@/lib/data/cars';
import { formatNaira } from '@/lib/format';
import { listingSchema, LISTING_STEP_FIELDS } from '@/lib/validators/listing';

const STEPS = ['Vehicle', 'Location & price', 'Photos', 'Review'];

const DEFAULT_VALUES = {
  title: '',
  category: '',
  transmission: '',
  fuel: '',
  seats: 4,
  airConditioning: true,
  tripType: '',
  area: '',
  fullAddress: '',
  pricePerDay: '',
};

/**
 * Multi-step new/edit listing form. No listings endpoint exists yet, so
 * submission simulates the round trip (same approach as the checkout and
 * verify flows) rather than persisting anywhere — the new/edited listing
 * won't actually appear in the mock list on `/listings`.
 */
export default function ListingWizard({ initialValues, mode = 'create' }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [uploadedKeys, setUploadedKeys] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(listingSchema),
    defaultValues: { ...DEFAULT_VALUES, ...initialValues },
  });

  const allPhotosUploaded = LISTING_PHOTO_SLOTS.every((slot) => uploadedKeys.has(slot.key));

  async function goNext() {
    if (step === 2) {
      if (!allPhotosUploaded) return;
      setStep(3);
      return;
    }
    const valid = await trigger(LISTING_STEP_FIELDS[step]);
    if (valid) setStep((s) => s + 1);
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitted(true);
  }

  if (submitted) {
    const values = getValues();
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-burgundy-tint text-burgundy">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-4 font-display text-xl font-bold text-ink">
          {mode === 'edit' ? 'Changes submitted' : 'Listing submitted for approval'}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">
          {values.title} goes live once an admin reviews it — usually within a few hours.
        </p>
        <Link
          href="/listings"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright"
        >
          Back to listings
        </Link>
      </div>
    );
  }

  return (
    <div>
      <ol className="mb-6 flex flex-wrap items-center gap-2 text-xs font-medium text-ink-soft">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={clsx(
                'flex size-5 items-center justify-center rounded-full text-[10px] font-bold',
                i < step && 'bg-burgundy text-white',
                i === step && 'bg-burgundy-bright text-white',
                i > step && 'bg-line text-ink-soft',
              )}
            >
              {i < step ? <Check className="size-3" /> : i + 1}
            </span>
            <span className={i === step ? 'font-semibold text-ink' : ''}>{label}</span>
            {i < STEPS.length - 1 && <span className="mx-1 text-line">—</span>}
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {step === 0 && (
          <div className="space-y-4">
            <Input
              label="Title"
              type="text"
              placeholder="Toyota Corolla 2019"
              error={errors.title?.message}
              {...register('title')}
            />

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Category</span>
                <select
                  className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
                  {...register('category')}
                >
                  <option value="">Select</option>
                  {CAR_CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category.message}</p>}
              </label>

              <Input
                label="Seats"
                type="number"
                min="1"
                max="20"
                error={errors.seats?.message}
                {...register('seats')}
              />

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Transmission</span>
                <select
                  className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
                  {...register('transmission')}
                >
                  <option value="">Select</option>
                  {TRANSMISSIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errors.transmission && (
                  <p className="mt-1 text-xs text-red-600">{errors.transmission.message}</p>
                )}
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Fuel</span>
                <select
                  className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
                  {...register('fuel')}
                >
                  <option value="">Select</option>
                  {FUEL_TYPES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                {errors.fuel && <p className="mt-1 text-xs text-red-600">{errors.fuel.message}</p>}
              </label>
            </div>

            <label className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" className="size-4 rounded border-line accent-burgundy" {...register('airConditioning')} />
              Air conditioning
            </label>

            <div>
              <span className="mb-1.5 block text-sm font-medium text-ink">Trip type</span>
              <div className="grid grid-cols-2 gap-3">
                {TRIP_TYPES.map((type) => (
                  <label key={type} className="flex cursor-pointer items-center gap-2 rounded-lg border border-line p-3 text-sm has-[:checked]:border-burgundy has-[:checked]:bg-burgundy-tint">
                    <input type="radio" value={type} className="accent-burgundy" {...register('tripType')} />
                    {type}
                  </label>
                ))}
              </div>
              {errors.tripType && <p className="mt-1 text-xs text-red-600">{errors.tripType.message}</p>}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-ink">Area</span>
              <select
                className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
                {...register('area')}
              >
                <option value="">Select area</option>
                {LAGOS_AREAS.map((area) => (
                  <option key={area} value={area}>
                    {area}, Lagos
                  </option>
                ))}
              </select>
              {errors.area && <p className="mt-1 text-xs text-red-600">{errors.area.message}</p>}
            </label>

            <Input
              label="Full address"
              type="text"
              placeholder="Ikeja GRA, Lagos"
              error={errors.fullAddress?.message}
              {...register('fullAddress')}
            />

            <Input
              label="Price per day (₦)"
              type="number"
              min="1000"
              step="500"
              placeholder="25000"
              error={errors.pricePerDay?.message}
              {...register('pricePerDay')}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-sm text-ink-soft">Add all five photos to continue.</p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {LISTING_PHOTO_SLOTS.map((slot) => {
                const done = uploadedKeys.has(slot.key);
                return (
                  <label
                    key={slot.key}
                    className={clsx(
                      'flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border text-center text-xs transition-colors',
                      done
                        ? 'border-burgundy bg-burgundy-tint text-burgundy'
                        : 'border-dashed border-line text-ink-soft hover:border-burgundy',
                    )}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          setUploadedKeys((prev) => new Set(prev).add(slot.key));
                        }
                      }}
                    />
                    {done ? <Check className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
                    <span className="font-semibold">{slot.label}</span>
                    <span className="text-[10px]">{done ? 'Uploaded' : 'Add photo'}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <ReviewStep values={getValues()} photosCount={uploadedKeys.size} />
        )}

        <div className="mt-6 flex gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-ink px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={step === 2 && !allPhotosUploaded}
              className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright disabled:cursor-not-allowed disabled:bg-burgundy/50"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright disabled:cursor-not-allowed disabled:bg-burgundy/50"
            >
              {isSubmitting ? 'Submitting…' : mode === 'edit' ? 'Save changes' : 'Submit for approval'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function ReviewStep({ values, photosCount }) {
  const rows = [
    ['Title', values.title],
    ['Category', CAR_CATEGORIES.find((c) => c.value === values.category)?.label],
    ['Seats', values.seats],
    ['Transmission', values.transmission],
    ['Fuel', values.fuel],
    ['Air conditioning', values.airConditioning ? 'Yes' : 'No'],
    ['Trip type', values.tripType],
    ['Area', values.area],
    ['Full address', values.fullAddress],
    ['Price per day', values.pricePerDay ? formatNaira(values.pricePerDay) : ''],
    ['Photos', `${photosCount} of ${LISTING_PHOTO_SLOTS.length} added`],
  ];

  return (
    <dl className="divide-y divide-line rounded-xl border border-line">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
          <dt className="text-ink-soft">{label}</dt>
          <dd className="font-medium text-ink">{value || '—'}</dd>
        </div>
      ))}
    </dl>
  );
}
