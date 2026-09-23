// Placeholder marketing copy for the landing page, standing in until the
// backend exposes real listings, stats and reviews.

export const HERO_STATS = [
  { value: '186', label: 'Cars listed' },
  { value: '100%', label: 'Owners verified' },
  { value: '₦9.7m', label: 'Paid out to owners' },
];

export const FEATURED_CARS = [
  {
    id: 'bmw-5-series-2021',
    title: 'BMW 5 Series 2021',
    area: 'Ikeja',
    tripType: 'With driver',
    seats: 4,
    pricePerDay: 110000,
    image: '/images/bmw-5-series-2021.jpg',
  },
  {
    id: 'mercedes-c300-2020',
    title: 'Mercedes-Benz C 300 2020',
    area: 'Lekki',
    tripType: 'With driver',
    seats: 4,
    pricePerDay: 125000,
    image: '/images/mercedes-c300-2020.jpg',
  },
  {
    id: 'toyota-corolla-2019',
    title: 'Toyota Corolla 2019',
    area: 'Surulere',
    tripType: 'Self drive',
    seats: 4,
    pricePerDay: 28000,
    image: '/images/toyota-corolla-2019.jpg',
  },
  {
    id: 'lexus-rx350-2018',
    title: 'Lexus RX 350 2018',
    area: 'Victoria Island',
    tripType: 'With driver',
    seats: 5,
    pricePerDay: 140000,
    image: '/images/lexus-rx350-2018.jpg',
  },
];

export const BRANDS = [
  { value: 'toyota', label: 'Toyota', count: 54 },
  { value: 'honda', label: 'Honda', count: 22 },
  { value: 'hyundai', label: 'Hyundai', count: 18 },
  { value: 'kia', label: 'Kia', count: 15 },
  { value: 'mercedes-benz', label: 'Mercedes-Benz', count: 16 },
  { value: 'bmw', label: 'BMW', count: 12 },
  { value: 'lexus', label: 'Lexus', count: 12 },
  { value: 'audi', label: 'Audi', count: 7 },
];

export const WHY_BOOK = [
  {
    letter: 'E',
    title: 'Money in escrow',
    body: 'The owner is paid after the car is returned and both sides confirm the photos.',
  },
  {
    letter: 'V',
    title: 'Verified on both sides',
    body: 'NIN or BVN checks on owners, renters and drivers before the first trip.',
  },
  {
    letter: 'P',
    title: 'Photo check-in',
    body: 'A fixed set of angles at pickup and return, timestamped, so damage claims are settled on evidence.',
  },
  {
    letter: 'D',
    title: 'Driver by default',
    body: 'Every car comes with a driver. Self drive unlocks after a few clean trips.',
  },
];

export const TESTIMONIALS = [
  {
    id: 'chioma-a',
    rating: 5,
    quote:
      'Booked a Tucson for an airport run and the driver was waiting before my flight landed. The deposit came back two days later.',
    name: 'Chioma A.',
    meta: 'Renter, Lekki',
  },
  {
    id: 'adebayo-b',
    rating: 5,
    quote:
      'My car sits idle most weekdays. It now pays for its own servicing and I never chase anyone for money.',
    name: 'Adebayo B.',
    meta: 'Owner, Ikeja',
  },
  {
    id: 'bola-t',
    rating: 4,
    quote:
      'The photo check-in felt like extra work at first. Then a renter scratched the bumper and it took ten minutes to settle.',
    name: 'Bola T.',
    meta: 'Owner, Surulere',
  },
];

export const FOOTER_LINKS = {
  Rent: [
    { label: 'Browse cars', href: '/search' },
    { label: 'Airport pickup', href: '/search?category=airport-run' },
    { label: 'Event hire', href: '/search?category=luxury' },
  ],
  Owners: [
    { label: 'List your car', href: '/listings/new' },
    { label: 'Pricing', href: '/how-it-works#pricing' },
    { label: 'Payouts', href: '/how-it-works#payouts' },
  ],
  Company: [
    { label: 'About us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Support: [
    { label: 'Help centre', href: '/help' },
    { label: 'Terms', href: '/terms' },
    { label: 'Privacy', href: '/privacy' },
  ],
};
