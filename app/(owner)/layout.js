import RoleGuard from '@/components/layout/RoleGuard';
import OwnerSidebar from '@/components/layout/OwnerSidebar';
import { ROLES } from '@/lib/constants';

export default function OwnerLayout({ children }) {
  return (
    <RoleGuard allow={[ROLES.OWNER]}>
      <div className="flex flex-1">
        <OwnerSidebar />
        <main className="flex-1 overflow-x-auto bg-canvas">{children}</main>
      </div>
    </RoleGuard>
  );
}
