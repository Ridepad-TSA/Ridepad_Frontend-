// Placeholder car listings, standing in until the backend exposes
// GET /cars and GET /cars/:id. Drives search, car detail, booking and
// checkout together so the numbers stay consistent across the flow.

export const CARS = [
  {
    id: 'toyota-corolla-2019',
    title: 'Toyota Corolla 2019',
    area: 'Ikeja',
    fullAddress: 'Ikeja GRA, Lagos',
    tripType: 'With driver',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 4,
    airConditioning: true,
    category: 'sedan',
    pricePerDay: 28000,
    badges: ['verified'],
    image: '/images/toyota-corolla-2019.jpg',
    owner: {
      name: 'Funke A.',
      since: '2023',
      trips: 54,
      verified: 'NIN verified',
    },
  },
  {
    id: 'hyundai-tucson-2021',
    title: 'Hyundai Tucson 2021',
    area: 'Lekki',
    fullAddress: 'Lekki Phase 1, Lagos',
    tripType: 'With driver',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 5,
    airConditioning: true,
    category: 'suv',
    pricePerDay: 65000,
    badges: ['verified', 'airport'],
    image: '/images/hyundai-tucson-2021.jpg',
    owner: {
      name: 'Adebayo B.',
      since: '2024',
      trips: 37,
      verified: 'NIN verified',
    },
  },
  {
    id: 'kia-rio-2018',
    title: 'Kia Rio 2018',
    area: 'Yaba',
    fullAddress: 'Yaba, Lagos',
    tripType: 'With driver',
    transmission: 'Manual',
    fuel: 'Petrol',
    seats: 4,
    airConditioning: true,
    category: 'hatchback',
    pricePerDay: 22000,
    badges: [],
    image: '/images/kia-rio-2018.jpg',
    owner: {
      name: 'Ngozi E.',
      since: '2023',
      trips: 21,
      verified: 'NIN verified',
    },
  },
  {
    id: 'toyota-hiace-2020',
    title: 'Toyota Hiace 2020',
    area: 'Surulere',
    fullAddress: 'Surulere, Lagos',
    tripType: 'With driver',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 14,
    airConditioning: true,
    category: 'bus',
    pricePerDay: 55000,
    badges: ['bus'],
    image: '/images/toyota-hiace-2020.jpg',
    owner: {
      name: 'Tunde O.',
      since: '2022',
      trips: 88,
      verified: 'NIN verified',
    },
  },
  {
    id: 'lamborghini-huracan-2022',
    title: 'Lamborghini Huracán 2022',
    area: 'Ikoyi',
    fullAddress: 'Ikoyi, Lagos',
    tripType: 'With driver',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 2,
    airConditioning: true,
    category: 'luxury',
    pricePerDay: 450000,
    badges: ['verified', 'luxury'],
    image: '/images/lamborghini-huracan-2022.jpg',
    owner: {
      name: 'Chidi N.',
      since: '2023',
      trips: 9,
      verified: 'NIN verified',
    },
  },
  {
    id: 'ferrari-portofino-2021',
    title: 'Ferrari Portofino 2021',
    area: 'Victoria Island',
    fullAddress: 'Victoria Island, Lagos',
    tripType: 'With driver',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 2,
    airConditioning: true,
    category: 'luxury',
    pricePerDay: 480000,
    badges: ['verified', 'luxury'],
    image: '/images/ferrari-portofino-2021.jpg',
    owner: {
      name: 'Femi K.',
      since: '2022',
      trips: 14,
      verified: 'NIN verified',
    },
  },
  {
    id: 'rolls-royce-ghost-2020',
    title: 'Rolls-Royce Ghost 2020',
    area: 'Banana Island',
    fullAddress: 'Banana Island, Lagos',
    tripType: 'With driver',
    transmission: 'Automatic',
    fuel: 'Petrol',
    seats: 4,
    airConditioning: true,
    category: 'luxury',
    pricePerDay: 550000,
    badges: ['verified', 'luxury'],
    image: '/images/rolls-royce-ghost-2020.jpg',
    owner: {
      name: 'Amara O.',
      since: '2021',
      trips: 22,
      verified: 'NIN verified',
    },
  },
];

export const BADGE_LABELS = {
  verified: 'Verified owner',
  airport: 'Airport pickup',
  bus: 'Buses',
  luxury: 'Luxury',
};

export const SERVICE_CHARGE_RATE = 0.05;
export const REFUNDABLE_DEPOSIT = 50000;

export function getCarById(id) {
  return CARS.find((car) => car.id === id) ?? null;
}

/** Rental fee, service charge, deposit and total for a stay. */
export function priceBreakdown(car, days) {
  const nights = Math.max(1, days);
  const rentalFee = car.pricePerDay * nights;
  const serviceCharge = Math.round(rentalFee * SERVICE_CHARGE_RATE);
  const deposit = REFUNDABLE_DEPOSIT;
  return {
    nights,
    rentalFee,
    serviceCharge,
    deposit,
    total: rentalFee + serviceCharge + deposit,
  };
}

export const RULES_FOR_CAR =
  'Trips stay inside Lagos State unless agreed in writing. Fuel is returned at the level given. ' +
  'Smoking is not allowed. A refundable deposit is held in escrow until the car is returned and ' +
  'both parties confirm the photos.';

export const CHECK_IN_SLOTS = [
  { key: 'front', label: 'Front', required: true },
  { key: 'rear', label: 'Rear', required: true },
  { key: 'left', label: 'Left side', required: true },
  { key: 'right', label: 'Right side', required: true },
  { key: 'dashboard', label: 'Dashboard', required: true },
  { key: 'odometer', label: 'Odometer', required: true },
  { key: 'fuel', label: 'Fuel gauge', required: true },
  { key: 'damage', label: 'Existing damage', required: false },
];

export const LISTING_PHOTO_SLOTS = [
  { key: 'front', label: 'Front' },
  { key: 'rear', label: 'Rear' },
  { key: 'left', label: 'Left side' },
  { key: 'right', label: 'Right side' },
  { key: 'interior', label: 'Interior' },
];

export const TRANSMISSIONS = ['Automatic', 'Manual'];
export const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
export const TRIP_TYPES = ['With driver', 'Self drive'];

export const MOCK_TRIPS = [
  {
    bookingId: 'RP-40812',
    carId: 'hyundai-tucson-2021',
    status: 'active',
    driver: 'Emeka O.',
    startDate: '2026-10-12',
    endDate: '2026-10-15',
    uploadedPhotoKeys: ['front', 'rear', 'left', 'right'],
    ownerConfirmedCount: 2,
  },
  {
    bookingId: 'RP-40790',
    carId: 'toyota-corolla-2019',
    status: 'settled',
    driver: 'Self drive',
    startDate: '2026-09-02',
    endDate: '2026-09-04',
    uploadedPhotoKeys: [],
    ownerConfirmedCount: 0,
  },
  {
    bookingId: 'RP-40765',
    carId: 'kia-rio-2018',
    status: 'settled',
    driver: 'Self drive',
    startDate: '2026-08-20',
    endDate: '2026-08-21',
    uploadedPhotoKeys: [],
    ownerConfirmedCount: 0,
  },
];

export function getTripById(bookingId) {
  return MOCK_TRIPS.find((trip) => trip.bookingId === bookingId) ?? null;
}
