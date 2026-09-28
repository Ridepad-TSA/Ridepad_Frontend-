'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { differenceInCalendarDays, isValid, parseISO } from 'date-fns';
import DateRangePicker from '@/components/booking/DateRangePicker';
import PriceBreakdown from '@/components/car/PriceBreakdown';
import useBookingDraftStore from '@/store/bookingDraftStore';
import { getCarById, priceBreakdown } from '@/lib/data/cars';

function nightsBetween(startDate, endDate) {
  if (!startDate || !endDate) return 1;
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  if (!isValid(start) || !isValid(end)) return 1;
  return Math.max(1, differenceInCalendarDays(end, start));
}

export default function BookingPage({ params }) {
  const { carId } = use(params);
  const car = getCarById(carId);
  const router = useRouter();

  const { startDate, endDate, pickupArea, startDraft } = useBookingDraftStore();

  useEffect(() => {
    if (car) startDraft(car.id);
  }, [car, startDraft]);

  const breakdown = car ? priceBreakdown(car, nightsBetween(startDate, endDate)) : null;

  if (!car) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center sm:px-6">
        <h1 className="font-display text-xl font-bold text-ink">Car not found</h1>
      </div>
    );
  }

  function handleContinue() {
    const bookingId = `RP-${Math.floor(10000 + Math.random() * 89999)}`;
    router.push(`/checkout/${bookingId}`);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
      <h1 className="font-display text-2xl font-bold text-ink">Book {car.title}</h1>
      <p className="mt-1 text-sm text-ink-soft">
        {car.area} · {car.tripType} · {car.seats} seats
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[1fr_280px]">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <DateRangePicker />
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-line bg-surface p-5">
          <PriceBreakdown car={car} breakdown={breakdown} />
          <button
            type="button"
            onClick={handleContinue}
            disabled={!startDate || !endDate || !pickupArea}
            className="flex min-h-11 w-full items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright disabled:cursor-not-allowed disabled:bg-burgundy/50"
          >
            Continue to payment
          </button>
          <p className="text-xs text-ink-soft">
            Your money is held in escrow. The owner is paid after the return is confirmed and
            both of you confirm.
          </p>
        </aside>
      </div>
    </div>
  );
}
