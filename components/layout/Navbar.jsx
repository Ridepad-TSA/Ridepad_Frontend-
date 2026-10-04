'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const LINKS = [{ label: 'Home', href: '/' }, { label: 'Rent a car', href: '/search' }];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-night text-white"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6"><Link href="/"><Logo /></Link><nav className="hidden items-center gap-8 md:flex">{LINKS.map((link) => <Link key={link.href} href={link.href} className="text-sm font-medium text-white/80 hover:text-white">{link.label}</Link>)}</nav><div className="hidden items-center gap-3 md:flex"><Link href="/login" className="text-sm font-medium text-white/80 hover:text-white">Sign in</Link></div><button type="button" onClick={() => setOpen(!open)} className="md:hidden" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></div>{open && <nav className="flex flex-col gap-1 border-t border-white/10 px-4 pb-4 md:hidden">{LINKS.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2.5 text-sm text-white/80 hover:bg-white/10">{link.label}</Link>)}<Link href="/login" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-burgundy-bright px-4 py-2.5 text-center text-sm font-semibold">Sign in</Link></nav>}</header>;
}
