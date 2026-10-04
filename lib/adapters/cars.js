const API_ORIGIN = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api').replace(/\/api\/?$/, '');

export function imageUrl(value) {
  if (!value) return null;
  return value.startsWith('/uploads') ? `${API_ORIGIN}${value}` : value;
}

export function normalizeCar(raw) {
  if (!raw) return null;
  const id = raw._id ?? raw.id;
  return { ...raw, id, title: [raw.make, raw.model].filter(Boolean).join(' '), area: raw.location ?? '', fullAddress: raw.location ?? '', fuel: raw.fuelType ?? '', tripType: raw.transmission ?? '', image: imageUrl(raw.images?.[0]), images: (raw.images ?? []).map(imageUrl).filter(Boolean), badges: [], owner: { name: 'Ridepad vehicle', since: '', trips: 0, verified: '' }, airConditioning: false };
}

export function normalizeBooking(raw) {
  if (!raw) return null;
  const car = raw.car && typeof raw.car === 'object' ? normalizeCar(raw.car) : null;
  return { ...raw, id: raw._id ?? raw.id, bookingId: raw._id ?? raw.id, car, carId: car?.id ?? raw.car, startDate: raw.pickupDate, endDate: raw.returnDate, amount: raw.totalPrice };
}
