/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import Skeleton from '@/components/ui/Skeleton';
import { normalizeCar } from '@/lib/adapters/cars';
import { formatNaira } from '@/lib/format';
import { useToast } from '@/components/ui/ToastProvider';

export default function InventoryPage() {
  const [cars, setCars] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const { toast } = useToast();
  const load = useCallback(() => { setLoading(true); setError(''); api.get('/cars/admin/all').then(({ data }) => setCars((data || []).map(normalizeCar))).catch((err) => setError(err.message)).finally(() => setLoading(false)); }, []);
  useEffect(() => { load(); }, [load]);
  async function toggle(car) { try { const { data } = await api.patch('/cars/' + car.id + '/active', { isActive: !car.isActive }); setCars((items) => items.map((item) => item.id === car.id ? normalizeCar(data) : item)); toast(car.isActive ? 'Vehicle deactivated.' : 'Vehicle activated.'); } catch (err) { setError(err.message); toast(err.message, 'error'); } }
  return <div className="p-6"><div className="flex items-center justify-between gap-3"><h1 className="font-display text-xl font-bold text-ink">Inventory</h1><Link href="/admin/inventory/new" className="inline-flex min-h-9 items-center justify-center rounded-lg bg-burgundy px-4 text-sm font-semibold text-white hover:bg-burgundy-bright">Add vehicle</Link></div>{loading ? <Skeleton className="mt-5 h-32" /> : error ? <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"><p>{error}</p><button type="button" onClick={load} className="mt-3 rounded-lg border border-red-300 px-3 py-2 font-semibold">Retry</button></div> : cars.length === 0 ? <div className="mt-5"><EmptyState title="No vehicles yet" body="Add your first vehicle to start building the Ridepad fleet." action={<Link href="/admin/inventory/new" className="mt-2 inline-flex min-h-9 items-center justify-center rounded-lg bg-burgundy px-4 text-sm font-semibold text-white">Add vehicle</Link>} /></div> : <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-surface"><table className="min-w-[680px] w-full text-left text-sm"><thead><tr className="border-b border-line text-xs text-ink-soft"><th className="px-4 py-3">Vehicle</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Registration</th><th className="px-4 py-3">Price/day</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{cars.map((car) => <tr key={car.id} className="border-b border-line last:border-0"><td className="px-4 py-3 font-medium text-ink">{car.title}</td><td className="px-4 py-3 text-ink-soft">{car.category}</td><td className="px-4 py-3 text-ink-soft">{car.licenceNumber}</td><td className="px-4 py-3 text-ink-soft">{formatNaira(car.pricePerDay)}</td><td className="px-4 py-3"><Badge tone={car.isActive ? 'success' : 'default'}>{car.isActive ? 'Active' : 'Inactive'}</Badge></td><td className="flex flex-wrap gap-2 px-4 py-3"><Link href={'/admin/inventory/' + car.id + '/edit'} className="rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:border-burgundy">Edit</Link><button type="button" onClick={() => toggle(car)} className="rounded-lg border border-ink px-3 py-1.5 text-xs font-semibold hover:bg-ink hover:text-white">{car.isActive ? 'Deactivate' : 'Activate'}</button></td></tr>)}</tbody></table></div>}</div>;
}
