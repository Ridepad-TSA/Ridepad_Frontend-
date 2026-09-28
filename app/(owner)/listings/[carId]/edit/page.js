import { notFound } from 'next/navigation';
import ListingWizard from '@/components/owner/ListingWizard';
import { getCarById } from '@/lib/data/cars';

export default async function EditListingPage({ params }) {
  const { carId } = await params;
  const car = getCarById(carId);
  if (!car) notFound();

  const initialValues = {
    title: car.title,
    category: car.category,
    transmission: car.transmission,
    fuel: car.fuel,
    seats: car.seats,
    airConditioning: car.airConditioning,
    tripType: car.tripType,
    area: car.area,
    fullAddress: car.fullAddress,
    pricePerDay: car.pricePerDay,
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-xl font-bold text-ink">Edit listing</h1>
        <p className="mt-1 mb-6 text-sm text-ink-soft">{car.title}</p>
        <ListingWizard mode="edit" initialValues={initialValues} />
      </div>
    </div>
  );
}
