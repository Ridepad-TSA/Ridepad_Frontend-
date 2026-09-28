'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Logo from './Logo';

/** Dark left nav shared by the admin and owner dashboards. */
export default function DashboardSidebar({ homeHref, links }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col bg-night text-white">
      <div className="border-b border-white/10 px-4 py-4">
        <Link href={homeHref}>
          <Logo className="[&_svg]:h-6" />
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active ? 'bg-burgundy text-white' : 'text-white/70 hover:bg-white/10 hover:text-white',
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
