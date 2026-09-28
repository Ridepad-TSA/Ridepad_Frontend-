import { z } from 'zod';
import { CAR_CATEGORIES, LAGOS_AREAS } from '@/lib/constants';
import { TRANSMISSIONS, FUEL_TYPES, TRIP_TYPES } from '@/lib/data/cars';

export const listingSchema = z.object({
  title: z.string().min(3, 'Enter a title, e.g. "Toyota Corolla 2019"'),
  category: z.enum(CAR_CATEGORIES.map((c) => c.value), { message: 'Select a category' }),
  transmission: z.enum(TRANSMISSIONS, { message: 'Select a transmission' }),
  fuel: z.enum(FUEL_TYPES, { message: 'Select a fuel type' }),
  seats: z.coerce.number().int().min(1, 'Enter the number of seats').max(20),
  airConditioning: z.boolean(),
  tripType: z.enum(TRIP_TYPES, { message: 'Select a trip type' }),
  area: z.enum(LAGOS_AREAS, { message: 'Select an area' }),
  fullAddress: z.string().min(3, 'Enter a more specific address'),
  pricePerDay: z.coerce.number().int().min(1000, 'Enter a price of at least ₦1,000'),
});

// Field groups for react-hook-form's per-step trigger() validation.
export const LISTING_STEP_FIELDS = [
  ['title', 'category', 'transmission', 'fuel', 'seats', 'airConditioning', 'tripType'],
  ['area', 'fullAddress', 'pricePerDay'],
  [], // photos — validated separately, not part of the zod schema
  [], // review
];
