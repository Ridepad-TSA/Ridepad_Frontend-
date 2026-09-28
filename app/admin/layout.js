import RoleGuard from '@/components/layout/RoleGuard';
import AdminSidebar from '@/components/layout/AdminSidebar';
import { ROLES } from '@/lib/constants';

export default function AdminLayout({ children }) {
  return (
    <RoleGuard allow={[ROLES.ADMIN]}>
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-x-auto bg-canvas">{children}</main>
      </div>
    </RoleGuard>
  );
}
