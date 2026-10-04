import VehicleForm from '@/components/admin/VehicleForm';

export default function AddVehiclePage() {
  return <div className="mx-auto w-full max-w-6xl p-4 sm:p-6"><h1 className="font-display text-xl font-bold text-ink">Add vehicle</h1><p className="mt-1 mb-6 text-sm text-ink-soft">Add a Ridepad fleet vehicle to the customer catalogue.</p><VehicleForm /></div>;
}
