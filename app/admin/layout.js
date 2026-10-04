import RoleGuard from '@/components/layout/RoleGuard';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AccountMenu from '@/components/layout/AccountMenu';
import { ROLES } from '@/lib/constants';

export default function AdminLayout({ children }) {
  return <RoleGuard allow={[ROLES.ADMIN]}><div className="flex h-[100dvh] min-h-0 flex-1 flex-col overflow-hidden md:flex-row"><AdminSidebar /><main className="flex min-h-0 flex-1 flex-col overflow-hidden bg-canvas"><header className="flex shrink-0 items-center justify-end border-b border-line bg-surface px-4 py-3 sm:px-6"><AccountMenu /></header><div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">{children}</div></main></div></RoleGuard>;
}
