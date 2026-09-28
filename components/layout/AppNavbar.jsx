'use client';

import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import Logo from './Logo';

const LINKS = [
  { label: 'Search', href: '/search' },
  { label: 'My trips', href: '/trips' },
  { label: 'Verification', href: '/verification' },
  { label: 'List your car', href: '/listings/new' },
];

function initialsFor(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function AppNavbar() {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="border-b border-white/10 bg-night text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/">
          <Logo className="[&_svg]:h-6" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {isAuthenticated ? (
          <Link
            href="/trips"
            className="flex size-9 items-center justify-center rounded-full bg-burgundy-bright text-xs font-bold text-white"
          >
            {initialsFor(user?.name)}
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-flex min-h-9 items-center justify-center rounded-lg bg-burgundy-bright px-4 text-sm font-semibold text-white transition-colors hover:bg-burgundy"
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  );
}
