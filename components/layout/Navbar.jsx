'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navButtonClasses =
  'inline-flex min-h-11 items-center justify-center rounded-lg bg-burgundy-bright px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy-bright';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Rent a car', href: '/search' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-night text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            Sign in
          </Link>
          <Link href="/listings/new" className={navButtonClasses}>
            List your car
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-lg text-white/80 hover:bg-white/10 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 md:hidden">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/listings/new"
              onClick={() => setOpen(false)}
              className={`${navButtonClasses} w-full`}
            >
              List your car
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
