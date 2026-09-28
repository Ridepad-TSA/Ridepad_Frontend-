import { Suspense } from 'react';
import Link from 'next/link';
import Logo from '@/components/layout/Logo';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Log in — Ridepad',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-canvas px-4 py-12">
      <Link href="/" className="mb-8 text-ink">
        <Logo />
      </Link>

      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <h1 className="font-display text-xl font-bold text-ink">Log in</h1>
        <p className="mt-1 text-sm text-ink-soft">Welcome back. Enter your details to continue.</p>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        New to Ridepad?{' '}
        <Link href="/register" className="font-semibold text-burgundy hover:text-burgundy-bright">
          Create an account
        </Link>
      </p>
    </div>
  );
}
