'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Skeleton from '@/components/ui/Skeleton';
import { ROLES } from '@/lib/constants';

const HOME_BY_ROLE = {
  [ROLES.RENTER]: '/search',
  [ROLES.OWNER]: '/dashboard',
  [ROLES.ADMIN]: '/users',
};

/**
 * Renders children only for signed-in users whose role is in `allow`.
 * Signed-out users go to /login; wrong-role users go to their own home.
 */
export default function RoleGuard({ allow, children }) {
  const { role, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const allowed = isAuthenticated && (!allow || allow.includes(role));

  useEffect(() => {
    if (isLoading || allowed) return;
    if (!isAuthenticated) {
      router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    } else {
      router.replace(HOME_BY_ROLE[role] ?? '/');
    }
  }, [isLoading, allowed, isAuthenticated, role, pathname, router]);

  if (!allowed) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-4 p-4" role="status" aria-label="Loading">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return children;
}
