export const BOOKING_STATUS = Object.freeze({
  PENDING_PAYMENT: 'pending_payment',
  CONFIRMED: 'confirmed',
  ACTIVE: 'active',
  RETURNED: 'returned',
  SETTLED: 'settled',
  CANCELLED: 'cancelled',
  DISPUTED: 'disputed',
});

export const BOOKING_STATUS_LABELS = Object.freeze({
  pending_payment: 'Awaiting payment',
  confirmed: 'Confirmed',
  active: 'On trip',
  returned: 'Returned',
  settled: 'Settled',
  cancelled: 'Cancelled',
  disputed: 'Disputed',
});

// Happy-path order, used by StatusTimeline.
export const BOOKING_FLOW = Object.freeze([
  'pending_payment',
  'confirmed',
  'active',
  'returned',
  'settled',
]);

export const CAR_CATEGORIES = Object.freeze([
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'pickup', label: 'Pickup' },
  { value: 'minivan', label: 'Minivan' },
  { value: 'bus', label: 'Bus' },
  { value: 'luxury', label: 'Luxury' },
]);

export const CITIES = Object.freeze([{ value: 'lagos', label: 'Lagos' }]);

export const LAGOS_AREAS = Object.freeze([
  'Agege',
  'Ajah',
  'Alimosho',
  'Apapa',
  'Badagry',
  'Epe',
  'Festac',
  'Gbagada',
  'Ikeja',
  'Ikorodu',
  'Ikotun',
  'Ikoyi',
  'Ilupeju',
  'Isolo',
  'Ketu',
  'Lekki',
  'Magodo',
  'Maryland',
  'Mushin',
  'Ogba',
  'Ojo',
  'Ojodu',
  'Oshodi',
  'Sangotedo',
  'Surulere',
  'Victoria Island',
  'Yaba',
]);

export const ROLES = Object.freeze({
  RENTER: 'renter',
  OWNER: 'owner',
  ADMIN: 'admin',
});
