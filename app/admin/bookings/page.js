/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import { useToast } from '@/components/ui/ToastProvider';
import { normalizeBooking } from '@/lib/adapters/cars';
import { BOOKING_STATUS_LABELS, BOOKING_STATUS_TONE } from '@/lib/constants';
import { formatNaira, formatDateRange } from '@/lib/format';

const NEXT_STATUS = { requested: [{ status: 'confirmed', label: 'Confirm' }, { status: 'rejected', label: 'Reject' }], confirmed: [{ status: 'picked_up', label: 'Start trip' }], picked_up: [{ status: 'returned', label: 'Record return' }], overdue: [{ status: 'returned', label: 'Record return' }] };
const SUCCESS = { confirmed: 'Booking confirmed.', rejected: 'Booking rejected.', picked_up: 'Trip started.', returned: 'Return recorded.' };

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const { toast } = useToast();
  const load = useCallback(() => { setLoading(true); setError(''); api.get('/bookings').then(({ data }) => setBookings((data || []).map(normalizeBooking))).catch((err) => setError(err.message)).finally(() => setLoading(false)); }, []);
  useEffect(() => { load(); }, [load]);
  async function update(id, status) { try { await api.patch('/bookings/' + id + '/status', { status }); toast(SUCCESS[status] || 'Booking updated.'); await load(); } catch (err) { setError(err.message); toast(err.message, 'error'); } }
  return <div className="p-4 sm:p-6"><h1 className="font-display text-xl font-bold text-ink">Bookings</h1>{loading ? <Skeleton className="mt-5 h-32" /> : error ? <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"><p>{error}</p><button type="button" onClick={load} className="mt-3 rounded-lg border border-red-300 px-3 py-2 font-semibold">Retry</button></div> : bookings.length === 0 ? <div className="mt-5"><EmptyState title="No bookings yet" body="Bookings will appear here when customers reserve a vehicle." /></div> : <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-surface"><table className="min-w-[760px] w-full text-left text-sm"><thead><tr className="border-b border-line text-xs text-ink-soft"><th className="px-4 py-3">Booking/customer</th><th className="px-4 py-3">Vehicle</th><th className="px-4 py-3">Rental dates</th><th className="px-4 py-3">Total</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id} className="border-b border-line last:border-0"><td className="px-4 py-3"><Link href={'/admin/bookings/' + booking.id} className="font-medium text-burgundy hover:text-burgundy-bright">{booking.user?.name || booking.user?.email || 'View booking'}</Link></td><td className="px-4 py-3 text-ink-soft">{booking.car?.title || '—'}</td><td className="px-4 py-3 text-ink-soft">{formatDateRange(booking.pickupDate, booking.returnDate)}</td><td className="px-4 py-3 text-ink-soft">{formatNaira(booking.totalPrice)}</td><td className="px-4 py-3"><Badge tone={BOOKING_STATUS_TONE[booking.status] || 'default'}>{BOOKING_STATUS_LABELS[booking.status] || booking.status}</Badge></td><td className="px-4 py-3"><div className="flex flex-wrap gap-2">{(NEXT_STATUS[booking.status] || []).map((action) => <button key={action.status} type="button" onClick={() => update(booking.id, action.status)} className="rounded-lg border border-ink px-3 py-1.5 text-xs font-semibold hover:bg-ink hover:text-white">{action.label}</button>)}{!NEXT_STATUS[booking.status]?.length && <span className="text-xs text-ink-soft">No actions</span>}</div></td></tr>)}</tbody></table></div>}</div>;
}