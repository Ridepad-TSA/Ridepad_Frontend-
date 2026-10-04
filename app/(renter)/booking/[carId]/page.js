'use client';

import { use, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { normalizeCar } from '@/lib/adapters/cars';
import DateRangePicker from '@/components/booking/DateRangePicker';
import Skeleton from '@/components/ui/Skeleton';
import { formatNaira } from '@/lib/format';
import useBookingDraftStore from '@/store/bookingDraftStore';
import { useToast } from '@/components/ui/ToastProvider';

export default function BookingPage({ params }) {
  const { carId } = use(params); const router = useRouter(); const { startDate, endDate, startDraft } = useBookingDraftStore();
  const [car, setCar] = useState(null); const [error, setError] = useState(''); const [submitting, setSubmitting] = useState(false); const { toast } = useToast();
  useEffect(() => { api.get('/cars/' + carId).then(({ data }) => { const next = normalizeCar(data); setCar(next); startDraft(next.id); }).catch((err) => setError(err.message)); }, [carId, startDraft]);
  const days = useMemo(() => { if (!startDate || !endDate) return 0; const value = Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000); return value > 0 ? value : 0; }, [startDate, endDate]);
  async function handleContinue() { setSubmitting(true); setError(''); try { const { data } = await api.post('/bookings', { carId, pickupDate: startDate, returnDate: endDate }); toast('Booking requested.'); router.push('/trips/' + (data._id || data.id)); } catch (err) { setError(err.message); toast(err.message, 'error'); setSubmitting(false); } }
  if (error && !car) return <div className="mx-auto max-w-3xl px-4 py-12 text-center text-sm text-red-600">{error}</div>;
  if (!car) return <div className="mx-auto max-w-3xl px-4 py-6"><Skeleton className="h-10 w-2/3" /><Skeleton className="mt-6 h-48" /></div>;
  return <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6"><h1 className="font-display text-2xl font-bold text-ink">Book {car.title}</h1><p className="mt-1 text-sm text-ink-soft">{car.location} · {car.transmission} · {car.seats} seats</p><div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[1fr_280px]"><div className="rounded-2xl border border-line bg-surface p-5"><DateRangePicker /></div><aside className="h-fit space-y-4 rounded-2xl border border-line bg-surface p-5"><div><p className="text-sm text-ink-soft">Rental days</p><p className="font-display text-xl font-bold text-ink">{days || '—'}</p></div>{days > 0 && <p className="text-sm text-ink-soft">Estimated total: <span className="font-semibold text-ink">{formatNaira(days * car.pricePerDay)}</span></p>}<button type="button" onClick={handleContinue} disabled={!startDate || !endDate || days < 1 || submitting} className="flex min-h-11 w-full items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white hover:bg-burgundy-bright disabled:cursor-not-allowed disabled:bg-burgundy/50">{submitting ? 'Sending request…' : 'Request booking'}</button>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}<p className="text-xs text-ink-soft">Final availability and price are confirmed when you request the booking.</p></aside></div></div>;
}
