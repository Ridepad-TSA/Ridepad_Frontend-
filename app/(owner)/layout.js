import RoleGuard from '@/components/layout/RoleGuard';
import { ROLES } from '@/lib/constants';

export default function OwnerLayout({ children }) {
  return (
    <main className="flex-1">
      <RoleGuard allow={[ROLES.OWNER]}>{children}</RoleGuard>
    </main>
  );
}
