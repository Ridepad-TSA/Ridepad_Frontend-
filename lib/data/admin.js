// Placeholder admin data, standing in until the backend exposes
// GET /admin/overview, GET /admin/bookings and GET /admin/verifications.

export const OVERVIEW_STATS = [
  { label: 'Bookings', value: '312', change: 'up 18% on last month' },
  { label: 'Gross volume', value: '₦48.2m', change: 'up 12%' },
  { label: 'Held in escrow', value: '₦9.7m', change: '43 open trips' },
  { label: 'Active cars', value: '186', change: '34 added' },
];

// Bookings placed each day, most recent day last.
export const BOOKINGS_PER_WEEK = [
  { label: 'Mon', value: 28 },
  { label: 'Tue', value: 24 },
  { label: 'Wed', value: 30 },
  { label: 'Thu', value: 52 },
  { label: 'Fri', value: 58 },
  { label: 'Sat', value: 61 },
  { label: 'Sun', value: 49 },
];

export const NEEDS_ATTENTION = [
  { label: 'Identity documents to review', count: 14, href: '/admin/verifications' },
  { label: 'Open damage disputes', count: 3, href: '/admin/disputes' },
  { label: 'Listings awaiting approval', count: 7, href: '/admin/bookings' },
];

export const RECENT_BOOKINGS = [
  { bookingId: 'RP-40812', renter: 'Stephen O.', car: 'Hyundai Tucson', amount: 254750, status: 'active' },
  { bookingId: 'RP-40811', renter: 'Chioma A.', car: 'Toyota Corolla', amount: 98000, status: 'settled' },
  { bookingId: 'RP-40809', renter: 'Musa I.', car: 'Toyota Hiace', amount: 310000, status: 'disputed' },
  { bookingId: 'RP-40807', renter: 'Bola T.', car: 'Kia Rio', amount: 44000, status: 'settled' },
];

export const VERIFICATION_DOCS = [
  { key: 'nin', label: 'NIN slip', placeholder: 'Document scan' },
  { key: 'selfie', label: 'Selfie check', placeholder: 'Selfie' },
  { key: 'vehicle', label: 'Vehicle papers', placeholder: 'Registration' },
  { key: 'address', label: 'Proof of address', placeholder: 'Utility bill' },
];

export const VERIFICATION_QUEUE = [
  {
    id: 'chioma-adeyemi',
    name: 'Chioma Adeyemi',
    role: 'Owner',
    detail: 'Owner application',
    waited: '2 hours waited',
    submitted: '21 Sep',
    area: 'Lekki, Lagos',
    checks: [
      { label: 'NIN lookup', result: 'Name matches' },
      { label: 'Face match', result: '94% confidence' },
      { label: 'Phone', result: 'Verified by OTP' },
    ],
  },
  {
    id: 'musa-ibrahim',
    name: 'Musa Ibrahim',
    role: 'Renter',
    detail: 'Self drive request',
    waited: '3 hours waited',
    submitted: '21 Sep',
    area: 'Ikeja, Lagos',
    checks: [
      { label: 'NIN lookup', result: 'Name matches' },
      { label: 'Face match', result: '88% confidence' },
      { label: 'Phone', result: 'Verified by OTP' },
    ],
  },
  {
    id: 'bola-thomas',
    name: 'Bola Thomas',
    role: 'Owner',
    detail: 'Owner application',
    waited: '1 day waited',
    submitted: '20 Sep',
    area: 'Surulere, Lagos',
    checks: [
      { label: 'NIN lookup', result: 'Name matches' },
      { label: 'Face match', result: '91% confidence' },
      { label: 'Phone', result: 'Verified by OTP' },
    ],
  },
  {
    id: 'ada-nwosu',
    name: 'Ada Nwosu',
    role: 'Renter',
    detail: 'NIN mismatch',
    waited: '4 hours waited',
    submitted: '21 Sep',
    area: 'Yaba, Lagos',
    checks: [
      { label: 'NIN lookup', result: 'Name does not match' },
      { label: 'Face match', result: '62% confidence' },
      { label: 'Phone', result: 'Verified by OTP' },
    ],
  },
  {
    id: 'emeka-obi',
    name: 'Emeka Obi',
    role: 'Owner',
    detail: 'Licence expired',
    waited: '5 days waited',
    submitted: '17 Sep',
    area: 'Victoria Island, Lagos',
    checks: [
      { label: 'NIN lookup', result: 'Name matches' },
      { label: 'Face match', result: '90% confidence' },
      { label: 'Phone', result: 'Verified by OTP' },
    ],
  },
];

export function getVerificationById(id) {
  return VERIFICATION_QUEUE.find((v) => v.id === id) ?? null;
}

export const ADMIN_USERS = [
  { id: 'u-1', name: 'Chioma Adeyemi', identifier: 'chioma.adeyemi@example.com', role: 'owner', status: 'active', joined: '2024-05-14', stat: '2 listings' },
  { id: 'u-2', name: 'Stephen O.', identifier: 'stephen.o@example.com', role: 'renter', status: 'active', joined: '2025-01-22', stat: '12 trips' },
  { id: 'u-3', name: 'Musa Ibrahim', identifier: 'musa.ibrahim@example.com', role: 'renter', status: 'active', joined: '2025-03-09', stat: '4 trips' },
  { id: 'u-4', name: 'Bola Thomas', identifier: 'bola.thomas@example.com', role: 'owner', status: 'suspended', joined: '2023-11-02', stat: '1 listing' },
  { id: 'u-5', name: 'Ada Nwosu', identifier: 'ada.nwosu@example.com', role: 'renter', status: 'active', joined: '2025-06-30', stat: '1 trip' },
  { id: 'u-6', name: 'Emeka Obi', identifier: 'emeka.obi@example.com', role: 'owner', status: 'active', joined: '2024-08-18', stat: '3 listings' },
  { id: 'u-7', name: 'Funke A.', identifier: 'funke.a@example.com', role: 'owner', status: 'active', joined: '2023-02-11', stat: '1 listing' },
  { id: 'u-8', name: 'Ridepad Admin', identifier: 'admin@ridepad.africa', role: 'admin', status: 'active', joined: '2023-01-01', stat: '—' },
];
