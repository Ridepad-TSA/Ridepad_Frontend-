import Link from 'next/link';
import Logo from '@/components/layout/Logo';
import RoleGuard from '@/components/layout/RoleGuard';
import VerifyForm from '@/components/auth/VerifyForm';
import { ROLES } from '@/lib/constants';

export const metadata = {
  title: 'Verify your identity — Ridepad',
};

export default function VerifyPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-canvas px-4 py-12">
      <Link href="/" className="mb-8 text-ink">
        <Logo />
      </Link>

      <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <RoleGuard allow={[ROLES.RENTER, ROLES.OWNER]}>
          <VerifyForm />
        </RoleGuard>
      </div>
    </div>
  );
}
