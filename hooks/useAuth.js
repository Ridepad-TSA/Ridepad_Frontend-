'use client';

import { useSession } from 'next-auth/react';

/** Thin wrapper over the NextAuth session. */
export default function useAuth() {
  const { data: session, status, update } = useSession();
  return {
    session,
    user: session?.user ?? null,
    role: session?.user?.role ?? null,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
    update,
  };
}
