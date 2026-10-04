/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import { normalizeBooking } from '@/lib/adapters/cars';
import { BOOKING_STATUS_LABELS, BOOKING_STATUS_TONE } from '@/lib/constants';
import { useToast } from '@/components/ui/ToastProvider';

export default function RentalQueue({ status }) {
  const [items, setItems] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const { toast } = useToast();
  const load = useCallback(() => { setLoading(true); setError(''); api.get('/bookings/' + status).then(({ data }) => setItems((data || []).map(normalizeBooking))).catch((err) => setError(err.message)).finally(() => setLoading(false)); }, [status]);
  useEffect(() => { load(); }, [load]);
  async function returnRental(id) { if (!window.confirm('Record this rental as returned?')) return; try { await api.patch('/bookings/' + id + '/status', { status: 'returned' }); setItems((current) => current.filter((item) => item.id !== id)); toast('Return recorded.'); } catch (err) { setError(err.message); toast(err.message, 'error'); } }
  const title = status === 'active' ? 'Active rentals' : 'Overdue rentals';
  return <div className="p-6"><h1 className="font-display text-xl font-bold text-ink">{title}</h1>{loading ? <Skeleton className="mt-5 h-32" /> : error ? <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"><p>{error}</p><button type="button" onClick={load} className="mt-3 rounded-lg border border-red-300 px-3 py-2 font-semibold">Retry</button></div> : items.length === 0 ? <div className="mt-5"><EmptyState title={status === 'active' ? 'No active rentals' : 'No overdue rentals'} body="This view will update when booking records are available." /></div> : <div className="mt-5 rounded-2xl border border-line bg-surface p-5"><ul className="space-y-3">{items.map((item) => <li key={item.id} className="flex items-center justify-between gap-3 border-b border-line pb-3 text-sm"><Link href={'/admin/bookings/' + item.id} className="text-burgundy hover:text-burgundy-bright">{item.user?.name || item.user?.email || 'Renter'} · {item.car?.title || 'Vehicle'}</Link><div className="flex items-center gap-3"><Badge tone={BOOKING_STATUS_TONE[item.status] || 'default'}>{BOOKING_STATUS_LABELS[item.status] || item.status}</Badge><button type="button" onClick={() => returnRental(item.id)} className="rounded-lg border border-ink px-3 py-1.5 text-xs font-semibold hover:bg-ink hover:text-white">Record return</button></div></li>)}</ul></div>}</div>;
}
