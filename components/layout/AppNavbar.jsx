'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { ROLES } from '@/lib/constants';
import Logo from './Logo';
import AccountMenu from './AccountMenu';

const CUSTOMER = [{ label: 'Find a car', href: '/search' }, { label: 'My bookings', href: '/trips' }];
const ADMIN = [{ label: 'Admin overview', href: '/admin/overview' }, { label: 'Inventory', href: '/admin/inventory' }, { label: 'Bookings', href: '/admin/bookings' }];

export default function AppNavbar() {
  const { user, isAuthenticated } = useAuth(); const [mobile, setMobile] = useState(false); const links = user?.role === ROLES.ADMIN ? ADMIN : CUSTOMER;
  return <header className="border-b border-white/10 bg-night text-white"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"><Link href="/"><Logo className="[&_svg]:h-6" /></Link><nav className="hidden items-center gap-6 md:flex">{links.map((link) => <Link key={link.href} href={link.href} className="text-sm font-medium text-white/80 hover:text-white">{link.label}</Link>)}</nav>{isAuthenticated ? <div className="hidden md:block"><AccountMenu /></div> : <div className="hidden items-center gap-3 md:flex"><Link href="/login" className="text-sm font-semibold text-white/80 hover:text-white">Sign in</Link><Link href="/register" className="rounded-lg bg-burgundy-bright px-4 py-2 text-sm font-semibold">Create account</Link></div>}<button type="button" onClick={() => setMobile(!mobile)} className="md:hidden" aria-label={mobile ? 'Close menu' : 'Open menu'}>{mobile ? <X /> : <Menu />}</button></div>{mobile && <nav className="border-t border-white/10 px-4 pb-4 md:hidden">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobile(false)} className="block rounded-lg px-2 py-2.5 text-sm text-white/80">{link.label}</Link>)}{isAuthenticated ? <AccountMenu mobile onNavigate={() => setMobile(false)} /> : <div className="space-y-2"><Link href="/login" onClick={() => setMobile(false)} className="block rounded-lg border border-white/20 px-4 py-2.5 text-center text-sm font-semibold">Sign in</Link><Link href="/register" onClick={() => setMobile(false)} className="block rounded-lg bg-burgundy-bright px-4 py-2.5 text-center text-sm font-semibold">Create account</Link></div>}</nav>}</header>;
}