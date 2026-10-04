'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from '@/components/ui/ToastProvider';

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, retry: 1 } } }));
  return <SessionProvider><ToastProvider><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></ToastProvider></SessionProvider>;
}
