'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CreditCard, Landmark, Smartphone, ShieldCheck, Check } from 'lucide-react';
import clsx from 'clsx';
import BookingSummary from '@/components/booking/BookingSummary';
import useBookingDraftStore from '@/store/bookingDraftStore';
import { getCarById, priceBreakdown } from '@/lib/data/cars';
import { formatNaira } from '@/lib/format';

const STEPS = ['Dates', 'Identity', 'Payment', 'Confirmation'];

const PAYMENT_METHODS = [
  { value: 'card', label: 'Card', body: 'Visa, Mastercard, Verve', icon: CreditCard },
  { value: 'transfer', label: 'Bank transfer', body: 'Pay to a one-time account', icon: Landmark },
  { value: 'ussd', label: 'USSD', body: 'Works without data', icon: Smartphone },
];

export default function CheckoutPage({ params }) {
  const { bookingId } = use(params);
  const router = useRouter();
  const { carId, startDate, endDate, clearDraft } = useBookingDraftStore();
  const car = carId ? getCarById(carId) : null;
  const [method, setMethod] = useState('card');
  const [isPaying, setIsPaying] = useState(false);

  let breakdown = null;
  if (car && startDate && endDate) {
    const nights = Math.max(1, Math.round((new Date(endDate) - new Date(startDate)) / 86_400_000));
    breakdown = priceBreakdown(car, nights);
  }

  if (!car || !breakdown) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6">
        <h1 className="font-display text-xl font-bold text-ink">No booking in progress</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Start from a car&apos;s page to book a trip and check out.
        </p>
        <Link
          href="/search"
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white hover:bg-burgundy-bright"
        >
          Browse cars
        </Link>
      </div>
    );
  }

  function handlePay() {
    setIsPaying(true);
    // No payment gateway wired up yet — simulate the round trip and land on the trip page.
    setTimeout(() => {
      clearDraft();
      router.push(`/trips/${bookingId}`);
    }, 700);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <ol className="mb-6 flex items-center gap-2 text-xs font-medium text-ink-soft">
        {STEPS.map((step, i) => (
          <li key={step} className="flex items-center gap-2">
            <span
              className={clsx(
                'flex size-5 items-center justify-center rounded-full text-[10px] font-bold',
                i < 2 ? 'bg-burgundy text-white' : 'bg-line text-ink-soft',
              )}
            >
              {i < 2 ? <Check className="size-3" /> : i + 1}
            </span>
            <span className={i < 2 ? 'text-ink' : ''}>{step}</span>
            {i < STEPS.length - 1 && <span className="mx-1 text-line">—</span>}
          </li>
        ))}
      </ol>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-display text-sm font-bold text-ink">Identity check</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">NIN or BVN</span>
                <input
                  disabled
                  value="Verified on 2 Oct"
                  className="min-h-11 w-full rounded-lg border border-line bg-line/30 px-3 text-sm text-ink-soft"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-ink">Phone</span>
                <input
                  type="tel"
                  placeholder="+234 802 000 0000"
                  className="min-h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-display text-sm font-bold text-ink">Payment method</h2>
            <div className="mt-3 space-y-2">
              {PAYMENT_METHODS.map(({ value, label, body, icon: Icon }) => (
                <label
                  key={value}
                  className={clsx(
                    'flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-3 text-sm transition-colors',
                    method === value ? 'border-burgundy bg-burgundy-tint' : 'border-line',
                  )}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value={value}
                    checked={method === value}
                    onChange={() => setMethod(value)}
                    className="accent-burgundy"
                  />
                  <Icon className="size-4 text-ink-soft" aria-hidden="true" />
                  <span className="font-semibold text-ink">{label}</span>
                  <span className="text-ink-soft">{body}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 rounded-2xl border border-line bg-burgundy-tint p-4 text-sm text-ink">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-burgundy" aria-hidden="true" />
            <p>
              <span className="font-semibold">How escrow works.</span> Ridepad holds the rental
              fee and deposit. The owner is paid after the return photos are confirmed by both
              sides. The deposit returns to you 48 hours later if no damage claim is filed.
            </p>
          </div>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-line bg-surface p-5">
          <BookingSummary car={car} breakdown={breakdown} startDate={startDate} endDate={endDate} />
          <button
            type="button"
            onClick={handlePay}
            disabled={isPaying}
            className="flex min-h-11 w-full items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright disabled:cursor-not-allowed disabled:bg-burgundy/50"
          >
            {isPaying ? 'Processing…' : `Pay ${formatNaira(breakdown.total)}`}
          </button>
          <p className="text-xs text-ink-soft">
            Your booking is held for 20 minutes while payment completes.
          </p>
        </aside>
      </div>
    </div>
  );
}
