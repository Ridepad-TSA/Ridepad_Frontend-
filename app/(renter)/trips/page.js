/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import api from '@/lib/api';
import { normalizeBooking } from '@/lib/adapters/cars';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import { formatDateRange, formatNaira } from '@/lib/format';
import { BOOKING_STATUS_TONE, CUSTOMER_BOOKING_STATUS_LABELS, ROLES } from '@/lib/constants';
import RoleGuard from '@/components/layout/RoleGuard';

function TripsPageContent() {
  const [bookings, setBookings] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const load = useCallback(() => { setLoading(true); setError(''); api.get('/bookings/mine').then(({ data }) => setBookings((data || []).map(normalizeBooking))).catch((err) => setError(err.message)).finally(() => setLoading(false)); }, []);
  useEffect(() => { load(); }, [load]);
  return <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6"><h1 className="font-display text-2xl font-bold text-ink">My bookings</h1><p className="mt-1 text-sm text-ink-soft">View and manage your car bookings.</p>{loading ? <><Skeleton className="mt-6 h-20" /><Skeleton className="mt-3 h-20" /></> : error ? <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"><p>{error}</p><button type="button" onClick={load} className="mt-3 rounded-lg border border-red-300 px-3 py-2 font-semibold">Retry</button></div> : bookings.length === 0 ? <div className="mt-6"><EmptyState title="No bookings yet" body="When you book a car, it will appear here." action={<Link href="/search" className="mt-2 inline-flex min-h-9 items-center justify-center rounded-lg bg-burgundy px-4 text-sm font-semibold text-white">Find a car</Link>} /></div> : <ul className="mt-6 space-y-3">{bookings.map((booking) => <li key={booking.bookingId}><Link href={'/trips/' + booking.bookingId} className={clsx('flex items-center justify-between gap-3 rounded-2xl border p-4 hover:border-burgundy', booking.status === 'picked_up' ? 'border-burgundy bg-burgundy-tint' : 'border-line bg-surface')}><div><p className="text-sm font-semibold text-ink">{booking.car?.title || 'Ridepad car'}</p><p className="text-xs text-ink-soft">{formatDateRange(booking.startDate, booking.endDate)} · {formatNaira(booking.totalPrice)}</p></div><Badge tone={BOOKING_STATUS_TONE[booking.status] || 'default'}>{CUSTOMER_BOOKING_STATUS_LABELS[booking.status] || booking.status}</Badge></Link></li>)}</ul>}</div>;
}
export default function TripsPage() { return <RoleGuard allow={[ROLES.RENTER]}><TripsPageContent /></RoleGuard>; }
