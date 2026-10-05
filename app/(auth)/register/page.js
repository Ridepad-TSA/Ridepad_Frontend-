import { Suspense } from 'react';
import Link from 'next/link';
import Logo from '@/components/layout/Logo';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Create account — Ridepad',
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-canvas px-4 py-12">
      <Link href="/" className="mb-8 text-ink">
        <Logo />
      </Link>

      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <h1 className="font-display text-xl font-bold text-ink">Create account</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Create an account to browse and request Ridepad vehicles.
        </p>

        <Suspense fallback={null}><RegisterForm /></Suspense>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-burgundy hover:text-burgundy-bright">
          Log in
        </Link>
      </p>
    </div>
  );
}
