import { z } from 'zod';
import { ROLES } from '@/lib/constants';

export const loginSchema = z.object({
  identifier: z.string().min(3, 'Enter your email or phone number'),
  password: z.string().min(1, 'Enter your password'),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, 'Enter your full name'),
    identifier: z.string().min(3, 'Enter your email or phone number'),
    role: z.enum([ROLES.RENTER, ROLES.OWNER]),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const verifySchema = z.object({
  ninOrBvn: z.string().regex(/^\d{10,11}$/, 'Enter an 11-digit NIN or BVN'),
});
