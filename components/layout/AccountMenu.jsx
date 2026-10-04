'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import useAuth from '@/hooks/useAuth';
import { clearAuthTokenCache } from '@/lib/api';
import { ROLES } from '@/lib/constants';

export default function AccountMenu({ mobile = false, onNavigate }) {
  const { user, isAuthenticated } = useAuth(); const [open, setOpen] = useState(false); const ref = useRef(null);
  useEffect(() => { const close = (event) => { if (!ref.current?.contains(event.target)) setOpen(false); }; document.addEventListener('mousedown', close); return () => document.removeEventListener('mousedown', close); }, []);
  async function logout() { clearAuthTokenCache(); setOpen(false); onNavigate?.(); await signOut({ callbackUrl: '/login' }); }
  if (!isAuthenticated) return null;
  const admin = user?.role === ROLES.ADMIN; const destination = admin ? '/admin/overview' : '/trips'; const initials = user?.name?.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase() || '?';
  if (mobile) return <div className="space-y-2"><div className="px-2 py-1"><p className="truncate text-sm font-semibold text-white">{user?.name || (admin ? 'System Administrator' : 'Ridepad user')}</p><p className="truncate text-xs text-white/60">{user?.email}</p></div><Link href={destination} onClick={() => onNavigate?.()} className="block rounded-lg px-2 py-2.5 text-sm text-white/80 hover:bg-white/10">{admin ? 'Admin overview' : 'My bookings'}</Link><button type="button" onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-sm text-white/80 hover:bg-white/10"><LogOut className="size-4" />Log out</button></div>;
  return <div className="relative" ref={ref}><button type="button" onClick={() => setOpen((value) => !value)} aria-label="Open account menu" aria-expanded={open} className="flex size-9 items-center justify-center rounded-full bg-burgundy-bright text-xs font-bold text-white">{initials}</button>{open && <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-line bg-surface p-2 text-ink shadow-lg"><div className="border-b border-line px-3 py-2"><p className="truncate text-sm font-semibold">{user?.name || (admin ? 'System Administrator' : 'Ridepad user')}</p><p className="truncate text-xs text-ink-soft">{user?.email}</p></div><Link href={destination} onClick={() => setOpen(false)} className="mt-1 block rounded-lg px-3 py-2 text-sm hover:bg-burgundy-tint">{admin ? 'Admin overview' : 'My bookings'}</Link><button type="button" onClick={logout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-ink-soft hover:bg-burgundy-tint"><LogOut className="size-4" />Log out</button></div>}</div>;
}