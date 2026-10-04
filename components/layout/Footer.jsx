import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return <footer className="border-t border-white/10 bg-night text-white/70"><div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><Link href="/" className="text-white"><Logo /></Link><p className="mt-3 text-sm">Simple vehicle rentals from the Ridepad fleet in Lagos.</p></div><Link href="/search" className="text-sm font-semibold text-white hover:text-burgundy-bright">Browse vehicles</Link></div><div className="border-t border-white/10 px-4 py-5 text-center text-xs sm:px-6">© {new Date().getFullYear()} Ridepad. All rights reserved.</div></footer>;
}