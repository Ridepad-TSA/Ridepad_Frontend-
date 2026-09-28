// Placeholder owner data, standing in until the backend exposes
// GET /owner/overview, GET /owner/bookings and GET /owner/listings.

export const OWNER_STATS = [
  { label: 'Active listings', value: '2', change: '1 pending approval' },
  { label: 'Upcoming bookings', value: '3', change: 'Next pickup tomorrow' },
  { label: 'Wallet balance', value: '₦186,500', change: 'Ready to withdraw' },
  { label: 'Total earned', value: '₦1.4m', change: 'Since May 2024' },
];

// Earnings paid out each day, most recent day last.
export const EARNINGS_PER_WEEK = [
  { label: 'Mon', value: 0 },
  { label: 'Tue', value: 28000 },
  { label: 'Wed', value: 0 },
  { label: 'Thu', value: 65000 },
  { label: 'Fri', value: 28000 },
  { label: 'Sat', value: 90000 },
  { label: 'Sun', value: 65000 },
];

export const OWNER_NEEDS_ATTENTION = [
  { label: 'Pickup photos awaiting your confirmation', count: 2, href: '/bookings' },
  { label: 'Listing awaiting admin approval', count: 1, href: '/listings' },
];

export const OWNER_BOOKINGS = [
  {
    bookingId: 'RP-40812',
    carId: 'hyundai-tucson-2021',
    car: 'Hyundai Tucson 2021',
    renter: 'Stephen O.',
    startDate: '2026-10-12',
    endDate: '2026-10-15',
    amount: 195000,
    status: 'active',
    uploadedPhotoKeys: ['front', 'rear', 'left', 'right'],
  },
  {
    bookingId: 'RP-40790',
    carId: 'hyundai-tucson-2021',
    car: 'Hyundai Tucson 2021',
    renter: 'Chioma A.',
    startDate: '2026-09-02',
    endDate: '2026-09-04',
    amount: 130000,
    status: 'settled',
    uploadedPhotoKeys: ['front', 'rear', 'left', 'right', 'dashboard', 'odometer', 'fuel'],
  },
  {
    bookingId: 'RP-40765',
    carId: 'toyota-corolla-2019',
    car: 'Toyota Corolla 2019',
    renter: 'Bola T.',
    startDate: '2026-08-20',
    endDate: '2026-08-21',
    amount: 56000,
    status: 'settled',
    uploadedPhotoKeys: ['front', 'rear', 'left', 'right', 'dashboard', 'odometer', 'fuel'],
  },
  {
    bookingId: 'RP-40740',
    carId: 'hyundai-tucson-2021',
    car: 'Hyundai Tucson 2021',
    renter: 'Femi K.',
    startDate: '2026-08-05',
    endDate: '2026-08-06',
    amount: 65000,
    status: 'disputed',
    uploadedPhotoKeys: ['front', 'rear', 'left', 'right', 'dashboard', 'odometer', 'fuel'],
  },
  {
    bookingId: 'RP-40712',
    carId: 'toyota-corolla-2019',
    car: 'Toyota Corolla 2019',
    renter: 'Ngozi E.',
    startDate: '2026-07-15',
    endDate: '2026-07-16',
    amount: 28000,
    status: 'pending_payment',
    uploadedPhotoKeys: [],
  },
];

export function getOwnerBookingById(id) {
  return OWNER_BOOKINGS.find((b) => b.bookingId === id) ?? null;
}

export const OWNER_LISTINGS = [
  { id: 'hyundai-tucson-2021', title: 'Hyundai Tucson 2021', status: 'live', pricePerDay: 65000, trips: 37 },
  { id: 'toyota-corolla-2019', title: 'Toyota Corolla 2019', status: 'pending', pricePerDay: 28000, trips: 0 },
];

export const OWNER_VERIFICATION = {
  status: 'verified', // 'verified' | 'pending' | 'not_started'
  submittedOn: '2024-05-14',
  ninVerified: true,
  selfieVerified: true,
  vehiclePapersVerified: true,
  addressVerified: true,
};

export const WALLET_BALANCE = 186500;

export const PAYOUT_STATS = [
  { label: 'Wallet balance', value: '₦186,500', change: 'Ready to withdraw' },
  { label: 'Total earned', value: '₦1.4m', change: 'Since May 2024' },
  { label: 'Payout method', value: 'Bank transfer', change: 'GTBank •••• 4821' },
];

// Earnings paid out each month, most recent month last.
export const EARNINGS_PER_MONTH = [
  { label: 'Apr', value: 145000 },
  { label: 'May', value: 210000 },
  { label: 'Jun', value: 180000 },
  { label: 'Jul', value: 260000 },
  { label: 'Aug', value: 224000 },
  { label: 'Sep', value: 195000 },
];

export const PAYOUT_HISTORY = [
  { id: 'PO-3401', date: '2026-09-27', amount: 195000, method: 'Bank transfer', status: 'processing', reference: '—' },
  { id: 'PO-3391', date: '2026-09-20', amount: 130000, method: 'Bank transfer', status: 'paid', reference: '0192837465' },
  { id: 'PO-3350', date: '2026-08-22', amount: 56000, method: 'Bank transfer', status: 'paid', reference: '0192837412' },
  { id: 'PO-3298', date: '2026-07-18', amount: 84000, method: 'Bank transfer', status: 'paid', reference: '0192837301' },
];
