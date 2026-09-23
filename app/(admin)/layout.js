import RoleGuard from '@/components/layout/RoleGuard';
import { ROLES } from '@/lib/constants';

export default function AdminLayout({ children }) {
  return (
    <main className="flex-1">
      <RoleGuard allow={[ROLES.ADMIN]}>{children}</RoleGuard>
    </main>
  );
}
