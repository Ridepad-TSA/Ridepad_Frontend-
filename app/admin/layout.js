import RoleGuard from '@/components/layout/RoleGuard';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AccountMenu from '@/components/layout/AccountMenu';
import { ROLES } from '@/lib/constants';

export default function AdminLayout({ children }) {
  return <RoleGuard allow={[ROLES.ADMIN]}><div className="flex min-h-[100dvh] w-full flex-col md:fixed md:inset-0 md:h-[100dvh] md:min-h-0 md:flex-row md:overflow-hidden"><AdminSidebar /><main className="flex min-w-0 flex-1 flex-col bg-canvas md:h-full md:min-h-0 md:overflow-hidden"><header className="flex shrink-0 items-center justify-end border-b border-line bg-surface px-4 py-3 sm:px-6"><AccountMenu /></header><div className="min-h-0 flex-1 overflow-x-hidden md:overflow-y-auto">{children}</div></main></div></RoleGuard>;
}
