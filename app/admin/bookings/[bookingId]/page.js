'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import { normalizeBooking } from '@/lib/adapters/cars';
import { BOOKING_STATUS_LABELS, BOOKING_STATUS_TONE } from '@/lib/constants';
import { formatDateRange, formatNaira } from '@/lib/format';
import { useToast } from '@/components/ui/ToastProvider';

const NEXT = { requested: [{ status: 'confirmed', label: 'Confirm booking' }, { status: 'rejected', label: 'Reject booking' }], confirmed: [{ status: 'picked_up', label: 'Record pickup' }], picked_up: [{ status: 'returned', label: 'Record return' }], overdue: [{ status: 'returned', label: 'Record return' }] };
export default function AdminBookingDetailPage({ params }) {
  const { bookingId } = use(params); const [booking, setBooking] = useState(null); const [error, setError] = useState(''); const [saving, setSaving] = useState(false); const { toast } = useToast();
  useEffect(() => { api.get('/bookings/' + bookingId).then(({ data }) => setBooking(normalizeBooking(data))).catch((err) => setError(err.message)); }, [bookingId]);
  async function update(status) { if (!window.confirm('Update this booking to ' + (BOOKING_STATUS_LABELS[status] || status) + '?')) return; setSaving(true); setError(''); try { await api.patch('/bookings/' + bookingId + '/status', { status }); toast(status === 'confirmed' ? 'Booking confirmed.' : status === 'picked_up' ? 'Trip started.' : status === 'returned' ? 'Return recorded.' : 'Booking rejected.'); const { data } = await api.get('/bookings/' + bookingId); setBooking(normalizeBooking(data)); } catch (err) { setError(err.message); toast(err.message, 'error'); } finally { setSaving(false); } }
  if (error) return <div className="p-6 text-sm text-red-600">{error}</div>;
  if (!booking) return <div className="p-6"><Skeleton className="h-8 w-1/3" /><Skeleton className="mt-5 h-48" /></div>;
  const actions = NEXT[booking.status] || [];
  return <div className="mx-auto max-w-3xl p-6"><Link href="/admin/bookings" className="text-sm font-semibold text-burgundy">Back to bookings</Link><div className="mt-4 flex items-start justify-between gap-3"><div><h1 className="font-display text-xl font-bold text-ink">{booking.car?.title || 'Booking'}</h1><p className="mt-1 text-sm text-ink-soft">{booking.user?.name || booking.user?.email || 'Customer'} · {formatDateRange(booking.startDate, booking.endDate)}</p></div><Badge tone={BOOKING_STATUS_TONE[booking.status] || 'default'}>{BOOKING_STATUS_LABELS[booking.status] || booking.status}</Badge></div><div className="mt-6 rounded-2xl border border-line bg-surface p-5"><dl className="grid grid-cols-2 gap-4 text-sm"><div><dt className="text-ink-soft">Rental days</dt><dd className="font-semibold">{booking.rentalDays}</dd></div><div><dt className="text-ink-soft">Total</dt><dd className="font-semibold">{formatNaira(booking.totalPrice)}</dd></div><div><dt className="text-ink-soft">Pickup date</dt><dd className="font-semibold">{booking.startDate}</dd></div><div><dt className="text-ink-soft">Return date</dt><dd className="font-semibold">{booking.endDate}</dd></div></dl>{actions.length ? <div className="mt-6 flex flex-wrap gap-3">{actions.map((action) => <button key={action.status} type="button" disabled={saving} onClick={() => update(action.status)} className="min-h-11 rounded-lg bg-burgundy px-5 text-sm font-semibold text-white hover:bg-burgundy-bright disabled:opacity-50">{saving ? 'Updating…' : action.label}</button>)}</div> : <div className="mt-6"><EmptyState title="No further actions" body="This booking is in a terminal state." /></div>}{error && <p className="mt-4 text-sm text-red-600">{error}</p>}</div></div>;
}
