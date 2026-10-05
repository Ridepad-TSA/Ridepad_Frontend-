'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { normalizeBooking } from '@/lib/adapters/cars';
import Badge from '@/components/ui/Badge';
import Skeleton from '@/components/ui/Skeleton';
import { formatDateRange, formatNaira } from '@/lib/format';
import { BOOKING_STATUS_TONE, CUSTOMER_BOOKING_STATUS_LABELS, ROLES } from '@/lib/constants';
import RoleGuard from '@/components/layout/RoleGuard';
import { useToast } from '@/components/ui/ToastProvider';

function TripDetailContent({ params }) {
  const { bookingId } = use(params); const [booking, setBooking] = useState(null); const [error, setError] = useState(''); const [cancelling, setCancelling] = useState(false); const { toast } = useToast();
  useEffect(() => { api.get('/bookings/' + bookingId).then(({ data }) => setBooking(normalizeBooking(data))).catch((err) => setError(err.message)); }, [bookingId]);
  async function cancelBooking() { if (!window.confirm('Cancel this booking?')) return; setCancelling(true); setError(''); try { const { data } = await api.patch('/bookings/' + bookingId + '/cancel'); setBooking(normalizeBooking(data)); toast('Booking cancelled.'); } catch (err) { setError(err.message); toast(err.message, 'error'); } finally { setCancelling(false); } }
  if (error && !booking) return <div className="mx-auto max-w-3xl px-4 py-12 text-center text-sm text-red-600">{error}</div>;
  if (!booking) return <div className="mx-auto max-w-3xl px-4 py-6"><Skeleton className="h-10 w-2/3" /><Skeleton className="mt-6 h-32" /></div>;
  return <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6"><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h1 className="font-display text-2xl font-bold text-ink">{booking.car?.title || 'Ridepad car'}</h1><p className="mt-1 text-sm text-ink-soft">{formatDateRange(booking.startDate, booking.endDate)} · Booking {booking.bookingId}</p></div><Badge tone={BOOKING_STATUS_TONE[booking.status] || 'default'}>{CUSTOMER_BOOKING_STATUS_LABELS[booking.status] || booking.status}</Badge></div><div className="mt-6 rounded-2xl border border-line bg-surface p-5"><dl className="grid grid-cols-2 gap-4 text-sm"><div><dt className="text-ink-soft">Rental duration</dt><dd className="font-semibold">{booking.rentalDays} {booking.rentalDays === 1 ? 'day' : 'days'}</dd></div><div><dt className="text-ink-soft">Total</dt><dd className="font-semibold">{formatNaira(booking.totalPrice)}</dd></div><div><dt className="text-ink-soft">Vehicle</dt><dd className="font-semibold">{booking.car?.title}</dd></div><div><dt className="text-ink-soft">Location</dt><dd className="font-semibold">{booking.car?.location}</dd></div></dl>{['requested', 'confirmed'].includes(booking.status) && <button type="button" onClick={cancelBooking} disabled={cancelling} className="mt-5 rounded-lg border border-ink px-4 py-2 text-sm font-semibold hover:bg-ink hover:text-white disabled:opacity-50">{cancelling ? 'Cancelling…' : 'Cancel booking'}</button>}{error && <p className="mt-4 text-sm text-red-600">{error}</p>}</div><Link href="/trips" className="mt-5 inline-block text-sm font-semibold text-burgundy">Back to bookings</Link></div>;
}
export default function TripDetailPage({ params }) { return <RoleGuard allow={[ROLES.RENTER]}><TripDetailContent params={params} /></RoleGuard>; }
