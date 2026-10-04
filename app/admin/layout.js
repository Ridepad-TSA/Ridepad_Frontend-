import RoleGuard from '@/components/layout/RoleGuard';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AccountMenu from '@/components/layout/AccountMenu';
import { ROLES } from '@/lib/constants';

export default function AdminLayout({ children }) {
  return <RoleGuard allow={[ROLES.ADMIN]}><div className="fixed inset-0 flex h-[100dvh] w-full overflow-hidden"><AdminSidebar /><main className="flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-canvas"><header className="flex shrink-0 items-center justify-end border-b border-line bg-surface px-4 py-3 sm:px-6"><AccountMenu /></header><div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">{children}</div></main></div></RoleGuard>;
}
