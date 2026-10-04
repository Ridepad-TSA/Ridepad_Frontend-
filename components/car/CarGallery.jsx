import VehicleImage from '@/components/car/VehicleImage';

export default function CarGallery({ car }) {
  const images = car.images?.length ? car.images : car.image ? [car.image] : [];
  return <div className="grid grid-cols-[1fr_auto] gap-3"><div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink sm:aspect-video"><VehicleImage src={images[0]} alt={car.title} sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" priority /></div>{images.length > 1 && <div className="flex w-20 flex-col gap-3 sm:w-28">{images.slice(1, 4).map((image, index) => <div key={image} className="relative min-h-20 flex-1 overflow-hidden rounded-xl border border-line"><VehicleImage src={image} alt={car.title + ' image ' + (index + 2)} sizes="112px" className="object-cover" /></div>)}</div>}</div>;
}