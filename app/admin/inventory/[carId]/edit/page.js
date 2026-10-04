'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import api from '@/lib/api';
import { normalizeCar } from '@/lib/adapters/cars';
import Skeleton from '@/components/ui/Skeleton';
import VehicleForm from '@/components/admin/VehicleForm';

export default function EditVehiclePage({ params }) {
  const { carId } = use(params); const [vehicle, setVehicle] = useState(null); const [error, setError] = useState('');
  useEffect(() => { api.get('/cars/admin/all').then(({ data }) => { const found = (data || []).find((car) => (car._id || car.id) === carId); if (!found) throw new Error('Vehicle not found.'); setVehicle(normalizeCar(found)); }).catch((err) => setError(err.message)); }, [carId]);
  if (error) return <div className="p-6 text-sm text-red-600">{error}</div>;
  if (!vehicle) return <div className="p-6"><Skeleton className="h-8 w-1/3" /><Skeleton className="mt-5 h-96" /></div>;
  return <div className="mx-auto w-full max-w-6xl p-4 sm:p-6"><h1 className="font-display text-xl font-bold text-ink">Edit vehicle</h1><p className="mt-1 mb-6 text-sm text-ink-soft">Update this Ridepad fleet vehicle.</p><VehicleForm mode="edit" vehicle={vehicle} /></div>;
}
