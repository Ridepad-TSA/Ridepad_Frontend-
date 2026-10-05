'use client';

import { use, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/lib/api';
import { normalizeCar } from '@/lib/adapters/cars';
import DateRangePicker from '@/components/booking/DateRangePicker';
import Skeleton from '@/components/ui/Skeleton';
import { formatNaira } from '@/lib/format';
import useBookingDraftStore from '@/store/bookingDraftStore';
import { useToast } from '@/components/ui/ToastProvider';
import useAuth from '@/hooks/useAuth';

export default function BookingPage({ params }) {
  const { carId } = use(params); const router = useRouter(); const searchParams = useSearchParams();
  const pickupDate = searchParams.get('pickupDate'); const returnDate = searchParams.get('returnDate');
  const { startDate, endDate, startDraft, updateDraft } = useBookingDraftStore(); const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [car, setCar] = useState(null); const [error, setError] = useState(''); const [submitting, setSubmitting] = useState(false); const [showAuthGate, setShowAuthGate] = useState(false); const { toast } = useToast();
  useEffect(() => { api.get('/cars/' + carId).then(({ data }) => { const next = normalizeCar(data); setCar(next); startDraft(next.id); if (pickupDate && returnDate) updateDraft({ startDate: pickupDate, endDate: returnDate }); }).catch((err) => setError(err.message)); }, [carId, pickupDate, returnDate, startDraft, updateDraft]);
  const days = useMemo(() => { if (!startDate || !endDate) return 0; const value = Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000); return value > 0 ? value : 0; }, [startDate, endDate]);
  const callbackUrl = `/booking/${carId}?pickupDate=${encodeURIComponent(startDate || '')}&returnDate=${encodeURIComponent(endDate || '')}`;
  const loginUrl = `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`; const registerUrl = `/register?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  async function handleContinue() {
    setError('');
    if (!isAuthenticated) { setShowAuthGate(true); return; }
    setSubmitting(true);
    try { const { data } = await api.post('/bookings', { carId, pickupDate: startDate, returnDate: endDate }); toast('Booking request sent.'); router.push('/trips/' + (data._id || data.id)); }
    catch (err) { setError(err.message); toast(err.message, 'error'); setSubmitting(false); }
  }
  if (error && !car) return <div className="mx-auto max-w-3xl px-4 py-12 text-center text-sm text-red-600">{error}</div>;
  if (!car) return <div className="mx-auto max-w-3xl px-4 py-6"><Skeleton className="h-10 w-2/3" /><Skeleton className="mt-6 h-48" /></div>;
  return <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6"><h1 className="font-display text-2xl font-bold text-ink">Book {car.title}</h1><p className="mt-1 text-sm text-ink-soft">{car.location} · {car.transmission} · {car.seats} seats</p><div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[1fr_280px]"><div className="rounded-2xl border border-line bg-surface p-5"><DateRangePicker /></div><aside className="h-fit space-y-4 rounded-2xl border border-line bg-surface p-5"><div><p className="text-sm text-ink-soft">Rental duration</p><p className="font-display text-xl font-bold text-ink">{days ? `${days} ${days === 1 ? 'day' : 'days'}` : '—'}</p></div><p className="text-sm text-ink-soft">Price per day: <span className="font-semibold text-ink">{formatNaira(car.pricePerDay)}</span></p>{days > 0 && <p className="text-sm text-ink-soft">Estimated total: <span className="font-semibold text-ink">{formatNaira(days * car.pricePerDay)}</span></p>}<button type="button" onClick={handleContinue} disabled={!startDate || !endDate || days < 1 || submitting || authLoading} className="flex min-h-11 w-full items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white hover:bg-burgundy-bright disabled:cursor-not-allowed disabled:bg-burgundy/50">{submitting ? 'Sending request…' : 'Request booking'}</button>{error && <p role="alert" className="text-sm text-red-600">{error}</p>}<p className="text-xs text-ink-soft">Final availability and price are confirmed when you request the booking.</p></aside></div>{showAuthGate && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" role="dialog" aria-modal="true" aria-labelledby="booking-auth-title"><div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-6 shadow-xl"><h2 id="booking-auth-title" className="font-display text-xl font-bold text-ink">Sign in to complete your booking</h2><p className="mt-2 text-sm text-ink-soft">Your dates are saved. Sign in or create an account to continue.</p><div className="mt-6 flex flex-col gap-3"><Link href={loginUrl} className="flex min-h-11 items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white hover:bg-burgundy-bright">Sign in</Link><Link href={registerUrl} className="flex min-h-11 items-center justify-center rounded-lg border border-ink px-5 text-sm font-semibold text-ink hover:bg-ink hover:text-white">Create account</Link><button type="button" onClick={() => setShowAuthGate(false)} className="min-h-10 text-sm font-semibold text-ink-soft hover:text-ink">Continue browsing</button></div></div></div>}</div>;
}