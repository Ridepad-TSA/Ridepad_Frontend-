/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Circle, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import Logo from './Logo';
import AccountMenu from './AccountMenu';

export default function DashboardSidebar({ homeHref, links }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { setCollapsed(window.localStorage.getItem('ridepad-admin-sidebar') === 'collapsed'); }, []);
  useEffect(() => { setMobileOpen(false); }, [pathname]);
  function toggleCollapsed() { setCollapsed((value) => { const next = !value; window.localStorage.setItem('ridepad-admin-sidebar', next ? 'collapsed' : 'expanded'); return next; }); }
  function navigation(mobile = false) { return <nav className={clsx('space-y-1', mobile ? 'p-3' : 'flex-1 overflow-y-auto p-3')} aria-label="Admin navigation">{links.map(({ label, href, icon: LinkIcon = Circle }) => { const active = pathname === href || (href !== homeHref && pathname.startsWith(href + '/')); return <Link key={href} href={href} title={collapsed && !mobile ? label : undefined} aria-label={label} className={clsx('flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors', active ? 'bg-burgundy text-white' : 'text-white/70 hover:bg-white/10 hover:text-white', collapsed && !mobile ? 'justify-center px-2' : '')}><LinkIcon className="size-4 shrink-0" aria-hidden="true" /><span className={collapsed && !mobile ? 'sr-only' : ''}>{label}</span></Link>; })}</nav>; }
  return <><aside className={clsx('hidden shrink-0 flex-col bg-night text-white transition-[width] duration-200 md:sticky md:top-0 md:flex md:h-[100dvh]', collapsed ? 'w-20' : 'w-60')}><div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-4"><Link href={homeHref} aria-label="Ridepad admin overview"><Logo className={clsx('[&_svg]:h-6', collapsed ? 'sr-only' : '')} /></Link><button type="button" onClick={toggleCollapsed} aria-label={collapsed ? 'Expand admin navigation' : 'Collapse admin navigation'} title={collapsed ? 'Expand navigation' : 'Collapse navigation'} className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white">{collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}</button></div>{navigation()}</aside><div className="shrink-0 bg-night text-white md:hidden"><div className="flex h-16 items-center justify-between px-4"><Link href={homeHref} aria-label="Ridepad admin overview"><Logo className="[&_svg]:h-6" /></Link><button type="button" onClick={() => setMobileOpen(true)} aria-label="Open admin navigation" className="rounded-lg p-2 hover:bg-white/10"><Menu className="size-5" /></button></div>{mobileOpen && <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMobileOpen(false)}><aside className="h-full w-[min(19rem,85vw)] bg-night" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between border-b border-white/10 px-4 py-4"><Link href={homeHref} onClick={() => setMobileOpen(false)} aria-label="Ridepad admin overview"><Logo className="[&_svg]:h-6" /></Link><button type="button" onClick={() => setMobileOpen(false)} aria-label="Close admin navigation" className="rounded-lg p-2 hover:bg-white/10"><X className="size-5" /></button></div>{navigation(true)}<div className="border-t border-white/10 p-3"><AccountMenu mobile onNavigate={() => setMobileOpen(false)} /></div></aside></div>}</div></>;
}
